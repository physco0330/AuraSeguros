// src/app/services/bienes.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Bien } from '../modelos/bien.model';
import { Historial } from '../modelos/historial.model';

 // Asegúrate de importar el modelo Historial

@Injectable({
  providedIn: 'root' // El servicio está disponible en toda la aplicación
})
export class BienesService {

  // URL base del backend para acceder a los servicios relacionados con bienes
  private baseUrl = 'http://localhost:8080/bien';

  constructor(private http: HttpClient) {}

  // Método para obtener bienes por código
  getBienPorCodigo(codigo: string): Observable<Bien[]> {
    // Realiza una solicitud GET al endpoint específico para obtener bienes por su código
    return this.http.get<Bien[]>(`${this.baseUrl}/codigo/${codigo}`).pipe(
      catchError((error) => {
        // Manejo de errores en la solicitud GET
        console.error('Error obteniendo el bien por código:', error);
        return throwError(() => new Error('Error obteniendo el bien por código'));
      })
    );
  }

  // Método para obtener todos los bienes
  getBienes(): Observable<Bien[]> {
    return this.http.get<Bien[]>(`${this.baseUrl}/all`).pipe(
      catchError((error) => {
        // Manejo de errores en la solicitud GET
        console.error('Error obteniendo todos los bienes:', error);
        return throwError(() => new Error('Error obteniendo todos los bienes'));
      })
    );
  }

  // Método para buscar bienes por artículo e idriesgo
  buscarBienes(articulo: string, idriesgo: string): Observable<Bien[]> {
    return this.http.get<Bien[]>(`${this.baseUrl}/listaxfecha/${articulo}/${idriesgo}`).pipe(
      catchError((error) => {
        // Manejo de errores en la solicitud GET
        console.error('Error buscando bienes por artículo e idriesgo:', error);
        return throwError(() => new Error('Error buscando bienes por artículo e idriesgo'));
      })
    );
  }

  // Método para guardar un bien
  saveBien(bien: Bien): Observable<Bien> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Bien>(`${this.baseUrl}/save`, bien, { headers }).pipe(
      catchError((error) => {
        // Manejo de errores en la solicitud POST
        console.error('Error guardando el bien:', error);
        return throwError(() => new Error('Error guardando el bien'));
      })
    );
  }

  // Método para actualizar un bien
  updateBien(bienToUpdate: Bien): Observable<string> {
    console.log('Updating bien:', bienToUpdate); // Añade esta línea para depurar
    return this.http.put<{ message: string }>(`${this.baseUrl}/update`, bienToUpdate)
      .pipe(
        map(response => response.message), // Extrae el mensaje de la respuesta
        catchError(error => {
          console.error('Error updating bien:', error); // Registra el objeto de error
          return throwError(error);
        })
      );
  }

  // Método para eliminar un bien por su código
  deleteBien(codigo: string): Observable<void> {
    // Envía una solicitud DELETE al backend para eliminar el bien con el código especificado
    return this.http.delete<void>(`${this.baseUrl}/deletePorCodigo/${codigo}`).pipe(
      // Manejo de errores en caso de que la solicitud falle
      catchError((error) => {
        // Muestra un mensaje de error en la consola
        console.error('Error eliminando el bien:', error);

        // Retorna un error observable para que el componente que hizo la llamada pueda manejarlo
        return throwError(() => new Error('Error eliminando el bien'));
      })
    );
  }

  // Método para agregar un nuevo bien
  agregarBien(nuevoBien: Bien): Observable<Bien> {
    // Configura los encabezados de la solicitud HTTP, especificando el tipo de contenido como JSON
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Envía una solicitud POST al backend para agregar el nuevo bien
    return this.http.post<Bien>(`${this.baseUrl}/add`, nuevoBien, { headers }).pipe(
      // Manejo de errores en caso de que la solicitud falle
      catchError((error) => {
        // Muestra un mensaje de error en la consola
        console.error('Error agregando el bien:', error);

        // Retorna un error observable para que el componente que hizo la llamada pueda manejarlo
        return throwError(() => new Error('Error agregando el bien'));
      })
    );
  }

  // Método para obtener el historial por código
  getHistorialByCodigo(codigo: string): Observable<Historial[]> {
    // Asumiendo que tu endpoint para obtener historial es `/historial/${codigo}`
    return this.http.get<Historial[]>(`http://localhost:8080/bien/historial/${codigo}`).pipe(
      catchError((error) => {
        // Manejo de errores en la solicitud GET
        console.error('Error obteniendo el historial por código:', error);
        return throwError(() => new Error('Error obteniendo el historial por código'));
      })
    );
  }
}
