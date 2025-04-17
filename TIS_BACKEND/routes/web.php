<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::middleware(['auth', 'tutor'])->group(function () {
    Route::get('/tutor/upload-students', [ExcelController::class, 'showUploadForm'])->name('tutor.upload-form');
    Route::post('/tutor/upload-students', [ExcelController::class, 'processUpload'])->name('tutor.upload-students');
});

Route::get('/descargar-plantilla', function () {
    return Storage::download('public/plantillas/Formato_Inscripcion.xlsx');
})->name('descargar.plantilla');