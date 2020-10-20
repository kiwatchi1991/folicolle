<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function authConfirm()
    {
        Log::debug('authConfirm');
        if (Auth::check()) {
            Log::debug('Auth::check()');
            $response = Auth::user();
        } else {
            Log::debug('null');
            $response = null;
        }
        return response()->json($response);
    }
}
