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

  // Actualización del objeto nuevoModulo para incluir id_modulo
nuevoModulo: Modulo = { id_modulo: 0, nombreModulo: '', descripcionModulo: '', colorModulo: '#ffffff' }; // Cambiado de null a 0

  searchTerm: string = '';

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

  navigateToEmpresas(modulo: Modulo): void {
    this.router.navigate(['/empresas'], {
      queryParams: {
        id: modulo.id_modulo, // Cambia 'id' por 'id_modulo'
        nombre: modulo.nombreModulo
      }
    });
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

  // Método para filtrar los módulos según el término de búsqueda
  filteredModulos(): Modulo[] {
    if (!this.searchTerm) {
      return this.modulos; // Si no hay término de búsqueda, devuelve todos los módulos
    }
    // Filtra módulos que coinciden con el término de búsqueda
    return this.modulos.filter(modulo =>
      modulo.nombreModulo.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openModal() {
    this.isModalOpen = true;
    this.nuevoModulo = { id_modulo: 0, nombreModulo: '', descripcionModulo: '', colorModulo: '#ffffff' }; // Resetea el modal
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onSubmit() {
    const trimmedName = this.nuevoModulo.nombreModulo.trim(); // Elimina espacios en blanco al inicio y al final

    // Validación para evitar módulos con el mismo nombre o solo espacios
    if (!trimmedName) {
      alert('Por favor, ingrese un nombre válido para el módulo. No puede estar vacío ni contener solo espacios.');
      return;
    }

    // Verifica si el módulo está en modo edición
    const isEditing = this.nuevoModulo.id_modulo !== null;

    if (!isEditing) {
      // Solo comprueba si el nombre ya existe si no está editando
      if (this.modulos.some(modulo => modulo.nombreModulo.toLowerCase() === trimmedName.toLowerCase())) {
        alert('Error: Ya existe un módulo con ese nombre. Por favor, elige un nombre diferente.');
        return;
      }
    }

    this.nuevoModulo.nombreModulo = trimmedName; // Asigna el nombre recortado a nuevoModulo

    // Si está editando, llama a la API de actualización
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
      // Si no está editando, llama a la API de guardar
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

  // Nuevo método para editar un módulo
  editModulo(modulo: Modulo) {
    this.nuevoModulo = { ...modulo }; // Copiar los datos del módulo a editar
    this.isModalOpen = true; // Abre el modal para editar
  }

  // Nuevo método para eliminar un módulo
  deleteModulo(moduloId: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este módulo?')) {
      this.moduloService.deleteModulo(moduloId).subscribe(
        (response) => {
          console.log('Módulo eliminado:', response);
          alert('Módulo eliminado con éxito!');
          this.loadModulos(); // Recarga la lista de módulos
        },
        (error) => {
          console.error('Error al eliminar el módulo:', error);
          alert('Error al eliminar el módulo. Por favor, inténtelo de nuevo.');
        }
      );
    }
  }
}
