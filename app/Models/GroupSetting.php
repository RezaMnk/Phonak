<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

class GroupSetting extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'group',
        'max_order',
        'start_time',
        'end_time',
    ];

    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'start_time_formatted',
        'start_time_readable',

        'end_time_formatted',
        'end_time_readable',
    ];




    /**
     * Belongs to user
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'group', 'group');
    }

    /**
     * Determine if the user is an administrator.
     */
    protected function startTimeFormatted(): Attribute
    {
        return new Attribute(
            get: fn () => $this->start_time ? $this->start_time->format('Y-m-d\TH:i') : null,
        );
    }

    /**
     * Determine if the user is an administrator.
     */
    protected function endTimeFormatted(): Attribute
    {
        return new Attribute(
            get: fn () => $this->end_time ? $this->end_time->format('Y-m-d\TH:i') : null,
        );
    }

    /**
     * Determine if the user is an administrator.
     */
    protected function startTimeReadable(): Attribute
    {
        return new Attribute(
            get: fn () => $this->start_time ? jdate($this->start_time)->toFormattedDateTimeString() : null,
        );
    }

    /**
     * Determine if the user is an administrator.
     */
    protected function endTimeReadable(): Attribute
    {
        return new Attribute(
            get: fn () => $this->end_time ? jdate($this->end_time)->toFormattedDateTimeString() : null,
        );
    }
}
