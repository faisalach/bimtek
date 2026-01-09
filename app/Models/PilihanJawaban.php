<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class PilihanJawaban extends Model
{
    use SoftDeletes;
    public $table   = "pilihan_jawaban";
    //
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }
    public function soal(): BelongsTo
    {
        return $this->belongsTo(Soal::class, 'soal_id', 'id');
    }
    public function jawaban(): HasMany
    {
        return $this->hasMany(Jawaban::class,"pilihan_id");
    }
}
