<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Assesment extends Model
{
    use SoftDeletes;
    
    public $table = "assesment";
    public function paketSoal(): HasMany
    {
        return $this->hasMany(PaketSoal::class,"assesment_id");
    }
    public function bimtek(): HasMany
    {
        return $this->hasMany(Bimtek::class,"assesment_id");
    }
}
