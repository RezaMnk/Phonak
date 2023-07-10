<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use App\Models\Product;
use App\Models\Record;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RecordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): \Inertia\Response
    {
        return Inertia::render('Records/Index', [
            'records' => Record::with('patient')->latest()->paginate(10)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): \Inertia\Response
    {
        return Inertia::render('Records/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        $request->validate([
            'national_code' => ['required', 'numeric', 'digits:10'],
            'name' => ['required', 'string', 'max:255'],
            'eng_name' => ['required', 'string', 'regex:/^[a-zA-Z\s]+$/u'],
            'state' => ['required', 'string'],
            'city' => ['required', 'string'],
            'address' => ['required', 'string', 'max:255'],
            'post_code' => ['required', 'numeric', 'digits:10'],
            'phone' => ['required', 'numeric', 'digits:11', 'regex:/(09)[0-9]{9}/'],
            'birth_year' => ['required', 'numeric', 'between:1200,1500'],
        ]);

        $patient = auth()->user()->patients()->updateOrCreate(['national_code' => $request->national_code], $request->only([
            'name', 'national_code', 'eng_name', 'state', 'city', 'address', 'post_code', 'phone', 'birth_year',
        ]));

        $record = auth()->user()->records()->create(['patient_id' => $patient->id]);
        $record->set_step(2);

        return redirect()->route('records.edit', ['record' => $record, 'step' => 2])->with(['toast', ['success' => 'مرحله اول ذخیره شد']]);
    }

    /**
     * Store aid type to record.
     */
    public function store_aid_type(Request $request, Record $record): \Illuminate\Http\RedirectResponse
    {
        $request->validate([
            'brand' => ['required', 'in:phonak,hansaton'],
            'type' => ['required', 'in:CIC,ITC,BTE mold,BTE tube,RIC'],
            'ear' => ['required', 'in:left,right,both'],
            'product' => ['required', 'numeric', 'exists:products,id'],
        ]);

        $data = [
            'product_id' => $request->product,
            ...$request->only(['brand', 'type', 'ear'])
        ];

        $record->update($data);
        $record->set_step(3);

        return redirect()->route('records.edit', ['record' => $record, 'step' => 3])->with(['toast', ['success' => 'مرحله دوم ذخیره شد']]);
    }

    /**
     * Store aid to record.
     */
    public function store_aid(Request $request, Record $record): \Illuminate\Http\RedirectResponse
    {
        $this->validateAidData($record, $request);

        foreach (['left', 'right'] as $ear) {
            if ($record->ear == $ear || $record->ear == 'both')
            {
                $only = $this->only_aids($record, $request[$ear]);
                $data = $request[$ear];
                foreach ($data as $key => $value) {
                    if (!in_array($key, $only)) {
                        $data[$key] = null;
                    }
                }
                $record->record_aids()->updateOrCreate(['ear' => $ear], $data);
            }

            else
                if ($record_aid = $record->record_aids->firstWhere('ear', $ear))
                    $record_aid->delete();
        }

        $record->update($request->only(['brand', 'type', 'ear', 'product']));
        $record->set_step(4);

        return redirect()->route('records.edit', ['record' => $record, 'step' => 4])->with(['toast', ['success' => 'مرحله سوم ذخیره شد']]);
    }

    /**
     * Store audiogram to record.
     */
    public function store_audiogram(Request $request, Record $record): \Illuminate\Http\RedirectResponse
    {
        foreach (['left', 'right'] as $ear) {
            if ($record->ear == $ear || $record->ear == 'both')
            {

                $request->validate([
                    $ear .'.ac_250' => ['required', 'numeric'],
                    $ear .'.ac_500' => ['required', 'numeric'],
                    $ear .'.ac_1000' => ['required', 'numeric'],
                    $ear .'.ac_2000' => ['required', 'numeric'],
                    $ear .'.ac_4000' => ['required', 'numeric'],
                    $ear .'.bc_250' => ['nullable', 'numeric'],
                    $ear .'.bc_500' => ['nullable', 'numeric'],
                    $ear .'.bc_1000' => ['nullable', 'numeric'],
                    $ear .'.bc_2000' => ['nullable', 'numeric'],
                    $ear .'.bc_4000' => ['nullable', 'numeric'],
                ]);
            }
        }
        foreach (['left', 'right'] as $ear) {
            if ($record->ear == $ear || $record->ear == 'both')
            {
                $only = ['ac_250', 'ac_500', 'ac_1000', 'ac_2000', 'ac_4000', 'bc_250', 'bc_500', 'bc_1000', 'bc_2000', 'bc_4000'];
                $data = $request[$ear];
                foreach ($data as $key => $value) {
                    if (!in_array($key, $only)) {
                        $data[$key] = null;
                    }
                }
                $record->audiograms()->updateOrCreate(['ear' => $ear], $data);
            }

            else
                if ($audiogram = $record->audiograms->firstWhere('ear', $ear))
                    $audiogram->delete();
        }

        $record->update($request->only(['brand', 'type', 'ear', 'product']));
        $record->set_step(5);

        return redirect()->route('records.edit', ['record' => $record, 'step' => 5])->with(['toast', ['success' => 'مرحله چهارم ذخیره شد']]);
    }

    /**
     * Store shipping to record.
     */
    public function store_shipping(Request $request, Record $record): \Illuminate\Http\RedirectResponse
    {
        $request->validate([
            'type' => ['required', 'in:terminal,air,tipax,post,co-worker delivery,company delivery,etc'],
            'has_health_insurance' => ['boolean'],
        ]);

        $data = $request->only(['type','etc_delivery','has_health_insurance','phone','audiologist_med_number','otolaryngologist_med_number','supplementary_insurance']);

        if ($request->type == 'etc')
            $request->validate([
                'etc_delivery' => ['required', 'string', 'max:255'],
            ]);
        else
            $data['etc_delivery'] = null;

        if ($request->has_health_insurance)
            $request->validate([
                'phone' => ['required', 'numeric', 'regex:/(09)[0-9]{9}/'],
                'audiologist_med_number' => ['required', 'numeric', 'max_digits:15'],
                'otolaryngologist_med_number' => ['required', 'numeric', 'max_digits:15'],
                'supplementary_insurance' => ['required', 'string', 'max:255'],
            ]);
        else {
            $data['phone'] = null;
            $data['audiologist_med_number'] = null;
            $data['otolaryngologist_med_number'] = null;
            $data['supplementary_insurance'] = null;
        }

        $record->shipping()->updateOrCreate([], $data);
        $record->set_step('completed');

        return redirect()->route('records.index')->with(['toast', ['success' => "سفارش شماره ". $record->id ." تکمیل شد"]]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function check_national_code(Request $request): \Illuminate\Http\JsonResponse
    {
        $request->validate([
            'national_code' => ['required', 'numeric', 'digits:10']
        ]);

        $patient = Patient::query()->where('national_code', $request->national_code)->first();
        return response()->json(['patient' => $patient]);
    }

    /**
     * Get products for the type
     */
    public function get_products(Request $request): \Illuminate\Http\JsonResponse
    {
        $request->validate([
            'type' => ['required', 'in:CIC,ITC,BTE mold,BTE tube,RIC,accessories'],
        ]);

        $products = Product::query()->where('category', $request->type)->get();
        return response()->json(['products' => $products]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Record $record)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Record $record): \Inertia\Response
    {
        return Inertia::render('Records/Create', [
            'record' => $record,
            'record.patient' => $record->patient,
            'record.aid.right' => $record->record_aids->firstWhere('ear', 'right'),
            'record.aid.left' => $record->record_aids->firstWhere('ear', 'left'),
            'record.audiogram.right' => $record->audiograms->firstWhere('ear', 'right'),
            'record.audiogram.left' => $record->audiograms->firstWhere('ear', 'left'),
            'record.shipping' => $record->shipping,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Record $record): \Illuminate\Http\RedirectResponse
    {
        $request->validate([
            'national_code' => ['required', 'numeric', 'digits:10'],
            'name' => ['required', 'string', 'max:255'],
            'eng_name' => ['required', 'string', 'regex:/^[a-zA-Z\s]+$/u'],
            'state' => ['required', 'string'],
            'city' => ['required', 'string'],
            'address' => ['required', 'string', 'max:255'],
            'post_code' => ['required', 'numeric', 'digits:10'],
            'phone' => ['required', 'numeric', 'digits:11'],
            'birth_year' => ['required', 'numeric', 'between:1200,1500'],
        ]);

        $patient = auth()->user()->patients()->updateOrCreate(['national_code' => $request->national_code], $request->only([
            'name', 'national_code', 'eng_name', 'state', 'city', 'address', 'post_code', 'phone', 'birth_year',
        ]));

        $record->update(['patient_id' => $patient->id]);
        $record->set_step(2);

        return redirect()->route('records.edit', ['record' => $record, 'step' => 2])->with(['toast', ['success' => 'مرحله اول ذخیره شد']]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Record $record)
    {
        //
    }


    public function audiogram_uploads(Request $request)
    {
        $request->validate([]);
    }


    private function only_aids(Record $record, $data): array
    {
        $only = ['description'];
        switch ($record->type)
        {
            case 'CIC':
            case 'ITC':
                $only[] = 'hearing_aid_size';
                $only[] = 'vent_size';
                $only[] = 'wax_guard';
                $only[] = 'receiver';
                return $only;

            case 'BTE mold':
                $only[] = 'has_mold';
                if ($data['has_mold'])
                {
                    $only[] = 'mold_material';
                    $only[] = 'mold_size';
                    $only[] = 'has_vent';
                    if ($data['has_vent'])
                        $only[] = 'vent_size';
                }
                return $only;

            case 'BTE tube':
                $only[] = 'tube_size';
                $only[] = 'has_mold';
                if ($data['has_mold'])
                {
                    $only[] = 'has_vent';
                    if ($data['has_vent'])
                        $only[] = 'vent_size';
                } else {
                    $only[] = 'dome_type';
                    $only[] = 'dome_size';
                }
                return $only;

            case 'RIC':
                $only[] = 'receiver';
                $only[] = 'has_mold';
                if ($data['has_mold'])
                {
                    $only[] = 'shell_type';
                    $only[] = 'external_receiver_size';
                    $only[] = 'vent_size';
                } else {
                    $only[] = 'external_receiver_size';
                    $only[] = 'dome_type';
                    $only[] = 'dome_size';
                }
                return $only;
            default:
                return $only;
        }
    }

    private function validateAidData(Record $record, Request $request)
    {
        $ears = $record->ear === 'both' ? ['left', 'right'] : [$record->ear];
        foreach ($ears as $ear)
        {
            switch ($record->type)
            {
                case 'CIC':
                case 'ITC':
                    $request->validate([
                        $ear. '.hearing_aid_size' => ['required', 'in:CIC,Canal,Full shell'],
                        $ear. '.vent_size' => ['required', 'in:2-3 mm,1.5 mm,1 mm,groove,none'],
                        $ear. '.wax_guard' => ['required', 'in:normal,rotating'],
                        $ear. '.receiver' => ['required', 'in:standard,power,super power,ultra power'],
                    ]);
                    break;

                case 'BTE mold':
                    $request->validate([
                        $ear. '.has_mold' => ['boolean'],
                    ]);
                    if ($request[$ear]['has_mold'])
                    {
                        $request->validate([
                            $ear. '.mold_material' => ['required', 'in:soft,hard'],
                            $ear. '.mold_size' => ['required', 'string'],
                            $ear. '.has_vent' => ['boolean'],
                        ]);
                        if ($request[$ear]['has_vent'])
                            $request->validate([
                                $ear. '.vent_size' => ['required', 'in:2-3 mm,1.5 mm,1 mm,groove,none'],
                            ]);
                    }
                    break;

                case 'BTE tube':
                    $request->validate([
                        $ear. '.has_mold' => ['boolean'],
                    ]);
                    if ($request[$ear]['has_mold'])
                    {
                        $request->validate([
                            $ear. '.tube_size' => ['required', 'in:0,1,2,3'],
                            $ear. '.has_vent' => ['boolean'],
                        ]);
                        if ($request[$ear]['has_vent'])
                            $request->validate([
                                $ear. '.vent_size' => ['required', 'in:2-3 mm,1.5 mm,1 mm,groove,none'],
                            ]);
                    } else {
                        $request->validate([
                            $ear. '.tube_size' => ['required', 'in:0,1,2,3'],
                            $ear. '.dome_type' => ['required', 'in:open,closed,vented,power'],
                            $ear. '.dome_size' => ['required', 'in:large,medium,small'],
                        ]);
                    }
                    break;

                case 'RIC':
                    $request->validate([
                        $ear. '.has_mold' => ['boolean'],
                    ]);
                    if ($request[$ear]['has_mold'])
                    {
                        $request->validate([
                            $ear. '.receiver' => ['required', 'in:moderate,super power,ultra power'],
                            $ear. '.shell_type' => ['required', 'in:cshell,Slimtip'],
                            $ear. '.external_receiver_size' => ['required', 'in:0,1,2,3'],
                            $ear. '.vent_size' => ['nullable', 'in:2-3 mm,1.5 mm,1 mm,groove,none'],
                        ]);
                    } else {
                        $request->validate([
                            $ear. '.receiver' => ['required', 'in:moderate,super power,ultra power'],
                            $ear. '.external_receiver_size' => ['required', 'in:0,1,2,3'],
                            $ear. '.dome_type' => ['required', 'in:open,closed,vented,power'],
                            $ear. '.dome_size' => ['required', 'in:large,medium,small'],
                        ]);
                    }
                    break;
            }
        }
    }
}
