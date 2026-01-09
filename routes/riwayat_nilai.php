<?php

use App\Http\Controllers\RiwayatNilaiController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth'])->group(function () {
	Route::get('riwayat_nilai/get_data', [RiwayatNilaiController::class, 'get_data'])->name('riwayat_nilai.getData');
	Route::get('riwayat_nilai/{user_id?}', [RiwayatNilaiController::class, 'show'])->name('riwayat_nilai.show');
});