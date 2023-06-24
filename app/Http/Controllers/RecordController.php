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
    public function index()
    {
        return Inertia::render('Records/Index', [
            'records' => Record::with('patient')->latest()->paginate(10)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Records/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'national_code' => ['required', 'numeric', 'digits:10'],
        ]);

        $patient =  Patient::query()->firstWhere('national_code', $request->national_code);
        if (! $patient) {
            $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'eng_name' => ['required', 'string', 'regex:/^[a-zA-Z\s]+$/u'],
                'state' => ['required', 'string'],
                'city' => ['required', 'string'],
                'address' => ['required', 'string', 'max:255'],
                'post_code' => ['required', 'numeric', 'digits:10'],
                'phone' => ['required', 'numeric', 'digits:11'],
                'age' => ['required', 'numeric', 'between:0,200'],
            ]);

            $patient = auth()->user()->patients()->create($request->only([
                'name', 'national_code', 'eng_name', 'state', 'city', 'address', 'post_code', 'phone', 'age',
            ]));
        }
        $record = auth()->user()->records()->create(['patient_id' => $patient->id]);

        return redirect()->route('records.edit', $record)->with(['toast', ['success' => 'مرحله اول ذخیره شد'], 'record' => $record]);
    }

    /**
     * Store aid to record.
     */
    public function store_aid(Request $request, Record $record)
    {
        $request->validate([
            'brand' => ['required', 'in:phonak,hansaton'],
            'type' => ['required', 'in:CIC,ITC,BTE mold,BTE tube,RIC,accessories'],
            'ear' => ['required', 'in:left,right,both'],
            'product' => ['required', 'numeric', 'exists:products,id'],
        ]);

        $record->update($request->only(['brand', 'type', 'ear', 'product']));

        return redirect()->route('records.edit', $record)->with(['toast', ['success' => 'مرحله دوم ذخیره شد']]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function check_national_code(Request $request)
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
    public function get_products(Request $request)
    {
        $request->validate([
            'type' => ['required', 'in:CIC,ITC,BTE mold,BTE tube,RIC,accessories'],
            'accessoryType' => ['nullable', 'in:battery,adjustment,molding'],
        ]);

        $products = Product::all();
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
    public function edit(Record $record)
    {
        return Inertia::render('Records/Create', [
            'record' => $record
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Record $record)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Record $record)
    {
        //
    }
}
