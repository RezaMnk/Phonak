<?php

namespace App\Http\Controllers;

use App\Models\Accessory;
use App\Models\Payment;
use App\Models\Record;
use Illuminate\Http\Request;
use Shetabit\Multipay\Exceptions\InvalidPaymentException;

class PaymentController extends Controller
{
    public function verify_payment(Request $request, $model, $type)
    {
        if ($type == 'record')
            $route = 'records.index';
        elseif ($type == 'accessory')
            $route = 'accessories.index';


        if ($request->Status == 'OK' || $request->Status == 0)
        {

            try {
                $receipt = \Shetabit\Payment\Facade\Payment::via($model->payment->gateway)->amount($model->total_price)->transactionId($model->payment->transaction_id)->verify();

                $model->payment->reference_id = $receipt->getReferenceId();
                $model->payment->touch();

                $model->status = 'paid';
                $model->touch();

                $model->update_product_inventory();

                return redirect()->route($route)->with('toast', ['success' => 'سفارش با موفقیت ثبت شد']);

            } catch (InvalidPaymentException $exception) {

                return redirect()->route($route)->with('toast', ['error' => 'خطا در تایید پرداخت: ' . $exception->getMessage()]);
            }

//            $curl = curl_init();
//
//            $data = [
//                'merchant_id' => env('ZARINPAL_MERCHANT_ID'),
//                'amount' => $model->total_price,
//                'authority' => $model->payment->transaction_id,
//            ];
//
//            curl_setopt_array($curl, array(
//                CURLOPT_URL => 'https://api.zarinpal.com/pg/v4/payment/verify.json',
//                CURLOPT_RETURNTRANSFER => true,
//                CURLOPT_ENCODING => '',
//                CURLOPT_MAXREDIRS => 10,
//                CURLOPT_TIMEOUT => 0,
//                CURLOPT_FOLLOWLOCATION => true,
//                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
//                CURLOPT_CUSTOMREQUEST => 'POST',
//                CURLOPT_POSTFIELDS => json_encode($data),
//                CURLOPT_HTTPHEADER => array(
//                    'Content-Type: application/json',
//                    'Accept: application/json'
//                ),
//            ));
//
//            $response = curl_exec($curl);
//
//            curl_close($curl);
//
//            $result = json_decode($response);

            /*
             $payment = Toman::transactionId($model->payment->transaction_id)
                ->amount($model->total_price)
                ->verify();
            */
        }

        else
            return redirect()->route($route)->with('toast', ['error' => 'خطا در انجام تراکنش! سفارش شما پرداخت نشد.']);

//        if ($result->data->code == 100 || $result->data->code == 101) {
//            $referenceId = $result->data->ref_id;
//            $model->payment->reference_id = $referenceId;
//            $model->payment->touch();
//
//            $model->status = 'paid';
//            $model->touch();
//
//            $model->update_product_inventory();
//
//            return redirect()->route($route)->with('toast', ['success' => 'سفارش با موفقیت ثبت شد']);
//        } else {
//            $referenceId = $result->data->ref_id;
//            $model->reference_id = $referenceId;
//            $model->payment->touch();
//
//            return redirect()->route($route)->with('toast', ['error' => 'خطا در انجام تراکنش! سفارش شما پرداخت نشد.']);
//        }

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
