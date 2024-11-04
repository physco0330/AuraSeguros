import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Modulo } from '../modelos/modulo.model';

@Injectable({
  providedIn: 'root'
})
export class ModuloService {
  private baseUrl = 'http://localhost:8080/api/modulos';

  constructor(private http: HttpClient) {}

  saveModulo(modulo: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, modulo).pipe(
      catchError((error) => {
        console.error('Error guardando el módulo:', error);
        return throwError(() => new Error('Error guardando el módulo'));
      })
    );
  }

  getModulos(): Observable<Modulo[]> {
    return this.http.get<Modulo[]>(this.baseUrl).pipe(
      catchError((error) => {
        console.error('Error obteniendo los módulos:', error);
        return throwError(() => new Error('Error obteniendo los módulos'));
      })
    );
  }

  deleteModulo(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error eliminando el módulo:', error);
        return throwError(() => new Error('Error eliminando el módulo'));
      })
    );
  }

  updateModulo(modulo: Modulo): Observable<any> {
    return this.http.put(`${this.baseUrl}/${modulo.id_modulo}`, modulo).pipe( // Cambiado a id_modulo
      catchError((error) => {
        console.error('Error actualizando el módulo:', error);
        return throwError(() => new Error('Error actualizando el módulo'));
      })
    );
  }

  getModuloByNombre(nombre: string): Observable<Modulo> {
    const url = `${this.baseUrl}/nombre/${nombre}`;
    return this.http.get<Modulo>(url).pipe(
      catchError((error) => {
        console.error('Error obteniendo el módulo por nombre:', error);
        return throwError(() => new Error('Error obteniendo el módulo por nombre'));
      })
    );
  }

  getModulosByFiltro(filtro: any): Observable<Modulo[]> {
    const url = `${this.baseUrl}/buscar`;
    return this.http.post<Modulo[]>(url, filtro).pipe(
      catchError((error) => {
        console.error('Error obteniendo los módulos con filtro:', error);
        return throwError(() => new Error('Error obteniendo los módulos con filtro'));
      })
    );
  }
}
