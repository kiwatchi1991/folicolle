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
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Auth::routes();
Route::post('/login', 'Auth\Api\LoginController@login')->name('api.login');
Route::get('/auth2', 'SessionController@auth2')->name('auth');
Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('/auth', 'SessionController@auth')->name('auth');
});
