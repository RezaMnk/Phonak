<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class IpMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (app()->isLocal())
            return $next($request);

        $ip = $request->ip();

        if (in_array($ip, ['128.65.176.194', '93.118.148.72', '217.114.46.130', '93.114.98.129'])) {
            return $next($request);
        }

        Auth::logout();

        abort(404);

        // return redirect(route('login'))->withErrors(['med_number' => 'دسترسی مجاز نیست!']);
    }
}
