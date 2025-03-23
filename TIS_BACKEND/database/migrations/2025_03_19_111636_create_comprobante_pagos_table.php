<?php

// create_comprobante_pagos_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('comprobante_pagos', function (Blueprint $table) {
            $table->id('id_comprobante');
            $table->unsignedBigInteger('id_boleta');
            $table->string('archivo_comprobante', 255);
            $table->string('numero_comprobante', 50)->nullable();
            $table->string('nombre_pagador', 100)->nullable();
            $table->enum('estado_verificacion', ['Pendiente', 'Verificado', 'Rechazado'])->default('Pendiente');
            $table->date('fecha_subida');
            $table->timestamps();

            $table->foreign('id_boleta')->references('id_boleta')->on('boleta_pagos')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('comprobante_pagos');
    }
};
