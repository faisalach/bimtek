<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Soal extends Model
{
    use SoftDeletes;
    public $table   = "soal";
    //
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }
    public function paketSoal(): BelongsTo
    {
        return $this->belongsTo(PaketSoal::class, 'paket_id', 'id');
    }
    public function pilihanJawaban(): HasMany
    {
        return $this->hasMany(PilihanJawaban::class,"soal_id");
    }
    public function jawaban(): HasOne
    {
        return $this->hasOne(Jawaban::class,"soal_id");
    }
}
