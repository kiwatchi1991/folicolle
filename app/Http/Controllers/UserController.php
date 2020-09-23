<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class UserController extends Controller
{
    use Notifiable;

    /* 省略 */

    /**
     * JWT の subject claim となる識別子を取得する
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * キーバリュー値を返します, JWTに追加される custom claims を含む
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
}
