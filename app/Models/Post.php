<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory; // This is necessary for using the factory

    //if you need costum table
    //protected $table = 'post_secondary';

    //if you want to change the primary key name
    //protected $primaryKey = 'post_id';

    //if you dont want created_at updated_at
    // public $timestamps = false;



    // Define which attributes can be mass-assigned
    protected $fillable = [
        'title',
        'author',
    ];

}
