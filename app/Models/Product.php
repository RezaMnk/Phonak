<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'category',
        'inventory',
        'image',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'image_url',
    ];


    /**
     * Belongs to record
     *
     * @return HasMany
     */
    public function record(): HasMany
    {
        return $this->hasMany(Record::class);
    }


    /**
     * Get product image full URL
     */
    protected function imageUrl(): Attribute
    {
        return new Attribute(
            get: fn () => Storage::disk('products')->url($this->image),
        );
    }
}
