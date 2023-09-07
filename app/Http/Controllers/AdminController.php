<?php

namespace App\Http\Controllers;

use App\Models\Accessory;
use App\Models\Record;
use Inertia\Inertia;

class AdminController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function records()
    {
        return Inertia::render('Admin/Records', [
            'records' => Record::with('patient')->with('user')->whereIn('status', ['completed', 'paid'])->paginate(),
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function accessories()
    {
        return Inertia::render('Admin/Accessories', [
            'accessories' => Accessory::with('user')->whereIn('status', ['completed', 'paid'])->paginate(),
        ]);
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
