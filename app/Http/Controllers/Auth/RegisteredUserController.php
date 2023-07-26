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
use Illuminate\Support\Facades\Storage;
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
            'med_number' => ['required', 'numeric', 'max_digits:6', 'unique:users'],
            'grade' => ['required', 'string'],
            'state' => ['required', 'string'],
            'city' => ['required', 'string'],
            'university' => ['required', 'string', 'max:255'],
        ]);

        $data = [...$request->all(), 'password' => $request->national_code];

        $user = User::create($data);

//        event(new Registered($user));

        Auth::login($user);

        return redirect()->route('addresses');
    }

    /**
     * Display the addresses view.
     */
    public function addresses(): RedirectResponse|Response
    {
        if (Auth::user()->has_address())
            return redirect()->route('dashboard');

        elseif (Auth::user()->has_info())
            return redirect()->route('dashboard');

        return Inertia::render('Auth/Address');
    }

    /**
     * Display the info view.
     */
    public function info(): RedirectResponse|Response
    {
        if (Auth::user()->has_info())
            return redirect()->route('dashboard');

        elseif (! Auth::user()->has_address())
            return redirect()->route('addresses');

        return Inertia::render('Auth/Info');
    }

    /**
     * Display the info view.
     */
    public function wait_for_verify(): RedirectResponse|Response
    {
        if (Auth::user()->verified())
            return redirect()->route('dashboard');

        return Inertia::render('Auth/WaitForVerify', [
            'user' => Auth::user()
        ]);
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
            'home_phone' => ['required', 'numeric', 'digits:11', 'regex:/(0)[1-9]{2}[0-9]{8}/'],
            'work_address' => ['required', 'string', 'max:255'],
            'work_post_code' => ['required', 'numeric', 'digits:10'],
            'work_phone' => ['required', 'numeric', 'digits:11', 'regex:/(0)[1-9]{2}[0-9]{8}/'],
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
                'second_work_phone' => ['required', 'numeric', 'digits:11', 'regex:/(0)[1-9]{2}[0-9]{8}/'],
            ]);

            $only = [...$only, ...$request->only(['second_work_address', 'second_work_post_code', 'second_work_phone'])];
        }

        Auth::user()->address()->create($only);

        return redirect(RouteServiceProvider::HOME);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function storeInfo(Request $request): RedirectResponse
    {
        $request->validate([
            'phone' => ['required', 'numeric', 'regex:/(09)[0-9]{9}/'],
            'landline' => ['required', 'numeric', 'regex:/(0)[1-9]{2}[0-9]{8}/'],
            'whatsapp_phone' => ['required', 'numeric', 'regex:/(09)[0-9]{9}/'],
            'referral_name' => ['nullable', 'string', 'max:255'],
            'referral_phone' => ['nullable', 'required_with:referral_name', 'string', 'digits:11', 'regex:/(09)[0-9]{9}/'],
            'second_referral_name' => ['nullable', 'string', 'max:255'],
            'second_referral_phone' => ['nullable', 'required_with:second_referral_name', 'string', 'digits:11', 'regex:/(09)[0-9]{9}/'],
            'history_description' => ['nullable', 'string'],
            'conditions_description' => ['nullable', 'string'],
            'id_card_image' => ['required'],
            'med_card_image' => ['required'],
            'license_image' => ['required'],
        ]);

        if ($request->second_referral_name && ! $request->referral_name)
            return back()->with(['second_referral_name' => 'اطلاعات معرف اول را تکمیل کنید']);

        $user = Auth::user();

        $only = $request->only([
            'phone',
            'landline',
            'whatsapp_phone',
            'referral_name',
            'referral_phone',
            'second_referral_name',
            'second_referral_phone',
            'history_description',
            'conditions_description',
        ]);

        $id_card_image = $request->file('id_card_image');
        $med_card_image = $request->file('med_card_image');
        $license_image = $request->file('license_image');

        $id_card_image_name = 'id_card.'. $id_card_image->getClientOriginalExtension();
        $med_card_image_name = 'med_card.'. $med_card_image->getClientOriginalExtension();
        $license_image_name = 'license.'. $license_image->getClientOriginalExtension();

        Storage::disk('users')->putFileAs($user->id, $id_card_image, $id_card_image_name);
        Storage::disk('users')->putFileAs($user->id, $med_card_image, $med_card_image_name);
        Storage::disk('users')->putFileAs($user->id, $license_image, $license_image_name);

        $only = [
            ...$only,
            'id_card_image' => $id_card_image_name,
            'med_card_image' => $med_card_image_name,
            'license_image' => $license_image_name,
            ];

        $user->user_info()->create($only);

        return redirect(RouteServiceProvider::HOME);
    }
}
