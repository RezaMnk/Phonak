<?php

namespace App\Http\Controllers;

use App\Models\GroupSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): \Inertia\Response
    {
        return Inertia::render('Settings/Index', [
            'settings' => GroupSetting::query()->latest()->paginate()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): \Inertia\Response
    {
        return Inertia::render('Settings/CreateOrEdit');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function off_limits(): \Inertia\Response|\Illuminate\Http\RedirectResponse
    {
        if (! Auth::user()->reached_limit())
            return redirect()->route('records.create');

        return Inertia::render('Settings/OffLimits', [
            'limit' => Auth::user()->setting->max_order
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function out_of_schedule(): \Inertia\Response|\Illuminate\Http\RedirectResponse
    {
        if (! Auth::user()->out_of_schedule())
            return redirect()->route('records.create');

        return Inertia::render('Settings/OutOfSchedule', [
            'start_time' => Auth::user()->setting->start_time_readable,
            'end_time' => Auth::user()->setting->end_time_readable
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'group' => ['required', 'numeric', 'min:1'],
            'max_order' => ['required', 'min:0'],
            'start_time' => ['required', 'date_format:Y-m-d\TH:i'],
            'end_time' => ['required', 'date_format:Y-m-d\TH:i', 'after:start_time'],
        ]);

        $validated['start_time'] = Carbon::createFromFormat('Y-m-d\TH:i', $validated['start_time']);
        $validated['end_time'] = Carbon::createFromFormat('Y-m-d\TH:i', $validated['end_time']);


        if (GroupSetting::where('group', $request->group)->exists())
            return back()->withErrors(['group' => 'برای این گروه از قبل تنظیمات اعمال شده است']);

        GroupSetting::create($validated);

        return redirect()->route('settings.index')->with('toast', ['success' => 'تنظیمات گروه با موفقیت ثبت گردید']);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(GroupSetting $setting): \Inertia\Response
    {
        return Inertia::render('Settings/CreateOrEdit', [
            'setting' => $setting,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, GroupSetting $setting)
    {
        $validated = $request->validate([
            'group' => ['required', 'numeric', 'min:1'],
            'max_order' => ['required', 'min:0'],
            'start_time' => ['required', 'date_format:Y-m-d\TH:i'],
            'end_time' => ['required', 'date_format:Y-m-d\TH:i', 'after:start_time'],
        ]);

        $validated['start_time'] = Carbon::createFromFormat('Y-m-d\TH:i', $validated['start_time']);
        $validated['end_time'] = Carbon::createFromFormat('Y-m-d\TH:i', $validated['end_time']);

        if (GroupSetting::where('group', $request->group)->whereNot('id', $setting->id)->exists())
            return back()->withErrors(['group' => 'برای این گروه از قبل تنظیمات اعمال شده است']);

        $setting->fill($validated)->save();

        return redirect()->route('settings.index')->with('toast', ['success' => 'تنظیم گروه بندی با موفقیت ویرایش شد']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GroupSetting $setting): \Illuminate\Http\RedirectResponse
    {
        $setting->delete();

        return back()->with('toast', ['success' => 'تنظیم با موفقیت حذف گردید']);
    }
}
