import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ModuloComponent } from './modulo/modulo.component';
import { BienesComponent } from './bienes/bienes.component';
import { AjusteComponent } from './ajuste/ajuste.component';
import { IncendioComponent } from './incendio/incendio.component';
import { CambiarContraComponent } from './cambiar-contra/cambiar-contra.component';
import { EditarBienComponent } from './editar-bien2/editar-bien2.component';
import { VisualizarBienComponent } from './visualizar-bien/visualizar-bien.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { LoginComponent } from './login/login.component';



export const routes: Routes = [

  { path: 'login', component: LoginComponent },
  // Ruta para la página principal
  { path: 'inicio', component: HomeComponent },

  // Ruta para el componente Modulo
  { path: 'modulo', component: ModuloComponent },

  // Ruta para el componente Ajuste
  { path: 'ajustes', component: AjusteComponent },

  // Ruta para el componente Bienes
  { path: 'bienes', component: BienesComponent },

  // Ruta para el componente Incendio
  { path: 'incendio/:nombreEmpresa', component: IncendioComponent },

  // Ruta para el componente EditarBien
  { path: 'editar-bien/:codigo', component: EditarBienComponent },


  { path: 'visualizar-bien/:codigo', component: VisualizarBienComponent },


  // Ruta para el componente CambiarContra
  { path: 'cambiar-contra', component: CambiarContraComponent },

// Ruta para la página principal
{ path: 'empresas', component: EmpresasComponent },

  // Ruta por defecto para manejar URLs no encontradas
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: '**', redirectTo: '/inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
