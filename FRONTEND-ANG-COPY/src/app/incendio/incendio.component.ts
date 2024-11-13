import { EmpresasService } from './../servicios/empresas.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { Bien } from '../modelos/bien.model';
import { BienesService } from '../servicios/bienes.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { Empresa } from '../modelos/empresa.model'; // Asegúrate de que esta ruta sea correcta
import { Location } from '@angular/common';

@Component({
  selector: 'app-incendio',
  standalone: true,
  imports: [
    SidebarComponent,
    HeaderComponent,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatIconModule,
    FormsModule ],
  templateUrl: './incendio.component.html',
  styleUrls: ['./incendio.component.scss']
})
export class IncendioComponent implements OnInit {
  bienes: Bien[] = []; // Lista de todos los bienes obtenidos del servicio
  bienesFiltrados: Bien[] = []; // Lista de bienes filtrados que se muestran en la tabla
  formBien!: FormGroup; // Formulario reactivo para gestionar los campos de un bien
  mostrarFormulario: boolean = false; // Variable para mostrar/ocultar el formulario de agregar bien
  codigoExistente: boolean = false; // Indicador para saber si el código existe
  empresaId: number | null = null;
  empresa: Empresa | null = null;
  nombreEmpresa: string | null = null;
   nitEmpresa: string = ''; // NIT de la empresa
   correoEmpresa: string = ''; // Correo empresarial
   contactoEmpresa: string = ''; // Contacto de la empresa
   numeroPoliza: string = ''; // Número de póliza
   showBack: boolean = false;
   hideBack: boolean = true;
   isLoading = false; // Agrega esta propiedad para manejar el estado de carga

  // Definición de los campos del formulario con sus propiedades
  formFields = [
    { name: 'codigo', label: 'Código', type: 'text', placeholder: 'Ingrese Código' },
    { name: 'articuloBienes', label: 'Artículo Bienes', type: 'text', placeholder: 'Ingrese Artículo' },
    { name: 'procesoEstaciones', label: 'Proceso', type: 'text', placeholder: 'Ingrese Proceso' },
    { name: 'cantidad', label: 'Cantidad', type: 'number', placeholder: 'Ingrese Cantidad' },
    { name: 'descripcionArticulo', label: 'Descripción Artículo', type: 'text', placeholder: 'Ingrese Descripción' },
    { name: 'descripcionMovimiento', label: 'Descripción Movimiento', type: 'text', placeholder: 'Ingrese Movimiento' },
    { name: 'estado', label: 'Estado', type: 'text', placeholder: 'Ingrese Estado' },
    { name: 'riesgo', label: 'Riesgo', type: 'text', placeholder: 'Ingrese Riesgo' },
    { name: 'fechaIngreso', label: 'Fecha Ingreso', type: 'date', placeholder: 'Seleccione Fecha de Ingreso' },
    { name: 'fechaModificacion', label: 'Fecha Modificación', type: 'date', placeholder: 'Seleccione Fecha de Modificación' },
    { name: 'vrUnitario2023', label: 'Vr Unitario 2023', type: 'number', placeholder: 'Ingrese Valor Unitario 2023' },
    { name: 'vrAsegurado', label: 'Vr Asegurado', type: 'number', placeholder: 'Ingrese Valor Asegurado' },
    { name: 'porcentajeIva', label: 'Porcentaje IVA', type: 'number', placeholder: 'Ingrese Porcentaje IVA' },
    { name: 'ivaVariable', label: 'IVA Variable', type: 'number', placeholder: 'Ingrese IVA Variable' },
    { name: 'vrAsegurable', label: 'Vr Asegurable', type: 'number', placeholder: 'Ingrese Valor Asegurable' },
    { name: 'tasaGeneral', label: 'Tasa General', type: 'number', placeholder: 'Ingrese Tasa General' },
    { name: 'prima', label: 'Prima', type: 'number', placeholder: 'Ingrese Prima' },
    { name: 'tasaIva', label: 'Tasa IVA', type: 'number', placeholder: 'Ingrese Tasa IVA' },
    { name: 'primaIvaAnual', label: 'Prima IVA Anual', type: 'number', placeholder: 'Ingrese Prima IVA Anual' },
    { name: 'primaAnualTotal', label: 'Prima Anual Total', type: 'number', placeholder: 'Ingrese Prima Anual Total' },
    { name: 'beneficiarioAdicional', label: 'Beneficiario Adicional', type: 'text', placeholder: 'Ingrese Beneficiario Adicional' },
    { name: 'numeroEndoso', label: 'Número Endoso', type: 'text', placeholder: 'Ingrese Número Endoso' },
    { name: 'valorEndoso', label: 'Valor Endoso', type: 'number', placeholder: 'Ingrese Valor Endoso' },
    { name: 'vigenciaEndoso', label: 'Vigencia Endoso', type: 'date', placeholder: 'Seleccione Vigencia Endoso' },
    { name: 'banco', label: 'Banco', type: 'text', placeholder: 'Ingrese Banco' },
    { name: 'nitBanco', label: 'NIT Banco', type: 'text', placeholder: 'Ingrese NIT Banco' }
  ];

