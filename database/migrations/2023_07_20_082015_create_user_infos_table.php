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
        Schema::create('user_infos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('phone')->nullable();
            $table->string('landline')->nullable();
            $table->string('whatsapp_phone')->nullable();
            $table->string('referral_name')->nullable();
            $table->string('referral_phone')->nullable();
            $table->string('second_referral_name')->nullable();
            $table->string('second_referral_phone')->nullable();
            $table->text('history_description')->nullable();
            $table->text('conditions_description')->nullable();
            $table->string('id_card_image')->nullable();
            $table->string('med_card_image')->nullable();
            $table->string('license_image')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_infos');
    }
};
