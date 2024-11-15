<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\WebinarRegister;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Shetabit\Multipay\Exceptions\InvalidPaymentException;
use Shetabit\Multipay\Exceptions\InvoiceNotFoundException;
use Shetabit\Multipay\Invoice;
use Shetabit\Payment\Facade\Payment;

class WebinarController extends Controller
{
    public function index(): \Inertia\Response
    {
        return Inertia::render('Webinars/Index', [
            'webinarRegisters' => WebinarRegister::query()->latest()->paginate()
        ]);
    }

}
