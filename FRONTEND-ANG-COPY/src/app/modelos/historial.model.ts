// src/app/modelos/historial.model.ts

export interface Historial {
  idHistorial: number;                 // Identificador único del historial
  idBien: number;                      // ID del bien relacionado
  codigo: string;                      // Código del bien
  fechaModificacion: Date | string;    // Fecha de la modificación
  descripcion: string;                 // Descripción de la modificación
  fechaInicioSeguro?: Date | string;   // Fecha de inicio del seguro (opcional)
  fechaFinSeguro?: Date | string;      // Fecha de fin del seguro (opcional)
  estadoSeguro?: string;               // Estado del seguro (opcional)
}
