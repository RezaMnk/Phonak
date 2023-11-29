<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('group_settings', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('group');
            $table->unsignedBigInteger('max_record_order');
            $table->unsignedBigInteger('max_accessory_order');
            $table->timestamp('start_time')->nullable()->default(null);
            $table->timestamp('end_time')->nullable()->default(null);
            $table->timestamps();

            $table->unique('group');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('group_settings');
    }
};
