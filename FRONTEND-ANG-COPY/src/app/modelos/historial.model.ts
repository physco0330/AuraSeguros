// src/app/modelos/historial.model.ts

export interface Historial {
  id: number;    // Identificador único del historial
  codigo: string;    // Código del bien relacionado con el historial
  fechaModificacion: string;    // Fecha de la modificación
  usuario: string;    // Usuario que realizó la modificación
  descripcionModificacion: string;    // Descripción de la modificación
  cambios: string;    // Cambios en formato JSON o texto
}
