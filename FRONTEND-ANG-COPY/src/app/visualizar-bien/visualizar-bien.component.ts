// src/app/componentes/visualizar-bien/visualizar-bien.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BienesService } from '../servicios/bienes.service';
import { Bien } from '../modelos/bien.model';
import { Historial } from '../modelos/historial.model'; 
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
  bienes: Bien[] = []; 
  historial: Historial[] = []; 
  codigo: string | null = ''; 

  constructor(
    private route: ActivatedRoute,
    private bienesService: BienesService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.codigo = this.route.snapshot.paramMap.get('codigo');
    console.log('Código recibido:', this.codigo);

    if (this.codigo) {
      this.bienesService.getBienPorCodigo(this.codigo).subscribe(
        (data: Bien | Bien[]) => {
          // Normaliza: si viene un solo objeto lo convierte en array
          this.bienes = Array.isArray(data) ? data : [data];
          console.log('Bienes recibidos:', this.bienes);
        },
        error => {
          console.error('Error al obtener el bien:', error);
        }
      );

      this.bienesService.getHistorialByCodigo(this.codigo).subscribe(
        (data: Historial[] | null) => {
          this.historial = data || []; 
          console.log('Historial recibido:', this.historial);
        },
        error => {
          console.error('Error al obtener el historial:', error);
        }
      );
    }
  }

  regresar(): void {
    this.location.back();
  }
}
