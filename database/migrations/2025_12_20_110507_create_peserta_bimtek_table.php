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
        Schema::create('peserta_bimtek', function (Blueprint $table) {
            $table->bigIncrements("id");
            $table->unsignedBigInteger('peserta_id');
            $table->foreign('peserta_id')->references('id')->on('users')
            ->cascadeOnDelete()
            ->cascadeOnUpdate();
            $table->unsignedBigInteger('bimtek_id');
            $table->foreign('bimtek_id')->references('id')->on('bimtek')
            ->cascadeOnDelete()
            ->cascadeOnUpdate();
            $table->datetime('pretest_selesai_at')->nullable();
            $table->datetime('materi_selesai_at')->nullable();
            $table->datetime('posttest_selesai_at')->nullable();
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
        Schema::dropIfExists('peserta_bimtek');
    }
};
