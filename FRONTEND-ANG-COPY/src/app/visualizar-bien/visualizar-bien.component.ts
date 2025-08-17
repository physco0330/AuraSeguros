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
  codigo: string = '';
  token: any = null;

  // Para confirmación de eliminación
  isConfirmDeleteHistorialOpen = false;
  historialAEliminar: Historial | null = null;

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
      data => this.historialSeguros = data,
      error => console.error('Error cargando historial:', error)
    );
  }

  regresar(): void {
    this.location.back();
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
        alert('Historial agregado correctamente.');
      },
      error => {
        console.error('Error guardando historial:', error);
        alert('Error guardando historial.');
      }
    );
  }

  // -----------------------------
  // Edición de historial
  // -----------------------------
  abrirEditarHistorial(seguro: Historial) {
    this.editingHistorialId = seguro.idHistorial || null;
    this.historialEdit = { ...seguro }; // copia para editar sin modificar la tabla
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
          // actualizar la tabla local
          const index = this.historialSeguros.findIndex(h => h.idHistorial === this.historialEdit?.idHistorial);
          if (index >= 0 && this.historialEdit) this.historialSeguros[index] = { ...this.historialEdit };
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
  // Eliminación de historial
  // -----------------------------
  abrirConfirmDeleteHistorial(seguro: Historial) {
    this.historialAEliminar = seguro;
    this.isConfirmDeleteHistorialOpen = true;
  }

  cerrarConfirmDeleteHistorial() {
    this.historialAEliminar = null;
    this.isConfirmDeleteHistorialOpen = false;
  }

  confirmarEliminarHistorial() {
    if (!this.historialAEliminar?.idHistorial) return;

    const id = this.historialAEliminar.idHistorial;
    this.historialSegurosService.eliminarHistorial(id).subscribe({
      next: () => {
        this.historialSeguros = this.historialSeguros.filter(h => h.idHistorial !== id);
        alert('Historial eliminado correctamente.');
        this.cerrarConfirmDeleteHistorial();
      },
      error: (err) => {
        console.error('Error eliminando historial:', err);
        alert('Error eliminando historial. Revisa la consola para más detalles.');
      }
    });
  }
}
