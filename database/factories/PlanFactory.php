<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Plan>
 */
class PlanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->words(3, true), // Generates a random title 
            'description' => $this->faker->paragraph(2), // Generates a random description with 2 sentences
            'author' => User::inRandomOrder()->first()->id, // Gets a random user ID
            'city_id' => $this->faker->regexify('[A-Za-z0-9]{20}'), // city id from google
            'duration' => $this->faker->numberBetween(1, 30), // Generates a random duration in days
            'total_reviews' => $this->faker->numberBetween(1, 30), // Generates a random duration in days
            'reviews_sum' => $this->faker->numberBetween(1, 150), // Generates a random duration in days
            'price' => $this->faker->randomFloat(2, 50, 500), // Generates a random price between 50 and 500 with 2 decimal places
            'created_at' => $this->faker->dateTimeBetween('-1 years', 'now'), // Random date within the last year
            'updated_at' => $this->faker->dateTimeBetween('-1 years', 'now'), // Random date within the last year
        ];

    }
}
