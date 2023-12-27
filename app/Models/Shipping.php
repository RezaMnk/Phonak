<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Shipping extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'record_id',
        'expert_phone',
        'type',
        'etc_delivery',
        'has_health_insurance',
        'phone',
        'audiologist_med_number',
        'otolaryngologist_med_number',
        'supplementary_insurance',
        'description',
        'mail_address',
    ];



    /**
     * Belongs to record
     *
     * @return BelongsTo
     */
    public function record(): BelongsTo
    {
        return $this->belongsTo(Record::class);
    }


    /**
     * Belongs to accessory
     *
     * @return BelongsTo
     */
    public function accessory(): BelongsTo
    {
        return $this->belongsTo(Accessory::class);
    }
}
