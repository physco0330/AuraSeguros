import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BienesService } from '../servicios/bienes.service';
import { HistorialSegurosService } from '../servicios/historial-seguros.service';
import { Bien } from '../modelos/bien.model';
import { Historial } from '../modelos/historial.model';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-visualizar-bien',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './visualizar-bien.component.html',
  styleUrls: ['./visualizar-bien.component.scss']
})
export class VisualizarBienComponent implements OnInit {
  bienes: Bien[] = [];
  historialSeguros: Historial[] = [];
  historialSegurosOriginal: Historial[] = []; // copia original para filtros
  codigo: string = '';
  token: any = null;

  // Filtros por fechas
  fechaFiltroInicio: string | null = null;
  fechaFiltroFin: string | null = null;

  // Para edición
  editingHistorialId: number | null = null;
  historialEdit: Historial | null = null;

  constructor(
    private route: ActivatedRoute,
    private bienesService: BienesService,
    private historialSegurosService: HistorialSegurosService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const tokenString = localStorage.getItem('token');
    this.token = tokenString ? JSON.parse(tokenString) : null;

    const codigoParam = this.route.snapshot.paramMap.get('codigo');
    if (codigoParam) {
      this.codigo = codigoParam;
      this.cargarBien();
      this.cargarHistorial();
    }
  }

  // -----------------------------
  // Carga de datos
  // -----------------------------
  cargarBien() {
    if (!this.codigo) return;
    this.bienesService.getBienPorCodigo(this.codigo).subscribe(
      data => this.bienes = Array.isArray(data) ? data : [data],
      error => console.error('Error cargando bien:', error)
    );
  }

  cargarHistorial() {
    if (!this.codigo) return;
    this.historialSegurosService.getHistorialByCodigo(this.codigo).subscribe(
      data => {
        this.historialSeguros = data;
        this.historialSegurosOriginal = [...data]; // guardamos copia para filtrar
      },
      error => console.error('Error cargando historial:', error)
    );
  }

  // -----------------------------
  // Filtrado por fechas
  // -----------------------------
  filtrarPorFechas() {
    if (!this.fechaFiltroInicio && !this.fechaFiltroFin) {
      this.historialSeguros = [...this.historialSegurosOriginal];
      return;
    }

    const inicio = this.fechaFiltroInicio ? new Date(this.fechaFiltroInicio) : null;
    const fin = this.fechaFiltroFin ? new Date(this.fechaFiltroFin) : null;

    this.historialSeguros = this.historialSegurosOriginal.filter(seguro => {
      const fechaInicioSeguro = new Date(seguro.fechaInicioSeguro);

      if (inicio && fin) {
        return fechaInicioSeguro >= inicio && fechaInicioSeguro <= fin;
      } else if (inicio) {
        return fechaInicioSeguro >= inicio;
      } else if (fin) {
        return fechaInicioSeguro <= fin;
      }

      return true;
    });
  }

  // -----------------------------
  // CRUD Historial
  // -----------------------------
  agregarHistorial() {
    if (!this.bienes[0]) return;

    const nuevo: any = {
      idBien: this.bienes[0].idBien,
      codigo: this.codigo,
      descripcion: '',
      estadoSeguro: 'Activo',
      fechaInicioSeguro: new Date().toISOString(),
      fechaFinSeguro: new Date().toISOString(),
      fechaModificacion: new Date().toISOString(),
      usuario: this.token?.nombre_usuario || 'Admin',
      aseguradora: '',
      cambios: '',
      numeroPoliza: '',
      valorAsegurado: 0,
      adquirioSeguro: true
    };

    this.historialSegurosService.crearHistorial(nuevo).subscribe(
      guardado => {
        this.historialSeguros.push(guardado);
        this.historialSegurosOriginal.push(guardado); // también en la copia original
        alert('Historial agregado correctamente.');
      },
      error => {
        console.error('Error guardando historial:', error);
        alert('Error guardando historial.');
      }
    );
  }

  abrirEditarHistorial(seguro: Historial) {
    this.editingHistorialId = seguro.idHistorial || null;
    this.historialEdit = { ...seguro };
  }

  guardarEdicionHistorial() {
    if (!this.historialEdit || !this.historialEdit.idHistorial) return;

    const historialParaBackend = {
      ...this.historialEdit,
      fechaInicioSeguro: new Date(this.historialEdit.fechaInicioSeguro).toISOString(),
      fechaFinSeguro: new Date(this.historialEdit.fechaFinSeguro).toISOString(),
      fechaModificacion: new Date().toISOString()
    };

    this.historialSegurosService.actualizarHistorial(this.historialEdit.idHistorial, historialParaBackend)
      .subscribe({
        next: () => {
          const index = this.historialSeguros.findIndex(h => h.idHistorial === this.historialEdit?.idHistorial);
          if (index >= 0 && this.historialEdit) this.historialSeguros[index] = { ...this.historialEdit };

          const indexOriginal = this.historialSegurosOriginal.findIndex(h => h.idHistorial === this.historialEdit?.idHistorial);
          if (indexOriginal >= 0 && this.historialEdit) this.historialSegurosOriginal[indexOriginal] = { ...this.historialEdit };

          this.cancelarEdicionHistorial();
          alert('Historial actualizado correctamente.');
        },
        error: (err) => {
          console.error('Error actualizando historial:', err);
          alert('Error actualizando historial.');
        }
      });
  }

  cancelarEdicionHistorial() {
    this.editingHistorialId = null;
    this.historialEdit = null;
  }

  // -----------------------------
  // Eliminar historial con confirmación simple
  // -----------------------------
  eliminarHistorial(seguro: Historial) {
    if (!seguro?.idHistorial) return;

    const confirmacion = confirm('¿Estás seguro de eliminar este historial?');

    if (!confirmacion) return;

    this.historialSegurosService.eliminarHistorial(seguro.idHistorial).subscribe({
      next: () => {
        this.historialSeguros = this.historialSeguros.filter(h => h.idHistorial !== seguro.idHistorial);
        this.historialSegurosOriginal = this.historialSegurosOriginal.filter(h => h.idHistorial !== seguro.idHistorial);
        alert('Historial eliminado correctamente.');
      },
      error: (err) => {
        console.error('Error eliminando historial:', err);
        alert('Error eliminando historial. Revisa la consola para más detalles.');
      }
    });
  }

  regresar(): void {
    this.location.back();
  }
}
