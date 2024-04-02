<?php

namespace App\Http\Controllers;

use App\Models\Accessory;
use App\Models\Record;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function records(Request $request)
    {
        $request->validate([
            'search' => ['nullable', 'string']
        ]);

        return Inertia::render('Admin/Records', [
            'records' => Record::with(['patient', 'user', 'payment'])
                ->where(function ($query) use ($request) {
                    if ($request->has('search'))
                        $query->whereHas('user', function ($query) use ($request) {
                            $query->where('last_name', 'LIKE', '%'. $request->search .'%')
                                ->orWhere('med_number' , 'LIKE', '%'. $request->search .'%');
                        })->orWhereHas('patient', function ($query) use ($request) {
                            $query->where('name', 'LIKE', '%'. $request->search .'%')
                                ->orWhere('national_code' , 'LIKE', '%'. $request->search .'%');
                        })->orWhereHas('payment', function ($query) use ($request) {
                            $query->where('transaction_id', 'LIKE', '%'. $request->search .'%')
                                ->orWhere('reference_id', 'LIKE', '%'. $request->search .'%');
                        });

                })
                ->whereIn('status', ['completed', 'paid', 'approved'])->latest()->paginate()->onEachSide(0),
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function accessories(Request $request)
    {
        $request->validate([
            'search' => ['nullable', 'string']
        ]);

        return Inertia::render('Admin/Accessories', [
            'accessories' => Accessory::with(['user', 'payment'])->whereIn('status', ['completed', 'paid', 'approved'])
                ->where(function ($query) use ($request) {
                    if ($request->has('search'))
                        $query->whereHas('user', function ($query) use ($request) {
                            $query->where('last_name', 'LIKE', '%'. $request->search .'%')
                                ->orWhere('med_number' , 'LIKE', '%'. $request->search .'%');
                        })->orWhereHas('payment', function ($query) use ($request) {
                            $query->where('transaction_id', 'LIKE', '%'. $request->search .'%')
                                ->orWhere('reference_id', 'LIKE', '%'. $request->search .'%');
                        });
                })->latest()->paginate(),
        ]);
    }


    /**
     * Change the specified resource status.
     */
    public function approve_record(Record $record): \Illuminate\Http\RedirectResponse
    {
        if ($record->status != 'paid')
            return back()->with('toast', ['error' => 'سفارش قابل تایید نمی باشد']);

        $record->status = 'approved';
        $record->touch();

        return back()->with('toast', ['success' => 'سفارش با موفقیت تایید شد']);
    }


    /**
     * Change the specified resource status.
     */
    public function approve_accessory(Accessory $accessory): \Illuminate\Http\RedirectResponse
    {
        if ($accessory->status != 'paid')
            return back()->with('toast', ['error' => 'سفارش قابل تایید نمی باشد']);

        $accessory->status = 'approved';
        $accessory->touch();

        return back()->with('toast', ['success' => 'سفارش با موفقیت تایید شد']);
    }

    /**
     * Display a listing of the resource.
     */
    public function download_record(Record $record)
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

        return Inertia::render('Download/Record', [
            'record' => $record,
            'record.user' => $record->user,
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
     * Display a listing of the resource.
     */
    public function download_accessory(Accessory $accessory)
    {
        if ($accessory->shipping->mail_address == 'home')
            $accessory_address = [
                'address' => $accessory->user->address->home_address,
                'post_code' => $accessory->user->address->home_post_code,
                'phone' => $accessory->user->address->home_phone
            ];
        elseif ($accessory->shipping->mail_address == 'work')
            $accessory_address = [
                'address' => $accessory->user->address->work_address,
                'post_code' => $accessory->user->address->work_post_code,
                'phone' => $accessory->user->address->work_phone
            ];
        elseif ($accessory->shipping->mail_address == 'second_work')
            $accessory_address = [
                'address' => $accessory->user->address->second_work_address,
                'post_code' => $accessory->user->address->second_work_post_code,
                'phone' => $accessory->user->address->second_work_phone
            ];

        return Inertia::render('Download/Accessory', [
            'accessory' => $accessory,
            'accessory.user' => $accessory->user,
            'accessory.patient' => $accessory->patient,
            'accessory.product' => $accessory->product,
            'accessory.shipping' => $accessory->shipping,
            'accessory.shipping.address' => $accessory_address,
        ]);
    }
}
