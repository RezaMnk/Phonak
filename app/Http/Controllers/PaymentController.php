<?php

namespace App\Http\Controllers;

use App\Models\Accessory;
use App\Models\Payment;
use App\Models\Record;
use Evryn\LaravelToman\Facades\Toman;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function verify_payment(Request $request, $model, $type)
    {
        if ($type == 'record')
            $route = 'records.index';
        elseif ($type == 'accessory')
            $route = 'accessories.index';

        if ($request->Status == 'OK')
            $payment = Toman::transactionId($model->payment->transaction_id)
                ->amount($model->total_price)
                ->verify();

        else
            return redirect()->route($route)->with('toast', ['error' => 'خطا در انجام تراکنش! سفارش شما پرداخت نشد.']);

        if ($payment->successful() || $payment->alreadyVerified()) {
            $referenceId = $payment->referenceId();
            $model->payment->reference_id = $referenceId;
            $model->status = 'paid';
            $model->touch();

            $model->update_product_inventory();

            return redirect()->route($route)->with('toast', ['success' => 'سفارش با موفقیت ثبت شد']);
        }

        if ($payment->failed()) {
            $referenceId = $payment->referenceId();
            $model->reference_id = $referenceId;
            $model->touch();

            return redirect()->route($route)->with('toast', ['error' => 'خطا در انجام تراکنش! سفارش شما پرداخت نشد.']);
        }
    }


    public function verify_record(Request $request, Record $record)
    {
        return $this->verify_payment($request, $record, 'record');
    }

    public function verify_accessory(Request $request, Accessory $accessory)
    {
        return $this->verify_payment($request, $accessory, 'accessory');
    }
}
