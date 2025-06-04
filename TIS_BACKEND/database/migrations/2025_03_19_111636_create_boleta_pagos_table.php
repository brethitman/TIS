<?php

// create_boleta_pagos_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('boleta_pagos', function (Blueprint $table) {
            $table->id('id_boleta');
            $table->unsignedBigInteger('id_inscripcion');
            $table->string('numero_boleta', 50)->unique();
            $table->decimal('monto', 10, 2);
            $table->date('fecha_generacion');
            $table->timestamps();

            $table->foreign('id_inscripcion')->references('id_inscripcion')->on('inscripcions')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('boleta_pagos');
    }
};
