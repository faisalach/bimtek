<?php

use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth','role:1,3'])->group(function () {
    Route::redirect('users', '/users');

    Route::get('users', [UsersController::class, 'show'])->name('users.show');
    Route::get('users/get_data', [UsersController::class, 'get_data'])->name('users.getData');
    Route::middleware(['auth','role:3'])->group(function () {
        Route::get('users/add', [UsersController::class, 'add'])->name('users.add');
        Route::post('users/add', [UsersController::class, 'store'])->name('users.store');
        Route::get('users/{id}/update', [UsersController::class, 'edit'])->name('users.edit');
        Route::patch('users/{id}/update', [UsersController::class, 'update'])->name('users.update');
        Route::delete('users/{id}/destroy', [UsersController::class, 'destroy'])->name('users.destroy');
    });
});
