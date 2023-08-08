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
}
