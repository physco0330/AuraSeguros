import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Empresa } from '../modelos/empresa.model';

@Injectable({
  providedIn: 'root' // El servicio está disponible en toda la aplicación
})
export class EmpresasService {
  private baseUrl = 'http://localhost:8080/api/empresas'; // URL base del backend para acceder a los servicios relacionados con empresas

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
    return this.http.get<Empresa[]>(`${this.baseUrl}`).pipe( // Corrige la URL si es necesario
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



  // NUEVO: Método para obtener una empresa por su nombre
  getEmpresaByNombre(nombre: string): Observable<Empresa> {
    const url = `${this.baseUrl}/nombre/${nombre}`; // Asegúrate de que la URL coincida con tu backend
    return this.http.get<Empresa>(url).pipe(
      catchError((error) => {
        console.error('Error obteniendo la empresa por nombre:', error);
        return throwError(() => new Error('Error obteniendo la empresa por nombre'));
      })
    );
  }
}
