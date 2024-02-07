<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->word(),
            'category' => fake()->randomElement(['CIC', 'ITC', 'BTE mold', 'BTE tube', 'RIC', 'accessories']),
            'brand' => fake()->randomElement(['phonak', 'hansaton']),
            'price' => fake()->randomNumber(7),
            'IRC' => fake()->randomNumber(4),
            'expire_date' => null,
            'inventory' => 20,
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
