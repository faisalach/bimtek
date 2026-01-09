<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Settings;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        Settings::firstOrCreate(
            [
                'key' => "app_name",
                'value' => "BBP3KP Bimtek",
            ]
        );

    	User::firstOrCreate(
    		[
    			'role' => 3,
    			'name' => "Super Admin",
    			'email' => "superadmin1@gmail.com",
    			'no_telp' => "081212345678",
    			'password' => 'admin123',
    		]
    	);
    	User::firstOrCreate(
    		[
    			'role' => 1,
    			'name' => "Admin",
    			'email' => "admin1@gmail.com",
    			'no_telp' => "081212347890",
    			'password' => 'admin123',
    			'created_by' => "1"
    		]
    	);

    	for ($i=1; $i <= 5; $i++) { 
    		User::firstOrCreate(
    			[
    				'role' => 2,
    				'name' => "Peserta $i",
    				'email' => "peserta$i@gmail.com",
    				'no_telp' => "08121234123$i",
    				'password' => 'peserta123',
    				'created_by' => "1"
    			]
    		);
    	}


    }
}
