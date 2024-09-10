<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Payment extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'transaction_id',
        'reference_id',
        'gateway',
        'type',
    ];


    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'gateway_name',
        'created_ago',
        'created_date',
        'transaction_id_short',
    ];


    /**
     * Has one record
     *
     * @return HasOne
     */
    public function record(): HasOne
    {
        return $this->hasOne(Record::class);
    }


    /**
     * Has one accessory
     *
     * @return HasOne
     */
    public function accessory(): HasOne
    {
        return $this->hasOne(Accessory::class);
    }

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

    protected function createdDate(): Attribute
    {
        return new Attribute(
            get: fn () => jdate($this->attributes['created_at'])->toFormattedDateString()
        );
    }

    protected function gatewayName(): Attribute
    {
        $gateways = [
            'zarinpal' => 'زرین پال',
            'parsian' => 'پارسیان',
        ];
        return new Attribute(
            get: fn () => $gateways[$this->attributes['gateway']]
        );
    }
}