  constructor(
    private bienesService: BienesService, // Servicio para gestionar bienes
    private router: Router, // Servicio de enrutamiento para navegación
    private fb: FormBuilder, // Constructor de formularios reactivos
    private empresasService: EmpresasService, // Servicio para gestionar las empresas
    private location: Location, // Añadir el servicio Location
    private route: ActivatedRoute // Servicio para obtener parámetros de la ruta

  ) {}

  ngOnInit(): void {
    // Obtener el nombre de la empresa desde los parámetros de la ruta
    const nombreEmpresa = this.route.snapshot.paramMap.get('nombreEmpresa'); // Ruta del tipo /empresa/:nombreEmpresa
    const idEmpresa = this.route.snapshot.queryParamMap.get('idEmpresa'); // Obtener idEmpresa como parámetro de consulta, si es necesario

    if (nombreEmpresa) {
      // Obtener la información de la empresa usando su nombre
      this.getEmpresa(nombreEmpresa);

      // Si también necesitas trabajar con idEmpresa, puedes validarlo aquí
      if (idEmpresa) {
        console.log('ID de la empresa:', idEmpresa);
      }

      // Usar el servicio para buscar los bienes por nombre de la empresa
      this.bienesService.buscarPorNombreEmpresa(nombreEmpresa).subscribe((data) => {
        this.bienes = data;
        console.log('Bienes obtenidos:', this.bienes); // Para asegurarte que los bienes se están obteniendo
      });
    }

    // Inicialización del formulario con todos los campos deshabilitados
    this.formBien = this.fb.group({
      codigo: ['', Validators.required],
      articuloBienes: [{ value: '', disabled: true }],
      procesoEstaciones: [{ value: '', disabled: true }],
      cantidad: [{ value: 0, disabled: true }],
      descripcionArticulo: [{ value: '', disabled: true }],
      descripcionMovimiento: [{ value: '', disabled: true }],
      estado: [{ value: '', disabled: true }],
      riesgo: [{ value: '', disabled: true }],
      fechaIngreso: [{ value: '', disabled: true }],
      fechaModificacion: [{ value: '', disabled: true }],
      vrUnitario2023: [{ value: 0, disabled: true }],
      vrAsegurado: [{ value: 0, disabled: true }],
      porcentajeIva: [{ value: 0, disabled: true }],
      ivaVariable: [{ value: 0, disabled: true }],
      vrAsegurable: [{ value: 0, disabled: true }],
      tasaGeneral: [{ value: 0, disabled: true }],
      prima: [{ value: 0, disabled: true }],
      tasaIva: [{ value: 0, disabled: true }],
      primaIvaAnual: [{ value: 0, disabled: true }],
      primaAnualTotal: [{ value: 0, disabled: true }],
      beneficiarioAdicional: [{ value: '', disabled: true }],
      numeroEndoso: [{ value: '', disabled: true }],
      valorEndoso: [{ value: 0, disabled: true }],
      vigenciaEndoso: [{ value: '', disabled: true }],
      banco: [{ value: '', disabled: true }],
      nitBanco: [{ value: '', disabled: true }],
      idEmpresa: [idEmpresa]
    });

    // Cargar todos los bienes inicialmente
    //this.cargarBienes();
    this.route.queryParams.subscribe(params => {
      const idEmpresa = params['idEmpresa'];
      if (idEmpresa) {
        this.cargarBienesByEmpresaId(idEmpresa);
      }
    });

    // Suscripción a cambios en el campo 'codigo' para verificar existencia en tiempo real
    this.formBien.get('codigo')?.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(codigo => {
      this.filtrarBienes(codigo); // Llama a la función de filtrado
      if (codigo) {
        this.verificarCodigo(codigo);
      } else {
        this.codigoExistente = false;
        this.habilitarCampos(false); // Deshabilitar campos si no hay código
      }
    });
  }

