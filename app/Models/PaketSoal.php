<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class PaketSoal extends Model
{
    use SoftDeletes;
    public $table = "paket_soal";
    //
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }
    public function assesment(): BelongsTo
    {
        return $this->belongsTo(Assesment::class, 'assesment_id', 'id');
    }
    public function soal(): HasMany
    {
        return $this->hasMany(Soal::class,"paket_id");
    }
    public function hasilTest(): HasMany
    {
        return $this->hasMany(HasilTest::class,"paket_id");
    }
}
