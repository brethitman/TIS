<?php

use App\Http\Controllers\Area\AreaController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\BoletaPago\BoletaPagoController;
use App\Http\Controllers\ExelController\ExelController;
use App\Http\Controllers\Inscripcion\InscripcionController;
use App\Http\Controllers\NivelCategoria\NivelCategoriaController;
use App\Http\Controllers\Olimpista\OlimpistaController;
use App\Http\Controllers\Tutor\TutorController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ComprobantePago\ComprobantePagoController;
use App\Http\Controllers\Curso\CursoController;
use App\Http\Controllers\CursoNivel\CursoNivelController;
use App\Http\Controllers\Olimpiada\OlimpiadaController;
use App\Http\Resources\ComprobantePago\ComprobantePagoCollection;
use App\Models\ComprobantePago;
use App\Models\CursoNivel;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/auth/login', [AuthController::class, 'login']);

//----da bien -----GET POST da bien
//tiene interface
Route::get('/area',         [ AreaController::class, 'index'     ]);
Route::get('/area/{id}',    [ AreaController::class, 'show'      ]);
Route::post('/area',        [ AreaController::class, 'store'     ]);
Route::put('/area/{id}',    [ AreaController::class, 'update'    ]); // Actualizar un área existente
Route::delete('/area/{id}', [ AreaController::class, 'destroy'   ]); // Eliminar un área
Route::get('/areas/olimpiada/{id}', [AreaController::class, 'getByOlimpiadaId']);
Route::get('/area/{id}/niveles', [AreaController::class, 'nivelesPorArea']);
Route::get('/areas', [AreaController::class, 'indexV2']);


// tutor ENDPOINTS--da bien ---GET POST da bien
//tiene interface
Route::get('/tutor',         [ TutorController::class, 'index'     ]);
Route::get('/tutor/{id}',    [ TutorController::class, 'show'      ]);
Route::post('/tutor',        [ TutorController::class, 'store'     ]);



// boleta ENDPOINTS--da bien---GET POST da bien
//tiene interface
Route::get('/boleta',         [ BoletaPagoController::class, 'index'     ]);
Route::get('/boleta/{id}',    [ BoletaPagoController::class, 'show'      ]);
Route::post('/boleta',        [ BoletaPagoController::class, 'store'     ]);


//ver lueguito
// comprobante ENDPOINTS--da bien solo GEt
Route::get('/comprobante',         [ ComprobantePagoController::class, 'index'     ]);
Route::get('/comprobante/{id}',    [ ComprobantePagoController::class, 'show'      ]);
Route::post('/comprobante',        [ ComprobantePagoController::class, 'store'     ]);
/// todavia no puse las interfaces de esto en el frontend


// inscripcion ENDPOINTS   GET POST da bien
//tiene interface
Route::get('/inscripcion', [ InscripcionController::class, 'index' ]);
Route::get('/inscripcion/{id}', [ InscripcionController::class, 'show' ]);
Route::post('/inscripcion', [ InscripcionController::class, 'store' ]);

Route::get('/olimpiadas/{id}/areas', [AreaController::class, 'getAreasByOlimpiada']);




// categoria ENDPOINTS  ---- GET POST da bien
//tiene interface
Route::apiResource('    ', NivelCategoriaController::class);
Route::get('/nivelCategoria',         [ NivelCategoriaController::class, 'index'     ]);
Route::get('/nivelCategoria/{id}',    [ NivelCategoriaController::class, 'show'      ]);
Route::post('/nivelCategoria',        [ NivelCategoriaController::class, 'store'     ]);

Route::put('/nivelCategoria/{id}',        [ NivelCategoriaController::class, 'update'     ]);

Route::patch('/nivelCategoria/{id}/habilitacion', [NivelCategoriaController::class, 'updateHabilitacion']); // Para actualizar solo habilitacio

//PRUEBA
Route::get('/nivelCategoria/por-area/{areaId}', [NivelCategoriaController::class, 'porArea']);


// olimpista ENDPOINTS ----------  GET POST da bien
//tiene interface
Route::get('/olimpista',         [ OlimpistaController::class, 'index'     ]);
Route::get('/olimpista/{id}',    [ OlimpistaController::class, 'show'      ]);
Route::post('/olimpista',        [ OlimpistaController::class, 'store'     ]);

//ENPOINTS DE EXCEL CONTROLLER
Route::post('/olimpistasExel', [ExelController::class, 'importarExcel'])->name('Excel.importar');
Route::post('/lee-excel', [ExelController::class,'leerExcel']);

//olimpiada

// olimpista ENDPOINTS --------------------------- GET POST da bien
//tiene interface
Route::get('/olimpiada',         [ OlimpiadaController::class, 'index'     ]);
Route::get('/olimpiada/{id}',    [ OlimpiadaController::class, 'show'      ]);
Route::post('/olimpiada',        [ OlimpiadaController::class, 'store'     ]);



/// curso

Route::get('/curso',         [ CursoController::class, 'index'     ]);
Route::get('/curso/{id}',    [ CursoController::class, 'show'      ]);
Route::post('/curso',        [ CursoController::class, 'store'     ]);


///cursoNivel

Route::get('/   ',         [ CursoNivelController::class, 'index'     ]);
Route::get('/cursoNivel/{id}',    [ CursoNivelController::class, 'show'      ]);
Route::post('/cursoNivel',        [ CursoNivelController::class, 'store'     ]);
