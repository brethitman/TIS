<?php

namespace App\Http\Controllers\ComprobantePago;

use App\Http\Controllers\Controller;
use App\Http\Resources\ComprobantePago\ComprobantePagoResource;
use App\Http\Resources\ComprobantePagoCollection;
use App\Models\ComprobantePago;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ComprobantePagoController extends Controller
{
    protected $resource = ComprobantePagoResource::class;
    protected $collectionResource = ComprobantePagoCollection::class;

    public function index()
    {
        $comprobantes = ComprobantePago::with(['boletaPago', 'boletaPago.inscripcion'])->orderBy("created_at", "desc")->paginate(10);
        return ComprobantePagoResource::collection($comprobantes);


    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validar los datos recibidos
        $request->validate([
            'id_boleta' => 'required|exists:boleta_pagos,id_boleta',
            'archivo_comprobante' => 'required|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'numero_comprobante' => 'nullable|string|max:50',
            'nombre_pagador' => 'nullable|string|max:100',
            'estado_verificacion' => 'nullable|in:Pendiente,Verificado,Rechazado',
            'fecha_subida' => 'required|date',
        ]);

        // Subir archivo
        $path = $request->file('archivo_comprobante')->store('comprobantes', 'public');

        // Crear el nuevo comprobante
        $comprobantePago = ComprobantePago::create([
            'id_boleta' => $request->id_boleta,
            'archivo_comprobante' => $path,
            'numero_comprobante' => $request->numero_comprobante,
            'nombre_pagador' => $request->nombre_pagador,
            'estado_verificacion' => $request->estado_verificacion ?? 'Pendiente',
            'fecha_subida' => $request->fecha_subida,
        ]);

        return response()->json([
            'message' => 'Comprobante de pago creado exitosamente',
            'comprobantePago' => new ComprobantePagoResource($comprobantePago)
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $comprobantePago = ComprobantePago::with('boletaPago')->findOrFail($id);
        return new ComprobantePagoResource($comprobantePago);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $comprobantePago = ComprobantePago::findOrFail($id);

        // Validar los datos recibidos
        $validatedData = $request->validate([
            'id_boleta' => 'required|exists:boleta_pagos,id_boleta',
            'archivo_comprobante' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'numero_comprobante' => 'nullable|string|max:50',
            'nombre_pagador' => 'nullable|string|max:100',
            'estado_verificacion' => 'nullable|in:Pendiente,Verificado,Rechazado',
            'fecha_subida' => 'nullable|date',
        ]);

        // Subir archivo si se proporciona
        if ($request->hasFile('archivo_comprobante')) {
            // Eliminar archivo anterior si existe
            if (Storage::exists($comprobantePago->archivo_comprobante)) {
                Storage::delete($comprobantePago->archivo_comprobante);
            }

            // Subir el nuevo archivo
            $path = $request->file('archivo_comprobante')->store('comprobantes', 'public');
            $validatedData['archivo_comprobante'] = $path;
        }

        // Actualizar el comprobante
        $comprobantePago->update($validatedData);

        return response()->json([
            'message' => 'Comprobante de pago actualizado exitosamente',
            'comprobantePago' => new ComprobantePagoResource($comprobantePago)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $comprobantePago = ComprobantePago::findOrFail($id);

        // Eliminar archivo si existe
        if (Storage::exists($comprobantePago->archivo_comprobante)) {
            Storage::delete($comprobantePago->archivo_comprobante);
        }

        // Eliminar el comprobante
        $comprobantePago->delete();

        return response()->json([
            'message' => 'Comprobante de pago eliminado exitosamente'
        ]);
    }
}
