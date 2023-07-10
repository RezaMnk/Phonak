<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
//         \App\Models\User::factory(10)->create();

         $user = \App\Models\User::create([
             'name' => 'رضا نداف',
             'national_code' => '0012345678',
             'grad_year' => '1380',
             'med_number' => '123456',
             'grade' => 'کارشناسی',
             'university' => 'تهران',
             'role' => 'admin',
         ]);

         $user->address()->create([
             'home_address' => 'تهران',
             'home_post_code' => '1111111111',
             'home_phone' => '02133131331',
             'work_address' => 'کرج',
             'work_post_code' => '2222222222',
             'work_phone' => '02122121221',
             'mail_address' => 'home',
         ]);
    }
}
