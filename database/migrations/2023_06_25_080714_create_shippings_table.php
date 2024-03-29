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
        Schema::create('shippings', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['terminal', 'air', 'tipax', 'post', 'co-worker delivery', 'company delivery', 'etc']);
            $table->string('etc_delivery')->nullable();
            $table->boolean('has_health_insurance');
            $table->string('expert_phone');
            $table->string('phone')->nullable();
            $table->string('audiologist_med_number')->nullable();
            $table->string('otolaryngologist_med_number')->nullable();
            $table->string('supplementary_insurance')->nullable();
            $table->text('description')->nullable();
            $table->unsignedBigInteger('record_id')->nullable();
            $table->foreign('record_id')->references('id')->on('records')->onDelete('cascade');
            $table->unsignedBigInteger('accessory_id')->nullable();
            $table->foreign('accessory_id')->references('id')->on('accessories')->onDelete('cascade');
            $table->enum('mail_address', ['work', 'second_work', 'home']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shippings');
    }
};
