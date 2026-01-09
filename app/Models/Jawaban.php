<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Jawaban extends Model
{
    use SoftDeletes;
    public $table   = "jawaban";
    //
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }
    public function soal(): BelongsTo
    {
        return $this->belongsTo(Soal::class, 'soal_id', 'id');
    }
    public function pilihanJawaban(): BelongsTo
    {
        return $this->belongsTo(PilihanJawaban::class, 'pilihan_id', 'id');
    }
}
