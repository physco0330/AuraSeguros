import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Historial } from '../modelos/historial.model'; // ajusta la ruta según tu proyecto

@Injectable({
  providedIn: 'root'
})
export class HistorialSegurosService {
  private baseUrl = 'http://localhost:8080/api/historial-seguros';

  constructor(private http: HttpClient) {}

  getHistorialByCodigo(codigo: string): Observable<Historial[]> {
    return this.http.get<Historial[]>(`${this.baseUrl}/codigo/${codigo}`)
      .pipe(
        catchError(error => {
          console.error('Error obteniendo historial por código:', error);
          return throwError(() => new Error('Error obteniendo historial por código'));
        })
      );
  }

  getHistorialByIdBien(idBien: number): Observable<Historial[]> {
    return this.http.get<Historial[]>(`${this.baseUrl}/bien/${idBien}`)
      .pipe(
        catchError(error => {
          console.error('Error obteniendo historial por idBien:', error);
          return throwError(() => new Error('Error obteniendo historial por idBien'));
        })
      );
  }
}
