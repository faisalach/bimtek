<?php

use App\Http\Controllers\AssesmentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'role:1,3'])->group(function () {
    Route::redirect('assesment', '/assesment');

    Route::get('assesment', [AssesmentController::class, 'show'])->name('assesment.show');
    Route::get('assesment/get_data', [AssesmentController::class, 'get_data'])->name('assesment.getData');
    Route::get('assesment/add', [AssesmentController::class, 'add'])->name('assesment.add');
    Route::post('assesment/add', [AssesmentController::class, 'store'])->name('assesment.store');
    Route::get('assesment/{id}/update', [AssesmentController::class, 'edit'])->name('assesment.edit');
    Route::patch('assesment/{id}/update', [AssesmentController::class, 'update'])->name('assesment.update');
    Route::patch('assesment/{id}/update/jumlah_soal', [AssesmentController::class, 'update_jumlah_soal'])->name('assesment.update_jumlah_soal');
    Route::patch('assesment/{id}/update/durasi', [AssesmentController::class, 'update_durasi'])->name('assesment.update_durasi');
    Route::delete('assesment/{id}/destroy', [AssesmentController::class, 'destroy'])->name('assesment.destroy');
});
