import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Empresa } from '../modelos/empresa.model';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
  private baseUrl = 'http://localhost:8080/api/empresas'; // URL base del backend para empresas
  private baseUrl2 = 'http://localhost:8080/api'; // URL base para la asociación de empresa-módulo

  constructor(private http: HttpClient) {}

  // Método para guardar una nueva empresa y luego asociarla al módulo en la tabla intermedia
  saveEmpresa(empresa: FormData, idModulo: number): Observable<any> {
    return this.http.post<Empresa>(this.baseUrl, empresa).pipe(
      switchMap((nuevaEmpresa) => {
        if (nuevaEmpresa.id_empresa) {
          // Si la empresa se guarda correctamente, asociarla al módulo
          return this.asociarEmpresaModulo(nuevaEmpresa.id_empresa, idModulo);
        } else {
          // Error si no se obtiene el ID de la empresa
          return throwError(() => new Error('ID de empresa no definido.'));
        }
      }),
      catchError((error) => {
        console.error('Error guardando la empresa y asociándola al módulo:', error);
        return throwError(() => new Error('Error al guardar la empresa y asociarla al módulo'));
      })
    );
  }

  // Método privado para asociar una empresa a un módulo en la tabla intermedia
  private asociarEmpresaModulo(idEmpresa: number, idModulo: number): Observable<any> {
    const url = `${this.baseUrl2}/empresas-modulos`; // Endpoint de la API para la asociación
    return this.http.post<any>(url, { id_empresa: idEmpresa, id_modulo: idModulo }).pipe(
      catchError((error) => {
        console.error('Error al asociar empresa con módulo:', error);
        return throwError(() => new Error('Error al asociar empresa con módulo'));
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
    const url = `${this.baseUrl}/nombre/${nombre}`;
    return this.http.get<Empresa>(url).pipe(
      catchError((error) => {
        console.error('Error obteniendo la empresa por nombre:', error);
        return throwError(() => new Error('Error obteniendo la empresa por nombre'));
      })
    );
  }

  // Método para obtener empresas por correo
  getEmpresaByCorreo(correo: string): Observable<Empresa> {
    const url = `${this.baseUrl}/correo/${correo}`;
    return this.http.get<Empresa>(url).pipe(
      catchError((error) => {
        console.error('Error obteniendo la empresa por correo:', error);
        return throwError(() => new Error('Error obteniendo la empresa por correo'));
      })
    );
  }

  // Método para obtener empresas según múltiples criterios
  getEmpresasByFiltro(filtro: any): Observable<Empresa[]> {
    const url = `${this.baseUrl}/buscar`;
    return this.http.post<Empresa[]>(url, filtro).pipe(
      catchError((error) => {
        console.error('Error obteniendo las empresas con filtro:', error);
        return throwError(() => new Error('Error obteniendo las empresas con filtro'));
      })
    );
  }

  // Método para obtener empresas por ID del módulo
  getEmpresasByModuloId(moduloId: string): Observable<Empresa[]> {
    const url = `${this.baseUrl2}/modulos/${moduloId}/empresas`;
    return this.http.get<Empresa[]>(url).pipe(
      catchError((error) => {
        console.error('Error obteniendo empresas por ID de módulo:', error);
        return throwError(() => new Error('Error obteniendo empresas por ID de módulo'));
      })
    );
  }
}
