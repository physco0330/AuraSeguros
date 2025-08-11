import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';

import { BienesComponent } from './bienes/bienes.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
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
    NgIf,
    BienesComponent,
    HomeComponent,
    HttpClientModule,
    SidebarComponent,
    HeaderComponent,
    ModuloComponent,
    AjusteComponent,
    IncendioComponent,
    EditarBienComponent,
    VisualizarBienComponent,
    CambiarContraComponent
  ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'auraseguro-app';
  isSidebarCollapsed = false;
  isLoginRoute: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.isLoginRoute = this.router.url === '/login' || this.router.url === '/registro';
    });
  }

  onSidebarToggle(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  } 
}
