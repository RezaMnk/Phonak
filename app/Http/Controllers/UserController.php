<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): \Inertia\Response
    {
        return Inertia::render('Users/Index', [
            'users' => User::query()->where('role', 'user')->latest()->paginate()
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function not_verified(): \Inertia\Response
    {
        return Inertia::render('Users/Index', [
            'users' => User::query()->where('role', 'user')->where('verified', '0')->latest()->paginate()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user): \Inertia\Response
    {
        return Inertia::render('Users/Edit', [
            'user' => $user,
            'user.info' => $user->user_info,
            'user.address' => $user->address,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user): \Illuminate\Http\RedirectResponse
    {
        $request->validate([
            'role' => ['required', 'string', 'max:255'],
            'group' => ['required', 'numeric', 'min:0'],
            'verified' => ['required', 'in:true,false'],
            'password' => ['nullable', 'string', 'max:255'],
            'confirm_password' => ['required_with:password', 'same:password'],
        ]);

        $user->update([
            'role' => $request->role,
            'verified' => $request->verified == 'true',
            'password' => $request->password,
            'group' => $request->group,
        ]);

        return back()->with('toast', ['success' => 'اطلاعات همکار با موفقیت ویرایش شدند']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user): \Illuminate\Http\RedirectResponse
    {
        $user->delete();

        return back()->with('toast', ['success' => 'همکار با موفقیت حذف گردید']);
    }
}
