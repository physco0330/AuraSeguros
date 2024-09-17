import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ModuloComponent } from './modulo/modulo.component';
import { BienesComponent } from './bienes/bienes.component';
import { AjusteComponent } from './ajuste/ajuste.component';
import { IncendioComponent } from './incendio/incendio.component';
import { CambiarContraComponent } from './cambiar-contra/cambiar-contra.component';
import { EditarBienComponent } from './editar-bien2/editar-bien2.component';
import { VisualizarBienComponent } from './visualizar-bien/visualizar-bien.component';




export const routes: Routes = [
  // Ruta para la página principal
  { path: '', component: HomeComponent },

  // Ruta para el componente Modulo
  { path: 'modulo', component: ModuloComponent },

  // Ruta para el componente Ajuste
  { path: 'ajustes', component: AjusteComponent },

  // Ruta para el componente Bienes
  { path: 'bienes', component: BienesComponent },

  // Ruta para el componente Incendio
  { path: 'incendio', component: IncendioComponent },

  // Ruta para el componente EditarBien
  { path: 'editar-bien/:codigo', component: EditarBienComponent },


  { path: 'visualizar-bien/:codigo', component: VisualizarBienComponent },


  // Ruta para el componente CambiarContra
  { path: 'cambiar-contra', component: CambiarContraComponent },



  // Ruta por defecto para manejar URLs no encontradas
  { path: '**', redirectTo: '' }
];
