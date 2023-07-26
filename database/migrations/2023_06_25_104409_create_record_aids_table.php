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
        Schema::create('record_aids', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('record_id')->nullable();
            $table->foreign('record_id')->references('id')->on('records')->onDelete('cascade');

            $table->enum('ear', ['left', 'right'])->nullable();
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
            $table->boolean('has_mold')->nullable();                                                               // Also for RIC
            $table->enum('mold_material', ['hard', 'soft'])->nullable();
            $table->enum('mold_size', ['Canal', 'Half shell', 'Full shell', 'Skeleton shell'])->nullable();
            $table->boolean('has_vent')->nullable();
            // TUBE
            $table->enum('tube_size', ['0', '1', '2', '3'])->nullable();
            $table->enum('dome_type', ['open', 'closed', 'vented', 'power'])->nullable();                           // Also for RIC
            $table->enum('dome_size', ['large', 'medium', 'small'])->nullable();

            /*
             * RIC
             */
            $table->enum('external_receiver_size', ['0', '1', '2', '3'])->nullable();
            $table->enum('shell_type', ['cshell', 'Slimtip'])->nullable();

            $table->text('description')->nullable();

            $table->unique(['record_id', 'ear']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('record_aids');
    }
};
