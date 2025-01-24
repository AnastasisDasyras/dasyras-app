<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('plan', function (Blueprint $table) {
            $table->id(); // Auto-incrementing ID column
            $table->string('title', 255); // Title column with max length 255
            $table->string('description', 500); // Description column with max length 500
            $table->string('author', 255); // Author column with max length 255
            $table->string('city', 100)->nullable(); // City column, nullable
            $table->string('duration', 100)->nullable(); // Duration column, nullable
            $table->string('price', 100)->nullable(); // Price column, nullable
            $table->integer('reviews_sum', 100)->nullable(); // reviews_sum column, nullable
            $table->float('total_reviews')->nullable(); // total_reviews column, nullable

            $table->timestamps(); // Created at and updated at timestamps
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('plan'); // Drops the table if it exists
    }
};
