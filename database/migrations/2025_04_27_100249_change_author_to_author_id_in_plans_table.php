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
        Schema::table('plans', function (Blueprint $table) {
            // First, rename the column
            $table->renameColumn('author', 'author_id');

            // Then, change the type to integer
            $table->integer('author_id')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('plans', function (Blueprint $table) {
            // First, change back to string
            $table->string('author_id')->change();

            // Then, rename back to author
            $table->renameColumn('author_id', 'author');
        });
    }
};
