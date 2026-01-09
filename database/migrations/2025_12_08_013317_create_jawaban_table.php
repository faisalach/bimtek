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
        Schema::create('jawaban', function (Blueprint $table) {
            $table->bigIncrements("id");
            $table->unsignedBigInteger('soal_id');
            $table->foreign('soal_id')->references('id')->on('soal')
            ->cascadeOnDelete()
            ->cascadeOnUpdate();
            $table->unsignedBigInteger('pilihan_id')->nullable();
            $table->foreign('pilihan_id')->references('id')->on('pilihan_jawaban')
            ->cascadeOnDelete()
            ->cascadeOnUpdate();
            $table->longText('jawaban_text');
            $table->integer('nilai');
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
        Schema::dropIfExists('jawaban');
    }
};
