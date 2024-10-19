<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\Storage;

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
        'payment_id',
        'brand',
        'type',
        'total_price',
        'ear',
        'has_mold',
        'has_package',
        'has_charger',
        'has_other_services',
        'id_card_image',
        'prescription_image',
        'audiogram_image',
        'national_code_confirm_image',
        'creditor_image',
    ];


    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'id_card_image_url',
        'prescription_image_url',
        'audiogram_image_url',
        'national_code_confirm_image_url',
        'creditor_image_url',
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

    /**
     * Belongs to payment
     *
     * @return BelongsTo
     */
    public function payment(): BelongsTo
    {
        return $this->belongsTo(Payment::class);
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


    public function update_product_inventory(): bool
    {
        $product = $this->product;
        $count = $this->ear == 'both' ? 2 : 1;

        if ($product->inventory >= $count)
        {
            $product->inventory = $product->inventory - $count;
            $product->touch();

            return true;
        }
        else
            return false;
    }

    protected function idCardImageUrl(): Attribute
    {
        return new Attribute(
            get: fn () => Storage::disk('records')->url($this->id.'/'.$this->id_card_image),
        );
    }

    protected function prescriptionImageUrl(): Attribute
    {
        return new Attribute(
            get: fn () => Storage::disk('records')->url($this->id.'/'.$this->prescription_image),
        );
    }

    protected function audiogramImageUrl(): Attribute
    {
        return new Attribute(
            get: fn () => Storage::disk('records')->url($this->id.'/'.$this->audiogram_image),
        );
    }

    protected function nationalCodeConfirmImageUrl(): Attribute
    {
        return new Attribute(
            get: fn () => Storage::disk('records')->url($this->id.'/'.$this->national_code_confirm_image),
        );
    }

    protected function creditorImageUrl(): Attribute
    {
        return new Attribute(
            get: fn () => Storage::disk('records')->url($this->id.'/'.$this->creditor_image),
        );
    }
}
