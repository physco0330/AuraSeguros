export interface Empresa {
  id_empresa?: number; // Mantener el nombre original
  nombre_empresa: string;
  nombre_tabla: string;
  logo_empresa?: string;
  color_palette: string;
  fecha_creacion?: Date;
  fecha_actualizacion?: Date;
}
