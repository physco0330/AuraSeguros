import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Agregar FormsModule
import { Bien } from '../modelos/bien.model';
import { BienesService } from '../servicios/bienes.service';

@Component({
  selector: 'app-modulo',
  standalone: true,
  templateUrl: './modulo.component.html',
  styleUrls: ['./modulo.component.scss'],
  imports: [SidebarComponent, HeaderComponent, CommonModule, RouterModule, FormsModule]  // Añadir FormsModule aquí
})
export class ModuloComponent implements OnInit {
  // Título del módulo
  title = 'Modulo';

  // Array para almacenar los bienes
  bienes: Bien[] = [];

  // Variables para el modal
  isModalOpen = false;
  nombreEmpresa: string = '';
  nombreTabla: string = '';
  logoEmpresa: File | null = null;
  colorCard: string = '#ffffff';

  constructor(
    private bienesService: BienesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bienesService.getBienes().subscribe((data: Bien[]) => {
      this.bienes = data;
    });
  }

  public irAIncendios(): void {
    this.router.navigate(['/incendio']);
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  guardarEmpresa(): void {
    if (this.nombreEmpresa && this.nombreTabla && this.logoEmpresa && this.colorCard) {
      console.log('Empresa guardada:', this.nombreEmpresa, this.nombreTabla, this.logoEmpresa, this.colorCard);
      this.closeModal();
    } else {
      alert('Todos los campos son obligatorios');
    }
  }

  onLogoSelected(event: any): void {
    this.logoEmpresa = event.target.files[0];
  }
}
