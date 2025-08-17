// src/app/componentes/visualizar-bien/visualizar-bien.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BienesService } from '../servicios/bienes.service';
import { HistorialSegurosService } from '../servicios/historial-seguros.service';
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
  historialSeguros: Historial[] = []; // Aquí guardamos los seguros mapeados al modelo Historial
  codigo: string | null = '';

  constructor(
    private route: ActivatedRoute,
    private bienesService: BienesService,
    private historialSegurosService: HistorialSegurosService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.codigo = this.route.snapshot.paramMap.get('codigo');
    console.log('Código recibido:', this.codigo);

    if (this.codigo) {
      // Cargar datos del bien
      this.bienesService.getBienPorCodigo(this.codigo).subscribe(
        (data: Bien | Bien[]) => {
          this.bienes = Array.isArray(data) ? data : [data];
          console.log('Bienes recibidos:', this.bienes);
        },
        error => console.error('Error al obtener el bien:', error)
      );

      // Cargar historial de seguros mapeado a Historial
      this.historialSegurosService.getHistorialByCodigo(this.codigo).subscribe(
        (data: Historial[]) => {
          this.historialSeguros = data;
          console.log('Historial de seguros recibido:', this.historialSeguros);
        },
        error => console.error('Error al obtener el historial de seguros:', error)
      );
    }
  }

  regresar(): void {
    this.location.back();
  }
}
