import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Bien } from '../modelos/bien.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BienesService } from '../servicios/bienes.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-bien',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-bien2.component.html',
  styleUrls: ['./editar-bien2.component.scss']
})
export class EditarBienComponent implements OnInit {
  bienes: Bien[] = []; // Lista de bienes relacionados con el código
  codigo: string | null = ''; // Código del bien recibido desde la ruta

  public bienForm!: FormGroup;



  constructor(
    private route: ActivatedRoute,
    private bienesService: BienesService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
      this.createForm();
      this.loadBienData();
  }

   // Método para navegar a la ruta 'incendio'
   goToIncendio(): void {
    this.router.navigate(['/incendio']);
  }



  onSubmit() {
    if (this.bienForm.valid) {
      const confirmation = confirm('¿Está seguro de que desea actualizar este bien?');

      if (confirmation) {
        const bien: Bien = this.bienForm.value;
        this.bienesService.updateBien(bien).subscribe(
          () => { // Cambia el parámetro de (message: string) a () porque no estás usando el mensaje
            alert('Se actualizó con éxito'); // Mensaje modificado
            this.router.navigate(['/incendio']);
          },
          error => {
            alert('Error: No se pudo actualizar el bien. Por favor, intente nuevamente.');
            console.error('Error al actualizar el bien:', error);
          }
        );
      } else {
        alert('Actualización cancelada.');
      }
    } else {
      alert('El formulario no es válido. Por favor, revise los campos.');
    }
  }

  loadBienData() {
    this.codigo = this.route.snapshot.paramMap.get('codigo');
    console.log('Código recibido:', this.codigo);
    if (this.codigo) {
      // Llama al servicio para obtener los datos del bien por el código
      this.bienesService.getBienPorCodigo(this.codigo).subscribe(
        (data: Bien[]) => {
          // Asigna el array de bienes directamente a la propiedad bienes
          this.bienes = data;
          this.loadFormFromBien(data[0]);
          console.log('Bienes recibidos:', this.bienes);
        },
        error => {
          // Maneja cualquier error ocurrido al obtener los datos del bien
          console.error('Error al obtener el bien:', error);
        }
      );
    }
  }


  loadFormFromBien(bien: Bien) {
    this.bienForm.patchValue(bien);
  }

  createForm() {
    // Crea un formulario reactivo utilizando FormBuilder
    this.bienForm = this.fb.group({
      idBien: [''], // Campo para el identificador del bien, desactivado desde el inicio (no editable en el formulario)
      codigo: [''], // Campo para el código del bien, desactivado desde el inicio (no editable en el formulario)
      articuloBienes: [''], // Campo para el nombre o descripción del artículo del bien
      procesoEstaciones: [''], // Campo para el proceso o estaciones relacionadas con el bien
      cantidad: [''], // Campo para la cantidad del bien
      descripcionArticulo: [''], // Campo para la descripción del artículo del bien
      descripcionMovimiento: [''], // Campo para la descripción del movimiento relacionado con el bien
      estado: [''], // Campo para el estado del bien (e.g., activo, inactivo)
      riesgo: [''], // Campo para el riesgo asociado al bien
      fechaIngreso: [''], // Campo para la fecha en que el bien ingresó
      fechaModificacion: [''], // Campo para la fecha de última modificación del bien
      vrUnitario2023: [''], // Campo para el valor unitario del bien en 2023
      vrAsegurado: [''], // Campo para el valor asegurado del bien
      porcentajeIva: [''], // Campo para el porcentaje de IVA aplicado al bien
      ivaVariable: [''], // Campo para el IVA variable del bien
      vrAsegurable: [''], // Campo para el valor asegurable del bien
      tasaGeneral: [''], // Campo para la tasa general aplicada al bien
      prima: [''], // Campo para la prima del bien
      tasaIva: [''], // Campo para la tasa de IVA del bien
      primaIvaAnual: [''], // Campo para la prima de IVA anual del bien
      primaAnualTotal: [''], // Campo para la prima anual total del bien
      beneficiarioAdicional: [''], // Campo para el beneficiario adicional del bien
      numeroEndoso: [''], // Campo para el número de endoso relacionado con el bien
      valorEndoso: [''], // Campo para el valor del endoso del bien
      vigenciaEndoso: [''], // Campo para la vigencia del endoso del bien
      banco: [''], // Campo para el banco asociado al bien
      nitBanco: [''] // Campo para el NIT del banco asociado al bien
    });

  }

}
