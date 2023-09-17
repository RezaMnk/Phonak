<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class UserInfo extends Model
{
    use HasFactory;


    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'phone',
        'landline',
        'whatsapp_phone',
        'referral_name',
        'referral_phone',
        'second_referral_name',
        'second_referral_phone',
        'history_description',
        'conditions_description',
        'id_card_image',
        'med_card_image',
        'license_image',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'id_card_image_url',
        'med_card_image_url',
        'license_image_url',
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
     * Get product image full URL
     */
    protected function idCardImageUrl(): Attribute
    {
        return new Attribute(
            get: fn () => Storage::disk('users')->url($this->user->id .'/'. $this->id_card_image),
        );
    }


    /**
     * Get product image full URL
     */
    protected function medCardImageUrl(): Attribute
    {
        return new Attribute(
            get: fn () => Storage::disk('users')->url($this->user->id .'/'. $this->med_card_image),
        );
    }


    /**
     * Get product image full URL
     */
    protected function licenseImageUrl(): Attribute
    {
        return new Attribute(
            get: fn () => Storage::disk('users')->url($this->user->id .'/'. $this->license_image),
        );
    }
}
