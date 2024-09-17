import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Bien } from '../modelos/bien.model';
import { BienesService } from '../servicios/bienes.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modulo',
  standalone: true,
  templateUrl: './modulo.component.html',
  styleUrls: ['./modulo.component.scss'],
  imports: [SidebarComponent, HeaderComponent, CommonModule, RouterModule, FormsModule]
})
export class ModuloComponent implements OnInit {
  title = 'Modulo';

  // Variables para los bienes
  bienes: Bien[] = [];

  // Variables para el modal de agregar empresa
  isModalOpen = false;
  nombreEmpresa: string = '';
  nombreTabla: string = '';
  logoEmpresa: File | null = null;
  colorCard: string = '#ffffff';

  constructor(
    private bienesService: BienesService, // Servicio para manejar bienes y empresas
    private router: Router
  ) {}

  ngOnInit(): void {
    // Carga los bienes al inicializar el componente
    this.bienesService.getBienes().subscribe((data: Bien[]) => {
      this.bienes = data;
    });
  }

  // Navegar a Incendios
  public irAIncendios(): void {
    this.router.navigate(['/incendio']);
  }

  // Abre el modal
  openModal(): void {
    this.isModalOpen = true;
  }

  // Cierra el modal
  closeModal(): void {
    this.isModalOpen = false;
  }

  // Guardar la nueva empresa
  guardarEmpresa(): void {
    if (this.nombreEmpresa && this.nombreTabla && this.logoEmpresa && this.colorCard) {
      const nuevaEmpresa = {
        nombre: this.nombreEmpresa,
        tabla: this.nombreTabla,
        logo: this.logoEmpresa, // Puede ser necesario convertir esto a base64 en el backend
        color: this.colorCard
      };

      // Llamada al servicio para guardar la empresa
      this.bienesService.saveEmpresa(nuevaEmpresa).subscribe({
        next: (response) => {
          console.log('Empresa guardada exitosamente', response);
          this.closeModal(); // Cierra el modal después de guardar
        },
        error: (error) => {
          console.error('Error guardando la empresa:', error);
        }
      });
    } else {
      alert('Todos los campos son obligatorios');
    }
  }

  // Maneja la selección del logo
  onLogoSelected(event: any): void {
    this.logoEmpresa = event.target.files[0];
  }
}
