<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AccessoryGroupCheck
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param \Closure(Request): (Response) $next
     * @return Response
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user()->reached_limit('accessory'))
            return redirect()->route('settings.off_limits');

        elseif ($request->user()->out_of_schedule())
            return redirect()->route('settings.out_of_schedule');

        return $next($request);
    }
}
