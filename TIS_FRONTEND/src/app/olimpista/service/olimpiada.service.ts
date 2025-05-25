import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { Olimpiada } from '../interfaces/olimpiada-interfase';

@Injectable({
  providedIn: 'root'
})
export class OlimpiadaService {
  private apiUrl = 'http://localhost:8000/api/olimpiada'; // URL base para endpoints de olimpiada

  constructor(private http: HttpClient) {}

  // Crear una nueva olimpiada
  createOlimpiada(olimpiada: Olimpiada): Observable<Olimpiada> {
    console.log('Datos recibidos en el servicio:', olimpiada);
    
    const payload = {
      ...olimpiada,
      fecha_inicio: this.formatDateToBackend(olimpiada.fecha_inicio),
      fecha_final: this.formatDateToBackend(olimpiada.fecha_final),
      fecha_inscripcion_inicio: olimpiada.fecha_inscripcion_inicio
        ? this.formatDateToBackend(olimpiada.fecha_inscripcion_inicio)
        : null,
      fecha_inscripcion_final: olimpiada.fecha_inscripcion_final
        ? this.formatDateToBackend(olimpiada.fecha_inscripcion_final)
        : null,
    };
    
    console.log('Payload final que se envía al backend:', payload);
    
    return this.http.post<Olimpiada>(this.apiUrl, payload);
  }

  // Obtener todas las olimpiadas
  getOlimpiadas(): Observable<Olimpiada[]> {
    return this.http.get<Olimpiada[]>(this.apiUrl)
      .pipe(
        tap(olimpiadas => {
          console.log('Olimpiadas obtenidas:', olimpiadas);
        }),
        catchError(this.handleError)
      );
  }

  // Obtener una olimpiada por ID - VERSIÓN MEJORADA CON DEBUG
  getOlimpiadaById(id: number): Observable<Olimpiada> {
    console.log(`🔍 Solicitando olimpiada con ID: ${id}`);
    console.log(`📡 URL completa: ${this.apiUrl}/${id}`);
    
    return this.http.get<Olimpiada>(`${this.apiUrl}/${id}`)
      .pipe(
        tap(response => {
          console.log('✅ Respuesta recibida del backend:', response);
          console.log('📋 Campos disponibles en la respuesta:', Object.keys(response || {}));
          
          // Verificar campos específicos
          const camposEsperados = [
            'nombre_olimpiada',
            'descripcion_olimpiada', 
            'presentacion',
            'requisitos',
            'premios',
            'informacion_adicional',
            'fecha_inscripcion_inicio',
            'fecha_inscripcion_final',
            'fecha_inicio',
            'fecha_final'
          ];
          
          console.log('🔍 Verificación de campos esperados:');
          camposEsperados.forEach(campo => {
            const valor = (response as any)?.[campo];
            console.log(`  - ${campo}: ${valor !== undefined ? '✅ Presente' : '❌ Ausente'} (${typeof valor})`);
            if (valor !== undefined && valor !== null) {
              console.log(`    Valor: "${valor}"`);
            }
          });
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('❌ Error al obtener olimpiada por ID:', error);
          console.error('📊 Status:', error.status);
          console.error('💬 Mensaje:', error.message);
          console.error('🔗 URL:', error.url);
          
          if (error.error) {
            console.error('📄 Detalle del error:', error.error);
          }
          
          return throwError(() => new Error(`Error al cargar olimpiada: ${error.message}`));
        })
      );
  }

  // Método alternativo para obtener olimpiada completa (si existe endpoint diferente)
  getOlimpiadaCompleta(id: number): Observable<Olimpiada> {
    console.log(`🔍 Intentando obtener olimpiada completa con ID: ${id}`);
    
    // Intentar diferentes endpoints posibles
    const endpoints = [
      `${this.apiUrl}/${id}/completa`,
      `${this.apiUrl}/${id}/detalle`,
      `${this.apiUrl}/${id}?incluir=todos`,
      `${this.apiUrl}/completa/${id}`
    ];
    
    // Por ahora, usar el endpoint principal pero con parámetros adicionales
    return this.http.get<Olimpiada>(`${this.apiUrl}/${id}`, {
      params: {
        incluir: 'presentacion,requisitos,premios,informacion_adicional,fechas_inscripcion'
      }
    }).pipe(
      tap(response => {
        console.log('✅ Respuesta de olimpiada completa:', response);
      }),
      catchError((error) => {
        console.warn('⚠️ Endpoint con parámetros falló, intentando endpoint básico...');
        // Fallback al método básico
        return this.getOlimpiadaById(id);
      })
    );
  }

  // Actualizar una olimpiada
  updateOlimpiada(id: number, data: Partial<Olimpiada> | any): Observable<any> {
    const payload = {
      ...data,
      fecha_inicio: data.fecha_inicio instanceof Date ? this.formatDateToBackend(data.fecha_inicio) : data.fecha_inicio,
      fecha_final: data.fecha_final instanceof Date ? this.formatDateToBackend(data.fecha_final) : data.fecha_final,
      fecha_inscripcion_inicio: data.fecha_inscripcion_inicio instanceof Date
        ? this.formatDateToBackend(data.fecha_inscripcion_inicio)
        : data.fecha_inscripcion_inicio,
      fecha_inscripcion_final: data.fecha_inscripcion_final instanceof Date
        ? this.formatDateToBackend(data.fecha_inscripcion_final)
        : data.fecha_inscripcion_final,
    };
    return this.http.put(`${this.apiUrl}/${id}`, payload);
  }
  
  private formatDateToBackend(date: Date | string): string {
    // Si ya es una cadena en formato correcto, la devolvemos
    if (typeof date === 'string') {
      // Verificar si ya está en formato YYYY-MM-DD
      if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return date;
      }
      // Si es una cadena pero no en el formato correcto, convertir a Date
      date = new Date(date);
    }
    
    // Si es un objeto Date, formatear
    if (date instanceof Date && !isNaN(date.getTime())) {
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    }
    
    // Si no es válido, lanzar error
    throw new Error('Fecha inválida proporcionada');
  }

  // Obtener una olimpiada con sus áreas relacionadas
  getOlimpiadaWithAreas(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}/con-areas`);
  }

  // Método para agregar un área a una olimpiada (si es necesario)
  addAreaToOlimpiada(olimpiadaId: number, areaData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${olimpiadaId}/areas`, areaData);
  }

  // Obtener áreas de una olimpiada específica
  getAreasByOlimpiada(olimpiadaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${olimpiadaId}/areas`);
  }

  deleteOlimpiada(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Método para manejar errores
  private handleError(error: HttpErrorResponse) {
    console.error('Error en servicio olimpiada:', error);
    
    let errorMessage = 'Error desconocido';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;
    }
    
    return throwError(() => new Error(errorMessage));
  }

  // Método de prueba para verificar conectividad
  testConnection(): Observable<any> {
    console.log('🔗 Probando conexión con:', this.apiUrl);
    return this.http.get(`${this.apiUrl}/test`, { responseType: 'text' })
      .pipe(
        tap(response => console.log('✅ Conexión exitosa:', response)),
        catchError(error => {
          console.error('❌ Error de conexión:', error);
          return throwError(() => error);
        })
      );
  }
}