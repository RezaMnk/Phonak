<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Record extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'patient_id',
        'product_id',
        'brand',
        'type',
        'ear'
    ];


    /**
     * Belongs to user
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Belongs to patient
     *
     * @return BelongsTo
     */
    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class);
    }

    /**
     * Belongs to product
     *
     * @return BelongsTo
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * has one shipping
     *
     * @return HasOne
     */
    public function shipping(): HasOne
    {
        return $this->hasOne(Shipping::class);
    }

    /**
     * has "two" hearing user
     *
     * @return HasMany
     */
    public function record_aids(): HasMany
    {
        return $this->hasMany(RecordAid::class);
    }

    /**
     * has "two" auidograms
     *
     * @return HasMany
     */
    public function audiograms(): HasMany
    {
        return $this->hasMany(Audiogram::class);
    }


    public function set_step($step)
    {
        $this->status = max($step, $this->status == 'completed' ? 6 : $this->status);
        $this->touch();
    }


    public function get_step()
    {
        return $this->status == 'completed' ? 6 : $this->status;
    }
}
