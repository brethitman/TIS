<?php

// create_olimpistas_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('olimpistas', function (Blueprint $table) {
            $table->id('id_olimpista');
            $table->string('nombres', 100);
            $table->string('apellidos', 100);
            $table->string('ci', 20);
            $table->date('fecha_nacimiento');
            $table->string('correo', 100);
            $table->string('telefono', 20);
            $table->string('colegio', 100);
            $table->string('curso', 50);
            $table->string('departamento', 50);
            $table->string('provincia', 50);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('olimpistas');
    }
};
