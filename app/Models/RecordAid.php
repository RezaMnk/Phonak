<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RecordAid extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'record_id',
        'ear',
        'hearing_aid_size',
        'vent_size',
        'wax_guard',
        'receiver',
        'has_mold',
        'mold_material',
        'mold_size',
        'has_vent',
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
    public function patient(): BelongsTo
    {
        return $this->belongsTo(Record::class);
    }
}
