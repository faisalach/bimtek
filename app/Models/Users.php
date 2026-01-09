<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Users extends Model
{
    use SoftDeletes;
    //
    public function bimtek(): HasMany
    {
        return $this->hasMany(Bimtek::class,"created_by");
    }
    public function hasilTest(): HasMany
    {
        return $this->hasMany(HasilTest::class,"created_by");
    }
    public function jawaban(): HasMany
    {
        return $this->hasMany(Jawaban::class,"created_by");
    }
    public function paketSoal(): HasMany
    {
        return $this->hasMany(PaketSoal::class,"created_by");
    }
    public function pilihanJawaban(): HasMany
    {
        return $this->hasMany(PilihanJawaban::class,"created_by");
    }
    public function soal(): HasMany
    {
        return $this->hasMany(Soal::class,"created_by");
    }
    public function pesertaBimtek(): HasMany
    {
        return $this->hasMany(pesertaBimtek::class,"user_id");
    }
    public function userPesertaBimtek(): HasMany
    {
        return $this->hasMany(pesertaBimtek::class,"created_by");
    }
}
