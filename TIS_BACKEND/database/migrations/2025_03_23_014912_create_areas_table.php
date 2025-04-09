

<?php

// create_areas_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('areas', function (Blueprint $table) {
            $table->id('id_area');
            $table->string('nombre_area', 100)->unique();
            $table->string('descripcion', 50)->nullable(); // Añadido el campo descripcion
            $table->decimal('costo', 10, 2); // Añadido el campo costo
            $table->timestamps(); // Añadidos los campos created_at y updated_at
        });
    }

   public function down()
    {
        Schema::dropIfExists('areas');
    }

};
