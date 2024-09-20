import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Empresa } from '../modelos/empresa.model';
import { EmpresasService } from '../servicios/empresas.service'; // Servicio actualizado
import { MatIcon } from '@angular/material/icon';
// Importar los componentes y módulos necesarios
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
  isModalOpen = false; // Controla si el modal está abierto o cerrado
  nombreEmpresa: string = ''; // Nombre de la empresa
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

  // Cerrar el modal
  closeModal(): void {
    this.isModalOpen = false;
  }

  // Manejar la selección del archivo de logo
  onLogoSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.logoEmpresa = event.target.files[0];
    }
  }

  // Guardar una nueva empresa en la base de datos
  guardarEmpresa(): void {
    if (this.nombreEmpresa && this.nombreTabla && this.colorCard) {
      // Eliminar todos los espacios del nombre de la empresa
      const nombreLimpio = this.nombreEmpresa.replace(/\s+/g, '').toLowerCase(); // Remueve todos los espacios y convierte a minúsculas

      // Verificar si ya existe una empresa con el mismo nombre
      const empresaExistente = this.empresas.find(empresa =>
        empresa.nombre_empresa.replace(/\s+/g, '').toLowerCase() === nombreLimpio
      );

      if (empresaExistente) {
        alert('Ya existe una empresa con ese nombre. Por favor, elige otro nombre.'); // Mensaje de error
        return; // Detener la ejecución si hay un duplicado
      }

      // Crear FormData para enviar todos los datos, incluyendo el logo
      const formData = new FormData();
      formData.append('nombre_empresa', this.nombreEmpresa.trim()); // Mantener el nombre original (con espacios) al guardar
      formData.append('nombre_tabla', this.nombreTabla);
      formData.append('color_palette', this.colorCard);

      // Agregar el archivo de logo si existe
      if (this.logoEmpresa) {
        formData.append('logo_empresa', this.logoEmpresa);
      }

      // Llamar al servicio para guardar la empresa
      this.empresasService.saveEmpresa(formData).subscribe(response => {
        console.log('Empresa guardada', response);
        this.closeModal();
        this.loadEmpresas();
        alert('Guardado exitoso'); // Mostrar mensaje de éxito
      }, error => {
        console.error('Error guardando la empresa:', error);
      });
    } else {
      alert('Todos los campos son obligatorios');
    }
  }

  // Cargar la lista de empresas desde la API
  loadEmpresas() {
    this.empresasService.getEmpresas().subscribe(data => {
      this.empresas = data; // Actualiza la lista de empresas
    });
  }

  // Método para filtrar las empresas
  filteredEmpresas(): Empresa[] {
    if (!this.searchTerm) {
      return this.empresas; // Si no hay término de búsqueda, devuelve todas las empresas
    }
    return this.empresas.filter(empresa =>
      empresa.nombre_empresa.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
