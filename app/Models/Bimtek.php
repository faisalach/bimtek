<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Bimtek extends Model
{
    use SoftDeletes;
    public $table = "bimtek";
    //
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }
    public function assesment(): belongsTo
    {
        return $this->belongsTo(Assesment::class,"assesment_id","id");
    }
    public function pesertaBimtek(): HasMany
    {
        return $this->hasMany(PesertaBimtek::class,"bimtek_id");
    }
}
