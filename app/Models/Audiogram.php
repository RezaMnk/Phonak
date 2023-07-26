<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

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
        'audiogram_image',
        'id_card_image',
    ];


    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'audiogram_image_url',
        'id_card_image_url',
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

    protected function audiogramImageUrl(): Attribute
    {
        return new Attribute(
            get: fn () => Storage::disk('audiograms')->url($this->record->id.'/'.$this->audiogram_image),
        );
    }

    protected function idCardImageUrl(): Attribute
    {
        return new Attribute(
            get: fn () => Storage::disk('audiograms')->url($this->record->id.'/'.$this->id_card_image),
        );
    }
}
