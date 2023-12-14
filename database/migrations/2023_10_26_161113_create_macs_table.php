<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('macs', function (Blueprint $table) {
            $table->id();
            $table->string('responsable')->nullable();
            $table->string('area')->nullable();  
            $table->string('mac')->nullable(); 
            $table->string('so')->nullable(); 
            $table->string('version')->nullable(); 
            $table->string('no_serie')->nullable(); 
            $table->string('fecha_compra')->nullable(); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('macs');
    }
};
