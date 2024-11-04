import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Empresa } from '../modelos/empresa.model'; // Modelo de empresa
import { Modulo } from '../modelos/modulo.model'; // Modelo de módulo
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
  imports: [SidebarComponent, HeaderComponent, CommonModule, RouterModule, FormsModule, MatIcon]
})
export class ModuloComponent implements OnInit {
  title = 'Modulo';
  empresas: Empresa[] = [];
  modulos: Modulo[] = [];
  isModalOpen = false;
  nuevoModulo = { nombreModulo: '', descripcionModulo: '' }; // Modificado
  searchTerm: any;

  constructor(
    private empresasService: EmpresasService,
    private moduloService: ModuloService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadEmpresas();
    this.loadModulos();
  }

  loadModulos(): void {
    this.moduloService.getModulos().subscribe(data => {
      this.modulos = data;
    });
  }

  loadEmpresas(): void {
    this.empresasService.getEmpresas().subscribe(data => {
      this.empresas = data;
    });
  }

  filteredModulos(): Modulo[] {
    return this.modulos; // Implementa la lógica de filtrado si es necesario
  }

  openModal() {
    this.isModalOpen = true;
    this.nuevoModulo = { nombreModulo: '', descripcionModulo: '' }; // Modificado
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onSubmit() {
    if (this.nuevoModulo.nombreModulo && this.nuevoModulo.descripcionModulo) { // Modificado
      this.moduloService.saveModulo(this.nuevoModulo).subscribe(
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
