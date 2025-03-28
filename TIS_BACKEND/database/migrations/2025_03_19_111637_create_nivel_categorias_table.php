<?php

// create_nivel_categorias_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('nivel_categorias', function (Blueprint $table) {
            $table->id('id_nivel'); // Clave primaria autoincremental
           // $table->unsignedBigInteger('id_area'); // Clave foránea
            $table->string('nombre_nivel', 100)->unique();
            $table->string('descripcion', 50); // Nombre del nivel
            $table->string('fecha_examen'); // Fecha de examen
            $table->decimal('costo', 10, 2); // Costo del nivel
            $table->boolean('habilitacion')->default(false); // Habilitación (por defecto false)
            $table->timestamps(); // Campos created_at y updated_at

            // Definición de la clave foránea
            //$table->foreign('id_area')->references('id_area')->on('areas')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('nivel_categorias');
    }
};
