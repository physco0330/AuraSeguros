// src/app/bienes/bienes.component.ts

import { Component, OnInit } from '@angular/core';
import { BienesService } from '../servicios/bienes.service'; // Importa el servicio para obtener los datos de bienes
import { Bien } from '../modelos/bien.model';  // Importa la interfaz que define el modelo de datos de bien
import { CommonModule } from '@angular/common'; // Importa el módulo común para usar directivas comunes en la plantilla

@Component({
  selector: 'app-bienes',
  templateUrl: './bienes.component.html', // Ruta al archivo de plantilla HTML del componente
  standalone: true, // Marca el componente como standalone, permitiendo su uso independiente
  imports: [CommonModule], // Importa CommonModule para usar directivas comunes como ngIf y ngFor
  styleUrls: ['./bienes.component.scss'] // Ruta al archivo de estilos SCSS del componente
})
export class BienesComponent implements OnInit {

  bienes: Bien[] = []; // Array para almacenar la lista de bienes

  // Inyecta el servicio BienesService para obtener los datos
  constructor(private bienesService: BienesService) { }

  // Método del ciclo de vida del componente que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Llama al servicio para obtener la lista de bienes y suscribe al Observable
    this.bienesService.getBienes().subscribe((data: Bien[]) => {
      this.bienes = data; // Asigna los datos recibidos al array de bienes
    });
  }
}
