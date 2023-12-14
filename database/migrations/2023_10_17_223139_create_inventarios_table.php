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
        Schema::create('inventarios', function (Blueprint $table) {
            $table->id();
            $table->string('empresa')->nullable(); 
            $table->string('bodega')->nullable(); 
            $table->string('descripcion')->nullable(); 
            $table->string('marca')->nullable(); 
            $table->text('modelo')->nullable(); 
            $table->string('no_serie')->nullable(); 
            $table->string('area')->nullable(); 
            $table->text('caracteristicas')->nullable(); 
            $table->string('manofactura')->nullable(); 
            $table->string('responsable')->nullable(); 
            $table->string('cod_interna')->nullable(); 
            $table->string('fecha_inv')->nullable(); 
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
        Schema::dropIfExists('inventarios');
    }
};