  filtrarBienes(codigo: string): void {
    if (!codigo) {
      this.bienesFiltrados = this.bienes; // Muestra todos los bienes si no hay filtro
    } else {
      this.bienesFiltrados = this.bienes.filter(bien =>
        bien.codigo.includes(codigo) // Ajusta esta lógica según el campo que quieras filtrar
      );
    }
  }

// Método para obtener los datos de la empresa por nombre
getEmpresa(nombre: string): void {
  this.empresasService.getEmpresaByNombre(nombre).subscribe({
    next: (data) => {
      if (data) {
        this.empresa = data;  // Asignar los datos de la empresa recibida
        console.log('Empresa obtenida:', this.empresa);
      } else {
        console.log(`No se encontró ninguna empresa con el nombre: ${nombre}`);
        this.empresa = null;  // Limpiar el dato de empresa si no se encuentra
      }
    },
    error: (err) => {
      console.error('Error al obtener la empresa:', err);
      // Aquí podrías manejar el error mostrando un mensaje al usuario o realizando alguna acción
      this.empresa = null;
    }
  });
}

  // Método para obtener los bienes de la empresa por nombre
  getBienesByEmpresa(nombre: string): void {
    this.bienesService.getBienesByEmpresa(nombre).subscribe(data => {
      this.bienesFiltrados = data; // Asignar a la lista filtrada o bienes
    });
  }


  subirArchivo(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const formData = new FormData();
      formData.append('file', file);

      // Obtener el idEmpresa desde la URL (suponiendo que está en la URL como parámetro de consulta)
      const idEmpresaString = this.route.snapshot.queryParamMap.get('idEmpresa');

      if (idEmpresaString) {
        // Convertir idEmpresa a number (asegurarse de que es un número válido)
        const idEmpresa = Number(idEmpresaString);

        if (!isNaN(idEmpresa)) {
          // Agregar el idEmpresa como número al FormData
          formData.append('idEmpresa', idEmpresa.toString());  // Convertir a string para agregar a FormData

          // Llamamos al servicio para subir el archivo
          this.bienesService.subirArchivoCSV(formData, idEmpresa).subscribe(
            (response) => {
              // Lógica después de la subida exitosa
              alert('Datos subidos con éxito');
            },
            (error) => {
              console.error('Error al subir archivo:', error);
            }
          );
        } else {
          console.error('El idEmpresa no es un número válido:', idEmpresaString);
        }
      } else {
        console.error('No se encontró idEmpresa en la URL');
      }
    }
  }




  // Método para cargar todos los bienes desde el servicio
// Llama al método 'getBienes' del servicio 'bienesService' para obtener todos los bienes
// Asigna los datos recibidos tanto a 'bienes' como a 'bienesFiltrados' para mantener una copia original y una filtrada
  cargarBienes(): void {
    this.bienesService.getBienes().subscribe((data: Bien[]) => {
      this.bienes = data;
      this.bienesFiltrados = data; // Inicializa los bienes filtrados con todos los bienes
    });
  }

  cargarBienesByEmpresaId(idEmpresa: number): void {


    this.bienesService.getBienesByEmpresaId(idEmpresa).subscribe((data: Bien[]) => {
      this.bienes = data;
      this.bienesFiltrados = data; // Inicializa los bienes filtrados con todos los bienes
    });
  }

  // Método para verificar si un código de bien ya existe
// Busca en la lista de bienes cargados si el código ingresado ya existe
// Si el código ya existe, se establece la bandera 'codigoExistente' en true, se deshabilitan los campos del formulario,
// y se muestra una alerta al usuario indicando que el código ya está en uso
// Si el código no existe, se establece 'codigoExistente' en false y se habilitan los campos del formulario
  verificarCodigo(codigo: string): void {
    const codigoExistente = this.bienes.find(bien => bien.codigo === codigo);
    if (codigoExistente) {
      this.codigoExistente = true;
      this.habilitarCampos(false);
      alert('El código ingresado ya existe. Por favor, ingrese un código diferente.');
    } else {
      this.codigoExistente = false;
      this.habilitarCampos(true);
    }
  }

  // Método para habilitar o deshabilitar campos del formulario
