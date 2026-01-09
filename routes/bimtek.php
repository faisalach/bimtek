<?php

use App\Http\Controllers\BimtekController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth'])->group(function () {
	Route::middleware(['role:1,3'])->group(function () {
		Route::redirect('bimtek', '/bimtek');
		Route::get('bimtek', [BimtekController::class, 'show'])->name('bimtek.show');
		Route::get('bimtek/get_data', [BimtekController::class, 'get_data'])->name('bimtek.getData');
		Route::get('bimtek/add', [BimtekController::class, 'add'])->name('bimtek.add');
		Route::post('bimtek/add', [BimtekController::class, 'store'])->name('bimtek.store');
		Route::get('bimtek/{id}/update', [BimtekController::class, 'edit'])->name('bimtek.edit');
		Route::patch('bimtek/{id}/update', [BimtekController::class, 'update'])->name('bimtek.update');
		Route::delete('bimtek/{id}/destroy', [BimtekController::class, 'destroy'])->name('bimtek.destroy');
	});
	Route::middleware(['role:2'])->group(function () {
		Route::post('bimtek/kode_reff', [BimtekController::class, 'kode_reff'])->name('bimtek.kode_reff');
	});
});


