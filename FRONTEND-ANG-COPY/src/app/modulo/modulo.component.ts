import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Empresa } from '../modelos/empresa.model';
import { EmpresasService } from '../servicios/empresas.service'; // Servicio para manejar empresas
import { MatIcon } from '@angular/material/icon';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modulo',
  standalone: true,
  templateUrl: './modulo.component.html',
  styleUrls: ['./modulo.component.scss'],
  imports: [SidebarComponent, HeaderComponent, CommonModule, RouterModule, FormsModule, MatIcon] // Importar los módulos necesarios
})
export class ModuloComponent implements OnInit {
  title = 'Modulo'; // Título del módulo
  empresas: Empresa[] = []; // Lista de empresas
  isModalOpen = false; // Controla si el modal para agregar empresas está abierto o cerrado
  isEditModalOpen = false; // Controla si el modal de edición está abierto o cerrado
  empresaEdicion: Empresa = { id_empresa: 0, nombre_empresa: '', nombre_tabla: '', color_palette: '' }; // Objeto de empresa para editar
  isConfirmDeleteModalOpen = false; // Controla si el modal de confirmación de eliminación está abierto o cerrado
  empresaAEliminar: Empresa | null = null; // Empresa seleccionada para eliminar
  nombreEmpresa: string = ''; // Nombre de la nueva empresa
  nombreTabla: string = ''; // Nombre de la tabla
  logoEmpresa: File | null = null; // Archivo del logo de la empresa
  colorCard: string = '#ffffff'; // Color de la tarjeta
  searchTerm: string = ''; // Término de búsqueda

  constructor(
    private empresasService: EmpresasService, // Servicio para manejar empresas
    private router: Router, // Servicio de enrutamiento
    private http: HttpClient // Servicio HTTP para comunicarse con la API
  ) {}

  ngOnInit(): void {
    // Cargar las empresas al iniciar el componente
    this.loadEmpresas();
  }

  // Navegar al componente de incendios
  public irAIncendios(): void {
    this.router.navigate(['/incendio']);
  }

  // Abrir el modal para agregar una nueva empresa
  openModal(): void {
    this.isModalOpen = true;
  }

  // Cerrar el modal de agregar empresa
  closeModal(): void {
    this.isModalOpen = false;
  }

  // Abrir el modal de edición para la empresa seleccionada
  openEditModal(empresa: Empresa): void {
    this.empresaEdicion = { ...empresa }; // Clona la empresa seleccionada
    this.isEditModalOpen = true; // Abre el modal de edición
  }

  // Cerrar el modal de edición
  closeEditModal(): void {
    this.isEditModalOpen = false; // Cierra el modal de edición
    this.empresaEdicion = { id_empresa: 0, nombre_empresa: '', nombre_tabla: '', color_palette: '' }; // Reinicia el objeto de edición
  }

  // Guardar los cambios de edición
  guardarEdicion(): void {
    if (this.empresaEdicion) {
      this.empresasService.updateEmpresa(this.empresaEdicion).subscribe(response => {
        console.log('Empresa actualizada', response); // Muestra la respuesta en consola
        this.closeEditModal(); // Cierra el modal después de guardar
        this.loadEmpresas(); // Recarga la lista de empresas
        alert('Edición exitosa'); // Muestra un mensaje de éxito
      }, error => {
        console.error('Error actualizando la empresa:', error); // Muestra el error en la consola
      });
    }
  }

  // Abrir el modal de confirmación de eliminación
  openConfirmDeleteModal(empresa: Empresa): void {
    this.isConfirmDeleteModalOpen = true; // Abre el modal de confirmación
    this.empresaAEliminar = empresa; // Asigna la empresa a eliminar
  }

  // Cerrar el modal de confirmación de eliminación
  closeConfirmDeleteModal(): void {
    this.isConfirmDeleteModalOpen = false; // Cierra el modal de confirmación
    this.empresaAEliminar = null; // Reinicia la empresa a eliminar
  }

  // Confirmar la eliminación de la empresa
  confirmDelete(): void {
    if (this.empresaAEliminar && this.empresaAEliminar.id_empresa) {
      this.empresasService.deleteEmpresa(this.empresaAEliminar.id_empresa).subscribe(() => {
        this.closeConfirmDeleteModal(); // Cierra el modal después de la eliminación
        this.loadEmpresas(); // Recarga la lista de empresas después de la eliminación
        alert('Empresa eliminada exitosamente'); // Muestra un mensaje de éxito
      }, error => {
        console.error('Error al eliminar la empresa:', error); // Muestra el error en la consola
      });
    }
  }

  // Manejar la selección del archivo de logo
  onLogoSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.logoEmpresa = event.target.files[0]; // Asigna el archivo de logo seleccionado
    }
  }

  // Guardar una nueva empresa en la base de datos
  guardarEmpresa(): void {
    if (this.nombreEmpresa && this.nombreTabla && this.colorCard) {
      const nombreLimpio = this.nombreEmpresa.replace(/\s+/g, '').toLowerCase(); // Elimina espacios y convierte a minúsculas
      const empresaExistente = this.empresas.find(empresa =>
        empresa.nombre_empresa.replace(/\s+/g, '').toLowerCase() === nombreLimpio // Verifica si la empresa ya existe
      );

      if (empresaExistente) {
        alert('Ya existe una empresa con ese nombre. Por favor, elige otro nombre.'); // Mensaje de error si existe
        return;
      }

      const formData = new FormData(); // Crea un nuevo FormData para enviar los datos
      formData.append('nombre_empresa', this.nombreEmpresa.trim()); // Añade el nombre de la empresa
      formData.append('nombre_tabla', this.nombreTabla); // Añade el nombre de la tabla
      formData.append('color_palette', this.colorCard); // Añade la paleta de colores

      if (this.logoEmpresa) {
        formData.append('logo_empresa', this.logoEmpresa); // Añade el archivo de logo si existe
      }

      this.empresasService.saveEmpresa(formData).subscribe(response => {
        console.log('Empresa guardada', response); // Muestra la respuesta en consola
        this.closeModal(); // Cierra el modal después de guardar
        this.loadEmpresas(); // Recarga la lista de empresas
        alert('Guardado exitoso'); // Muestra un mensaje de éxito
      }, error => {
        console.error('Error guardando la empresa:', error); // Muestra el error en la consola
      });
    } else {
      alert('Todos los campos son obligatorios'); // Mensaje de error si faltan campos
    }
  }

  // Cargar la lista de empresas desde la API
  loadEmpresas(): void {
    this.empresasService.getEmpresas().subscribe(data => {
      this.empresas = data; // Actualiza la lista de empresas con los datos obtenidos
    });
  }

  // Método para filtrar las empresas
  filteredEmpresas(): Empresa[] {
    if (!this.searchTerm) {
      return this.empresas; // Si no hay término de búsqueda, devuelve todas las empresas
    }
    return this.empresas.filter(empresa =>
      empresa.nombre_empresa.toLowerCase().includes(this.searchTerm.toLowerCase()) // Filtra empresas que coinciden con el término de búsqueda
    );
  }
}
