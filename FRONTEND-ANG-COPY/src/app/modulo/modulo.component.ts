// src/app/modulo/modulo.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Empresa } from '../modelos/empresa.model';
import { EmpresasService } from '../servicios/empresas.service'; // Servicio actualizado

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
  imports: [SidebarComponent, HeaderComponent, CommonModule, RouterModule, FormsModule] // Importar los módulos necesarios
})
export class ModuloComponent implements OnInit {
  title = 'Modulo'; // Título del módulo
  empresas: Empresa[] = []; // Lista de empresas
  isModalOpen = false; // Controla si el modal está abierto o cerrado
  nombreEmpresa: string = ''; // Nombre de la empresa
  nombreTabla: string = ''; // Nombre de la tabla
  logoEmpresa: File | null = null; // Archivo del logo de la empresa
  colorCard: string = '#ffffff'; // Color de la tarjeta

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
    this.logoEmpresa = event.target.files[0];
  }

  // Guardar una nueva empresa en la base de datos
  guardarEmpresa(): void {
    if (this.nombreEmpresa && this.nombreTabla && this.colorCard) {
      const nuevaEmpresa: Empresa = {
        nombre_empresa: this.nombreEmpresa,
        nombre_tabla: this.nombreTabla,
        color_palette: this.colorCard
      };

      this.empresasService.saveEmpresa(nuevaEmpresa).subscribe(response => {
        console.log('Empresa guardada', response);
        this.closeModal();
        this.loadEmpresas();
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
}
