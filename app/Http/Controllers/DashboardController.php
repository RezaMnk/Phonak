<?php

namespace App\Http\Controllers;

use App\Models\Accessory;
use App\Models\Patient;
use App\Models\Product;
use App\Models\Record;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function user_index()
    {
        if (Auth::user()->is_admin())
            return redirect('dashboard/admin');

        return Inertia::render('Dashboards/User', [
            'patients' => auth()->user()->patients()->get()->sortDesc()->take(3),
            'records' => auth()->user()->records()->with('patient')->get()->sortDesc()->take(3),

            'data' => $this->user_statistics()
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function admin_index()
    {
        return Inertia::render('Dashboards/Admin', [
            'users' => User::query()->whereHas('user_info')->whereHas('address')->where('role', 'user')->get()->sortDesc()->take(3),
            'records' => Record::with('patient')->whereIn('status', ['completed', 'paid'])->get()->sortDesc()->take(3),

            'data' => $this->admin_statistics()
        ]);
    }


    private function admin_statistics()
    {
        $daily = [];
        for ($i = 0; $i < 7; $i++) {
            $record_price_avg = Record::query()->where('status', 'paid')->whereDate('created_at', Carbon::today()->subDays($i))->with('product')->get()->avg(function ($record) {
                return $record->product->price;
            }) ?: 0;

            $product_avg = Record::query()->where('status', 'paid')->whereDate('created_at', Carbon::today()->subDays($i))->count();
            $product_avg += Accessory::query()->whereDate('created_at', Carbon::today()->subDays($i))->avg('count');

            $user_avg = User::query()->where('role', 'user')->whereDate('created_at', Carbon::today()->subDays($i))->count();

            $daily[$i] = [
                'record_price_avg' => $record_price_avg,
                'product_avg' => $product_avg,
                'user_avg' => $user_avg,
            ];
        }

        $data = [
            'users' => [
                'all' => User::all()->where('role', 'user')->count(),
                'verified' => User::query()->where('role', 'user')->where('status', 'approved')->count(),
            ],
            'records' => [
                'all' => Record::all()->count() + Accessory::all()->count(),
                'paid' => Record::query()->where('status', 'paid')->count() + Accessory::query()->where('status', 'paid')->count(),
            ],
            'products' => [
                'all' => Product::all()->count(),
                'out_of_inventory' => Product::query()->where('inventory', 0)->count(),
            ],

            'charts' => $daily,
            'charts_data' => [
                'records' => number_format(Record::query()
                    ->where('status', 'paid')
                    ->whereDate('created_at', '>=', Carbon::today()->subDays(6))
                    ->whereDate('created_at', '<=', Carbon::today())
                    ->with('product')->get()
                    ->sum(function ($record) {
                        return $record->product->price;
                    }) ?: 0),

                'products' => Record::query()
                    ->whereDate('created_at', '>=', Carbon::today()->subDays(6))
                    ->whereDate('created_at', '<=', Carbon::today())
                    ->count()
                    +
                    Accessory::query()
                        ->whereDate('created_at', '>=', Carbon::today()->subDays(6))
                        ->whereDate('created_at', '<=', Carbon::today())
                        ->count(),
                'users' => User::query()
                    ->where('role', 'user')
                    ->whereDate('created_at', '>=', Carbon::today()->subDays(6))
                    ->whereDate('created_at', '<=', Carbon::today())
                    ->count()
            ]
        ];

        return $data;
    }


    private function user_statistics()
    {
        $user = Auth::user();
        $daily = [];
        for ($i = 0; $i < 7; $i++) {
            $record_price_avg = $user->records()->where('status', 'paid')->whereDate('created_at', Carbon::today()->subDays($i))->with('product')->get()->avg(function ($record) {
                return $record->product->price;
            }) ?: 0;

            $product_avg = $user->records()->where('status', 'paid')->whereDate('created_at', Carbon::today()->subDays($i))->count();
            $product_avg += $user->accessories()->whereDate('created_at', Carbon::today()->subDays($i))->avg('count');

            $patient_avg = $user->patients()->whereDate('created_at', Carbon::today()->subDays($i))->count();

            $daily[$i] = [
                'record_price_avg' => $record_price_avg,
                'product_avg' => $product_avg,
                'patient_avg' => $patient_avg,
            ];
        }

        $data = [
            'patients' => [
                'all' => $user->patients()->count(),
//                'verified' => $user->patients()->where('status', 'approved')->count(),
            ],
            'records' => [
                'all' => $user->records()->count(),
                'paid' => $user->records()->where('status', 'paid')->count(),
            ],
            'products' => [
                'all' => $user->products()->count(),
//                'out_of_inventory' => $user->products()->where('inventory', 0)->count(),
            ],

            'charts' => $daily,
            'charts_data' => [
                'records' => number_format($user->records()
                    ->where('status', 'paid')
                    ->whereDate('created_at', '>=', Carbon::today()->subDays(6))
                    ->whereDate('created_at', '<=', Carbon::today())
                    ->with('product')->get()
                    ->sum(function ($record) {
                        return $record->product->price;
                    }) ?: 0),

                'products' => $user->records()
                        ->whereDate('created_at', '>=', Carbon::today()->subDays(6))
                        ->whereDate('created_at', '<=', Carbon::today())
                        ->count()
                    +
                    $user->accessories()
                        ->whereDate('created_at', '>=', Carbon::today()->subDays(6))
                        ->whereDate('created_at', '<=', Carbon::today())
                        ->count(),
                'patients' => $user->patients()
                    ->whereDate('created_at', '>=', Carbon::today()->subDays(6))
                    ->whereDate('created_at', '<=', Carbon::today())
                    ->count()
            ]
        ];

        return $data;
    }
}
