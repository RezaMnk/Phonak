<?php

namespace App\Http\Controllers;

use App\Models\WebinarRegister;
use Inertia\Inertia;

class WebinarController extends Controller
{
    public function index(): \Inertia\Response
    {
        return Inertia::render('Webinars/Index', [
            'webinarRegisters' => WebinarRegister::query()->whereNotNull('reference_id')->latest()->paginate()
        ]);
    }

}
