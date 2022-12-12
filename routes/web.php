<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::domain('https://crm.kniga-knig-dev.info')->group(function () {
    Route::view('/{path?}', 'crm')->where('path', '.*');

});

Route::view('/{path?}', 'app')->where('path', '.*');

