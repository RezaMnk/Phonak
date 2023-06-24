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

            $table->enum('brand', ['phonak', 'hansaton'])->nullable(); // Nullable but important
            $table->enum('type', ['CIC', 'ITC', 'BTE mold', 'BTE tube', 'RIC', 'accessories'])->nullable(); // Nullable but important
            $table->enum('ear', ['left', 'right', 'both'])->nullable();

            /*
             * CIC - ITC
             */
            $table->enum('hearing_aid_size', ['CIC', 'Canal', 'Full shell'])->nullable();
            $table->enum('vent_size', ['2-3 mm', '1.5 mm', '1 mm', 'groove', 'none'])->nullable();                  // Also for BTE with vent
            $table->enum('wax_guard', ['normal', 'rotating'])->nullable();
            $table->enum('receiver', ['standard', 'moderate', 'power', 'super power', 'ultra power'])->nullable();  // Also for RIC

            /*
             * BTE
             */
            // MOLD
            $table->boolean('have_mold')->nullable();                                                               // Also for RIC
            $table->enum('mold_material', ['hard', 'soft'])->nullable();
            $table->unsignedInteger('mold_size')->nullable();
            $table->boolean('vent')->nullable();
            // TUBE
            $table->enum('tube_size', ['0', '1', '2', '3'])->nullable();
            $table->enum('dome_type', ['open', 'closed', 'vented', 'power'])->nullable();                           // Also for RIC
            $table->enum('dome_size', ['large', 'medium', 'small'])->nullable();

            /*
             * RIC
             */
            $table->enum('external_receiver_size', ['0', '1', '2', '3'])->nullable();
            $table->enum('shell_type', ['cshell', 'Slimtip'])->nullable();

            $table->boolean('completed')->default(0);
            $table->text('description')->nullable();

            $table->timestamps();
        });

        Schema::create('records_products', function (Blueprint $table) {
            $table->unsignedBigInteger('record_id');
            $table->foreign('record_id')->references('id')->on('records')->onDelete('cascade');
            $table->unsignedBigInteger('product_id');
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
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
