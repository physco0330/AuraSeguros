// src/app/modelos/bien.model.ts

export interface Bien {
  id: any;    // Identificador único del bien, puede ser de cualquier tipo
  editando: any;    // Indicador si el bien está siendo editado, puede ser de cualquier tipo
  proceso: any;    // Información sobre el proceso del bien, puede ser de cualquier tipo
  idBien: number;    // Identificador numérico del bien
  codigo: string;    // Código único asignado al bien
  articuloBienes: string;    // Nombre del artículo asociado al bien
  procesoEstaciones: string;    // Proceso o estaciones asociadas al bien
  cantidad: number;    // Cantidad del bien en inventario
  descripcionArticulo: string;    // Descripción detallada del bien
  descripcionMovimiento: string;    // Descripción del movimiento relacionado con el bien
  estado: string;    // Estado actual del bien (e.g., activo, inactivo)
  riesgo: string;    // Nivel de riesgo asociado al bien (e.g., alto, medio, bajo)
  fechaIngreso: string;    // Fecha en la que el bien fue ingresado al sistema (formato de cadena de texto)
  fechaModificacion: string;    // Fecha de la última modificación del bien (formato de cadena de texto)
  vrUnitario2023: number;    // Valor unitario del bien para el año 2023
  vrAsegurado: number;    // Valor asegurado del bien
  porcentajeIva: number;    // Porcentaje de IVA aplicado al bien
  ivaVariable: number;    // Valor variable del IVA del bien
  vrAsegurable: number;    // Valor asegurado del bien
  tasaGeneral: number;    // Tasa general aplicada al bien
  prima: number;    // Prima del seguro del bien
  tasaIva: number;    // Tasa de IVA aplicada al bien
  primaIvaAnual: number;    // Prima IVA Anual del bien
  primaAnualTotal: number;    // Prima Anual Total del bien
  beneficiarioAdicional: string;    // Beneficiario adicional del bien
  numeroEndoso: string;    // Número del endoso del bien
  valorEndoso: number;    // Valor del endoso del bien
  vigenciaEndoso: string;    // Vigencia del endoso del bien
  banco: string;    // Banco asociado al bien
  nitBanco: string;    // NIT del banco asociado al bien
  idEmpresa: number;                  // Identificador numérico de la empresa a la que pertenece el bien

}
