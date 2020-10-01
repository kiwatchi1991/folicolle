<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assignedß the "api" middleware group. Enjoy building your API!
|
*/

Auth::routes();

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/login', 'Auth\Api\LoginController@login')->name('login');
Route::post('/register', 'Auth\Api\RegisterController@register')->name('register');

Route::get('/auth2', 'SessionController@auth2')->name('auth');
Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::post('/logout', 'Auth\Api\LoginController@logout')->name('logout');
    Route::get('/auth', 'SessionController@auth')->name('auth');
});
