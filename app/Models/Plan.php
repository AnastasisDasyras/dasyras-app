<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    use HasFactory; // This is necessary for using the factory

    //if you need costum table
    //protected $table = 'post_secondary';

    //if you want to change the primary key name
    //protected $primaryKey = 'post_id';

    //if you dont want created_at updated_at
    // public $timestamps = false;


    // Columns that are mass assignable
    protected $fillable = ['title', 'description', 'author', 'city', 'duration', 'price', 'reviews_sum', 'total_reviews'];

    /**
     * Get all posts created by a specific author.
     * 
     * usage: $postsByAuthor = Plan::byAuthor($authorId)->get();
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param int $authorId
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByAuthor($query, $authorId)
    {
        return $query->where('author', $authorId);
    }

    /**
     * Get all posts for a specific city.
     * 
     * usage: $postsByCity = Plan::byCity('some_city_id')->get();
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string $cityId
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByCity($query, $cityId)
    {
        return $query->where('city', $cityId);
    }

    /**
     * Add a review to the plan.
     *
     * @param int $rating The review rating (1 to 5).
     * @return void
     */
    public function addReview(int $rating)
    {
        $this->increment('reviews_sum', $rating); // Add the rating to reviews_sum
        $this->increment('total_reviews'); // Increment the total number of reviews
    }

    /**
     * Remove a review from the plan.
     *
     * @param int $rating The review rating to be removed (1 to 5).
     * @return void
     */
    public function removeReview(int $rating)
    {
        $this->decrement('reviews_sum', $rating); // Subtract the rating from reviews_sum
        $this->decrement('total_reviews'); // Decrement the total number of reviews
    }

    /**
     * Get the average rating of the plan.
     *
     * @return float|null
     */
    public function getAverageRating(): ?float
    {
        if ($this->total_reviews == 0) {
            return null; // No reviews, return null
        }

        return $this->reviews_sum / $this->total_reviews;
    }
}
