<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Plan;
use App\Models\User;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Review>
 */
class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
         return [
            'user_id' => User::inRandomOrder()->first()->id,  // Fetch random user
            'plan_id' => Plan::inRandomOrder()->first()->id,  // Fetch random plan
            'rating' => $this->faker->numberBetween(1, 5),  // Random rating between 1 and 5
            'text' => $this->faker->paragraph,  // Random text for the review
            'title' => $this->faker->sentence,  // Random title for the review
        ];
    }
}
