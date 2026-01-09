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
        Schema::create('paket_soal', function (Blueprint $table) {
			$table->bigIncrements("id");
            $table->unsignedBigInteger('assesment_id');
            $table->foreign('assesment_id')->references('id')->on('assesment')
            ->cascadeOnDelete()
            ->cascadeOnUpdate();
            $table->enum('jenis_test',["pretest","posttest"]);
            $table->integer('jumlah_soal')->default(0);
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
        Schema::dropIfExists('paket_soal');
    }
};
