<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

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
Route::post('/register', 'Auth\RegisterController@register')->name('register');
Route::post('/login', 'Auth\LoginController@login')->name('login');
Route::post('/logout', 'Auth\LoginController@logout')->name('logout');


Route::get('/auth', 'AuthController@authConfirm')->name('auth');

Route::group(['middleware' => 'auth:sanctum'], function () {
});

Route::prefix('products')->name('products.')->group(function () {
    Route::get('/', 'ProductController@index')->name('index');
    Route::get('/{id}', 'ProductController@show')->name('show');
});
