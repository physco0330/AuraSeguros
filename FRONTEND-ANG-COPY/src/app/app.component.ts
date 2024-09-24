import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { BienesComponent } from './bienes/bienes.component';
import { HomeComponent } from './home/home.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { ModuloComponent } from "./modulo/modulo.component";
import { AjusteComponent } from "./ajuste/ajuste.component";
import { IncendioComponent } from "./incendio/incendio.component";
import { CambiarContraComponent } from "./cambiar-contra/cambiar-contra.component";
import { EditarBienComponent } from './editar-bien2/editar-bien2.component';
import { VisualizarBienComponent } from './visualizar-bien/visualizar-bien.component';

@Component({
  selector: 'app-root', 
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    BienesComponent,
    HomeComponent, // Agrega HomeComponent aquí, osea que en este array se agregan los componentes nuevod
    HttpClientModule, // Si usas HttpClient, agrega su módulo aquí
    SidebarComponent,
    HeaderComponent,
    ModuloComponent,
    AjusteComponent,
    IncendioComponent,
    EditarBienComponent,
    VisualizarBienComponent,
    CambiarContraComponent
],
  styleUrls: ['./app.component.scss'] // Corregido a styleUrls
})
export class AppComponent {
  title = 'auraseguro-app';
  isSidebarCollapsed = false;

  onSidebarToggle(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }
}
