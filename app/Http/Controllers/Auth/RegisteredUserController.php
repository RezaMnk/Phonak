<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Address;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'national_code' => ['required', 'numeric', 'digits:10', 'unique:users'],
            'grad_year' => ['required', 'integer', 'digits:4', 'between:1300,'. jdate()->getYear()],
            'med_number' => ['required', 'numeric', 'max_digits:6'],
            'grade' => ['required', 'string'],
            'university' => ['required', 'string', 'max:255'],
        ]);

        $user = User::create($request->all());

//        event(new Registered($user));

        Auth::login($user);

        return redirect()->route('addresses');
    }

    /**
     * Display the addresses view.
     */
    public function addresses(): Response
    {
        return Inertia::render('Auth/Address');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function storeAddress(Request $request): RedirectResponse
    {
        $request->validate([
            'home_address' => ['required', 'string', 'max:255'],
            'home_post_code' => ['required', 'numeric', 'digits:10'],
            'home_phone' => ['required', 'numeric', 'digits:11'],
            'work_address' => ['required', 'string', 'max:255'],
            'work_post_code' => ['required', 'numeric', 'digits:10'],
            'work_phone' => ['required', 'numeric', 'digits:11'],
            'has_second' => ['boolean'],
            'mail_address' => ['required', 'in:home,work,second_work'],
        ]);

        $only = $request->only([
            'home_address',
            'home_post_code',
            'home_phone',
            'work_address',
            'work_post_code',
            'work_phone',
            'mail_address',
        ]);

        if ($request->has_second) {
            $request->validate([
                'second_work_address' => ['required', 'string', 'max:255'],
                'second_work_post_code' => ['required', 'numeric', 'digits:10'],
                'second_work_phone' => ['required', 'numeric', 'digits:11'],
            ]);

            $only = [...$only, ...$request->only(['second_work_address', 'second_work_post_code', 'second_work_phone'])];
        }

        Auth::user()->address()->create($only);

        return redirect(RouteServiceProvider::HOME);
    }
}
