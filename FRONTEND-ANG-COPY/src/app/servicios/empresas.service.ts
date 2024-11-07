import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Empresa } from '../modelos/empresa.model';

@Injectable({
  providedIn: 'root' // El servicio está disponible en toda la aplicación
})
export class EmpresasService {
  private baseUrl = 'http://localhost:8080/api/empresas'; // URL base del backend para acceder a los servicios relacionados con empresas
  private baseUrl2 = 'http://localhost:8080/api'; // URL base para otros servicios, como los módulos
  constructor(private http: HttpClient) {}

  // Método para guardar una nueva empresa utilizando FormData
  saveEmpresa(empresa: FormData): Observable<any> {
    return this.http.post<any>(this.baseUrl, empresa).pipe(
      catchError((error) => {
        console.error('Error guardando la empresa:', error);
        return throwError(() => new Error('Error guardando la empresa'));
      })
    );
  }

  // Método para obtener todas las empresas
  getEmpresas(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(`${this.baseUrl}`).pipe(
      catchError((error) => {
        console.error('Error obteniendo las empresas:', error);
        return throwError(() => new Error('Error obteniendo las empresas'));
      })
    );
  }

  // Método para eliminar una empresa por su ID
  deleteEmpresa(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error eliminando la empresa:', error);
        return throwError(() => new Error('Error eliminando la empresa'));
      })
    );
  }

  // Método para actualizar una empresa
  updateEmpresa(empresa: Empresa): Observable<any> {
    return this.http.put(`${this.baseUrl}/${empresa.id_empresa}`, empresa).pipe(
      catchError((error) => {
        console.error('Error actualizando la empresa:', error);
        return throwError(() => new Error('Error actualizando la empresa'));
      })
    );
  }

  // Método para obtener una empresa por su nombre
  getEmpresaByNombre(nombre: string): Observable<Empresa> {
    const url = `${this.baseUrl}/nombre/${nombre}`; // Asegúrate de que la URL coincida con tu backend
    return this.http.get<Empresa>(url).pipe(
      catchError((error) => {
        console.error('Error obteniendo la empresa por nombre:', error);
        return throwError(() => new Error('Error obteniendo la empresa por nombre'));
      })
    );
  }

  // NUEVO: Método para obtener empresas por correo
  getEmpresaByCorreo(correo: string): Observable<Empresa> {
    const url = `${this.baseUrl}/correo/${correo}`;
    return this.http.get<Empresa>(url).pipe(
      catchError((error) => {
        console.error('Error obteniendo la empresa por correo:', error);
        return throwError(() => new Error('Error obteniendo la empresa por correo'));
      })
    );
  }

  // NUEVO: Método para obtener empresas según múltiples criterios
  getEmpresasByFiltro(filtro: any): Observable<Empresa[]> {
    const url = `${this.baseUrl}/buscar`; // Ruta para búsquedas avanzadas, ajusta según tu API
    return this.http.post<Empresa[]>(url, filtro).pipe(
      catchError((error) => {
        console.error('Error obteniendo las empresas con filtro:', error);
        return throwError(() => new Error('Error obteniendo las empresas con filtro'));
      })
    );
  }

  // NUEVO: Método para obtener empresas por ID del módulo
  getEmpresasByModuloId(moduloId: string): Observable<Empresa[]> {
    const url = `${this.baseUrl2}/modulos/${moduloId}/empresas`; // Asegúrate de que la ruta corresponda a tu API
    return this.http.get<Empresa[]>(url).pipe(
      catchError((error) => {
        console.error('Error obteniendo empresas por ID de módulo:', error);
        return throwError(() => new Error('Error obteniendo empresas por ID de módulo'));
      })
    );
  }
}
