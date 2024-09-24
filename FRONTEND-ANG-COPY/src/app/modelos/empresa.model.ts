export interface Empresa {
  id_empresa?: number; // Mantener el nombre original
  nombre_empresa: string;
  nombre_tabla: string;
  color_palette: string;
  nit_empresa: string; // Nuevo campo: NIT de empresa
  correo_empresa: string; // Nuevo campo: Correo empresarial
  contacto_empresa: string; // Nuevo campo: Contacto
  numero_poliza: string; // Nuevo campo: Número de póliza
  fecha_creacion?: Date;
  fecha_actualizacion?: Date;
}
