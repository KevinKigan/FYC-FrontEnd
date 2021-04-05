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
import {AuthService} from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {
  }

  /**
   * Metodo para obtener una pagina de usuarios
   *
   * @param page Numero de pagina que se desea
   */
  getUsers(page: number): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(urlUsuariosIndex + 20 + '/page/' + page).pipe(
      map((response: any) => {
        (response.content as Usuario[]).map(usuario => {
          usuario.registrationDate = formatDate(usuario.registrationDate, 'dd/MM/yyyy','en-Us');
          return usuario;
        });
        return response.content;
      })
    );
  }

  /**
   * Metodo para obtener un usuario segun su id
   *
   * @param id Id del usuario a obtener
   */
  getUserById(id:number):Observable<any>{
    return this.http.get<Usuario>(urlEndPointUsuarios+id).pipe(
      catchError(e =>{
        if(e.status!=401) {
          this.router.navigate(['/users'])
          swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error al obtener al usuario',
            text: 'Error: ' + e.error,
            showConfirmButton: false
          });
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
        }
        return throwError(e);
      })
    );
  }

  /**
   * Metodo para crear un usuario
   *
   * @param usuario Usuario a crear
   */
  create(usuario: Usuario): Observable<any> {
    return this.http.post<Usuario>(urlUsuariosCreate,usuario).pipe(
      catchError(e => {
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        if (e.status == 400) { // Error de formulario
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }

  /**
   * Metodo para actualizar un usuario
   *
   * @param usuario Usuario a actualizar
   */
  update(usuario: Usuario): Observable<any> {
    return this.http.put<Usuario>(urlEndPointUsuarios+usuario.id,usuario).pipe(
      catchError(e => {
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        if (e.status == 400) { // Error de formulario
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }

  /**
   * Metodo para borrar un usuario
   *
   * @param id Id del usuario a borrar
   */
  delete(id: number): Observable<any> {
    return this.http.delete<Usuario>(urlEndPointUsuarios+id).pipe(
      catchError(e => {
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        if (e.status == 400) { // Error de formulario
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }

  /**
   * Metodo para solicitar un codigo de verificacion
   *
   * @param identificacion Tipo de identificacion con la que se buscará al usuario
   * @param tipo Tipo de solicitud de codigo
   */
  sendCodeVerification(identificacion:string, tipo:string):Observable<any>{
    return this.http.get<boolean>(urlUsuariosSendVerificateCode+identificacion+'/'+tipo);
  }

  /**
   * Metodo para comprobar el codigo de verificacion
   *
   * @param id Id del usuario a verificar el codigo
   * @param code Codigo a verificar
   */
  checkCodeVerification(id:number, code:string):Observable<any>{
    return this.http.get<string>(urlUsuariosCheckVerificateCode+id+'/'+code);
  }

}
