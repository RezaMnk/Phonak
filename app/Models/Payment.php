<?php

namespace App\Models;

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
        'type',
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
}
