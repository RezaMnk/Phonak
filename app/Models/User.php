<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'national_code',
        'email',
        'grad_year',
        'med_number',
        'grade',
        'university',
        'state',
        'city',
        'password',
        'group',
        'status',
        'disapprove',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'is_admin',
        'is_owner',
        'setting_time_orders',
    ];

    /**
     * @return HasOne
     */
    public function address(): HasOne
    {
        return $this->hasOne(Address::class);
    }

    /**
     * @return HasOne
     */
    public function user_info(): HasOne
    {
        return $this->hasOne(UserInfo::class);
    }


    /**
     * @return HasMany
     */
    public function patients(): HasMany
    {
        return $this->hasMany(Patient::class);
    }


    /**
     * @return HasMany
     */
    public function records(): HasMany
    {
        return $this->hasMany(Record::class);
    }


    /**
     * @return HasMany
     */
    public function accessories(): HasMany
    {
        return $this->hasMany(Accessory::class);
    }


    /**
     * @return HasOne
     */
    public function setting(): HasOne
    {
        return $this->hasOne(GroupSetting::class, 'group', 'group');
    }


    /**
     * @return HasMany
     */
    public function group_products(): HasMany
    {
        return $this->hasMany(GroupProduct::class, 'group', 'group');
    }


    /**
     * @return Collection
     */
    public function products(): Collection
    {
        $products = [];
        foreach ($this->group_products as $group_product)
            $products[] = $group_product->product;

        return collect($products);
    }


    public function has_address(): bool
    {
        return isset($this->address);
    }


    public function has_info(): bool
    {
        return isset($this->user_info);
    }


    public function reached_limit(): bool
    {
        if ($setting = $this->setting)
            $max_order = $setting->max_order;
        else
            return false;

        $today_order = $this->records()->whereDate('created_at', Carbon::today())->count();

        return $today_order >= $max_order;
    }


    public function out_of_schedule(): bool
    {
        if ($setting = $this->setting)
        {
            $start_time = $setting->start_time;
            $end_time = $setting->end_time;
        }
        else
            return false;

        return ! ($start_time->isPast() && $end_time->isFuture());
    }


//    public function has_info(): bool
//    {
//        return isset($this->user_info);
//    }


    public function settingTimeOrders(): Attribute
    {
        if ($this->setting)
            return new Attribute(
                get: fn () =>  $this->records()
                    ->whereDate('created_at', '>=', $this->setting->start_time)
                    ->whereDate('created_at', '<=', $this->setting->end_time)
                    ->count()
            );
        else
            return new Attribute(
                get: fn () => false,
            );

    }

    /**
     * Check if user is admin
     *
     * @return bool
     */
    public function is_admin()
    {
        return $this->role == 'admin';
    }

    /**
     * Check if user is owner
     *
     * @return bool
     */
    public function is_owner()
    {
        return $this->id == 1;
    }

    /**
     * Check if user is verified
     *
     * @return bool
     */
    public function verified()
    {
        return $this->status == 'approved';
    }

    /**
     * Determine if the user is an administrator.
     */
    protected function isAdmin(): Attribute
    {
        return new Attribute(
            get: fn () => $this->is_admin(),
        );
    }

    /**
     * Determine if the user is an administrator.
     */
    protected function isOwner(): Attribute
    {
        return new Attribute(
            get: fn () => $this->is_owner(),
        );
    }

    /**
     * @param $value
     * @return void
     */
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }
}
