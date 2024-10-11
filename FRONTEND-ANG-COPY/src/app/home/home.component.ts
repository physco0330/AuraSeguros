import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentSlide = 0;
  private isBrowser: boolean;
  currentSection = 0;
  totalSections = 3;
  totalSlides = 3; // Inicializa totalSlides con el número correcto de diapositivas

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private router: Router // Añadir el Router
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.adjustCarouselContainer();
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (this.isBrowser) {
      this.adjustCarouselContainer();
    }
  }

  prevSlide() {
    // Eliminar este método si no se usa
  }

  nextSlide() {
    // Eliminar este método si no se usa
  }

  private updateCarousel(): void {
    // Eliminar este método si no se usa
  }

  private adjustCarouselContainer() {
    // Eliminar este método si no se usa
  }

  prevSection() {
    this.currentSection = (this.currentSection - 1 + this.totalSections) % this.totalSections;
    this.actualizarCarrusel();
  }

  nextSection() {
    this.currentSection = (this.currentSection + 1) % this.totalSections;
    this.actualizarCarrusel();
  }

  private actualizarCarrusel(): void {
    if (this.isBrowser) {
      const contenedor = document.querySelector('.info-section-wrapper') as HTMLElement;
      if (contenedor) {
        const desplazamiento = -this.currentSection * 100;
        contenedor.style.transition = 'transform 0.3s ease';
        contenedor.style.transform = `translateX(${desplazamiento}%)`;
      }
    }
  }

  // Las funciones navegarAModulos() y navegarAAjustes() han sido eliminadas
}