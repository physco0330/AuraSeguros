// modulo.model.ts



export interface Modulo {
  id_modulo: number;           // Identificador único del módulo
  nombreModulo: string;      // Nombre del módulo
  descripcionModulo: string; // Descripción del módulo
  fechaCreacion?: string;    // Fecha de creación (opcional)
  fechaActualizacion?: string; // Fecha de actualización (opcional)
}
