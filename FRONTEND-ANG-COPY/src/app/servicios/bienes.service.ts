// src/app/services/bienes.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Bien } from '../modelos/bien.model';
import { Historial } from '../modelos/historial.model'; // Asegúrate de que la ruta es correcta
import { HistorialService } from './historial.service'; // Importa el servicio de historial

@Injectable({
  providedIn: 'root'
})
export class BienesService {

  private baseUrl = 'http://localhost:8080/bien';

  constructor(
    private http: HttpClient,
    private historialService: HistorialService
  ) { }

  // Método para obtener bienes por código
  getBienPorCodigo(codigo: string): Observable<Bien[]> {
    return this.http.get<Bien[]>(`${this.baseUrl}/codigo/${codigo}`).pipe(
      catchError(error => {
        console.error('Error obteniendo el bien por código:', error);
        return throwError(() => new Error('Error obteniendo el bien por código'));
      })
    );
  }

  // Método para obtener todos los bienes
  getBienes(): Observable<Bien[]> {
    return this.http.get<Bien[]>(`${this.baseUrl}/all`).pipe(
      catchError(error => {
        console.error('Error obteniendo todos los bienes:', error);
        return throwError(() => new Error('Error obteniendo todos los bienes'));
      })
    );
  }

  // Método para buscar bienes por artículo e idriesgo
  buscarBienes(articulo: string, idriesgo: string): Observable<Bien[]> {
    return this.http.get<Bien[]>(`${this.baseUrl}/listaxfecha/${articulo}/${idriesgo}`).pipe(
      catchError(error => {
        console.error('Error buscando bienes por artículo e idriesgo:', error);
        return throwError(() => new Error('Error buscando bienes por artículo e idriesgo'));
      })
    );
  }

  // Método para guardar un bien
  saveBien(bien: Bien): Observable<Bien> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Bien>(`${this.baseUrl}/save`, bien, { headers }).pipe(
      tap(savedBien => {
        // Llama al método para registrar el historial después de guardar el bien
        this.registrarHistorial('save', savedBien);
      }),
      catchError(error => {
        console.error('Error guardando el bien:', error);
        return throwError(() => new Error('Error guardando el bien'));
      })
    );
  }

  // Método para actualizar un bien
  updateBien(bienToUpdate: Bien): Observable<string> {
    console.log('Updating bien:', bienToUpdate);
    return this.http.put<{ message: string }>(`${this.baseUrl}/update`, bienToUpdate).pipe(
      tap(() => {
        // Llama al método para registrar el historial después de actualizar el bien
        this.registrarHistorial('update', bienToUpdate);
      }),
      map(response => response.message),
      catchError(error => {
        console.error('Error updating bien:', error);
        return throwError(() => new Error('Error updating bien'));
      })
    );
  }

  // Método para eliminar un bien por su código
  deleteBien(codigo: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deletePorCodigo/${codigo}`).pipe(
      tap(() => {
        // Llama al método para registrar el historial después de eliminar el bien
        this.registrarHistorial('delete', { codigo });
      }),
      catchError(error => {
        console.error('Error eliminando el bien:', error);
        return throwError(() => new Error('Error eliminando el bien'));
      })
    );
  }

  // Método para agregar un nuevo bien
  agregarBien(nuevoBien: Bien): Observable<Bien> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Bien>(`${this.baseUrl}/add`, nuevoBien, { headers }).pipe(
      tap(() => {
        // Llama al método para registrar el historial después de agregar el bien
        this.registrarHistorial('add', nuevoBien);
      }),
      catchError(error => {
        console.error('Error agregando el bien:', error);
        return throwError(() => new Error('Error agregando el bien'));
      })
    );
  }

  // Método para registrar la acción en el historial
  private registrarHistorial(accion: string, bien: Bien | { codigo: string }): void {
    // Prepara los datos del historial
    const historialData: Historial = {
      id: Date.now(), // Genera un ID temporal (ajusta según tu lógica de ID)
      tabla_afectada: 'bien',
      id_registro: 'id' in bien ? bien.id : undefined, // Si es un objeto de tipo Bien, usa su ID
      campo_editado: accion,
      valor_anterior: '', // Asigna una cadena vacía si no tienes valor anterior
      valor_nuevo: JSON.stringify(bien), // Convierte el objeto en una cadena JSON
      usuario: 'admin', // Reemplázalo con el usuario actual si es necesario
      fecha_edicion: new Date()
    };

    // Llama al servicio de historial para registrar la acción
    this.historialService.agregarHistorial(historialData).subscribe({
      error: (error) => {
        console.error('Error registrando en el historial:', error);
      }
    });
  }
}
