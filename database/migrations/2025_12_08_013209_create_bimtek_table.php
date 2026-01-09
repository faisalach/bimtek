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
        Schema::create('bimtek', function (Blueprint $table) {
            $table->bigIncrements("id");
            $table->unsignedBigInteger('assesment_id');
            $table->foreign('assesment_id')->references('id')->on('assesment')
            ->cascadeOnDelete()
            ->cascadeOnUpdate();
            $table->string('nama_bimtek');
            $table->longText('deskripsi');
            $table->datetime('tanggal_mulai');
            $table->datetime('tanggal_selesai');
            $table->string('kode_reff');
            $table->integer('status_soal_pretest')->default(0);
            $table->integer('status_soal_posttest')->default(0);
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
        Schema::dropIfExists('bimtek');
    }
};
