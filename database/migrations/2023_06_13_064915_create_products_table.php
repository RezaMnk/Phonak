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
            $table->enum('brand', ['phonak', 'hansaton', 'unitron', 'rayovac', 'detax', 'etc']);
            $table->enum('category', ['CIC', 'ITC', 'BTE mold', 'BTE tube', 'RIC', 'accessories']);
            $table->string('expire_date')->nullable();
            $table->unsignedBigInteger('price');
            $table->string('etc_brand')->nullable();
            $table->string('irc');
            $table->unsignedInteger('inventory');
            $table->boolean('has_count')->default(false);
            $table->boolean('has_mold')->default(false);
            $table->unsignedBigInteger('mold_price')->nullable();
            $table->boolean('has_package')->default(false);
            $table->unsignedBigInteger('package_price')->nullable();
            $table->unsignedInteger('min_count')->nullable();
            $table->unsignedInteger('max_count')->nullable();
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
