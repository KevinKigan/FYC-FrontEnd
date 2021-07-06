import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {getTime} from 'ngx-bootstrap/chronos/utils/date-getters';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

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
    if (this.authService.isAuthenticated()) {
      if(this.isTokenExpired()){
        this.authService.logout();
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }

  /**
   * Metodo para comprobar si el token ha expirado
   */
  isTokenExpired():boolean{
    let token = this.authService.token;
    let payload = this.authService.getTokenData(token);
    let now = new Date().getTime()/1000;
    return payload.exp < now;
  }

}
