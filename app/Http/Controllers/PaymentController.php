<?php

namespace App\Http\Controllers;

use App\Models\Accessory;
use App\Models\Payment;
use App\Models\Record;
use Evryn\LaravelToman\Facades\Toman;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function verify_payment(Request $request, $model)
    {
        if ($request->Status == 'OK')
            $payment = Toman::transactionId($model->transaction_id)
                ->amount($model->total_price)
                ->verify();

        else {
            $model->status = 'failed';
            $model->touch();

            return redirect()->route('home.profile', $model->id)->with('toast.danger', 'خطا در انجام تراکنش! سفارش شما پرداخت نشد.');
        }

        if ($payment->successful() || $payment->alreadyVerified()) {
            $referenceId = $payment->referenceId();
            $model->reference_id = $referenceId;
            $model->status = 'success';
            $model->touch();

            cart()->clear();
            session()->forget('discount');

            event(new NewOrder($model));

            if (setting('send_order_submit_sms') == 'true')
                auth()->user()->send_sms([$model->id], setting('sms_order_submit'));

            return redirect()->route('order.invoice', $model->id)->with('toast.success', 'سفارش با موفقیت ثبت شد');
        }

        if ($payment->failed()) {
            $referenceId = $payment->referenceId();
            $model->reference_id = $referenceId;
            $model->status = 'failed';
            $model->touch();

            return redirect()->route('home.profile', $model->id)->with('toast.danger', 'خطا در انجام تراکنش! سفارش شما پرداخت نشد.');
        }
    }


    public function verify_record(Request $request, Record $record)
    {
        return $this->verify_payment($request, $record);
    }

    public function verify_accessory(Request $request, Accessory $accessory)
    {
        return $this->verify_payment($request, $accessory);
    }
}
