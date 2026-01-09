<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SoalRequest extends FormRequest
{
	public function rules(FormRequest $request): array
	{
		$rules	= [
			'teks_soal' 	=> ['required'],
			'tipe_jawaban' 	=> ['required',"numeric"],
			'bobot' 		=> ['required',"numeric"],
			'urutan' 		=> ['required',"numeric"]
		];

		switch ($request->tipe_jawaban) {
			case '1':
			case '2':
				$rules 	= array_merge($rules,[
					"teks_pilihan"	=> ["required"],
					"is_benar"		=> ["required","numeric"],
				]);
			break;
			case '3':
				$rules 	= array_merge($rules,[
					"kunci_jawaban"	=> ["required"],
				]);
			break;
		}

		return $rules;
	}
}
