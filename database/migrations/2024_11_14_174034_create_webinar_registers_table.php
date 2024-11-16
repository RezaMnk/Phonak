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
        Schema::create('webinar_registers', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('national_code');
            $table->string('state');
            $table->string('city');
            $table->string('phone');
            $table->string('grade');
            $table->string('education_year')->nullable();
            $table->string('price');
            $table->string('transaction_id')->nullable();
            $table->string('reference_id')->nullable();
            $table->boolean('success')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('webinar_registers');
    }
};
