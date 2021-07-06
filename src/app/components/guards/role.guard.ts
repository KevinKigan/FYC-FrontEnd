import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  /**
   * Metodo para manejar el guard
   * @param next
   * @param state
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login'])
      return false;
    }
    let rol = next.data['role'] as string;
    if(this.authService.hasRole(rol)){
      return true;
    }else{
      swal.fire({
        title: 'Acceso denegado!',
        position: 'center',
        icon: 'warning',
        text: this.authService.user.username+', no tienes acceso a este recurso.',
        showConfirmButton: false,
        timer: 3000
      })
      this.router.navigate(['/modelos'])
      return true;
    }
  }

}
