// src/app/modelos/historial.model.ts

export interface Historial {
  id: number;                       // Identificador único del historial
  codigo: string;                   // Código del bien relacionado con el historial
  fechaModificacion: Date | string; // Fecha de la modificación (puede venir como string o como Date)
  usuario: string;                  // Usuario que realizó la modificación
  descripcionModificacion: string;  // Descripción de la modificación
  cambios?: any;                    // Cambios en formato JSON o texto (opcional para mayor flexibilidad)
}
