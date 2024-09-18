// src/app/modelos/empresa.model.ts

export interface Empresa {
  id_empresa?: number;             // Identificador único de la empresa, opcional
  nombre_empresa: string;          // Nombre de la empresa
  nombre_tabla: string;            // Nombre de la tabla en la que se almacenan los datos
  logo_empresa?: string;           // Logo de la empresa (opcional)
  color_palette: string;           // Paleta de colores de la empresa
  fecha_creacion?: Date;           // Fecha de creación de la empresa (opcional)
  fecha_actualizacion?: Date;      // Fecha de última actualización de los datos (opcional)
}
