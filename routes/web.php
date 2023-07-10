<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RecordController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'auth.address'])->name('dashboard');

Route::middleware(['auth', 'auth.address'])->group(function () {

    Route::controller(DashboardController::class)->name('dashboard')->prefix('dashboard')->group(function () {
        Route::get('/', 'index');
    });

    Route::controller(ProfileController::class)->name('profile')->prefix('profile')->group(function () {
        Route::get('/', 'edit')->name('.edit');
        Route::patch('/', 'update')->name('.update');
        Route::delete('/', 'destroy')->name('.destroy');
    });

    Route::resource('patients', PatientController::class);

    Route::resource('products', ProductController::class);
    Route::controller(ProductController::class)->name('products')->prefix('products')->group(function () {
        Route::post('/update_inventory/{product}', 'update_inventory')->name('.update_inventory');
    });

    Route::resource('records', RecordController::class);
    Route::controller(RecordController::class)->name('records')->prefix('records')->group(function () {
        Route::post('/check_national_code', 'check_national_code')->name('.check_national_code');
        Route::post('/products', 'get_products')->name('.products');

        Route::post('/store_aid_type/{record}', 'store_aid_type')->name('.store_aid_type');
        Route::post('/store_aid/{record}', 'store_aid')->name('.store_aid');
        Route::post('/store_audiogram/{record}', 'store_audiogram')->name('.store_audiogram');
        Route::post('/store_shipping/{record}', 'store_shipping')->name('.store_shipping');
    });

//    Route::controller(PatientController::class)->name('patients')->prefix('patients')->group(function () {
//        Route::get('/', 'index');
//        Route::get('/{patient}/edit', 'edit')->name('.edit');
//        Route::patch('/{patient}', 'update')->name('.update');
//        Route::delete('/{patient}', 'destroy')->name('.destroy');
//    });

});

require __DIR__.'/auth.php';


Route::get('/test', function () {
    dd(
        \App\Models\Product::find(1)->image_url
    );
});


Route::get('storage-link', function () {
    dd(\Illuminate\Support\Facades\Artisan::call('storage:link'));
});
