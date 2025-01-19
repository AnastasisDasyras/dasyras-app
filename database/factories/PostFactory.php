<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->title(),
            'author' => User::inRandomOrder()->first()->id,
            'created_at' => $this->faker->dateTimeBetween('-1 years', 'now'), // Random date within the last year
            'updated_at' => $this->faker->dateTimeBetween('-1 years', 'now'), // Random date within the last year
        ];

    }
}
