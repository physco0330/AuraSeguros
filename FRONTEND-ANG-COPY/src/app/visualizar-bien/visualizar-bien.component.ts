// src/app/componentes/visualizar-bien/visualizar-bien.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BienesService } from '../servicios/bienes.service';
import { Bien } from '../modelos/bien.model';
import { Historial } from '../modelos/historial.model'; // Importa el modelo de Historial
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-visualizar-bien',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './visualizar-bien.component.html',
  styleUrls: ['./visualizar-bien.component.scss']
})
export class VisualizarBienComponent implements OnInit {
  bienes: Bien[] = []; // Lista de bienes relacionados con el código
  historial: Historial[] = []; // Lista de historial relacionado con el código
  codigo: string | null = ''; // Código del bien recibido desde la ruta

  constructor(
    private route: ActivatedRoute, // Servicio para acceder a parámetros de ruta
    private bienesService: BienesService, // Servicio para obtener datos de bienes
    private router: Router, // Servicio para navegar entre rutas
    private location: Location // Añadir el servicio Location
  ) {}

  ngOnInit(): void {
    // Obtiene el código del bien desde los parámetros de la ruta
    this.codigo = this.route.snapshot.paramMap.get('codigo');
    console.log('Código recibido:', this.codigo);

    if (this.codigo) {
      // Llama al servicio para obtener los datos del bien por el código
      this.bienesService.getBienPorCodigo(this.codigo).subscribe(
        (data: Bien[]) => {
          // Asigna el array de bienes directamente a la propiedad bienes
          this.bienes = data;
          console.log('Bienes recibidos:', this.bienes);
        },
        error => {
          // Maneja cualquier error ocurrido al obtener los datos del bien
          console.error('Error al obtener el bien:', error);
        }
      );

      // Llama al servicio para obtener el historial de modificaciones del bien por el código
      this.bienesService.getHistorialByCodigo(this.codigo).subscribe(
        (data: Historial[]) => {
          // Asigna el array de historial a la propiedad historial
          this.historial = data;
          console.log('Historial recibido:', this.historial);
        },
        error => {
          // Maneja cualquier error ocurrido al obtener el historial
          console.error('Error al obtener el historial:', error);
        }
      );
    }
  }

  // Modificar el método regresar
  regresar(): void {
    this.location.back(); // Usa el método back() de Location para regresar a la página anterior
  }
}
