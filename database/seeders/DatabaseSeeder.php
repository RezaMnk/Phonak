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
         \App\Models\Product::factory(50)->create();

         $user = \App\Models\User::create([
             'first_name' => 'رضا',
             'last_name' => 'نداف',
             'national_code' => '0012345678',
             'email' => 'mirnadaf.reza@gmail.com',
             'password' => '0012345678',
             'grad_year' => '1380',
             'med_number' => '123456',
             'grade' => 'کارشناسی',
             'university' => 'تهران',
             'state' => 'تهران',
             'city' => 'تهران',
             'role' => 'admin',
             'status' => 'approved',
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

         $user->user_info()->create([
             'phone' => '09212969916',
             'landline' => '02133131331',
             'whatsapp_phone' => '09212969916',
             'referral_name' => 'دعوت کننده یک',
             'referral_phone' => '09212969916',
             'second_referral_name' => 'دعوت کننده دو',
             'second_referral_phone' => '09212969916',
             'history_description' => 'تست تاریخچه',
             'conditions_description' => 'تست شرایط',
             'id_card_image' => 'id_card.jpg',
             'med_card_image' => 'med_card.png',
             'license_image' => 'license.png',
         ]);
    }
}
