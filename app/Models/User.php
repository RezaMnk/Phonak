<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
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
        'grad_year',
        'med_number',
        'grade',
        'university',
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
    ];

    /**
     * @return HasOne
     */
    public function address(): HasOne
    {
        return $this->hasOne(Address::class);
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


    public function hasAddress()
    {
        return isset($this->address);
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
}
