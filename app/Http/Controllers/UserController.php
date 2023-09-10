<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): \Inertia\Response
    {
        $request->validate([
            'search' => ['nullable', 'string']
        ]);


        return Inertia::render('Users/Index', [
            'users' => User::query()->whereHas('user_info')->whereHas('address')->where('role', 'user')->where(function ($query) use ($request) {
            if ($request->has('search'))
                $query->where('name', 'LIKE', '%'. $request->search .'%')
                    ->orWhere('med_number' , 'LIKE', '%'. $request->search .'%');
        })->whereHas('user_info')->latest()->paginate()->onEachSide(0),
            'users.status' => 'all'
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function not_verified(Request $request): \Inertia\Response
    {
        $request->validate([
            'search' => ['nullable', 'string']
        ]);


        return Inertia::render('Users/Index', [
            'users' => User::query()->whereHas('user_info')->whereHas('address')->where('role', 'user')->where(function ($query) use ($request) {
            if ($request->has('search'))
                $query->where('name', 'LIKE', '%'. $request->search .'%')
                    ->orWhere('med_number' , 'LIKE', '%'. $request->search .'%');
        })->whereNot('status', 'approved')->latest()->paginate(),
            'users.status' => 'unapproved'
        ]);
    }

    public function search(Request $request): \Illuminate\Http\JsonResponse
    {
        $request->validate([
            'search' => ['required', 'string'],
            'status' => ['required', 'in:all,unapproved'],
        ]);

        $users = User::query()->where('role', 'user')->where(function ($query) use ($request) {
            if ($request->status == 'unapproved')
                $query->whereNot('status', 'approved');
        })->where('name', 'LIKE', '%'. $request->search .'%')->whereHas('user_info')->latest()->paginate()->onEachSide(0);

        return response()->json(['users' => $users]);
    }


    public function download(User $user, String $name)
    {
        $files = [
            'id' => ['name' => $user->name .'-id.jpg', 'file' => 'id_card.jpg'],
            'med_card' => ['name' => $user->name .'-med_card.jpg', 'file' => 'license.jpg'],
            'license' => ['name' => $user->name .'-license.jpg', 'file' => 'med_card.jpg'],
        ];
        if (! in_array($name, array_keys($files)))
            return back()->with('toast', ['error' => 'مدرک یافت نشد']);

        $headers = array(
            'Content-Type: image/jpg',
        );

        $file = $user->id. '/' .$files[$name]['file'];

        if (Storage::disk('users')->exists($file))
            return Response::download('storage/users/'.$file, $files[$name]['name'], $headers);
        else
            return false;
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
            'status' => ['required', 'in:approved,unapproved,waiting'],
            'password' => ['nullable', 'string', 'max:255'],
            'confirm_password' => ['required_with:password', 'same:password'],
        ]);

        $data = [
            'role' => $request->role,
            'status' => $request->status,
            'group' => $request->group,
        ];

        if ($request->password)
            $data['password'] = $request->password;

        $user->update($data);

        return back()->with('toast', ['success' => 'اطلاعات همکار با موفقیت ویرایش شدند']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function disapprove(Request $request, User $user): \Illuminate\Http\RedirectResponse
    {
        $request->validate([
            'disapprove' => ['required', 'string']
        ]);

        $user->status = 'unapproved';
        $user->disapprove = $request->disapprove;
        $user->save();

        return back()->with('toast', ['success' => 'عدم تایید همکار با موفقیت ثبت گردید']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
//        $user->delete();
//
//        return back()->with('toast', ['success' => 'همکار با موفقیت حذف گردید']);
    }
}
