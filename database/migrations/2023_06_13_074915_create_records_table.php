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
        Schema::create('records', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->unsignedBigInteger('patient_id');
            $table->foreign('patient_id')->references('id')->on('patients')->onDelete('cascade');

            $table->unsignedBigInteger('product_id')->nullable();
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');

            $table->unsignedBigInteger('payment_id')->nullable();
            $table->foreign('payment_id')->references('id')->on('payments')->onDelete('cascade');

            $table->enum('brand', ['phonak', 'hansaton', 'unitron'])->nullable(); // Nullable but important
            $table->enum('type', ['CIC', 'ITC', 'BTE mold', 'BTE tube', 'RIC'])->nullable(); // Nullable but important
            $table->enum('ear', ['left', 'right', 'both'])->nullable();

            $table->enum('status', [1,2,3,4,5, 'completed', 'paid'])->default(1);

            $table->unsignedBigInteger('total_price')->nullable();

            $table->string('id_card_image')->nullable();
            $table->string('prescription_image')->nullable();
            $table->string('audiogram_image')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('records');
    }
};
