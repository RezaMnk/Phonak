<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): \Inertia\Response
    {
        return Inertia::render('Patients/Index', [
            'patients' => auth()->user()->patients()->latest()->paginate()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        /*
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'eng_name' => ['required', 'string', 'regex:/^[a-zA-Z\s]+$/u'],
            'national_code' => ['required', 'numeric', 'digits:10', 'unique:patients'],
            'state' => ['required', 'string'],
            'city' => ['required', 'string'],
            'address' => ['required', 'string', 'max:255'],
            'post_code' => ['required', 'numeric', 'digits:10'],
            'phone' => ['required', 'numeric', 'regex:/(09)[0-9]{9}/'],
            'age' => ['required', 'numeric', 'between:0,200'],
        ]);

        $patient = auth()->user()->patients()->create($request->only($this->only()));

        return redirect()->route('patients.index', $patient)->with('toast', ['success' => 'کاربر با موفقیت ثبت گردید']);
        */
    }

    /**
     * Display the specified resource.
     */
    public function show(Patient $patient)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Patient $patient): \Inertia\Response
    {
        return Inertia::render('Patients/Edit', [
            'patient' => $patient,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Patient $patient): \Illuminate\Http\RedirectResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'eng_name' => ['required', 'string', 'regex:/^[a-zA-Z\s]+$/u'],
            'national_code' => ['required', 'numeric', 'digits:10', Rule::unique('patients')->ignore($patient->id, 'id')],
            'state' => ['required', 'string'],
            'city' => ['required', 'string'],
            'address' => ['required', 'string', 'max:255'],
            'post_code' => ['required', 'numeric', 'digits:10'],
            'phone' => ['required', 'numeric', 'digits:11', 'regex:/(09)[0-9]{9}/'],
            'birth_year' => ['required', 'numeric', 'between:1200,1500'],
        ]);

        $patient->update($request->only($this->only()));

        return back()->with('toast', ['success' => 'اطلاعات کاربر با موفقیت ویرایش شدند']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Patient $patient): \Illuminate\Http\RedirectResponse
    {
        $patient->delete();

        return back()->with('toast', ['success' => 'کاربر با موفقیت حذف گردید']);
    }

    /**
     * @return string[]
     */
    private function only(): array
    {
        return [
            'name', 'eng_name', 'national_code', 'state', 'city', 'address', 'post_code', 'phone', 'birth_year'
        ];
    }
}
