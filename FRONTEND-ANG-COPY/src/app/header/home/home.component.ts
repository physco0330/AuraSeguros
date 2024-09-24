import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentSlide = 0;
  private isBrowser: boolean;
  currentSection = 0;

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
      const carouselContainer = document.querySelector('.carousel-container') as HTMLElement;

      if (carouselContainer) {
        carouselContainer.style.width = '100%';
        carouselContainer.style.left = '0';
      }
    }
  }

  prevSection() {
    if (this.currentSection > 0) {
      this.currentSection--;
    }
  }

  nextSection() {
    if (this.currentSection < 2) {
      this.currentSection++;
    }
  }
}