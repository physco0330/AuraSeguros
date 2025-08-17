import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Bien } from '../modelos/bien.model'; 
import { Historial } from '../modelos/historial.model'; 

@Injectable({
  providedIn: 'root'
})
export class BienesService {
  private baseUrl = 'http://localhost:8080/bien';

  constructor(private http: HttpClient) {}

  // 🔎 Buscar bienes por empresa
  buscarPorNombreEmpresa(nombreEmpresa: string): Observable<Bien[]> {
    return this.http.get<Bien[]>(`${this.baseUrl}/empresa/${nombreEmpresa}`).pipe(
      catchError((error) => {
        console.error('Error buscando bienes por nombre de empresa:', error);
        return throwError(() => new Error('Error buscando bienes por nombre de empresa'));
      })
    );
  }

  getBienesByEmpresa(nombre: string): Observable<Bien[]> {
    return this.http.get<Bien[]>(`${this.baseUrl}/empresa/${nombre}`);
  }

  getBienesByEmpresaId(empresaId: number): Observable<Bien[]> {
    return this.http.get<Bien[]>(`${this.baseUrl}/empresa/${empresaId}`);
  }

  // 🔎 Buscar bien por código
  getBienPorCodigo(codigo: string): Observable<Bien[]> {
    return this.http.get<Bien[]>(`${this.baseUrl}/codigo/${codigo}`).pipe(
      catchError((error) => {
        console.error('Error obteniendo el bien por código:', error);
        return throwError(() => new Error('Error obteniendo el bien por código'));
      })
    );
  }

  // 📋 Obtener todos los bienes
  getBienes(): Observable<Bien[]> {
    return this.http.get<Bien[]>(`${this.baseUrl}/all`).pipe(
      catchError((error) => {
        console.error('Error obteniendo todos los bienes:', error);
        return throwError(() => new Error('Error obteniendo todos los bienes'));
      })
    );
  }

  // 🔎 Buscar bienes por artículo e idriesgo
  buscarBienes(articulo: string, idriesgo: string): Observable<Bien[]> {
    return this.http.get<Bien[]>(`${this.baseUrl}/listaxfecha/${articulo}/${idriesgo}`).pipe(
      catchError((error) => {
        console.error('Error buscando bienes por artículo e idriesgo:', error);
        return throwError(() => new Error('Error buscando bienes por artículo e idriesgo'));
      })
    );
  }

  // 💾 Guardar un bien nuevo con relación a empresa
  saveBien(bien: Bien, idEmpresa: number): Observable<Bien> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.baseUrl}/save?idEmpresa=${idEmpresa}`;
    return this.http.post<Bien>(url, bien, { headers }).pipe(
      catchError((error) => {
        console.error('Error guardando el bien:', error);
        return throwError(() => new Error('Error guardando el bien'));
      })
    );
  }

  // ✏️ Actualizar un bien
  updateBien(bienToUpdate: Bien): Observable<string> {
    console.log('Updating bien:', bienToUpdate);
    return this.http.put<{ message: string }>(`${this.baseUrl}/update`, bienToUpdate)
      .pipe(
        map(response => response.message),
        catchError(error => {
          console.error('Error actualizando bien:', error);
          return throwError(() => new Error('Error actualizando bien'));
        })
      );
  }

  // 🗑️ Eliminar un bien
  deleteBien(codigo: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deletePorCodigo/${codigo}`).pipe(
      catchError((error) => {
        console.error('Error eliminando el bien:', error);
        return throwError(() => new Error('Error eliminando el bien'));
      })
    );
  }

  // ➕ Agregar un nuevo bien
  agregarBien(nuevoBien: Bien): Observable<Bien> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Bien>(`${this.baseUrl}/add`, nuevoBien, { headers }).pipe(
      catchError((error) => {
        console.error('Error agregando el bien:', error);
        return throwError(() => new Error('Error agregando el bien'));
      })
    );
  }

  // 📂 Subir CSV con bienes
  subirArchivoCSV(archivo: FormData, idEmpresa: number): Observable<any> {
    const url = `${this.baseUrl}/upload-csv`;
    archivo.append('idEmpresa', idEmpresa.toString());

    return this.http.post(url, archivo).pipe(
      catchError((error) => {
        console.error('Error al subir el archivo CSV:', error);
        return throwError(() => new Error('Error al subir el archivo CSV'));
      })
    );
  }

  // 📜 Historial de modificaciones (bienes)
  getHistorialByCodigo(codigo: string): Observable<Historial[]> {
    return this.http.get<Historial[]>(`${this.baseUrl}/historial/${codigo}`).pipe(
      catchError((error) => {
        console.error('Error obteniendo el historial por código:', error);
        return throwError(() => new Error('Error obteniendo el historial por código'));
      })
    );  
  }

  // 📜 Historial de seguros
  getHistorialSegurosByCodigo(codigo: string): Observable<Historial[]> {
    return this.http.get<Historial[]>(`${this.baseUrl}/historial-seguros/${codigo}`).pipe(
      catchError((error) => {
        console.error('Error obteniendo el historial de seguros por código:', error);
        return throwError(() => new Error('Error obteniendo el historial de seguros por código'));
      })
    );
  }
}
