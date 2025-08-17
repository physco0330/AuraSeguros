export interface Historial {
  idHistorial: number;
  idBien: number;
  codigo: string;
  descripcion: string;
  estadoSeguro: string;
  fechaInicioSeguro: Date | string;
  fechaFinSeguro: Date | string;
  fechaModificacion: Date | string;
  usuario: string;
  
  // Campos adicionales
  aseguradora?: string;
  cambios?: string;
  numeroPoliza?: string;
  valorAsegurado?: number;
  adquirioSeguro?: boolean;
}
