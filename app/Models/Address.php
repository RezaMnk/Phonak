<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Address extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'home_address',
        'home_state',
        'home_city',
        'home_post_code',
        'home_phone',
        'work_address',
        'work_state',
        'work_city',
        'work_post_code',
        'work_phone',
        'second_work_address',
        'second_work_state',
        'second_work_city',
        'second_work_post_code',
        'second_work_phone',
        'mail_address',
    ];


    /**
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
