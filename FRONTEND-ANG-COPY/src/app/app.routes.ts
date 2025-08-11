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
import { AuthGuard } from './guards/auth.guard';
import { RegistroComponent } from './registro/registro.component';

export const routes: Routes = [

  { path: 'registro', component: RegistroComponent },  // pública

  { path: 'login', component: LoginComponent },  // pública

  { path: 'inicio', component: HomeComponent, canActivate: [AuthGuard] },

  { path: 'modulo', component: ModuloComponent, canActivate: [AuthGuard] },

  { path: 'ajustes', component: AjusteComponent, canActivate: [AuthGuard] },

  { path: 'bienes', component: BienesComponent, canActivate: [AuthGuard] },

  { path: 'incendio/:nombreEmpresa', component: IncendioComponent, canActivate: [AuthGuard] },

  { path: 'editar-bien/:codigo', component: EditarBienComponent, canActivate: [AuthGuard] },

  { path: 'visualizar-bien/:codigo', component: VisualizarBienComponent, canActivate: [AuthGuard] },

  { path: 'cambiar-contra', component: CambiarContraComponent, canActivate: [AuthGuard] },

  { path: 'empresas', component: EmpresasComponent, canActivate: [AuthGuard] },

  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: '**', redirectTo: '/login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
