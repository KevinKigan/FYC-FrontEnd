import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {catchError} from 'rxjs/operators';
import swal from 'sweetalert2';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {
  }

  /**
   * Metodo para manejar los codigos de error del backend
   * al hacer las peticiones.
   * @param req
   * @param next
   */
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(e =>{
        if(e.status == 401){
          console.log('interceptor');
          if(this.authService.isAuthenticated()){
            this.authService.logout();
          }
          this.router.navigate(['/login'])
        }else if(e.status == 403){

          swal.fire({
            title: 'Acceso denegado!',
            position: 'center',
            icon: 'warning',
            text: this.authService.user.username+', no tienes acceso a este recurso.',
            showConfirmButton: false,
            timer: 3000
          })
          this.router.navigate(['/modelos'])
        }
        return throwError(e);
      })
    );
  }
}
