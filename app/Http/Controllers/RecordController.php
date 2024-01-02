<?php

namespace App\Http\Controllers;

use App\Models\Audiogram;
use App\Models\Patient;
use App\Models\Product;
use App\Models\Record;
use App\Models\User;
use Carbon\Carbon;
use Evryn\LaravelToman\Facades\Toman;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class RecordController extends Controller
{
    public function __construct()
    {
        $this->middleware('record_group_check', [
            'only' => [
                'create',
                'store',
                'edit',
            ]
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): \Inertia\Response
    {
        return Inertia::render('Records/Index', [
            'records' => auth()->user()->records()->with('patient')->latest()->paginate(10)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): \Inertia\Response
    {
        return Inertia::render('Records/Create', [
            'setting' => Auth::user()->setting ?: null,
            'setting_time_orders' => Auth::user()->setting_time_orders,
        ]);
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
            'insurance' => ['required', 'string', 'max:255'],
            'state' => ['required', 'string'],
            'city' => ['required', 'string'],
            'address' => ['required', 'string', 'max:255'],
            'post_code' => ['required', 'numeric', 'digits:10'],
            'phone' => ['required', 'numeric', 'digits:11', 'regex:/(09)[0-9]{9}/'],
            'birth_year' => ['required', 'numeric', 'between:1200,1500'],
        ]);

        $patient = auth()->user()->patients()->updateOrCreate(['national_code' => $request->national_code], $request->only([
            'name', 'national_code', 'eng_name', 'insurance', 'state', 'city', 'address', 'post_code', 'phone', 'birth_year',
        ]));

        $record = auth()->user()->records()->create(['patient_id' => $patient->id]);

        $record->set_step(2);

        return redirect()->route('records.edit', ['record' => $record, 'step' => 2])->with('toast', ['success' => 'مرحله اول ذخیره شد']);
    }

    /**
     * Store aid type to record.
     */
    public function store_aid_type(Request $request, Record $record): \Illuminate\Http\RedirectResponse
    {
        $request->validate([
            'brand' => ['required', 'in:phonak,hansaton,unitron'],
            'type' => ['required', 'in:CIC,ITC,BTE mold,BTE tube,RIC'],
            'ear' => ['required', 'in:left,right,both'],
            'product' => ['required', 'numeric', 'exists:products,id'],
        ]);

        $data = [
            'product_id' => $request->product,
            ...$request->only(['brand', 'type', 'ear'])
        ];

        $product = Product::find($request->product);

        if ($product->has_mold)
            $data = [
                ...$data,
                ...$request->validate([
                    'has_mold' => ['boolean']
                ])
            ];

        if ($product->has_package)
            $data = [
                ...$data,
                ...$request->validate([
                    'has_package' => ['boolean']
                ])
            ];

        if ($product->has_charger)
            $data = [
                ...$data,
                ...$request->validate([
                    'has_charger' => ['boolean']
                ])
            ];

        $count = $request->ear == 'both' ? 2 : 1;
        if ($product->inventory < $count) {
            return back()->withErrors(['product' => 'موجودی محصول به اتمام رسیده است']);
        }

        if (! $record->product)
            if (! $record->user->can_buy($request->product, $count)) {
                return back()->withErrors(['product' => 'شما امکان سفارش این محصول را ندارید']);
            }

        $limit_reached = $record->user->reached_limit('record', $count, $record->product);

        if ($limit_reached) {
            return back()->withErrors(['product' => 'تعداد ظرفیت سفارش بیش از حد مجاز می باشد']);
        }
        $record->set_step(3);

        if (($record->type != $request->type) && $record->record_aids->count())
        {
            foreach ($record->record_aids as $record_aid)
                $record_aid->update([
                    'hearing_aid_size' => null,
                    'vent_size' => null,
                    'wax_guard' => null,
                    'receiver' => null,
                    'has_mold' => null,
                    'mold_material' => null,
                    'mold_size' => null,
                    'has_vent' => null,
                    'tube_size' => null,
                    'dome_type' => null,
                    'dome_size' => null,
                    'external_receiver_size' => null,
                    'shell_type' => null
                ]);

            $record->status = 3;
            $record->touch();
        }

        $record->update($data);

        return redirect()->route('records.edit', ['record' => $record, 'step' => 3])->with('toast', ['success' => 'مرحله دوم ذخیره شد']);
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

        return redirect()->route('records.edit', ['record' => $record, 'step' => 4])->with('toast', ['success' => 'مرحله سوم ذخیره شد']);
    }

    /**
     * Store audiogram to record.
     */
    public function store_audiogram(Request $request, Record $record): \Illuminate\Http\RedirectResponse
    {
        $to_validate = [
            'id_card_image' => ['required'],
            'prescription_image' => ['required'],
            'audiogram_image' => ['required'],
            'national_code_confirm_image' => ['required'],
        ];
        foreach (['left', 'right'] as $ear) {
            if ($record->ear == $ear || $record->ear == 'both')
            {
                $to_validate = [
                    $ear .'.ac_250' => ['required', 'numeric', 'max:120'],
                    $ear .'.ac_500' => ['required', 'numeric', 'max:120'],
                    $ear .'.ac_1000' => ['required', 'numeric', 'max:120'],
                    $ear .'.ac_2000' => ['required', 'numeric', 'max:120'],
                    $ear .'.ac_4000' => ['required', 'numeric', 'max:120'],
                    $ear .'.bc_250' => ['nullable', 'numeric', 'max:120'],
                    $ear .'.bc_500' => ['nullable', 'numeric', 'max:120'],
                    $ear .'.bc_1000' => ['nullable', 'numeric', 'max:120'],
                    $ear .'.bc_2000' => ['nullable', 'numeric', 'max:120'],
                    $ear .'.bc_4000' => ['nullable', 'numeric', 'max:120'],
                    ...$to_validate,
                ];
            }
        }

        if ($request->hasFile('id_card_image'))
            $to_validate['id_card_image'] = ['mimes:jpeg,jpg', 'max:'. env('MAX_IMAGE_SIZE', 512)];

        if ($request->hasFile('prescription_image'))
            $to_validate['prescription_image'] = ['mimes:jpeg,jpg', 'max:'. env('MAX_IMAGE_SIZE', 512)];

        if ($request->hasFile('audiogram_image'))
            $to_validate['audiogram_image'] = ['mimes:jpeg,jpg', 'max:'. env('MAX_IMAGE_SIZE', 512)];

        if ($request->hasFile('national_code_confirm_image'))
            $to_validate['national_code_confirm_image'] = ['mimes:jpeg,jpg', 'max:'. env('MAX_IMAGE_SIZE', 512)];

        $request->validate($to_validate);

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

            if ($request->hasFile('prescription_image')) {
                $image = $request->file('prescription_image');
                $file_name = 'prescription_image.jpg';
                Storage::disk('records')->putFileAs($record->id, $image, $file_name);

                $record->prescription_image = $file_name;
            }

            if ($request->hasFile('id_card_image')) {
                $image = $request->file('id_card_image');
                $file_name = 'id_card_image.jpg';
                Storage::disk('records')->putFileAs($record->id, $image, $file_name);

                $record->id_card_image = $file_name;
            }

            if ($request->hasFile('audiogram_image')) {
                $image = $request->file('audiogram_image');
                $file_name = 'audiogram_image.jpg';
                Storage::disk('records')->putFileAs($record->id, $image, $file_name);

                $record->audiogram_image = $file_name;
            }

            if ($request->hasFile('national_code_confirm_image')) {
                $image = $request->file('national_code_confirm_image');
                $file_name = 'national_code_confirm_image.jpg';
                Storage::disk('records')->putFileAs($record->id, $image, $file_name);

                $record->national_code_confirm_image = $file_name;
            }

            $record->touch();
        }

        $record->set_step(5);

        return redirect()->route('records.edit', ['record' => $record, 'step' => 5])->with('toast', ['success' => 'مرحله چهارم ذخیره شد']);
    }

    /**
     * Store shipping to record.
     */
    public function store_shipping(Request $request, Record $record): \Illuminate\Http\RedirectResponse
    {
        $request->validate([
            'expert_phone' => ['required', 'numeric', 'regex:/(09)[0-9]{9}/'],
            'type' => ['required', 'in:terminal,air,tipax,post,co-worker delivery,company delivery,etc'],
            'has_health_insurance' => ['boolean'],
            'description' => ['nullable', 'string'],
            'mail_address' => ['required', 'in:home,work,second_work'],
        ]);

        $data = $request->only(['expert_phone','type','description','mail_address','etc_delivery','has_health_insurance','phone','audiologist_med_number','otolaryngologist_med_number','supplementary_insurance']);

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

        $price = $record->product->price;

        $count = $record->ear == 'both' ? 2 : 1;

        if ($record->has_mold)
            $price += $record->product->mold_price;

        if ($record->has_package)
            $price += $record->product->package_price;

        $price *= $count;

        if ($record->has_charger)
            $price += $record->product->charger_price;


        $record->total_price = $price;
        $record->touch();

        return redirect()->route('records.index')->with('toast', ['success' => "سفارش شماره ". $record->id ." تکمیل شد"]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function check_national_code(Request $request): \Illuminate\Http\JsonResponse
    {
        $request->validate([
            'national_code' => ['required', 'numeric', 'digits:10']
        ]);

        $patient = auth()->user()->patients()->where('national_code', $request->national_code)->first();
        return response()->json(['patient' => $patient]);
    }

    /**
     * Get products for the type
     */
    public function get_products(Request $request): \Illuminate\Http\JsonResponse
    {
        $request->validate([
            'type' => ['required', 'in:CIC,ITC,BTE mold,BTE tube,RIC'],
            'brand' => ['required', 'in:phonak,hansaton,unitron'],
        ]);

        if ($request->user()->group == 0)
            $products = Product::all()->where('category', $request->type)->where('brand', $request->brand);
        else
            $products = $request->user()->products()->where('category', $request->type)->where('brand', $request->brand);

        return response()->json(['products' => $products]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Record $record): \Inertia\Response
    {
        if ($record->shipping->mail_address == 'home')
            $record_address = [
                'address' => $record->user->address->home_address,
                'post_code' => $record->user->address->home_post_code,
                'phone' => $record->user->address->home_phone
            ];
        elseif ($record->shipping->mail_address == 'work')
            $record_address = [
                'address' => $record->user->address->work_address,
                'post_code' => $record->user->address->work_post_code,
                'phone' => $record->user->address->work_phone
            ];
        elseif ($record->shipping->mail_address == 'second_work')
            $record_address = [
                'address' => $record->user->address->second_work_address,
                'post_code' => $record->user->address->second_work_post_code,
                'phone' => $record->user->address->second_work_phone
            ];

        return Inertia::render('Records/Show', [
            'user' => Auth::user(),
            'record' => $record,
            'record.user' => $record->user,
            'record.payment' => $record->payment,
            'record.patient' => $record->patient,
            'record.product' => $record->product,
            'record.shipping' => $record->shipping,
            'record.shipping.address' => $record_address,
            'record.record_aid.left' => $record->record_aids()->firstWhere('ear', 'left'),
            'record.audiogram.right' => $record->audiograms()->firstWhere('ear', 'right'),
            'record.audiogram.left' => $record->audiograms()->firstWhere('ear', 'left'),
            'record.record_aid.right' => $record->record_aids()->firstWhere('ear', 'right'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Record $record): \Illuminate\Http\RedirectResponse|\Inertia\Response
    {
        if ($record->status == 'paid')
            return redirect()->route('records.index')->with('toast', ['error' => 'پرونده قابل ویرایش نمی باشد']);

        return Inertia::render('Records/Create', [
            'setting' => Auth::user()->setting ?: null,
            'setting_time_orders' => Auth::user()->setting_time_orders,
            'record' => $record,
            'record.patient' => $record->patient,
            'record.aid.right' => $record->record_aids->firstWhere('ear', 'right'),
            'record.aid.left' => $record->record_aids->firstWhere('ear', 'left'),
            'record.audiogram.right' => $record->audiograms->firstWhere('ear', 'right'),
            'record.audiogram.left' => $record->audiograms->firstWhere('ear', 'left'),
            'record.shipping' => $record->shipping,
            'record.shipping.address' => $record->user->address,
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
            'insurance' => ['required', 'string', 'max:255'],
            'state' => ['required', 'string'],
            'city' => ['required', 'string'],
            'address' => ['required', 'string', 'max:255'],
            'post_code' => ['required', 'numeric', 'digits:10'],
            'phone' => ['required', 'numeric', 'digits:11'],
            'birth_year' => ['required', 'numeric', 'between:1200,1500'],
        ]);

        $patient = auth()->user()->patients()->updateOrCreate(['national_code' => $request->national_code], $request->only([
            'name', 'national_code', 'eng_name', 'insurance', 'state', 'city', 'address', 'post_code', 'phone', 'birth_year',
        ]));

        $record->update(['patient_id' => $patient->id]);
        $record->set_step(2);

        return redirect()->route('records.edit', ['record' => $record, 'step' => 2])->with('toast', ['success' => 'مرحله اول ذخیره شد']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Record $record): \Illuminate\Http\RedirectResponse
    {
        if ($record->status == 'paid')
            return redirect()->route('records.index')->with('toast', ['error' => 'پرونده قابل حذف نمی باشد']);

        if (Storage::disk('records')->directoryExists($record->id))
            Storage::disk('records')->deleteDirectory($record->id);

        $record->delete();
        return redirect()->route('records.index')->with('toast', ['success' => 'سفارش حذف گردید']);
    }

    public function download(Record $record, String $name, bool $archive = false)
    {
        $files = [
            'id' => ['name' => $record->patient->name .'-'. $record->user->name .'-id.jpg', 'file' => "id_card_image.jpg"],
            'audiogram' => ['name' => $record->patient->name .'-'. $record->user->name .'-audiogram.jpg', 'file' => "audiogram_image.jpg"],
            'prescription' => ['name' => $record->patient->name .'-'. $record->user->name .'-prescription.jpg', 'file' => "prescription_image.jpg"],
            'national_code_confirm' => ['name' => $record->patient->name .'-'. $record->user->name .'-national_code_confirmation.jpg', 'file' => "national_code_confirm_image.jpg"],
            'all' => [],
        ];
        if (! in_array($name, array_keys($files)))
            return back()->with('toast', ['error' => 'مدرک یافت نشد']);

        if ($archive) return $this->download_archive($record);

        $headers = array(
            'Content-Type: image/jpg',
        );

        $file = $record->id. '/' .$files[$name]['file'];

        if (Storage::disk('records')->exists($file))
            return Response::download('storage/records/'.$file, $files[$name]['name'], $headers);
        else
            return false;
    }

    private function download_archive(Record $record)
    {
        $zip_file = "سفارش سمعک شماره {$record->id}.zip";
        $zip = new \ZipArchive();
        $zip->open($zip_file, \ZipArchive::CREATE | \ZipArchive::OVERWRITE);

        $files = [
            $record->patient->name .'-'. $record->user->name .'-audiogram.jpg' => "audiogram_image.jpg",
            $record->patient->name .'-'. $record->user->name .'-prescription.jpg' => "prescription_image.jpg",
            $record->patient->name .'-'. $record->user->name .'-id.jpg' => "id_card_image.jpg",
            $record->patient->name .'-'. $record->user->name .'-national_code.jpg' => "national_code_confirm_image.jpg",
        ];

        foreach ($files as $name => $file)
            $zip->addFile(Storage::disk('records')->path($record->id.'/'.$file), $name);

        $zip->close();
        return response()->download($zip_file)->deleteFileAfterSend(true);
    }


    public function pay(Record $record)
    {
        if ($record->created_at < Carbon::now()->subHours(2)->toDateTimeString())
        {
            $record->status = 'canceled';
            $record->save();
            return redirect()->route('records.index')->with('toast', ['error' => 'مهلت پرداخت سفارش به اتمام رسیده است']);
        }

        $price = $record->product->price;

        $count = $record->ear == 'both' ? 2 : 1;

        if ($record->has_mold)
            $price += $record->product->mold_price;

        if ($record->has_package)
            $price += $record->product->package_price;

        $price *= $count;

        if ($record->has_charger)
            $price += $record->product->charger_price;

        if ($record->user->creditor)
        {
            $payment = $record->payment()->create([
                'transaction_id' => 0
            ]);

            $record->total_price = $price;
            $record->status = 'paid';
            $record->payment_id = $payment->id;
            $record->touch();

            $record->update_product_inventory();


            return redirect()->route('records.index')->with('toast', ['success' => 'سفارش با موفقیت ثبت شد']);
        } else {
            $request = Toman::amount($price)
                ->callback(route('payments.verify_record', $record->id))
//            ->mobile($record->user->info->phone)
                ->request();

            if ($request->successful()) {
                $transactionId = $request->transactionId();

                $payment = $record->payment()->create([
                    'transaction_id' => $transactionId
                ]);

                $record->payment_id = $payment->id;
                $record->total_price = $price;
                $record->touch();

                return $request->pay();
            }

            return false;
        }
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
                if ($record->has_mold)
                {
                    $only[] = 'mold_material';
                    $only[] = 'mold_size';
                    if ($data['mold_material'] != 'soft')
                    {
                        $only[] = 'has_vent';
                        if ($data['has_vent'])
                            $only[] = 'vent_size';
                    }

                }
                return $only;

            case 'BTE tube':
                $only[] = 'tube_size';
                if ($record->has_mold)
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
                if ($record->has_mold)
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

        $to_validate = [];

        foreach ($ears as $ear)
        {
            switch ($record->type)
            {
                case 'CIC':
                    $to_validate = [
                        ...$to_validate,
                        $ear. '.hearing_aid_size' => ['required', 'in:CIC,Canal'],
                        $ear. '.vent_size' => ['required', 'in:2-3 mm,1.5 mm,1 mm,groove,none'],
//                        $ear. '.wax_guard' => ['required', 'in:normal,rotating'],     Removed
                        $ear. '.receiver' => ['required', 'in:standard,power,super power'],
                    ];
                    break;

                case 'ITC':
                    $to_validate = [
                        ...$to_validate,
                        $ear. '.hearing_aid_size' => ['required', 'in:Canal,Full shell'],
                        $ear. '.vent_size' => ['required', 'in:2-3 mm,1.5 mm,1 mm,groove,none'],
//                        $ear. '.wax_guard' => ['required', 'in:normal,rotating],      Removed
                        $ear. '.receiver' => ['required', 'in:standard,power,super power,ultra power'],
                    ];
                    break;

                case 'BTE mold':
                    $to_validate = [
                        ...$to_validate,
                        $ear. '.has_mold' => ['boolean'],
                    ];
                    if ($record->has_mold)
                    {
                        $to_validate = [
                            ...$to_validate,
                            $ear. '.mold_material' => ['required', 'in:soft,hard'],
                            $ear. '.mold_size' => ['required', 'in:Canal,Half shell,Full shell,Skeleton shell'],
                        ];
                        if ($request[$ear]['mold_material'] != 'soft')
                        {
                            $to_validate = [
                                ...$to_validate,
                                $ear. '.has_vent' => ['boolean'],
                            ];
                            if ($request[$ear]['has_vent'])
                                $to_validate = [
                                    ...$to_validate,
                                    $ear. '.vent_size' => ['required', 'in:2-3 mm,1.5 mm,1 mm,groove,none'],
                                ];
                        }
                    }
                    break;

                case 'BTE tube':
                    $to_validate = [
                        ...$to_validate,
                        $ear. '.has_mold' => ['boolean'],
                    ];
                    if ($record->has_mold)
                    {
                        $to_validate = [
                            ...$to_validate,
                            $ear. '.tube_size' => ['required', 'in:0,1,2,3'],
                            $ear. '.has_vent' => ['boolean'],
                        ];
                        if ($request[$ear]['has_vent'])
                            $to_validate = [
                                ...$to_validate,
                                $ear. '.vent_size' => ['required', 'in:2-3 mm,1.5 mm,1 mm,groove,none'],
                            ];
                    } else {
                        $to_validate = [
                            ...$to_validate,
                            $ear. '.tube_size' => ['required', 'in:0,1,2,3'],
                            $ear. '.dome_type' => ['required', 'in:open,closed,vented,power'],
                            $ear. '.dome_size' => ['required', 'in:large,medium,small'],
                        ];
                    }
                    break;

                case 'RIC':
                    $to_validate = [
                        ...$to_validate,
                        $ear. '.has_mold' => ['boolean'],
                    ];
                    if ($record->has_mold)
                    {
                        $to_validate = [
                            ...$to_validate,
                            $ear. '.receiver' => ['required', 'in:moderate,power,ultra power'],
                            $ear. '.external_receiver_size' => ['required', 'in:0,1,2,3'],
                            $ear. '.vent_size' => ['nullable', 'in:2-3 mm,1.5 mm,1 mm,groove,none'],
                        ];

                        if ($request->get($ear.'.receiver') == 'ultra power')
                            $to_validate = [
                                ...$to_validate,
                                $ear. '.shell_type' => ['required', 'in:cshell'],
                            ];
                        else
                            $to_validate = [
                                ...$to_validate,
                                $ear. '.shell_type' => ['required', 'in:cshell,Slimtip'],
                            ];

                    } else {
                        $to_validate = [
                            ...$to_validate,
                            $ear. '.receiver' => ['required', 'in:moderate,power'],
                            $ear. '.external_receiver_size' => ['required', 'in:0,1,2,3'],
                            $ear. '.dome_type' => ['required', 'in:open,closed,vented,power'],
                            $ear. '.dome_size' => ['required', 'in:large,medium,small'],
                        ];
                    }
                    break;
            }
        }

        $request->validate($to_validate);
    }
}
