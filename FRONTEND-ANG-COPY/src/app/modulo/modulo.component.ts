import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Empresa } from '../modelos/empresa.model';
import { Modulo } from '../modelos/modulo.model';
import { EmpresasService } from '../servicios/empresas.service';
import { ModuloService } from '../servicios/modulo.service';
import { MatIcon } from '@angular/material/icon';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'; // Importar ActivatedRoute

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

  nuevoModulo: Modulo = { id_modulo: null, nombreModulo: '', descripcionModulo: '', colorModulo: '#ffffff' };
  searchTerm: string = '';

  constructor(
    private empresasService: EmpresasService,
    private moduloService: ModuloService,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute // Inyectar ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadModulos();

    // Cargar empresas solo si hay un id_modulo en los parámetros de consulta
    this.route.queryParams.subscribe(params => {
      const moduloId = params['id']; // Obtener el ID del módulo de los parámetros
      if (moduloId) {
        this.loadEmpresasByModuloId(moduloId); // Cargar empresas filtradas
      } else {
        this.loadEmpresas(); // Cargar todas las empresas si no hay un ID
      }
    });
  }

  navigateToEmpresas(modulo: Modulo): void {
    if (modulo.id_modulo != null) {
      // Navegar a la vista de empresas y pasar el ID y nombre del módulo como parámetros de consulta
      this.router.navigate(['/empresas'], {
        queryParams: {
          id: modulo.id_modulo,
          nombre: modulo.nombreModulo
        }
      });
    } else {
      console.error("El ID del módulo es nulo.");
    }
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

  // Nuevo método para cargar empresas filtradas por ID del módulo
  loadEmpresasByModuloId(moduloId: string): void {
    this.empresasService.getEmpresasByModuloId(moduloId).subscribe(data => {
      this.empresas = data;
    });
  }

  filteredModulos(): Modulo[] {
    if (!this.searchTerm) {
      return this.modulos;
    }
    return this.modulos.filter(modulo =>
      modulo.nombreModulo.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openModal() {
    this.isModalOpen = true;
    this.nuevoModulo = { id_modulo: null, nombreModulo: '', descripcionModulo: '', colorModulo: '#ffffff' };
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onSubmit() {
    const trimmedName = this.nuevoModulo.nombreModulo.trim();

    if (!trimmedName) {
      alert('Por favor, ingrese un nombre válido para el módulo. No puede estar vacío ni contener solo espacios.');
      return;
    }

    const isEditing = this.nuevoModulo.id_modulo !== null;

    if (!isEditing) {
      if (this.modulos.some(modulo => modulo.nombreModulo.toLowerCase() === trimmedName.toLowerCase())) {
        alert('Error: Ya existe un módulo con ese nombre. Por favor, elige un nombre diferente.');
        return;
      }
    }

    this.nuevoModulo.nombreModulo = trimmedName;

    if (isEditing) {
      this.moduloService.updateModulo(this.nuevoModulo).subscribe(
        (response) => {
          console.log('Módulo actualizado:', response);
          alert('Módulo actualizado con éxito!');
          this.loadModulos();
          this.closeModal();
        },
        (error) => {
          console.error('Error al actualizar el módulo:', error);
          alert('Error al actualizar el módulo. Por favor, inténtelo de nuevo.');
        }
      );
    } else {
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
    }
  }

  editModulo(modulo: Modulo) {
    this.nuevoModulo = { ...modulo };
    this.isModalOpen = true;
  }

  deleteModulo(moduloId: number | null) {
    if (moduloId !== null && confirm('¿Estás seguro de que deseas eliminar este módulo?')) {
      this.moduloService.deleteModulo(moduloId).subscribe(
        (response) => {
          console.log('Módulo eliminado:', response);
          alert('Módulo eliminado con éxito!');
          this.loadModulos();
        },
        (error) => {
          console.error('Error al eliminar el módulo:', error);
          alert('Error al eliminar el módulo. Por favor, inténtelo de nuevo.');
        }
      );
    } else {
      alert('ID de módulo no válido.');
    }
  }
}
