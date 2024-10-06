import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Empresa } from '../modelos/empresa.model'; // Modelo de empresa
import { EmpresasService } from '../servicios/empresas.service'; // Servicio para manejar empresas
import { MatIcon } from '@angular/material/icon';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-empresas',
  standalone: true,
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.scss'], // Corrige 'styleUrl' a 'styleUrls'
  imports: [SidebarComponent, HeaderComponent, CommonModule, RouterModule, FormsModule, MatIcon] // Importar los módulos necesarios
})
export class EmpresasComponent implements OnInit {
  title = 'Modulo'; // Título del módulo
  empresas: Empresa[] = []; // Lista de empresas obtenidas de la API
  isModalOpen = false; // Controla si el modal para agregar empresas está abierto o cerrado
  isEditModalOpen = false; // Controla si el modal de edición está abierto o cerrado
  empresaEdicion: Empresa = { id_empresa: 0, nombre_empresa: '', nit_empresa: '', correo_empresa: '', contacto_empresa: '', numero_poliza: '', nombre_tabla: '', color_palette: '' }; // Objeto de empresa para editar
  isConfirmDeleteModalOpen = false; // Controla si el modal de confirmación de eliminación está abierto o cerrado
  empresaAEliminar: Empresa | null = null; // Empresa seleccionada para eliminar

  // Propiedades para agregar una nueva empresa
  nombreEmpresa: string = ''; // Nombre de la empresa a agregar

  nitEmpresa: string = ''; // NIT de la empresa
  correoEmpresa: string = ''; // Correo empresarial
  contactoEmpresa: string = ''; // Contacto de la empresa
  numeroPoliza: string = ''; // Número de póliza
  logoEmpresa: File | null = null; // Archivo del logo de la empresa (opcional)
  colorCard: string = '#ffffff'; // Color de la tarjeta de la empresa
  searchTerm: string = ''; // Término de búsqueda para filtrar empresas
  showBack: boolean = false;
  hideBack: boolean = true;


  constructor(
    private empresasService: EmpresasService, // Servicio para manejar empresas
    private router: Router, // Servicio de enrutamiento
    private http: HttpClient // Servicio HTTP para comunicarse con la API
  ) {}

  ngOnInit(): void {
    // Cargar las empresas al iniciar el componente
    this.loadEmpresas();

  }


  // Método para redirigir al módulo anterior
  volverAModulo(): void {
    this.router.navigate(['/modulo']);
  }

// * Navega al componente 'incendio' y pasa el nombre de la empresa como un parámetro de ruta.

  navigateToIncendio(nombreEmpresa: string) {
    this.router.navigate(['/incendio', nombreEmpresa]);
  }


 // Método toggleCard
 toggleCard(empresa: Empresa): void {
  empresa.isFlipped = !empresa.isFlipped; // Cambia el estado de la tarjeta
}


  // Abrir el modal para agregar una nueva empresa
  openModal(): void {
    this.isModalOpen = true; // Cambia el estado del modal a abierto
  }

  // Cerrar el modal de agregar empresa
  closeModal(): void {
    this.isModalOpen = false; // Cambia el estado del modal a cerrado
  }

  // Abrir el modal de edición para la empresa seleccionada
  openEditModal(empresa: Empresa): void {
    this.empresaEdicion = { ...empresa }; // Clona la empresa seleccionada para editar
    this.isEditModalOpen = true; // Abre el modal de edición
  }

  // Cerrar el modal de edición
  closeEditModal(): void {
    this.isEditModalOpen = false; // Cierra el modal de edición
    this.empresaEdicion = { id_empresa: 0, nombre_empresa: '', nit_empresa: '', correo_empresa: '', contacto_empresa: '', numero_poliza: '', nombre_tabla: '', color_palette: '' }; // Reinicia el objeto de edición
  }

  // Guardar los cambios de edición
  guardarEdicion(): void {
    if (this.empresaEdicion) {
      this.empresasService.updateEmpresa(this.empresaEdicion).subscribe(
        response => {
          console.log('Empresa actualizada', response); // Muestra la respuesta en consola
          this.closeEditModal(); // Cierra el modal después de guardar
          this.loadEmpresas(); // Recarga la lista de empresas
          alert('Edición exitosa'); // Muestra un mensaje de éxito
        },
        error => {
          console.error('Error actualizando la empresa:', error); // Muestra el error en la consola
        }
      );
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
      this.empresasService.deleteEmpresa(this.empresaAEliminar.id_empresa).subscribe(
        () => {
          this.closeConfirmDeleteModal(); // Cierra el modal después de la eliminación
          this.loadEmpresas(); // Recarga la lista de empresas después de la eliminación
          alert('Empresa eliminada exitosamente'); // Muestra un mensaje de éxito
        },
        error => {
          console.error('Error al eliminar la empresa:', error); // Muestra el error en la consola
        }
      );
    }
  }

  // Guardar una nueva empresa en la base de datos
  guardarEmpresa(): void {
    // Validar que todos los campos requeridos estén llenos
    if (this.nombreEmpresa && this.colorCard && this.nitEmpresa && this.correoEmpresa && this.contactoEmpresa && this.numeroPoliza) {
      const nombreLimpio = this.nombreEmpresa.replace(/\s+/g, '').toLowerCase(); // Elimina espacios y convierte a minúsculas
      const empresaExistente = this.empresas.find(empresa =>
        empresa.nombre_empresa.replace(/\s+/g, '').toLowerCase() === nombreLimpio // Verifica si la empresa ya existe
      );

      if (empresaExistente) {
        alert('Ya existe una empresa con ese nombre. Por favor, elige otro nombre.'); // Mensaje de error si existe
        return;
      }

      // Crear un nuevo FormData para enviar los datos de la empresa
      const formData = new FormData();
      formData.append('nombre_empresa', this.nombreEmpresa.trim()); // Añade el nombre de la empresa
      formData.append('nit_empresa', this.nitEmpresa); // Añade el NIT de la empresa
      formData.append('correo_empresa', this.correoEmpresa); // Añade el correo empresarial
      formData.append('contacto_empresa', this.contactoEmpresa); // Añade el contacto empresarial
      formData.append('numero_poliza', this.numeroPoliza); // Añade el número de póliza
      formData.append('color_palette', this.colorCard); // Añade la paleta de colores


      // Llamada al servicio para guardar la empresa
      this.empresasService.saveEmpresa(formData).subscribe(
        response => {
          console.log('Empresa guardada', response); // Muestra la respuesta en consola
          this.closeModal(); // Cierra el modal después de guardar
          this.loadEmpresas(); // Recarga la lista de empresas
          alert('Guardado exitoso'); // Muestra un mensaje de éxito
        },
        error => {
          console.error('Error guardando la empresa:', error); // Muestra el error en la consola
        }
      );
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

  // Método para filtrar las empresas según el término de búsqueda
  filteredEmpresas(): Empresa[] {
    if (!this.searchTerm) {
      return this.empresas; // Si no hay término de búsqueda, devuelve todas las empresas
    }
    // Filtra empresas que coinciden con el término de búsqueda
    return this.empresas.filter(empresa =>
      empresa.nombre_empresa.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
