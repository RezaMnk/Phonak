<?php

namespace App\Http\Controllers;

use App\Models\Accessory;
use App\Models\Product;
use Carbon\Carbon;
use Evryn\LaravelToman\Facades\Toman;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AccessoryController extends Controller
{
    public function __construct()
    {
        $this->middleware('accessory_group_check', [
            'only' => [
                'create',
                'store',
                'edit',
            ]
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): \Inertia\Response
    {
        return Inertia::render('Accessories/Index', [
            'accessories' => auth()->user()->accessories()->with('product')->latest()->paginate(10)
        ]);
    }

    /**
     * Get products for the type
     */
    public function get_products(Request $request): \Illuminate\Http\JsonResponse
    {
        $request->validate([
            'brand' => ['required', 'in:phonak,hansaton,rayovac,detax,etc'],
        ]);

        if ($request->user()->group == 0)
            $products = Product::all()->where('category', 'accessories')->where('brand', $request->brand);
        else
            $products = $request->user()->products()->where('category', 'accessories')->where('brand', $request->brand);
        return response()->json(['products' => $products]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): \Inertia\Response
    {
        return Inertia::render('Accessories/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        $request->validate([
            'product' => ['required', 'numeric', 'exists:products,id'],
            'count' => ['nullable', 'numeric'],
            'brand' => ['required', 'in:phonak,hansaton,rayovac,detax,etc'],
        ]);

        $product = Product::find($request->product);
        if ($product->has_count)
        {
            $request->validate([
                'count' => ['required', 'numeric', 'min:'. $product->min_count, 'max:'. $product->max_count],
            ]);
            $count = $request->count;
        }
        else
            $count = 1;

        if ($product->inventory < $count) {
            return back()->withErrors(['product' => 'موجودی محصول به اتمام رسیده است']);
        }

        $data = [
            'product_id' => $request->product,
            ...$request->only(['count', 'brand'])
        ];

        if (!auth()->user()->can_buy($request->product, $request->count, 'accessory')) {
            return back()->withErrors(['product' => 'شما امکان سفارش این محصول را ندارید']);
        }

        $accessory = Auth::user()->accessories()->create($data);

        return redirect()->route('accessories.edit', ['accessory' => $accessory, 'step' => 2])->with('toast', ['success' => 'مرحله دوم ذخیره شد']);
    }

    /**
     * Store shipping to record.
     */
    public function store_shipping(Request $request, Accessory $accessory): \Illuminate\Http\RedirectResponse
    {
        $request->validate([
            'expert_phone' => ['required', 'numeric', 'regex:/(09)[0-9]{9}/'],
            'type' => ['required', 'in:terminal,air,tipax,post,co-worker delivery,company delivery,etc'],
            'description' => ['nullable', 'string'],
            'mail_address' => ['required', 'in:home,work,second_work'],
        ]);

        $data = $request->only(['expert_phone','type','description','mail_address','etc_delivery']);

        $data['has_health_insurance'] = false;

        if ($request->type == 'etc')
            $request->validate([
                'etc_delivery' => ['required', 'string', 'max:255'],
            ]);
        else
            $data['etc_delivery'] = null;


        $accessory->shipping()->updateOrCreate([], $data);

        $accessory->status = 'completed';
        $accessory->touch();

        return redirect()->route('accessories.index')->with('toast', ['success' => "سفارش شماره لوازم جانبی ". $accessory->id ." تکمیل شد"]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Accessory $accessory): \Inertia\Response
    {
        if ($accessory->shipping->mail_address == 'home')
            $accessory_address = [
                'address' => $accessory->user->address->home_address,
                'state' => $accessory->user->address->home_state,
                'city' => $accessory->user->address->home_city,
                'post_code' => $accessory->user->address->home_post_code,
                'phone' => $accessory->user->address->home_phone
            ];
        elseif ($accessory->shipping->mail_address == 'work')
            $accessory_address = [
                'address' => $accessory->user->address->work_address,
                'state' => $accessory->user->address->work_state,
                'city' => $accessory->user->address->work_city,
                'post_code' => $accessory->user->address->work_post_code,
                'phone' => $accessory->user->address->work_phone
            ];
        elseif ($accessory->shipping->mail_address == 'second_work')
            $accessory_address = [
                'address' => $accessory->user->address->second_work_address,
                'state' => $accessory->user->address->second_work_state,
                'city' => $accessory->user->address->second_work_city,
                'post_code' => $accessory->user->address->second_work_post_code,
                'phone' => $accessory->user->address->second_work_phone
            ];

        return Inertia::render('Accessories/Show', [
            'user' => Auth::user(),
            'accessory' => $accessory,
            'accessory.user' => $accessory->user,
            'accessory.payment' => $accessory->payment,
            'accessory.patient' => $accessory->patient,
            'accessory.product' => $accessory->product,
            'accessory.shipping' => $accessory->shipping,
            'accessory.shipping.address' => $accessory_address,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Accessory $accessory): \Inertia\Response
    {
        return Inertia::render('Accessories/Create', [
            'accessory' => $accessory,
            'accessory.product' => $accessory->product,
            'accessory.shipping' => $accessory->shipping,
            'accessory.shipping.address' => $accessory->user->address,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function update(Request $request, Accessory $accessory): \Illuminate\Http\RedirectResponse
    {
        $request->validate([
            'product' => ['required', 'numeric', 'exists:products,id'],
            'count' => ['nullable', 'numeric'],
            'brand' => ['required', 'in:phonak,hansaton,rayovac,detax,etc'],
        ]);

        $product = Product::find($request->product);
        if ($product->has_count)
        {
            $request->validate([
                'count' => ['required', 'numeric', 'min:'. $product->min_count, 'max:'. $product->max_count],
            ]);
            $count = $request->count;
        }
        else
            $count = 1;

        if ($product->inventory < $count) {
            return back()->withErrors(['product' => 'موجودی محصول به اتمام رسیده است']);
        }

        $data = [
            'product_id' => $request->product,
            ...$request->only(['count', 'brand'])
        ];

        if (!$accessory->user->can_buy($request->product, $request->count, 'accessory', $accessory->id)) {
            return back()->withErrors(['product' => 'شما امکان سفارش این محصول را ندارید']);
        }

        $accessory->update($data);

        return redirect()->route('accessories.edit', ['accessory' => $accessory, 'step' => 2])->with('toast', ['success' => 'مرحله دوم ذخیره شد']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Accessory $accessory): \Illuminate\Http\RedirectResponse
    {
        $accessory->delete();
        return redirect()->route('accessories.index')->with('toast', ['success' => 'سفارش حذف گردید']);
    }

    public function pay(Accessory $accessory)
    {
        if ($accessory->created_at < Carbon::now()->subHours(2)->toDateTimeString())
        {
            $accessory->status = 'canceled';
            $accessory->save();
            return redirect()->route('accessories.index')->with('toast', ['error' => 'مهلت پرداخت سفارش به اتمام رسیده است']);
        }
        $price = $accessory->product->price;

        if ($accessory->count)
            $price *= $accessory->count;


        $curl = curl_init();

        $data = [
            'merchant_id' => env('ZARINPAL_MERCHANT_ID'),
            'amount' => $price,
            'callback_url' => route('payments.verify_accessory', $accessory->id),
            'description' => 'پرداخت ' . $price . 'در ندا سمعک آشنا',
        ];

        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://api.zarinpal.com/pg/v4/payment/request.json',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => json_encode($data),
            CURLOPT_HTTPHEADER => array(
                'Content-Type: application/json',
                'Accept: application/json'
            ),
        ));

        $response = curl_exec($curl);

        curl_close($curl);

        $result = json_decode($response);

        if ($result->data->message == 'Success') {
            $transactionId = $result->data->authority;

            $payment = $accessory->payment()->create([
                'transaction_id' => $transactionId
            ]);

            $accessory->payment_id = $payment->id;
            $accessory->total_price = $price;
            $accessory->touch();

            return redirect('https://www.zarinpal.com/pg/StartPay/' . json_decode($response, true)['data']["authority"]);
        }

        return false;

        /*
        $request = Toman::amount($price)
            ->callback(route('payments.verify_accessory', $accessory->id))
//            ->mobile($accessory->user->info->phone)
            ->request();

        if ($request->successful()) {
            $transactionId = $request->transactionId();

            $payment = $accessory->payment()->create([
                'transaction_id' => $transactionId,
                'type' => 'accessory'
            ]);

            $accessory->payment_id = $payment->id;
            $accessory->total_price = $price;
            $accessory->touch();

            return $request->pay();
        }

        return false;
        */
    }
}
