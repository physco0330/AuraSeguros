// src/app/servicios/empresas.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Empresa } from '../modelos/empresa.model';

@Injectable({
  providedIn: 'root' // El servicio está disponible en toda la aplicación
})
export class EmpresasService {
  private baseUrl = 'http://localhost:8080/empresa'; // URL base del backend para acceder a los servicios relacionados con empresas

  constructor(private http: HttpClient) {}

  // Método para guardar una nueva empresa
  saveEmpresa(empresa: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/save`, empresa).pipe(
      catchError((error) => {
        console.error('Error guardando la empresa:', error);
        return throwError(() => new Error('Error guardando la empresa'));
      })
    );
  }

  // Método para obtener todas las empresas
  getEmpresas(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(`${this.baseUrl}/all`).pipe(
      catchError((error) => {
        console.error('Error obteniendo las empresas:', error);
        return throwError(() => new Error('Error obteniendo las empresas'));
      })
    );
  }
}
