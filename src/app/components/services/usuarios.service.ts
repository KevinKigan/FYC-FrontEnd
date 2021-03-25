import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import swal from 'sweetalert2';
import {Usuario} from '../../models/usuario';
import {
  urlEndPointUsuarios,
  urlUsuariosCheckVerificateCode,
  urlUsuariosCreate,
  urlUsuariosIndex,
  urlUsuariosSendVerificateCode
} from '../../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {formatDate} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient, private router: Router) {
  }

  getUsers(page: number): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(urlUsuariosIndex + 20 + '/page/' + page).pipe(
      catchError(e => {
        if (this.isNotAuthorized(e)) {
          return throwError(e);
        }
      }),
      map((response: any) => {
        (response.content as Usuario[]).map(usuario => {
          usuario.registrationDate = formatDate(usuario.registrationDate, 'dd/MM/yyyy','en-Us');
          return usuario;
        });
        return response.content;
      })
    );
  }

  getUserById(id:number):Observable<any>{
    return this.http.get<Usuario>(urlEndPointUsuarios+id).pipe(
      catchError(e =>{
        this.router.navigate(['/users'])
        swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error al obtener al usuario,'+e.error,
          showConfirmButton: false
        });
        if(this.isNotAuthorized(e)){
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }

  create(usuario: Usuario): Observable<any> {
    return this.http.post<Usuario>(urlUsuariosCreate,usuario).pipe(
      catchError(e => {
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        if(this.isNotAuthorized(e)){
          return throwError(e);
        }
        if (e.status == 400) { // Error de formulario
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }

  update(usuario: Usuario): Observable<any> {
    return this.http.put<Usuario>(urlEndPointUsuarios+usuario.id,usuario).pipe(
      catchError(e => {
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        if(this.isNotAuthorized(e)){
          return throwError(e);
        }
        if (e.status == 400) { // Error de formulario
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete<Usuario>(urlEndPointUsuarios+id).pipe(
      catchError(e => {
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        if(this.isNotAuthorized(e)){
          return throwError(e);
        }
        if (e.status == 400) { // Error de formulario
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }

  sendCodeVerification(identificacion:string, tipo:string):Observable<any>{
    return this.http.get<boolean>(urlUsuariosSendVerificateCode+identificacion+'/'+tipo).pipe()
  }

  checkCodeVerification(id:number, code:string):Observable<any>{
    return this.http.get<string>(urlUsuariosCheckVerificateCode+id+'/'+code).pipe(
      catchError(e => {
        if(this.isNotAuthorized(e)){
          return throwError(e);
        }
        if (e.status != 401 && e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  private isNotAuthorized(e): boolean{
    if(e.status == 401 || e.status == 403){
      this.router.navigate(['/login'])
      return true;
    }else{
      return false;
    }

  }


}
