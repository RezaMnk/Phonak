<?php

namespace App\Http\Controllers;

use App\Models\Accessory;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AccessoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): \Inertia\Response
    {
        return Inertia::render('Accessories/Index', [
            'accessories' => Accessory::with('product')->latest()->paginate(10)
        ]);
    }

    /**
     * Get products for the type
     */
    public function get_products(Request $request): \Illuminate\Http\JsonResponse
    {
        $request->validate([
            'brand' => ['required', 'in:phonak,hansaton,unitron'],
        ]);

        $products = Product::query()->where('category', 'accessories')->where('brand', $request->brand)->get();
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
            'brand' => ['required', 'in:phonak,hansaton,unitron'],
        ]);

        $data = [
            'product_id' => $request->product,
            ...$request->only(['count', 'brand'])
        ];

        $accessory = Auth::user()->accessories()->create($data);

        return redirect()->route('accessories.edit', ['accessory' => $accessory, 'step' => 2])->with(['toast', ['success' => 'مرحله دوم ذخیره شد']]);
    }

    /**
     * Store shipping to record.
     */
    public function store_shipping(Request $request, Accessory $accessory): \Illuminate\Http\RedirectResponse
    {
        $request->validate([
            'type' => ['required', 'in:terminal,air,tipax,post,co-worker delivery,company delivery,etc'],
            'has_health_insurance' => ['boolean'],
            'description' => ['nullable', 'string'],
            'mail_address' => ['required', 'in:home,work,second_work'],
        ]);

        $data = $request->only(['type','description','mail_address','etc_delivery','has_health_insurance','phone','audiologist_med_number','otolaryngologist_med_number','supplementary_insurance']);

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

        return redirect()->route('accessories.index')->with(['toast', ['success' => "سفارش شماره لوازم جانبی ". $accessory->id ." تکمیل شد"]]);
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
            'brand' => ['required', 'in:phonak,hansaton,unitron'],
        ]);

        $data = [
            'product_id' => $request->product,
            ...$request->only(['count', 'brand'])
        ];

        $accessory->update($data);

        return redirect()->route('accessories.edit', ['accessory' => $accessory, 'step' => 2])->with(['toast', ['success' => 'مرحله دوم ذخیره شد']]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Accessory $accessory): \Illuminate\Http\RedirectResponse
    {
        $accessory->delete();
        return redirect()->route('accessories.index')->with(['toast', ['success' => 'سفارش حذف گردید']]);
    }
}
