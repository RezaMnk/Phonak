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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('brand', ['phonak', 'hansaton', 'unitron']);
            $table->enum('category', ['CIC', 'ITC', 'BTE mold', 'BTE tube', 'RIC', 'accessories']);
            $table->string('expire_date')->nullable();
            $table->unsignedBigInteger('price');
            $table->unsignedInteger('inventory');
            $table->boolean('has_count')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
