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
        Schema::create('audiograms', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('record_id')->nullable();
            $table->foreign('record_id')->references('id')->on('records')->onDelete('cascade');
            $table->enum('ear', ['left', 'right'])->nullable();
            $table->string('ac_250');
            $table->string('ac_500');
            $table->string('ac_1000');
            $table->string('ac_2000');
            $table->string('ac_4000');
            $table->string('bc_250')->nullable();
            $table->string('bc_500')->nullable();
            $table->string('bc_1000')->nullable();
            $table->string('bc_2000')->nullable();
            $table->string('bc_4000')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audiograms');
    }
};
