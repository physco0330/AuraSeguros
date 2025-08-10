import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BienesComponent } from './bienes/bienes.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CambiarContraComponent } from './cambiar-contra/cambiar-contra.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { EmpresasComponent } from './empresas/empresas.component';
import { LoginComponent } from './login/login.component'; // ⬅️ NUEVO

@NgModule({
  declarations: [],
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
    EmpresasComponent,
    LoginComponent // ⬅️ IMPORTAR AQUÍ
  ],
  providers: [
    provideHttpClient(withFetch())
  ],
})
export class AppModule { }
