<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Audiogram extends Model
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
        'ac_250',
        'ac_500',
        'ac_1000',
        'ac_2000',
        'ac_4000',
        'bc_250',
        'bc_500',
        'bc_1000',
        'bc_2000',
        'bc_4000',
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
