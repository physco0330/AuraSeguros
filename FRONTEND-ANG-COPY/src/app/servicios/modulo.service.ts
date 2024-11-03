import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Modulo } from '../modelos/modulo.model'; // Importar el modelo de módulo

@Injectable({
  providedIn: 'root' // El servicio está disponible en toda la aplicación
})
export class ModuloService {
  private baseUrl = 'http://localhost:8080/api/modulos'; // URL base del backend para acceder a los servicios relacionados con módulos

  constructor(private http: HttpClient) {}

  // Método para guardar un nuevo módulo
  saveModulo(modulo: FormData): Observable<any> {
    return this.http.post<any>(this.baseUrl, modulo).pipe(
      catchError((error) => {
        console.error('Error guardando el módulo:', error);
        return throwError(() => new Error('Error guardando el módulo'));
      })
    );
  }

  // Método para obtener todos los módulos
  getModulos(): Observable<Modulo[]> {
    return this.http.get<Modulo[]>(this.baseUrl).pipe(
      catchError((error) => {
        console.error('Error obteniendo los módulos:', error);
        return throwError(() => new Error('Error obteniendo los módulos'));
      })
    );
  }

  // Método para eliminar un módulo por su ID
  deleteModulo(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error eliminando el módulo:', error);
        return throwError(() => new Error('Error eliminando el módulo'));
      })
    );
  }

  // Método para actualizar un módulo
  updateModulo(modulo: Modulo): Observable<any> {
    return this.http.put(`${this.baseUrl}/${modulo.id}`, modulo).pipe(
      catchError((error) => {
        console.error('Error actualizando el módulo:', error);
        return throwError(() => new Error('Error actualizando el módulo'));
      })
    );
  }

  // Método para obtener un módulo por su nombre
  getModuloByNombre(nombre: string): Observable<Modulo> {
    const url = `${this.baseUrl}/nombre/${nombre}`; // Asegúrate de que la URL coincida con tu backend
    return this.http.get<Modulo>(url).pipe(
      catchError((error) => {
        console.error('Error obteniendo el módulo por nombre:', error);
        return throwError(() => new Error('Error obteniendo el módulo por nombre'));
      })
    );
  }

  // NUEVO: Método para obtener módulos por otros criterios (si es necesario)
  getModulosByFiltro(filtro: any): Observable<Modulo[]> {
    const url = `${this.baseUrl}/buscar`; // Ruta para búsquedas avanzadas, ajusta según tu API
    return this.http.post<Modulo[]>(url, filtro).pipe(
      catchError((error) => {
        console.error('Error obteniendo los módulos con filtro:', error);
        return throwError(() => new Error('Error obteniendo los módulos con filtro'));
      })
    );
  }
}
