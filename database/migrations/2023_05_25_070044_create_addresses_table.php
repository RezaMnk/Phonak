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
        Schema::create('addresses', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('home_address');
            $table->unsignedBigInteger('home_post_code');
            $table->string('home_phone')->nullable();
            $table->string('work_address');
            $table->unsignedBigInteger('work_post_code');
            $table->string('work_phone')->nullable();
            $table->string('second_work_address')->nullable();
            $table->unsignedBigInteger('second_work_post_code')->nullable();
            $table->string('second_work_phone')->nullable();
            $table->enum('mail_address', ['work', 'second_work', 'home']);
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('addresses');
    }
};
