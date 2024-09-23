import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, RouterModule],
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
      this.adjustLayout();
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (this.isBrowser) {
      this.adjustLayout();
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
  private adjustLayout() {
    this.adjustMainContent();
    this.adjustCarouselContainer();
  }

  private adjustMainContent() {
    const mainContent = document.querySelector('.main-content') as HTMLElement;
    if (mainContent) {
      const sidebarWidth = this.isSidebarCollapsed ? 100 : 250; // Ajusta estos valores según tu diseño
      mainContent.style.width = `calc(100% - ${sidebarWidth}px)`;
      mainContent.style.left = `${sidebarWidth}px`;
    }
  }

  private adjustCarouselContainer() {
    const carouselContainer = document.querySelector('.carousel-container') as HTMLElement;
    if (carouselContainer) {
      const sidebarWidth = this.isSidebarCollapsed ? 90 : 250; // Ajusta estos valores según tu diseño
      carouselContainer.style.width = `calc(100% - ${sidebarWidth}px)`;
      carouselContainer.style.left = `${sidebarWidth}px`;
    }
  }

  // Método para ser llamado cuando el sidebar cambie de estado
  onSidebarToggle() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    if (this.isBrowser) {
      this.adjustCarouselContainer();
    }
  }
}
