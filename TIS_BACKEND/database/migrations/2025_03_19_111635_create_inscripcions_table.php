<?php

// create_inscripcions_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('inscripcions', function (Blueprint $table) {
            $table->id('id_inscripcion');
            $table->unsignedBigInteger('id_olimpista');
            $table->unsignedBigInteger('id_area');
            $table->unsignedBigInteger('id_tutor');
            $table->date('fecha_inscripcion');
            $table->enum('estado', ['Pendiente', 'Pagado', 'Verificado'])->default('Pendiente');
            $table->timestamps();

            $table->foreign('id_olimpista')->references('id_olimpista')->on('olimpistas')->onDelete('cascade');
            $table->foreign('id_area')->references('id_area')->on('areas')->onDelete('cascade');
            $table->foreign('id_tutor')->references('id_tutor')->on('tutors')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('inscripcions');
    }
};
