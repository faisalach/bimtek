<?php

use App\Http\Controllers\SoalController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth'])->group(function () {
	Route::redirect('soal', '/soal');
	Route::middleware(['role:1,3'])->group(function () {
		Route::get('soal/{paket_id}', [SoalController::class, 'show'])->name('soal.show');
		Route::post('soal/{paket_id}/store', [SoalController::class, 'store'])->name('soal.store');
		Route::post('soal/upload', [SoalController::class, 'upload'])->name('soal.upload');
	});
	Route::middleware(['role:2'])->group(function () {
		Route::get('soal/{bimtek_id}/test/{paket_id}', [SoalController::class, 'test'])->name('soal.test');
		Route::post('soal/{bimtek_id}/store_test/{paket_id}', [SoalController::class, 'store_test'])->name('soal.store_test');
		Route::post('soal/{bimtek_id}/finish/{paket_id}', [SoalController::class, 'finish'])->name('soal.finish');
	});
});


