<?php

namespace App\Http\Requests\Settings;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        if ($this->user()->role == 2) {
            return [
                'no_telp' => ['required', 'string', 'digits_between:10,13', 'numeric',Rule::unique(User::class)->ignore($this->user()->id)],
                'name' => ['required', 'string', 'max:255'],
                'email' => [
                    'required',
                    'string',
                    'lowercase',
                    'email',
                    'max:255',
                    Rule::unique(User::class)->ignore($this->user()->id),
                ],
                'instansi' => ['required', 'string'],
            ];
        }else{
            return [
                'no_telp' => ['required', 'string', 'digits_between:10,13', 'numeric'],
                'name' => ['required', 'string', 'max:255'],
                'email' => [
                    'required',
                    'string',
                    'lowercase',
                    'email',
                    'max:255',
                ],
                'instansi' => ['required', 'string'],
            ];
        }
    }
}
