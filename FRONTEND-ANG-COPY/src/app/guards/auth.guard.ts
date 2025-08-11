import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token'); // o sessionStorage
    if (token) {
      return true; // Tiene token, puede entrar
    } else {
      this.router.navigate(['/login']); // No hay token → redirigir
      return false;
    }
  }
}
