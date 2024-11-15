<?php

namespace App\Http\Controllers;

use App\Models\WebinarRegister;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Shetabit\Multipay\Exceptions\InvalidPaymentException;
use Shetabit\Multipay\Exceptions\InvoiceNotFoundException;
use Shetabit\Multipay\Invoice;
use Shetabit\Payment\Facade\Payment;

class WebinarRegisterController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create(): \Inertia\Response
    {
        return Inertia::render('Webinar');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'national_code' => ['required', 'numeric', 'digits:10'],
            'grade' => ['required', 'string', 'max:255'],
            'education_year' => ['nullable', 'required_if:grade,دانشجوی کارشناسی شنوایی شناسی', 'string', 'max:255'],
            'phone' => ['required', 'numeric', 'digits:11', 'regex:/(0)[1-9]{2}[0-9]{8}/'],
            'state' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:255'],
        ]);

        $webinarRegister = WebinarRegister::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'national_code' => $request->national_code,
            'education_year' => $request->education_year,
            'grade' => $request->grade,
            'phone' => $request->phone,
            'state' => $request->state,
            'city' => $request->city,
            'price' => $request->grade == "دانشجوی کارشناسی شنوایی شناسی" ? 950000 : 1950000,
        ]);

        return Inertia::location(route('webinar.pay', $webinarRegister));
    }

    public function pay(WebinarRegister $webinarRegister)
    {
        return Payment::via('zarinpal')
            ->detail('description', 'پرداخت هزینه وبینار ندا سمعک آشنا')
            ->callbackUrl(route('webinar.verify', $webinarRegister))
            ->purchase(
                (new Invoice)->amount($webinarRegister->price),
                function($driver, $transactionId) use ($webinarRegister) {
                    $webinarRegister->update([
                        'transaction_id' => $transactionId
                    ]);
                }
            )->pay()->render();
    }

    /**
     * @throws InvoiceNotFoundException
     */
    public function verify(Request $request, WebinarRegister $webinarRegister)
    {
        if ($request->Status == 'OK' || $request->Status == 0)
        {

            $receipt = Payment::via('zarinpal')->amount($webinarRegister->price)->transactionId($webinarRegister->transaction_id)->verify();

            $webinarRegister->reference_id = $receipt->getReferenceId();
            $webinarRegister->touch();

            return redirect()->route('webinar.success', $webinarRegister);
        }

        else
        {
            $webinarRegister->delete();
            return redirect()->route('webinar.create')->with('toast', ['error' => 'خطا در انجام تراکنش! هزینه شما پرداخت نشد.']);
        }
    }


    /**
     * Show the form for creating a new resource.
     */
    public function success(WebinarRegister $webinarRegister): \Inertia\Response
    {
        if (is_null($webinarRegister->reference_id))
            abort(404);

        return Inertia::render('Webinar', [
            'status' => 'ok'
        ]);
    }
}
