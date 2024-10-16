<?php

namespace App\Http\Controllers;

use App\Models\GroupProduct;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): \Inertia\Response
    {
        $request->validate([
            'search' => ['nullable', 'string']
        ]);

        return Inertia::render('Products/Index', [
            'products' => Product::with('group_products')->where(function ($query) use ($request) {
                if ($request->has('search'))
                    $query->where('name', 'LIKE', '%'. $request->search .'%')
                        ->orWhere('brand' , 'LIKE', '%'. $request->search .'%');
            })->latest()->paginate()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): \Inertia\Response
    {
        return Inertia::render('Products/CreateOrEdit');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'category' => ['required', 'in:CIC,ITC,BTE mold,BTE tube,RIC,accessories'],
            'brand' => ['required', 'in:phonak,hansaton,rayovac,detax,etc'],
            'inventory' => ['required', 'numeric', 'max:100000'],
            'expire_date' => ['nullable', 'date'],
            'price' => ['required', 'numeric', 'max:100000000'],
            'irc' => ['nullable', 'numeric'],
            'etc_brand' => ['required_if:brand,etc', 'nullable', 'string', 'max:255'],
            'has_count' => ['boolean'],
            'has_package' => ['boolean'],
            'has_mold' => ['boolean'],
            'has_charger' => ['boolean'],
            'has_other_services' => ['boolean'],
            'min_count' => ['nullable', 'required_if:has_count,true', 'gte:1'],
            'max_count' => ['nullable', 'required_if:has_count,true', 'gte:min_count'],
            'groups' => ['nullable', 'array'],
            'groups.*.number' => ['required', 'numeric'],
            'groups.*.count' => ['required', 'numeric'],
        ]);

        if ($request->has_mold)
            $data = [
                ...$data,
                ...$request->validate([
                    'mold_price' => ['required', 'numeric', 'max:100000000'],
                ])
            ];

        if ($request->has_package)
            $data = [
                ...$data,
                ...$request->validate([
                    'package_price' => ['required', 'numeric', 'max:100000000'],
                ])
            ];

        if ($request->has_charger)
            $data = [
                ...$data,
                ...$request->validate([
                    'charger_price' => ['required', 'numeric', 'max:100000000'],
                ])
            ];

        if ($request->has_other_services)
            $data = [
                ...$data,
                ...$request->validate([
                    'other_services_price' => ['required', 'numeric', 'max:100000000'],
                ])
            ];

        if ($request->category != 'accessories' && in_array($request->brand, ['rayovac', 'detax', 'etc']))
            return back()->withErrors(['brand' => 'این برند برای لوازم جانبی می باشد']);

        $sum_of_groups = 0;
        $groups = [];
        foreach ($request->groups as $index => $group)
        {
            $sum_of_groups += $group['count'];

            if (in_array($group['number'], $groups))
                return back()->withErrors(['groups.'. $index .'.number' => 'گروه تکراری است']);

            $groups[] = $group['number'];
        }
        if ($sum_of_groups > $data['inventory'])
            return back()->withErrors(['inventory' => 'مجموع مقادیر برای هر گروه بیشتر از موجودی انبار است']);

        $product = Product::create($data);

        foreach ($request->groups as $group)
        {
            $product->group_products()->create([
                'group' => $group['number'],
                'count' => $group['count'],
            ]);
        }

        return redirect()->route('products.index')->with('toast', ['success' => 'محصول با موفقیت ثبت گردید']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product): \Inertia\Response
    {
        return Inertia::render('Products/CreateOrEdit', [
            'product' => $product,
            'product.groups' => $product->group_products()->get(['id', 'group AS number', 'count', 'updated_at']),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'category' => ['required', 'in:CIC,ITC,BTE mold,BTE tube,RIC,accessories'],
            'brand' => ['required', 'in:phonak,hansaton,rayovac,detax,etc'],
            'inventory' => ['required', 'numeric', 'max:100000'],
            'expire_date' => ['nullable', 'date'],
            'price' => ['required', 'numeric', 'max:100000000'],
            'irc' => ['nullable', 'numeric'],
            'etc_brand' => ['nullable', 'required_if:brand,etc', 'string', 'max:255'],
            'has_count' => ['boolean'],
            'has_package' => ['boolean'],
            'has_mold' => ['boolean'],
            'has_charger' => ['boolean'],
            'has_other_services' => ['boolean'],
            'min_count' => ['nullable', 'required_if:has_count,true', 'gte:1'],
            'max_count' => ['nullable', 'required_if:has_count,true', 'gte:min_count'],
            'groups' => ['nullable', 'array'],
            'groups.*.number' => ['required', 'numeric'],
            'groups.*.count' => ['required', 'numeric'],
        ]);

        if ($request->has_mold)
            $data = [
                ...$data,
                ...$request->validate([
                    'mold_price' => ['required', 'numeric', 'max:100000000'],
                ])
            ];

        if ($request->has_package)
            $data = [
                ...$data,
                ...$request->validate([
                    'package_price' => ['required', 'numeric', 'max:100000000'],
                ])
            ];

        if ($request->has_charger)
            $data = [
                ...$data,
                ...$request->validate([
                    'charger_price' => ['required', 'numeric', 'max:100000000'],
                ])
            ];

        if ($request->has_other_services)
            $data = [
                ...$data,
                ...$request->validate([
                    'other_services_price' => ['required', 'numeric', 'max:100000000'],
                ])
            ];

        if ($request->category != 'accessories' && in_array($request->brand, ['rayovac', 'detax', 'etc']))
            return back()->withErrors(['brand' => 'این برند برای لوازم جانبی می باشد']);

        $sum_of_groups = 0;
        $groups = [];
        foreach ($request->groups as $index => $group)
        {
            $sum_of_groups += $group['count'];

            if (in_array($group['number'], $groups))
                return back()->withErrors(['groups.'. $index .'.number' => 'گروه تکراری است']);

            $groups[] = $group['number'];
        }
        if ($sum_of_groups > $data['inventory'])
            return back()->withErrors(['inventory' => 'مجموع مقادیر برای هر گروه بیشتر از موجودی انبار است']);

        $product->update($data);

        foreach ($product->group_products as $group)
        {
            if (! in_array($group->group, $groups))
                $group->delete();
        }

        foreach ($request->groups as $group)
        {
            $group_product = $product->group_products()->firstWhere('group', $group['number']);

            if ($group_product)
            {
                if ($group_product->count != $group['count'])
                    $group_product->update(['count' => $group['count']]);
            }
            else
            {
                $product->group_products()->create([
                    'group' => $group['number'],
                    'count' => $group['count'],
                ]);
            }
        }

        return redirect()->route('products.index')->with('toast', ['success' => 'محصول با موفقیت ویرایش شد']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product): \Illuminate\Http\RedirectResponse
    {
        $product->delete();

        return back()->with('toast', ['success' => 'محصول با موفقیت حذف گردید']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function update_inventory(Request $request, Product $product)
    {
        $request->validate([
            'inventory' => ['required', 'numeric', 'gte:0', 'max:100000']
        ]);

        $product->inventory = $request->inventory;
        $product->touch();

//        return response()->json('success');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function update_group(Request $request, GroupProduct $group_product)
    {
        $group_product->touch();

        $data = [
            'id' => $group_product->id,
            'number' => $group_product->group,
            'count' =>  $group_product->count,
            'updated_ago' => $group_product->updated_ago,
        ];

        return response()->json($data);
    }
}
