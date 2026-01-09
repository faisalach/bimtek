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
        Schema::table('peserta_bimtek', function (Blueprint $table) {
            $table->datetime('pretest_mulai_at')->nullable()->after("bimtek_id");
            $table->datetime('posttest_mulai_at')->nullable()->after("pretest_mulai_at");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('peserta_bimtek', function (Blueprint $table) {
            $table->dropColumn('pretest_mulai_at');
            $table->dropColumn('posttest_mulai_at');
        });
    }
};
