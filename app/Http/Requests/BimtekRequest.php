<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BimtekRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nama_bimtek' => ['required', 'string'],
            'deskripsi' => ['required', 'string'],
            'assesment_id' => ['required', 'string'],
            'tanggal_mulai' => ['required', 'date', 'before_or_equal:tanggal_selesai'],
            'tanggal_selesai' => ['required', 'date', 'after_or_equal:tanggal_mulai'],
            'kode_reff' => ['required', 'string'],
            'status_soal_pretest' => ['required','numeric'],
            'status_soal_posttest' => ['required','numeric'],
        ];
    }
}
