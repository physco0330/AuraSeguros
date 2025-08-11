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
import { ActivatedRoute } from '@angular/router';

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

  token: any = null; // ✅ Se añade para controlar el rol del usuario

  constructor(
    private empresasService: EmpresasService,
    private moduloService: ModuloService,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // ✅ Cargar token desde localStorage
    const tokenString = localStorage.getItem('token');
    if (tokenString) {
      this.token = JSON.parse(tokenString);
    }

    this.loadModulos();

    this.route.queryParams.subscribe(params => {
      const moduloId = params['id'];
      if (moduloId) {
        this.loadEmpresasByModuloId(moduloId);
      } else {
        this.loadEmpresas();
      }
    });
  }

  navigateToEmpresas(modulo: Modulo): void {
    if (modulo.id_modulo != null) {
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
