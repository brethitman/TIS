<?php

use App\Http\Controllers\Area\AreaController;
use App\Http\Controllers\BoletaPago\BoletaPagoController;
use App\Http\Controllers\Inscripcion\InscripcionController;
use App\Http\Controllers\NivelCategoria\NivelCategoriaController;
use App\Http\Controllers\Olimpista\OlimpistaController;
use App\Http\Controllers\Tutor\TutorController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ComprobantePago\ComprobantePagoController;
use App\Http\Resources\ComprobantePago\ComprobantePagoCollection;
use App\Models\ComprobantePago;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/area',         [ AreaController::class, 'index'     ]);
Route::get('/area/{id}',    [ AreaController::class, 'show'      ]);
Route::post('/area',        [ AreaController::class, 'store'     ]);
Route::put('/area/{id}',    [ AreaController::class, 'update'    ]); // Actualizar un área existente
Route::delete('/area/{id}', [ AreaController::class, 'destroy'   ]); // Eliminar un área


// tutor ENDPOINTS
Route::get('/tutor',         [ TutorController::class, 'index'     ]);
Route::get('/tutor/{id}',    [ TutorController::class, 'show'      ]);
Route::post('/tutor',        [ TutorController::class, 'store'     ]);



// boleta ENDPOINTS

Route::get('/boleta',         [ BoletaPagoController::class, 'index'     ]);
Route::get('/boleta/{id}',    [ BoletaPagoController::class, 'show'      ]);
Route::post('/boleta',        [ BoletaPagoController::class, 'store'     ]);


//ojo
// comprobante ENDPOINTS
Route::get('/comprobante',         [ ComprobantePagoController::class, 'index'     ]);
Route::get('/comprobante/{id}',    [ ComprobantePagoController::class, 'show'      ]);
Route::post('/comprobante',        [ ComprobantePagoController::class, 'store'     ]);



// inscripcion ENDPOINTS

Route::get('/inscripcion',         [ InscripcionController::class, 'index'     ]);
Route::get('/inscripcion/{id}',    [ InscripcionController::class, 'show'      ]);
Route::post('/inscripcion',        [ InscripcionController::class, 'store'     ]);




// categoria ENDPOINTS
Route::apiResource('nivelCategoria', NivelCategoriaController::class);
Route::get('/nivelCategoria',         [ NivelCategoriaController::class, 'index'     ]);
Route::get('/nivelCategoria/{id}',    [ NivelCategoriaController::class, 'show'      ]);
Route::post('/nivelCategoria',        [ NivelCategoriaController::class, 'store'     ]);



// olimpista ENDPOINTS ---------------------------

Route::get('/olimpista',         [ OlimpistaController::class, 'index'     ]);
Route::get('/olimpista/{id}',    [ OlimpistaController::class, 'show'      ]);
Route::post('/olimpista',        [ OlimpistaController::class, 'store'     ]);
