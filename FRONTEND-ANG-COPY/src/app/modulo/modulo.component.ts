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
  // Título del módulo
  title = 'Modulo';

  // Array para almacenar los bienes
  bienes: Bien[] = [];

  // Variables para el modal
  isModalOpen = false; // Controla si el modal está abierto o cerrado
  nombreEmpresa: string = ''; // Almacena el nombre de la empresa
  nombreTabla: string = ''; // Almacena el nombre de la tabla
  logoEmpresa: File | null = null; // Almacena el archivo del logo
  colorCard: string = '#ffffff'; // Almacena el color seleccionado para la tarjeta

  constructor(
    private bienesService: BienesService, // Servicio para obtener los bienes
    private router: Router // Servicio para la navegación
  ) {}

  // Inicialización del componente
  ngOnInit(): void {
    // Llama al servicio para obtener bienes
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

  // Guarda los datos de la nueva empresa
  guardarEmpresa(): void {
    if (this.nombreEmpresa && this.nombreTabla && this.logoEmpresa && this.colorCard) {
      // Aquí puedes manejar la lógica para guardar la empresa
      console.log('Empresa guardada:', this.nombreEmpresa, this.nombreTabla, this.logoEmpresa, this.colorCard);
      this.closeModal(); // Cierra el modal después de guardar
    } else {
      alert('Todos los campos son obligatorios');
    }
  }

  // Maneja la selección del logo
  onLogoSelected(event: any): void {
    this.logoEmpresa = event.target.files[0];
  }
}
