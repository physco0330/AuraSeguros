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
  selector: 'app-modulo',
  standalone: true,
  templateUrl: './modulo.component.html',
  styleUrls: ['./modulo.component.scss'],
  imports: [SidebarComponent, HeaderComponent, CommonModule, RouterModule, FormsModule, MatIcon] // Importar los módulos necesarios
})
export class ModuloComponent implements OnInit {
  title = 'Modulo'; // Título del módulo
  empresas: Empresa[] = []; // Lista de empresas obtenidas de la API
  isModalOpen = false; // Controla si el modal para agregar empresas está abierto o cerrado
  isEditModalOpen = false; // Controla si el modal de edición está abierto o cerrado
  empresaEdicion: Empresa = { id_empresa: 0, nombre_empresa: '', nit_empresa: '', correo_empresa: '', contacto_empresa: '', numero_poliza: '', nombre_tabla: '', color_palette: '' }; // Objeto de empresa para editar
  isConfirmDeleteModalOpen = false; // Controla si el modal de confirmación de eliminación está abierto o cerrado
  empresaAEliminar: Empresa | null = null; // Empresa seleccionada para eliminar

  // Propiedades para agregar una nueva empresa
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
    private router: Router, // Servicio de enrutamiento
    private http: HttpClient // Servicio HTTP para comunicarse con la API
  ) {}

  ngOnInit(): void {
    // Cargar las empresas al iniciar el componente
    this.loadEmpresas();
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
