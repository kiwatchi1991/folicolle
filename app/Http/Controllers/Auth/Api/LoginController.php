<?php

namespace App\Http\Controllers\Auth\Api;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    use AuthenticatesUsers;

    /**
     * Handle a login request to the application.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response|\Illuminate\Http\JsonResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function login(Request $request)
    {
        Log::debug('loginController');
        Log::debug('request');
        Log::debug($request);
        // バリデーション
        $this->validateLogin($request);

        // ユーザーの取得
        $user = User::where('email', $request->email)->first();
        Log::debug('user');
        Log::debug($user);

        // 取得できない場合、パスワードが不一致の場合エラー
        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => [__('failed')],
            ]);
        }

        // tokenの作成
        $token = $user->createToken($request->email)->plainTextToken;
        Log::debug('token');
        Log::debug($token);
        return response()->json(['token' => $token, 'user' => $user], 200);
    }

    /**
     * Validate the user login request.
     *
     * @param \Illuminate\Http\Request $request
     * @return void
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    protected function validateLogin(Request $request)
    {
        // オーバーライドして、デバイス名を必須化しています
        $request->validate([
            $this->username() => 'required|string',
            'password' => 'required|string',
        ]);
    }

    // ★ メソッド追加
    // protected function authenticated(Request $request, $user)
    // {
    //     return $user;
    // }


    /**
     * Handle a logout request to the application.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response|\Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        // ユーザーの取得
        $user = Auth::user();
        $user->tokens()->delete();
        return response()->json(['message' => 'Logged out'], 200);
    }

    protected function loggedOut(Request $request)
    {
        // セッションを再生成する
        $request->session()->regenerate();

        return response()->json("ログアウト");
    }
}
