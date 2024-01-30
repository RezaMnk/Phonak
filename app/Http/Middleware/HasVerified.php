<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class HasVerified
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (! Auth::user()->has_address()) {
            return redirect()->route('addresses');
        }

        elseif (! Auth::user()->has_info()) {
            return redirect()->route('info');
        }

        elseif (! Auth::user()->verified()) {
            return redirect()->route('wait_for_verify');
        }

        elseif (is_null(Auth::user()->address->home_state)) {
            return redirect()->route('profile.edit')->with('warning_message', 'لطفا اطلاعات استان و شهر خود را بروزرسانی نمایید.');
        }

        return $next($request);
    }
}
