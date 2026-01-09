<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AssesmentRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nama_assesment'     => ['required',"string"],
            'jenis_bimtek'  => ['required',"numeric"],
            'bobot'         => ['required',"numeric"],
            'urutan'        => ['required',"numeric"]
        ];
    }
}
