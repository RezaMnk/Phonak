<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WebinarRegister extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'national_code',
        'state',
        'city',
        'phone',
        'grade',
        'education_year',
        'price',
        'transaction_id',
        'reference_id',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'created_ago',
        'transaction_id_short',
    ];

    protected function transactionIdShort(): Attribute
    {
        return new Attribute(
            get: fn () => $this->attributes['reference_id'] ?: ($this->attributes['transaction_id'] ? preg_replace('/^([A0]*)+/', '', $this->attributes['transaction_id']) : '')
        );
    }



    protected function createdAgo(): Attribute
    {
        return new Attribute(
            get: fn () => jdate($this->attributes['created_at'])->ago()
        );
    }
}
