<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function index(): \Inertia\Response
    {
        return Inertia::render('Profile/Index', [
            'user' => Auth::user(),
            'user.info' => Auth::user()->user_info,
            'user.address' => Auth::user()->address,
        ]);
    }

    /**
     * Display the user's profile form.
     */
    public function edit(): \Inertia\Response
    {
        $user = Auth::user();
        if (is_null($user->state) || is_null($user->university))
        {
            $user->excel_user = true;
            $is_excel = true;
            $user->save();
        }

        return Inertia::render('Profile/Edit', [
            'user' => Auth::user(),
            'user.info' => Auth::user()->user_info,
            'user.address' => Auth::user()->address,
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(Request $request): RedirectResponse
    {
        $request->validate([
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'national_code' => ['required', 'numeric', 'digits:10', Rule::unique('users')->ignore($request->user()->id, 'id')],
            'grad_year' => ['required', 'integer', 'digits:4', 'between:1300,'. jdate()->getYear()],
            'med_number' => ['required', 'numeric', 'max_digits:6', Rule::unique('users')->ignore($request->user()->id, 'id')],
            'grade' => ['required', 'string'],
            'state' => ['required', 'string'],
            'city' => ['required', 'string'],
            'university' => ['required', 'string', 'max:255'],
            'password' => ['nullable', 'string', 'max:255'],
            'new_password' => ['nullable', 'required_with:password', 'string', 'max:255'],
            'confirm_password' => ['nullable', 'required_with:password', 'same:new_password'],

            /* Address */
            'address.home_address' => ['required', 'string', 'max:255'],
            'address.home_state' => ['required', 'string', 'max:255'],
            'address.home_city' => ['required', 'string', 'max:255'],
            'address.home_post_code' => ['required', 'numeric', 'digits:10'],
            'address.home_phone' => ['required', 'numeric', 'digits:11', 'regex:/(0)[1-9]{2}[0-9]{8}/'],
            'address.work_address' => ['required', 'string', 'max:255'],
            'address.work_state' => ['required', 'string', 'max:255'],
            'address.work_city' => ['required', 'string', 'max:255'],
            'address.work_post_code' => ['required', 'numeric', 'digits:10'],
            'address.work_phone' => ['required', 'numeric', 'digits:11', 'regex:/(0)[1-9]{2}[0-9]{8}/'],
            'address.has_second' => ['boolean'],
            'address.mail_address' => ['required', 'in:home,work,second_work'],

            /* User Info */
            'info.phone' => ['required', 'numeric', 'regex:/(09)[0-9]{9}/'],
            'info.landline' => ['required', 'numeric', 'regex:/(0)[1-9]{2}[0-9]{8}/'],
            'info.whatsapp_phone' => ['required', 'numeric', 'regex:/(09)[0-9]{9}/'],
            'info.referral_name' => ['nullable', 'string', 'max:255'],
            'info.referral_phone' => ['nullable', 'string', 'digits:11', 'regex:/(09)[0-9]{9}/'],
            'info.second_referral_name' => ['nullable', 'string', 'max:255'],
            'info.second_referral_phone' => ['nullable', 'string', 'digits:11', 'regex:/(09)[0-9]{9}/'],
            'info.history_description' => ['nullable', 'string'],
            'info.conditions_description' => ['nullable', 'string'],
        ]);

        $addressOnly = [
            'home_address' => $request->address['home_address'],
            'home_state' => $request->address['home_state'],
            'home_city' => $request->address['home_city'],
            'home_post_code' => $request->address['home_post_code'],
            'home_phone' => $request->address['home_phone'],
            'work_address' => $request->address['work_address'],
            'work_state' => $request->address['work_state'],
            'work_city' => $request->address['work_city'],
            'work_post_code' => $request->address['work_post_code'],
            'work_phone' => $request->address['work_phone'],
            'has_second' => $request->address['has_second'],
            'mail_address' => $request->address['mail_address']
        ];

        if ($request->address['has_second']) {
            $request->validate([
                'address.second_work_address' => ['required', 'string', 'max:255'],
                'address.second_work_state' => ['required', 'string', 'max:255'],
                'address.second_work_city' => ['required', 'string', 'max:255'],
                'address.second_work_post_code' => ['required', 'numeric', 'digits:10'],
                'address.second_work_phone' => ['required', 'numeric', 'digits:11', 'regex:/(0)[1-9]{2}[0-9]{8}/'],
            ]);

            $addressOnly = [
                ...$addressOnly,
                'second_work_address' => $request->address['second_work_address'],
                'second_work_state' => $request->address['second_work_state'],
                'second_work_city' => $request->address['second_work_city'],
                'second_work_post_code' => $request->address['second_work_post_code'],
                'second_work_phone' => $request->address['second_work_phone'],
            ];
        }

        $user = $request->user();

        if (! $user->excel_user)
            $request->validate([
                'info.id_card_image' => ['required'],
                'info.med_card_image' => ['required'],
                'info.license_image' => ['required'],
            ]);

        if ($request->password && (! Hash::check($request->password, $user->password)))
        {
            return back()->withErrors(['password' => trans('auth.failed')]);
        }

        elseif (! $request->password && $request->new_password)
        {
            return back()->withErrors(['password' => trans('validation.required')]);
        }

        $fill = [
            ...$request->only(['first_name', 'last_name', 'national_code', 'grad_year', 'med_number', 'grade', 'state', 'city', 'university'])
        ];

        if ($request->password)
            $fill['password'] = $request->new_password;

        $user->fill($fill);

        $user->address->fill($addressOnly);

        $user->user_info->fill([
            'phone' => $request->info['phone'],
            'landline' => $request->info['landline'],
            'whatsapp_phone' => $request->info['whatsapp_phone'],
            'referral_name' => $request->info['referral_name'],
            'referral_phone' => $request->info['referral_phone'],
            'second_referral_name' => $request->info['second_referral_name'],
            'second_referral_phone' => $request->info['second_referral_phone'],
            'history_description' => $request->info['history_description']
        ]);

//        if (! $user->isClean(['name', 'national_code', 'med_number']))
//            if ($user->role != 'admin')
//                $user->status = 'waiting';

        $user->save();

        $user->address->save();

        if ($request->hasFile('id_card_image'))
        {
            $id_card_image = $request->file('id_card_image');
            $id_card_image_name = 'id_card.'. $id_card_image->getClientOriginalExtension();
            Storage::disk('users')->putFileAs($user->id, $id_card_image, $id_card_image_name);
            $user->user_info->id_card_image = $id_card_image_name;
        }

        if ($request->hasFile('med_card_image'))
        {
            $med_card_image = $request->file('med_card_image');
            $med_card_image_name = 'med_card.'. $med_card_image->getClientOriginalExtension();
            Storage::disk('users')->putFileAs($user->id, $med_card_image, $med_card_image_name);
            $user->user_info->med_card_image = $med_card_image_name;
        }

        if ($request->hasFile('license_image')) {
            $license_image = $request->file('license_image');
            $license_image_name = 'license.' . $license_image->getClientOriginalExtension();
            Storage::disk('users')->putFileAs($user->id, $license_image, $license_image_name);
            $user->user_info->license_image = $license_image_name;
        }

        $request->user()->user_info->save();


        return redirect()->route('wait_for_verify')->with('toast', ['success' => 'اطلاعات کاربر با موفقیت ویرایش شدند']);
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
