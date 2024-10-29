import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Bien } from '../modelos/bien.model'; // Importar modelo Bien
import { Historial } from '../modelos/historial.model'; // Importar modelo Historial

@Injectable({
  providedIn: 'root' // El servicio está disponible en toda la aplicación
})
export class BienesService {
  // URL base del backend para acceder a los servicios relacionados con bienes
  private baseUrl = 'http://localhost:8080/bien';

  constructor(private http: HttpClient) {}

  // Método para buscar bienes por nombre de empresa
  buscarPorNombreEmpresa(nombreEmpresa: string): Observable<Bien[]> {
    return this.http.get<Bien[]>(`${this.baseUrl}/empresa/${nombreEmpresa}`).pipe(
      catchError((error) => {
        console.error('Error buscando bienes por nombre de empresa:', error);
        return throwError(() => new Error('Error buscando bienes por nombre de empresa'));
      })
    );
  }

  // Método para obtener bienes por empresa
  getBienesByEmpresa(nombre: string): Observable<Bien[]> {
    return this.http.get<Bien[]>(`${this.baseUrl}/empresa/${nombre}`); // Cambié apiUrl a baseUrl
  }

  getBienesByEmpresaId(empresaId: number): Observable<Bien[]> {
    return this.http.get<Bien[]>(`${this.baseUrl}/empresa/${empresaId}`); // Cambié apiUrl a baseUrl
  }



  // Método para obtener bienes por código
  getBienPorCodigo(codigo: string): Observable<Bien[]> {
    return this.http.get<Bien[]>(`${this.baseUrl}/codigo/${codigo}`).pipe(
      catchError((error) => {
        console.error('Error obteniendo el bien por código:', error);
        return throwError(() => new Error('Error obteniendo el bien por código'));
      })
    );
  }

  // Método para obtener todos los bienes
  getBienes(): Observable<Bien[]> {
    return this.http.get<Bien[]>(`${this.baseUrl}/all`).pipe(
      catchError((error) => {
        console.error('Error obteniendo todos los bienes:', error);
        return throwError(() => new Error('Error obteniendo todos los bienes'));
      })
    );
  }

  // Método para buscar bienes por artículo e idriesgo
  buscarBienes(articulo: string, idriesgo: string): Observable<Bien[]> {
    return this.http.get<Bien[]>(`${this.baseUrl}/listaxfecha/${articulo}/${idriesgo}`).pipe(
      catchError((error) => {
        console.error('Error buscando bienes por artículo e idriesgo:', error);
        return throwError(() => new Error('Error buscando bienes por artículo e idriesgo'));
      })
    );
  }

  // Método para guardar un bien
  saveBien(bien: Bien, idEmpresa: number): Observable<Bien> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Agregar el ID de la empresa como parámetro de consulta
    const url = `${this.baseUrl}/save?idEmpresa=${idEmpresa}`;

    return this.http.post<Bien>(url, bien, { headers }).pipe(
      catchError((error) => {
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
          console.error('Error actualizando bien:', error); // Registra el objeto de error
          return throwError(error);
        })
      );
  }

  // Método para eliminar un bien por su código
  deleteBien(codigo: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deletePorCodigo/${codigo}`).pipe(
      catchError((error) => {
        console.error('Error eliminando el bien:', error);
        return throwError(() => new Error('Error eliminando el bien'));
      })
    );
  }

  // Método para agregar un nuevo bien
  agregarBien(nuevoBien: Bien): Observable<Bien> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Bien>(`${this.baseUrl}/add`, nuevoBien, { headers }).pipe(
      catchError((error) => {
        console.error('Error agregando el bien:', error);
        return throwError(() => new Error('Error agregando el bien'));
      })
    );
  }

  // Método para subir un archivo CSV
subirArchivoCSV(archivo: FormData): Observable<any> {
  const url = `${this.baseUrl}/upload-csv`; // Ajusta esta URL según el endpoint del backend
  return this.http.post(url, archivo).pipe(
    catchError((error) => {
      console.error('Error al subir el archivo CSV:', error);
      return throwError(() => new Error('Error al subir el archivo CSV'));
    })
  );
}


  // Nuevo método para obtener el historial por código
  getHistorialByCodigo(codigo: string): Observable<Historial[]> {
    return this.http.get<Historial[]>(`http://localhost:8080/bien/historial/${codigo}`).pipe(
      catchError((error) => {
        console.error('Error obteniendo el historial por código:', error);
        return throwError(() => new Error('Error obteniendo el historial por código'));
      })
    );
  }
}


