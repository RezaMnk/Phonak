<?php

use App\Http\Controllers\AccessoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RecordController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\UserController;
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
})->middleware(['auth', 'auth.verified'])->name('dashboard');

Route::middleware(['auth', 'auth.verified'])->group(function () {

    Route::controller(DashboardController::class)->name('dashboard')->prefix('dashboard')->group(function () {
        Route::get('/', 'index');
    });

    Route::resource('patients', PatientController::class);

    Route::controller(RecordController::class)->name('records')->prefix('records')->group(function () {
        Route::post('/check-national-code', 'check_national_code')->name('.check_national_code');
        Route::post('/products', 'get_products')->name('.products');

        Route::post('/store-aid-type/{record}', 'store_aid_type')->name('.store_aid_type');
        Route::post('/store-aid/{record}', 'store_aid')->name('.store_aid');
        Route::post('/store-audiogram/{record}', 'store_audiogram')->name('.store_audiogram');
        Route::post('/store-shipping/{record}', 'store_shipping')->name('.store_shipping');
    });
    Route::resource('records', RecordController::class);

    Route::controller(AccessoryController::class)->name('accessories')->prefix('accessories')->group(function () {
        Route::post('/products', 'get_products')->name('.products');

        Route::post('/store-shipping/{accessory}', 'store_shipping')->name('.store_shipping');
    });
    Route::resource('accessories', AccessoryController::class);

//    Route::controller(PatientController::class)->name('patients')->prefix('patients')->group(function () {
//        Route::get('/', 'index');
//        Route::get('/{patient}/edit', 'edit')->name('.edit');
//        Route::patch('/{patient}', 'update')->name('.update');
//        Route::delete('/{patient}', 'destroy')->name('.destroy');
//    });

});

Route::middleware(['auth', 'auth.is_admin'])->group(function () {
    Route::controller(ProductController::class)->name('products')->prefix('products')->group(function () {
        Route::post('/update-inventory/{product}', 'update_inventory')->name('.update_inventory');
    });
    Route::resource('products', ProductController::class);

    Route::controller(UserController::class)->name('users')->prefix('users')->group(function () {
        Route::get('/not-verified', 'not_verified')->name('.not_verified');
    });
    Route::resource('users', UserController::class);

    Route::controller(SettingController::class)->name('settings')->prefix('.settings')-> group(function () {

    });
});

Route::middleware(['auth'])->group(function () {
    Route::controller(ProfileController::class)->name('profile')->prefix('profile')->group(function () {
        Route::get('/', 'index')->name('.index');
        Route::get('/edit', 'edit')->name('.edit');
        Route::patch('/', 'update')->name('.update');
    });
});



require __DIR__.'/auth.php';


Route::get('/test', function () {
    dd(
        \App\Models\Record::all()->first()->product
    );
});


Route::get('storage-link', function () {
    dd(\Illuminate\Support\Facades\Artisan::call('storage:link'));
});
