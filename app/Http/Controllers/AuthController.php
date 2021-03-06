<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function authConfirm()
    {
        if (Auth::check()) {
            $response = Auth::user();
        } else {
            $response = null;
        }
        return response()->json(['user' => $response]);
    }
}
