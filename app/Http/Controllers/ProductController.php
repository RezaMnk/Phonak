<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): \Inertia\Response
    {
        return Inertia::render('Products/Index', [
            'products' => Product::latest()->paginate()
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
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'category' => ['required', 'in:CIC,ITC,BTE mold,BTE tube,RIC,accessories'],
            'inventory' => ['required', 'numeric', 'max:1000'],
            'image' => ['required'],
        ]);
        $image = $request->file('image');
        $file_name = $request->name . '-' . time() . '.' . $image->getClientOriginalExtension();

        Storage::disk('products')->putFileAs('', $image, $file_name);

        Product::create([
            'name' => $request->name,
            'category' => $request->category,
            'inventory' => $request->inventory,
            'image' => $file_name,
        ]);

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
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        dd($request->all());
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'category' => ['required', 'in:CIC,ITC,BTE mold,BTE tube,RIC,accessories'],
            'inventory' => ['required', 'numeric', 'max:1000'],
            'image' => ['required'],
        ]);

        $image = $request->file('image');
        $file_name = $request->name . '-' . time() . '.' . $image->getClientOriginalExtension();

        Storage::disk('products')->putFileAs('', $image, $file_name);

        Product::create([
            'name' => $request->name,
            'category' => $request->category,
            'inventory' => $request->inventory,
            'image' => $file_name,
        ]);

        return redirect()->route('products.index')->with('toast', ['success' => 'محصول با موفقیت ثبت گردید']);
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
            'inventory' => ['required', 'numeric', 'gte:0']
        ]);

        $product->inventory = $request->inventory;
        $product->touch();

//        return response()->json('success');
    }
}
