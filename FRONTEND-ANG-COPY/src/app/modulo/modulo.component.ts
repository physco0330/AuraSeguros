import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Empresa } from '../modelos/empresa.model'; // Modelo de empresa
import { Modulo } from '../modelos/modulo.model'; // Asegúrate de tener este modelo
import { EmpresasService } from '../servicios/empresas.service'; // Servicio para manejar empresas
import { ModuloService } from '../servicios/modulo.service'; // Importar el servicio de módulos
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
  empresas: Empresa[] = []; // Lista de empresas obtenidas de la API
  modulos: Modulo[] = []; // Lista de módulos obtenidos de la API
  isModalOpen = false; // Controla si el modal para agregar módulos está abierto o cerrado
  nuevoModulo = { nombre: '', descripcion: '' }; // Objeto para almacenar la nueva información del módulo

  // Propiedades para agregar una nueva empresa (si es necesario)
  nombreEmpresa: string = ''; // Nombre de la empresa a agregar
  nombreTabla: string = ''; // Nombre de la tabla para la empresa
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
    private moduloService: ModuloService, // Servicio para manejar módulos
    private router: Router, // Servicio de enrutamiento
    private http: HttpClient // Servicio HTTP para comunicarse con la API
  ) {}

  ngOnInit(): void {
    // Cargar las empresas y módulos al iniciar el componente
    this.loadEmpresas();
    this.loadModulos(); // Cargar módulos desde la API
  }

  // Método para cargar la lista de módulos desde la API
  loadModulos(): void {
    this.moduloService.getModulos().subscribe(data => {
      this.modulos = data; // Actualiza la lista de módulos con los datos obtenidos
    });
  }

  // Método toggleCard
  toggleCard(empresa: Empresa): void {
    empresa.isFlipped = !empresa.isFlipped; // Cambia el estado de la tarjeta
  }

  // Navegar al componente de incendios
  public irAIncendios(): void {
    this.router.navigate(['/empresas']);
  }

  // Cargar la lista de empresas desde la API
  loadEmpresas(): void {
    this.empresasService.getEmpresas().subscribe(data => {
      this.empresas = data; // Actualiza la lista de empresas con los datos obtenidos
    });
  }

  // Método para filtrar los módulos según el término de búsqueda
  filteredModulos(): Modulo[] {
    if (!this.searchTerm) {
      return this.modulos; // Si no hay término de búsqueda, devuelve todos los módulos
    }
    // Filtra módulos que coinciden con el término de búsqueda
    return this.modulos.filter(modulo =>
      modulo.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Métodos para manejar el modal de agregar módulo
  openModal() {
    this.isModalOpen = true; // Abre el modal
    this.nuevoModulo = { nombre: '', descripcion: '' }; // Reinicia los campos del nuevo módulo
  }

  closeModal() {
    this.isModalOpen = false; // Cierra el modal
  }

  onSubmit() {
    if (this.nuevoModulo.nombre && this.nuevoModulo.descripcion) {
      const formData = new FormData(); // Crea un FormData para enviar
      formData.append('nombre', this.nuevoModulo.nombre);
      formData.append('descripcion', this.nuevoModulo.descripcion);

      this.moduloService.saveModulo(formData).subscribe(
        (response) => {
          console.log('Módulo agregado:', response);
          alert('Módulo guardado con éxito!');
          this.loadModulos();
          this.closeModal();
        },
        (error) => {
          console.error('Error al agregar el módulo:', error);
          alert('Error al guardar el módulo. Por favor, inténtelo de nuevo.');
        }
      );
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }
}
