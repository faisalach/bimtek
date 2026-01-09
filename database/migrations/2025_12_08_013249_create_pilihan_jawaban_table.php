<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pilihan_jawaban', function (Blueprint $table) {
            $table->bigIncrements("id");
            $table->unsignedBigInteger('soal_id');
            $table->foreign('soal_id')->references('id')->on('soal')
            ->cascadeOnDelete()
            ->cascadeOnUpdate();
            $table->longText('teks_pilihan');
            $table->integer('is_benar'); // 1- Benar, 0- Salah
            $table->unsignedBigInteger('created_by');
            $table->foreign('created_by')->references('id')->on('users')
            ->cascadeOnDelete()
            ->cascadeOnUpdate();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pilihan_jawaban');
    }
};
