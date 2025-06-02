<?php

namespace App\Http\Controllers\BoletaPago;

use App\Http\Controllers\Controller;
use App\Http\Resources\BoletaPago\BoletaPagoCollection;
use App\Http\Resources\BoletaPago\BoletaPagoResource;
use App\Models\BoletaPago;
use Illuminate\Http\Request;

class BoletaPagoController extends Controller
{
    protected $resource = BoletaPagoResource::class;
    protected $collectionResource = BoletaPagoCollection::class;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $boletas = BoletaPago::with('inscripcion')->orderBy("created_at", "desc")->simplePaginate (10);
        return new BoletaPagoCollection($boletas);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validar los datos recibidos
        $request->validate([
            'id_inscripcion' => 'required|exists:inscripcions,id_inscripcion',
            'numero_boleta' => 'required|string|max:50|unique:boleta_pagos',
            'monto' => 'required|numeric|min:0',
            'fecha_generacion' => 'required|date',
        ]);

        // Crear la nueva boleta de pago
        $boletaPago = BoletaPago::create($request->all());

        return response()->json([
            'message' => 'Boleta de pago creada exitosamente',
            'boletaPago' => new BoletaPagoResource($boletaPago)
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $boletaPago = BoletaPago::with('inscripcion')->findOrFail($id);
        return new BoletaPagoResource($boletaPago);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $boletaPago = BoletaPago::findOrFail($id);

        // Validar los datos recibidos
        $request->validate([
            'id_inscripcion' => 'required|exists:inscripcions,id_inscripcion',
            'numero_boleta' => 'required|string|max:50|unique:boleta_pagos,numero_boleta,'.$id.',id_boleta',
            'monto' => 'required|numeric|min:0',
            'fecha_generacion' => 'required|date',
        ]);

        // Actualizar la boleta de pago
        $boletaPago->update($request->all());

        return response()->json([
            'message' => 'Boleta de pago actualizada exitosamente',
            'boletaPago' => new BoletaPagoResource($boletaPago)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $boletaPago = BoletaPago::findOrFail($id);
        $boletaPago->delete();

        return response()->json([
            'message' => 'Boleta de pago eliminada exitosamente'
        ]);
    }
}
