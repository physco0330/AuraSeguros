import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';  // Import CommonModule

@Component({
  selector: 'app-historial-de-ediciones',  // Selector que se utiliza en la plantilla HTML para referenciar este componente
  standalone: true,  // Indica que este componente es independiente y no requiere ser declarado en un módulo
  imports: [CommonModule],  // Import CommonModule to use *ngFor and other directives
  templateUrl: './historial-de-ediciones.component.html',  // Ruta al archivo de plantilla HTML del componente
  styleUrls: ['./historial-de-ediciones.component.scss']  // Ruta a los estilos específicos del componente
})
export class HistorialDeEdicionesComponent implements OnInit {
  // Variable para almacenar el código obtenido de los parámetros de la ruta
  codigo: string | null = '';

  // Propiedad para almacenar el historial de ediciones
  historial: any[] = [];  // Puedes cambiar 'any[]' por un tipo más específico según tu modelo de datos

  constructor(
    private route: ActivatedRoute, // Inyecta ActivatedRoute para acceder a los parámetros de la ruta activa
    private router: Router // Inyecta Router para permitir la navegación programática entre rutas
  ) {}

  // Método del ciclo de vida de Angular que se ejecuta después de que el componente ha sido inicializado
  ngOnInit(): void {
    // Obtiene el parámetro 'codigo' de la URL actual y lo almacena en la variable 'codigo'
    this.codigo = this.route.snapshot.paramMap.get('codigo');

    // Inicializa el historial con datos ficticios o con datos obtenidos de un servicio
    this.historial = [
      {
        tabla_afectada: 'example_table',
        id_registro: 1,
        campo_editado: 'nombre',
        valor_anterior: 'John',
        valor_nuevo: 'Johnny',
        usuario: 'admin',
        fecha_edicion: new Date()
      },
      // Agrega más registros de ejemplo o datos reales aquí
    ];
  }

  // Método para navegar de regreso a la vista de 'visualizar-bien' usando el código almacenado
  regresar(): void {
    if (this.codigo) {
      // Navega a la ruta '/visualizar-bien/' seguida del código obtenido
      this.router.navigate([`/visualizar-bien/${this.codigo}`]);
    } else {
      // Maneja el caso en que no haya un código disponible (puedes agregar más lógica según sea necesario)
      console.error('Código no encontrado');
    }
  }
}
