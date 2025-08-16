// src/app/modelos/historial-seguro.model.ts
export interface Historial {
  id: number;
  codigo: string;
  fechaInicio: string;
  fechaFin: string;
  metodoPago: string;
  monto: number;
  estado: 'activo' | 'vencido' | 'pendiente';
}
