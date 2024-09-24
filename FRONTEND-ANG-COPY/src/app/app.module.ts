import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BienesComponent } from './bienes/bienes.component'; // Importa el componente de bienes
import { provideHttpClient, HttpClientModule, withFetch } from '@angular/common/http'; // Importa HttpClientModule para las solicitudes HTTP
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Para animaciones (opcional)
import { FormsModule } from '@angular/forms'; // Importa FormsModule si usas formularios en la app
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CambiarContraComponent } from './cambiar-contra/cambiar-contra.component';
import {MatSidenavModule} from '@angular/material/sidenav';
//import { HistorialDeEdicionesComponent } from './historial-de-ediciones/historial-de-ediciones.component';
//import { HistorialService } from './servicios/historial.service';

@NgModule({

  declarations: [
        // No es necesario declarar componentes standalone aquí
  ],
  imports: [
    NgModule,
    BienesComponent,
    HomeComponent,
    BrowserAnimationsModule,
    AppComponent,
    BrowserModule,
    HeaderComponent,
    SidebarComponent,
    RouterModule,
    FormsModule,
    MatIconModule,
    CambiarContraComponent,
    MatSidenavModule,
  // Modulo de ruta
  ],
  providers: [
    provideHttpClient(withFetch())
  ],
})
export class AppModule { }
