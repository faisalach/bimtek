<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return redirect('/login');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', [App\Http\Controllers\DashboardController::class,"dashboard"])->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/bimtek.php';
require __DIR__.'/users.php';
require __DIR__.'/riwayat_nilai.php';
require __DIR__.'/assesment.php';
require __DIR__.'/soal.php';
