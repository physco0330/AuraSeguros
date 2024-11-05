export interface Modulo {
  id_modulo: number | null;// Debe ser solo number si no permites null
  nombreModulo: string;
  descripcionModulo: string;
  fechaCreacion?: string;
  fechaActualizacion?: string;
  colorModulo: string;
}
