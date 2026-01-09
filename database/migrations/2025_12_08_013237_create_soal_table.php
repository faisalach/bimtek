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
        Schema::create('soal', function (Blueprint $table) {
            $table->bigIncrements("id");
            $table->unsignedBigInteger('paket_id');
            $table->foreign('paket_id')->references('id')->on('paket_soal')
            ->cascadeOnDelete()
            ->cascadeOnUpdate();;
            $table->longText('teks_soal');
            $table->integer('tipe_jawaban'); // 1- PG, 2-Essai
            $table->longText('kunci_jawaban'); // untuk essay
            $table->integer('bobot');
            $table->integer('urutan');
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
        Schema::dropIfExists('soal');
    }
};
