<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

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
        'brand',
        'type',
        'ear',
        'hearing_aid_size',
        'vent_size',
        'wax_guard',
        'receiver',
        'have_mold',
        'mold_material',
        'mold_size',
        'vent',
        'tube_size',
        'dome_type',
        'dome_size',
        'external_receiver_size',
        'shell_type',
        'accessories',
        'description'
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
     * Belongs to user
     *
     * @return BelongsTo
     */
    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class);
    }

    /**
     * Belongs to user
     *
     * @return HasMany
     */
    public function products(): HasMany
    {
        return $this->hasMany(Patient::class);
    }
}
