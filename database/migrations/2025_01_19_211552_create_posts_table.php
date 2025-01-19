<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id(); // Auto-incrementing ID column
            $table->string('title'); // A string column for the title of the post
            $table->string('author'); // A string column for the author's name
            $table->timestamps(); // Created at and updated at timestamps
            //$table->softDeletes(); //IF YOU WANT TO NABLE SOFT DELETES
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
