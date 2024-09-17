import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Bien } from '../modelos/bien.model';
import { Historial } from '../modelos/historial.model';
import { HistorialService } from './historial.service';

@Injectable({
  providedIn: 'root'
})
export class BienesService {

  private baseUrl = 'http://localhost:8080/bien'; // Base URL para el recurso de "bienes"
  private empresaUrl = 'http://localhost:8080/empresa'; // URL para el recurso de "empresas"

  constructor(
    private http: HttpClient,
    private historialService: HistorialService
  ) {}

  // Métodos para manejar bienes
  getBienPorCodigo(codigo: string): Observable<Bien[]> {
    return this.http.get<Bien[]>(`${this.baseUrl}/codigo/${codigo}`).pipe(
      catchError(error => {
        console.error('Error obteniendo el bien por código:', error);
        return throwError(() => new Error('Error obteniendo el bien por código'));
      })
    );
  }

  getBienes(): Observable<Bien[]> {
    return this.http.get<Bien[]>(`${this.baseUrl}/all`).pipe(
      catchError(error => {
        console.error('Error obteniendo todos los bienes:', error);
        return throwError(() => new Error('Error obteniendo todos los bienes'));
      })
    );
  }

  // Método para guardar una nueva empresa
  saveEmpresa(empresa: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.empresaUrl}/save`, empresa, { headers }).pipe(
      catchError(error => {
        console.error('Error guardando la empresa:', error);
        return throwError(() => new Error('Error guardando la empresa'));
      })
    );
  }

  // Métodos para manejar el historial (ejemplos anteriores)
  private registrarHistorial(accion: string, bien: Bien | { codigo: string }): void {
    const historialData: Historial = {
      id: Date.now(),
      tabla_afectada: 'bien',
      id_registro: 'id' in bien ? bien.id : undefined,
      campo_editado: accion,
      valor_anterior: '',
      valor_nuevo: JSON.stringify(bien),
      usuario: 'admin',
      fecha_edicion: new Date()
    };

    this.historialService.agregarHistorial(historialData).subscribe({
      error: (error) => {
        console.error('Error registrando en el historial:', error);
      }
    });
  }
}
