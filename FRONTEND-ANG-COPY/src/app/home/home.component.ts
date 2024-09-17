import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentSlide = 0;
  isSidebarCollapsed = false;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
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
    this.currentSlide = (this.currentSlide - 1 + 3) % 3;
    this.updateCarousel();
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % 3;
    this.updateCarousel();
  }

  private updateCarousel() {
    if (this.isBrowser) {
      const carousel = document.querySelector('.carousel') as HTMLElement;
      if (carousel) {
        carousel.style.transform = `translateX(-${this.currentSlide * 33.333}%)`;
      }
    }
  }

  private adjustCarouselContainer() {
    if (this.isBrowser) {
      const sidebar = document.querySelector('.sidebar') as HTMLElement;
      const carouselContainer = document.querySelector('.carousel-container') as HTMLElement;

      if (sidebar && carouselContainer) {
        this.isSidebarCollapsed = sidebar.classList.contains('collapsed');
        const sidebarWidth = this.isSidebarCollapsed ? 70 : 300; // Ajusta estos valores según tu diseño

        carouselContainer.style.width = `calc(100% - ${sidebarWidth}px)`;
        carouselContainer.style.left = `${sidebarWidth}px`;
      }
    }
  }

  // Método para ser llamado cuando el sidebar cambie de estado
  onSidebarToggle() {
    if (this.isBrowser) {
      this.adjustCarouselContainer();
    }
  }
}
