<?php

namespace App\Http\Controllers;

use App\Models\Accessory;
use App\Models\Product;
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
            'brand' => ['required', 'in:phonak,hansaton,unitron,rayovac,detax,etc'],
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
            'brand' => ['required', 'in:phonak,hansaton,unitron,rayovac,detax,etc'],
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
            'has_health_insurance' => ['boolean'],
            'description' => ['nullable', 'string'],
            'mail_address' => ['required', 'in:home,work,second_work'],
        ]);

        $data = $request->only(['expert_phone','type','description','mail_address','etc_delivery','has_health_insurance','phone','audiologist_med_number','otolaryngologist_med_number','supplementary_insurance']);

        if ($request->type == 'etc')
            $request->validate([
                'etc_delivery' => ['required', 'string', 'max:255'],
            ]);
        else
            $data['etc_delivery'] = null;

        if ($request->has_health_insurance)
            $request->validate([
                'phone' => ['required', 'numeric', 'regex:/(09)[0-9]{9}/'],
                'audiologist_med_number' => ['required', 'numeric', 'max_digits:15'],
                'otolaryngologist_med_number' => ['required', 'numeric', 'max_digits:15'],
                'supplementary_insurance' => ['required', 'string', 'max:255'],
            ]);
        else {
            $data['phone'] = null;
            $data['audiologist_med_number'] = null;
            $data['otolaryngologist_med_number'] = null;
            $data['supplementary_insurance'] = null;
        }

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
            'brand' => ['required', 'in:phonak,hansaton,unitron,rayovac,detax,etc'],
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

        if (!$accessory->user->can_buy($request->product, $request->count, 'accessory')) {
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
        $price = $accessory->product->price;

        if ($accessory->count)
            $price *= $accessory->count;

        $request = Toman::amount($price)
            ->callback(route('payments.verify_accessory', $accessory->id))
//            ->mobile($accessory->user->info->phone)
            ->request();

        if ($request->successful()) {
            $transactionId = $request->transactionId();

            $payment = $accessory->payment()->create([
                'transaction_id' => $transactionId
            ]);

            $accessory->payment_id = $payment->id;
            $accessory->total_price = $price;
            $accessory->touch();

            return $request->pay();
        }

        return false;
    }
}
