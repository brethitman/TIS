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
            $table->id('id_nivel');
            $table->unsignedBigInteger('id_area');
            $table->string('nombre_nivel', 100);
            $table->text('descripcion')->nullable();
            $table->timestamps();

            $table->foreign('id_area')->references('id_area')->on('areas')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('nivel_categorias');
    }
};
