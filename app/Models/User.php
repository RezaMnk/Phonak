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
        'first_name',
        'last_name',
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
        'creditor',
        'creditor_image',
        'excel_user',
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
        'name',
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
        if ($this->group)
        {
            $products = [];
            foreach ($this->group_products as $group_product)
                $products[] = $group_product->product;

            foreach (Product::query()->where('category', 'accessories')->doesntHave('group_products')->get() as $product)
                $products[] = $product;

            return collect($products);
        }

        return Product::all();
    }


    public function has_address(): bool
    {
        return isset($this->address);
    }


    public function has_info(): bool
    {
        return isset($this->user_info);
    }


    public function reached_limit($model = 'record', $this_count = 0, $editing_model = null): bool
    {
        if ($setting = $this->setting)
        {
            $max_record_order = $setting->max_record_order;
            $max_accessory_order = $setting->max_accessory_order;
        }
        else
            return false;

        if ($model == 'record')
        {
            $today_order = $this->records()->whereIn('status', ['completed', 'paid', 'approved'])
                    ->where(function ($query) use ($editing_model) {
                        if ($editing_model)
                            $query->whereHas('product', function ($query) use ($editing_model) {
                                $query->whereNot('id', $editing_model->id);
                            });
                    })
                    ->whereDate('created_at', '>=', $setting->start_time)
                    ->whereDate('created_at', '<=', $setting->end_time)->get()
                    ->sum(function ($record) {
                        if ($record->ear == 'both')
                            return 2;
                        return 1;
                    }) + $this_count;

        if ($this_count || $editing_model)
            return $today_order > $max_record_order;
        else
            return $today_order >= $max_record_order;
        }
        else
        {
            $today_order = $this->accessories()->whereIn('status', ['completed', 'paid', 'approved'])
                    ->where(function ($query) use ($editing_model) {
                        if ($editing_model)
                            $query->whereHas('product', function ($query) use ($editing_model) {
                                $query->whereNot('id', $editing_model->id);
                            });
                    })
                    ->whereBetween('created_at', [$setting->start_time, $setting->end_time])->get()
                    ->count() + $this_count;

            if ($this_count || $editing_model)
                return $today_order > $max_accessory_order;
            else
                return $today_order >= $max_accessory_order;
        }
    }


    public function out_of_schedule(): bool
    {
        if ($setting = $this->setting)
        {
            $start_time = $setting->start_time;
            $end_time = $setting->end_time;
        }
        else
            return true;

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
                    ->whereIn('status', ['completed', 'paid', 'approved'])
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

    public function name(): Attribute
    {
        return new Attribute(
            get: fn () => $this->first_name . ' ' . $this->last_name
        );
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

    public function can_buy($product_id, $count, $type = 'record', $except_id = false): bool
    {
        if ($this->group == 0) return false;

        $total_ordered = $count;
        $product = $this->products()->firstWhere('id', $product_id);
        $group_product = $this->group_products->firstWhere('product_id', $product_id);
        $count_can_buy = $group_product ? $group_product->count : INF;

        list($start_time, $end_time) = [
            max($this->setting->start_time, $group_product->updated_at),
            $this->setting->end_time,
        ];

        if ($type == 'record')
            $user_all_records = $this->records()->whereNot('status', 'canceled')
                ->whereHas('product', function ($query) use ($product) {
                    $query->where('product_id', $product->id);
                })
                ->where(function ($query) use ($except_id) {
                    if ($except_id)
                        $query->whereNot('id', $except_id);
                })
                ->whereBetween('created_at', [$start_time, $end_time])->get();
        else
            $user_all_records = Accessory::whereNot('status', 'canceled')->whereHas('user', function ($query) {
                $query->where('group', $this->group);
            })->whereHas('product', function ($query) use ($product) {
                $query->where('product_id', $product->id);
            })
                ->where(function ($query) use ($except_id) {
                    if ($except_id)
                        $query->whereNot('id', $except_id);
                })
                ->whereBetween('created_at', [$start_time, $end_time])->get();


        foreach ($user_all_records as $record)
        {
            if ($record->ear == 'both') $total_ordered += 2;
            else $total_ordered++;
        }

        return $total_ordered <= $count_can_buy;
    }

    public function scopeAllGroups($query)
    {
        $groups = [];
        $user_groups = User::query()->select('group')->distinct()->get();
        foreach ($user_groups as $group)
        {
            $groups[] = $group->group;
        }

        $groups = array_filter($groups, function($group) { return $group != 0; });

        sort($groups);
        return $groups;
    }
}
