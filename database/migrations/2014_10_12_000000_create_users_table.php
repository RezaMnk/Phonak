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
            $table->string('first_name');
            $table->string('last_name');
            $table->string('national_code')->unique();
            $table->string('email')->unique()->nullable();
            $table->integer('grad_year')->nullable();
            $table->string('med_number')->unique();
            $table->string('grade')->nullable();
            $table->string('university')->nullable();
            $table->string('state')->nullable();
            $table->string('city')->nullable();
            $table->enum('role', ['admin', 'user'])->default('user');
            $table->string('id_card_image')->nullable();
            $table->string('med_card_image')->nullable();
            $table->string('password');
            $table->unsignedInteger('group')->default(0);
            $table->enum('status', ['approved', 'unapproved', 'waiting'])->default('waiting');
            $table->text('disapprove')->nullable();
            $table->boolean('creditor')->default(false);
            $table->boolean('creditor_image')->default(false);
            $table->boolean('excel_user')->default(false);
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
