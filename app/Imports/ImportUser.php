<?php

namespace App\Imports;

use App\Models\Address;
use App\Models\User;
use App\Models\UserInfo;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\OnEachRow;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Row;

class ImportUser implements ToCollection
{
    public function collection(Collection $rows)
    {
        foreach ($rows as $row)
        {
            if ($row[0] == 'عنوان لاتین')
                continue;

            $med_number = (int) filter_var($row[0], FILTER_SANITIZE_NUMBER_INT);

            $user = User::create([
                'name' => $row[16],
                'national_code' => $row[3],
                'med_number' => $med_number,
                'password' => $row[3],
                'group' => $row[18],
                'status' => 'approved',
            ]);

            $user->address()->create([
                'home_address' => $row[10],
                'home_post_code' => $row[7],
                'work_address' => $row[10],
                'work_post_code' => $row[7],
                'mail_address' => 'work',
            ]);

            $user->user_info()->create([
                'phone' => $row[5],
                'whatsapp_phone' => $row[5],
            ]);
        }
    }
}
