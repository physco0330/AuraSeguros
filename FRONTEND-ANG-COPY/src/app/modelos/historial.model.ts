// src/app/modelos/historial.model.ts

export interface Historial {
  id: number;
  tabla_afectada: string;
  id_registro?: number;
  campo_editado: string;
  valor_anterior: string | null; // Permite null además de string
  valor_nuevo: string; // Asegúrate de que este tipo sea el correcto para tu caso
  usuario: string;
  fecha_edicion: Date;
}
