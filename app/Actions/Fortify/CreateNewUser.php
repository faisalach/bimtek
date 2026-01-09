    <?php

namespace App\Actions\Fortify;

use App\Models\User;
use App\Models\Bimtek;
use App\Models\PesertaBimtek;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
	use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
    	Validator::make($input, [
    		'no_telp' => ['required', 'string', 'digits_between:10,13',Rule::unique(User::class)],
    		'name' => ['required', 'string', 'max:255'],
    		'email' => [
    			'required',
    			'string',
    			'email',
    			'max:255',
    			Rule::unique(User::class),
    		],
    		'instansi' => ['required', 'string'],
    		'kode_reff' => ['required', 'string',Rule::exists('bimtek', 'kode_reff')],
    		'password' => $this->passwordRules(),
    	])->validate();

    	$user = User::create([
    		'name' => $input['name'],
            'email' => $input['email'],
    		'password' => $input['password'],
    		'no_telp' => $input['no_telp'],
    		'instansi' => $input['instansi'],
    		'kode_reff' => $input['kode_reff'],
    	]);

    	if (!empty($user->id)) {
    		$bimtek 	= Bimtek::where("kode_reff",$input["kode_reff"])->first();
    		if (!empty($bimtek)) {
    			$peserta 	= new PesertaBimtek;
    			$peserta->peserta_id 	= $user->id;
    			$peserta->bimtek_id 	= $bimtek->id;
				$peserta->created_by	= $user->id;
    			$peserta->save();
    		}
    	}

    	return $user;
    }
}
