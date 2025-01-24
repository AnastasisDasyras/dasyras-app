<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Plan>
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
            'title' => $this->faker->sentence(3), // Generates a random title with 3 words
            'description' => $this->faker->paragraph(2), // Generates a random description with 2 sentences
            'author' => User::inRandomOrder()->first()->id, // Gets a random user ID
            'city' => $this->faker->randomNumber(), // city id from google
            'duration' => $this->faker->numberBetween(1, 30) . ' days', // Generates a random duration in days
            'total_reviews' => $this->faker->numberBetween(1, 30) . ' days', // Generates a random duration in days
            'reviews_sum' => $this->faker->numberBetween(1, 30) . ' days', // Generates a random duration in days
            'price' => $this->faker->randomFloat(2, 50, 500), // Generates a random price between 50 and 500 with 2 decimal places
            'created_at' => $this->faker->dateTimeBetween('-1 years', 'now'), // Random date within the last year
            'updated_at' => $this->faker->dateTimeBetween('-1 years', 'now'), // Random date within the last year
        ];

    }
}
