<?php

use App\Http\Controllers\AccessoryController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\PaymentController;
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
    return Inertia::render('Welcome');
})->name('home');

Route::get('/terms', function () {
    return Inertia::render('Terms');
})->name('terms');

Route::middleware(['auth', 'auth.verified'])->group(function () {

    Route::controller(DashboardController::class)->name('dashboard')->prefix('dashboard')->group(function () {
        Route::get('/', 'user_index');
        Route::post('/download', 'download')->name('.download');
    });

    Route::resource('patients', PatientController::class);

    Route::controller(RecordController::class)->name('records')->prefix('records')->group(function () {
        Route::post('/check-national-code', 'check_national_code')->name('.check_national_code');
        Route::post('/products', 'get_products')->name('.products');

        Route::post('/store-aid-type/{record}', 'store_aid_type')->name('.store_aid_type');
        Route::post('/store-aid/{record}', 'store_aid')->name('.store_aid');
        Route::post('/store-audiogram/{record}', 'store_audiogram')->name('.store_audiogram');
        Route::post('/store-shipping/{record}', 'store_shipping')->name('.store_shipping');

        Route::get('/download/{record}/{name}/{archive?}', 'download')->name('.download');

        Route::get('/pay/{record}', 'pay')->name('.pay');
    });
    Route::resource('records', RecordController::class);

    Route::controller(AccessoryController::class)->name('accessories')->prefix('accessories')->group(function () {
        Route::post('/products', 'get_products')->name('.products');

        Route::post('/store-shipping/{accessory}', 'store_shipping')->name('.store_shipping');

        Route::get('/pay/{accessory}', 'pay')->name('.pay');
    });
    Route::resource('accessories', AccessoryController::class);

//    Route::controller(PatientController::class)->name('patients')->prefix('patients')->group(function () {
//        Route::get('/', 'index');
//        Route::get('/{patient}/edit', 'edit')->name('.edit');
//        Route::patch('/{patient}', 'update')->name('.update');
//        Route::delete('/{patient}', 'destroy')->name('.destroy');
//    });

    Route::controller(SettingController::class)->name('settings')->group(function () {
        Route::get('/off-limits', 'off_limits')->name('.off_limits');
        Route::get('/out-of-schedule', 'out_of_schedule')->name('.out_of_schedule');
    });

    Route::controller(PaymentController::class)->name('payments')->prefix('payments')->group(function () {
        Route::get('verify-record/{record}', 'verify_record')->name('.verify_record');
        Route::get('verify-accessory/{accessory}', 'verify_accessory')->name('.verify_accessory');
    });
});

Route::middleware(['auth', 'auth.is_admin'])->group(function () {
    Route::controller(DashboardController::class)->name('dashboard')->prefix('dashboard')->group(function () {
        Route::get('/admin', 'admin_index')->name('.admin');
    });

    Route::controller(ProductController::class)->name('products')->prefix('products')->group(function () {
        Route::post('/update-inventory/{product}', 'update_inventory')->name('.update_inventory');
    });
    Route::resource('products', ProductController::class);

    Route::controller(UserController::class)->name('users')->prefix('users')->group(function () {
        Route::get('/not-verified', 'not_verified')->name('.not_verified');
        Route::get('/download/{user}/{name}', 'download')->name('.download');
        Route::post('/disapprove/{user}', 'disapprove')->name('.disapprove');

        Route::post('/search', 'search')->name('.search');
    });
    Route::resource('users', UserController::class);

//    Route::controller(SettingController::class)->name('settings')->prefix('settings')-> group(function () {
//        Route::get('/', 'index')->name('.index');
//    });
    Route::resource('settings', SettingController::class);


    Route::controller(AdminController::class)->name('admin')->prefix('admin')->group(function () {
        Route::get('/records', 'records')->name('.records');
        Route::get('/accessories', 'accessories')->name('.accessories');

        Route::get('/approve-record/{record}', 'approve_record')->name('.approve_record');
        Route::get('/approve-accessory/{accessory}', 'approve_accessory')->name('.approve_accessory');

        Route::get('/download-record/{record}', 'download_record')->name('.download_record');
        Route::get('/download-accessory/{accessory}', 'download_accessory')->name('.download_accessory');
    });
});

Route::middleware(['auth'])->group(function () {
    Route::controller(ProfileController::class)->name('profile')->prefix('profile')->group(function () {
        Route::get('/', 'index')->name('.index');
        Route::get('/edit', 'edit')->name('.edit');
        Route::post('/', 'update')->name('.update');
    });
});



require __DIR__.'/auth.php';


Route::prefix('admin-fklhf83')->group(function () {
//    Route::get('/import', function () {
//        \Maatwebsite\Excel\Facades\Excel::import(new \App\Imports\ImportUser,
//            \Illuminate\Support\Facades\Storage::path('public/excel.xlsx'));
//    });


    Route::get('storage-link', function () {
        dd(\Illuminate\Support\Facades\Artisan::call('storage:link'));
    });
});

Route::get('test', function () {
    auth()->loginUsingId(185);
});
