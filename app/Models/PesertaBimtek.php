<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class PesertaBimtek extends Model
{
    use SoftDeletes;
    public $table   = "peserta_bimtek";
    //
    public function peserta(): BelongsTo
    {
        return $this->belongsTo(User::class, 'peserta_id', 'id');
    }
    public function bimtek(): BelongsTo
    {
        return $this->belongsTo(Bimtek::class, 'bimtek_id', 'id');
    }
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }
}
