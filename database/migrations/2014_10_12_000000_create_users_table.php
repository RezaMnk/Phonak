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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('national_code')->unique();
            $table->string('email')->unique();
            $table->integer('grad_year');
            $table->string('med_number')->unique();
            $table->string('grade');
            $table->string('university');
            $table->string('state');
            $table->string('city');
            $table->enum('role', ['admin', 'user'])->default('user');
            $table->string('id_card_image')->nullable();
            $table->string('med_card_image')->nullable();
            $table->string('password');
            $table->unsignedInteger('group')->default(0);
            $table->enum('status', ['approved', 'unapproved', 'waiting'])->default('waiting');
            $table->text('disapprove')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
