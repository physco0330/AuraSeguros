import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Importa RouterModule
import { Bien } from '../modelos/bien.model';
import { BienesService } from '../servicios/bienes.service'; // Importa el servicio para obtener bienes

@Component({
  selector: 'app-modulo',
  standalone: true,
  templateUrl: './modulo.component.html',
  styleUrls: ['./modulo.component.scss'],
  imports: [SidebarComponent, HeaderComponent, CommonModule, RouterModule] // Añade RouterModule aquí
})
export class ModuloComponent implements OnInit {
  title = 'Modulo';
  bienes: Bien[] = []; // Array para almacenar la lista de bienes

  constructor(
    private bienesService: BienesService, // Servicio para obtener bienes
    private router: Router // Servicio para manejar la navegación
  ) { }

  // Método del ciclo de vida del componente que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Llama al servicio para obtener la lista de bienes y suscribe al Observable
    this.bienesService.getBienes().subscribe((data: Bien[]) => {
      this.bienes = data; // Asigna los datos recibidos al array de bienes
    });
  }

  // Método para redirigir al módulo de Incendios
  public irAIncendios(): void {
    this.router.navigate(['/incendio']); // Navega a la ruta '/incendio'
  }
}