// Recorre todos los controles del formulario 'formBien', excepto el campo 'codigo'
// Habilita o deshabilita cada control según el valor del parámetro 'habilitar'
  habilitarCampos(habilitar: boolean): void {
    const campos = Object.keys(this.formBien.controls);
    campos.forEach(campo => {
      if (campo !== 'codigo') {
        if (habilitar) {
          this.formBien.get(campo)?.enable();
        } else {
          this.formBien.get(campo)?.disable();
        }
      }
    });
  }

  // Método para mostrar/ocultar el formulario de agregar un bien
  mostrarFormularioAgregar(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

// Método para agregar un bien
agregarBien(): void {
  if (this.formBien.valid) {
    const bienData = this.formBien.value;

    // Obtener el idEmpresa desde la URL
    const idEmpresa = this.route.snapshot.queryParamMap.get('idEmpresa');

    // Asegurarte de que el idEmpresa sea un número (si es necesario)
    if (idEmpresa) {
      this.bienesService.saveBien(bienData, Number(idEmpresa)).subscribe(() => {
        alert('Bien agregado correctamente.');
        this.formBien.reset(); // Restablecer el formulario después de agregar
        this.mostrarFormulario = false;
        this.cargarBienes(); // Volver a cargar bienes para actualizar la lista
      });
    } else {
      alert('ID de empresa no encontrado en la URL.');
    }
  } else {
    alert('Por favor, complete el formulario correctamente.');
  }
}



  // Método para navegar a la página de visualización de un bien específico
// Recibe el código del bien como parámetro y redirige a la ruta '/visualizar-bien' con el código como parámetro de la URL
  visualizarBien(codigo: string): void {
    this.router.navigate(['/visualizar-bien', codigo]);
  }

// Método para navegar a la página de edición de un bien específico
// Recibe el código del bien como parámetro y redirige a la ruta '/editar-bien' con el código como parámetro de la URL
  editarBien(codigo: string): void {
    this.router.navigate(['/editar-bien', codigo], {
      queryParams: {
        nombreEmpresa: this.nombreEmpresa,
        idEmpresa: this.empresaId
      }
    });
  }

// Método para eliminar un bien específico
// Recibe el código del bien como parámetro, muestra un cuadro de confirmación y, si el usuario confirma,
// llama al servicio 'bienesService' para eliminar el bien
// Luego recarga la lista de bienes llamando al método 'cargarBienes'
  eliminarBien(codigo: string): void {
    if (confirm('¿Está seguro de que desea eliminar este bien?')) {
      this.bienesService.deleteBien(codigo).subscribe(() => {
        this.cargarBienes();
      });
    }
  }




  // Método modificado para regresar a la página anterior
  volverAModulo(): void {
    this.location.back(); // Regresa a la página anterior en el historial
  }



  // Método para filtrar bienes por varios campos
  filtrarArticulos(event: Event): void {
    const filtro = (event.target as HTMLInputElement).value.toLowerCase();
    this.bienesFiltrados = this.bienes.filter(bien =>   // Filtra la lista de bienes comparando cada campo con el valor del filtro
      bien.codigo.toLowerCase().includes(filtro) ||     // Filtrar por el código del bien
      bien.articuloBienes.toLowerCase().includes(filtro) ||     // Filtrar por el artículo de bienes
      bien.descripcionArticulo.toLowerCase().includes(filtro) ||      // Filtrar por la descripción del artículo
      bien.procesoEstaciones.toLowerCase().includes(filtro) ||     // Filtrar por el proceso de estaciones
      bien.descripcionMovimiento.toLowerCase().includes(filtro) ||      // Filtrar por la descripción del movimiento
      bien.estado.toLowerCase().includes(filtro) ||     // Filtrar por el estado del bien
      bien.riesgo.toLowerCase().includes(filtro) ||       // Filtrar por el riesgo asociado al bien
      bien.fechaIngreso.toLowerCase().includes(filtro) ||      // Filtrar por la fecha de ingreso del bien
      bien.fechaModificacion.toLowerCase().includes(filtro) ||      // Filtrar por la fecha de modificación del bien
      bien.vrUnitario2023.toString().toLowerCase().includes(filtro) || // Filtrar por Vr Unitario 2023
      bien.vrAsegurado.toString().toLowerCase().includes(filtro) || // Filtrar por Vr Asegurado
      bien.porcentajeIva.toString().toLowerCase().includes(filtro) || // Filtrar por Porcentaje IVA
      bien.ivaVariable.toString().toLowerCase().includes(filtro) || // Filtrar por IVA Variable
      bien.vrAsegurable.toString().toLowerCase().includes(filtro) || // Filtrar por Vr Asegurable
      bien.tasaGeneral.toString().toLowerCase().includes(filtro) || // Filtrar por Tasa General
      bien.prima.toString().toLowerCase().includes(filtro) || // Filtrar por Prima
      bien.tasaIva.toString().toLowerCase().includes(filtro) || // Filtrar por Tasa IVA
      bien.primaIvaAnual.toString().toLowerCase().includes(filtro) || // Filtrar por Prima IVA Anual
      bien.primaAnualTotal.toString().toLowerCase().includes(filtro) || // Filtrar por Prima Anual Total
      bien.beneficiarioAdicional.toLowerCase().includes(filtro) || // Filtrar por Beneficiario Adicional
      bien.numeroEndoso.toLowerCase().includes(filtro) || // Filtrar por Número Endoso
      bien.valorEndoso.toString().toLowerCase().includes(filtro) || // Filtrar por Valor Endoso
      bien.vigenciaEndoso.toLowerCase().includes(filtro) || // Filtrar por Vigencia Endoso
      bien.banco.toLowerCase().includes(filtro) || // Filtrar por Banco
      bien.nitBanco.toLowerCase().includes(filtro) // Filtrar por NIT Banco

    );
  }
}


