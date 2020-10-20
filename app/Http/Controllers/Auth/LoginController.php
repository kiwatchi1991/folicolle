<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Socialite;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (Auth::attempt($credentials)) {
            return response()->json(Auth::user());
        }

        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect'],
        ]);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        return response()->json("logout");
    }

    /**
     * OAuth認証先にリダイレクト
     *
     * @param str $provider
     * @return \Illuminate\Http\Response
     */
    public function redirectToProvider($provider)
    {
        Log::debug('redirectToProvider');
        Log::debug('provider');
        Log::debug($provider);
        Log::debug(Socialite::driver($provider)->redirect());
        return Socialite::driver($provider)->redirect()->getTargetUrl();
    }
    
    /**
     * OAuth認証の結果受け取り
     *
     * @param str $provider
     * @return \Illuminate\Http\Response
     */
    public function handleProviderCallback($provider)
    {
        Log::debug('handleProviderCallback');
        try {
            Log::debug('try');
            $providerUser = \Socialite::with($provider)->user();
        } catch (\Exception $e) {
            Log::debug('catch');
            return redirect('/login')->with('oauth_error', '予期せぬエラーが発生しました');
        }
        
        if ($email = $providerUser->getEmail()) {
            Log::debug('ifの中');
            Auth::login(User::firstOrCreate([
                'email' => $email
            ], [
                'name' => $providerUser->getName()
                ]));
                
                Log::debug('ログイン後');
            return response()->json(Auth::user());
        } else {
            return response()->json('oauth_error');
        }
    }
}
