import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import swal from 'sweetalert2';
import {Usuario} from '../../models/usuario';
import {
  urlEndPointUsuarios, urlImgUser, urlImgUpload,
  urlUsuariosCheckVerificateCode,
  urlUsuariosCreate,
  urlUsuariosIndex, urlUsuariosMyUser,
  urlUsuariosSendVerificateCode, urlUsuariosSetRoles
} from '../../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {formatDate} from '@angular/common';
import {AuthService} from './auth.service';
import axios, {AxiosResponse} from 'axios';


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
          // usuario.registrationDate = formatDate(usuario.registrationDate, 'dd/MM/yyyy','en-Us');
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
      // map((response: any) =>{
      //   console.log(response);
      //   (response as Usuario[]).map(usuario => {
      //     usuario.registrationDate = formatDate(usuario.registrationDate, 'dd/MM/yyyy', 'en-Us');
      //     return usuario;
      //   });
      //   return response;
      // }),
      map((response: any) =>{
        if(response as Usuario){
            let usuario = response as Usuario
            usuario.registrationDate = formatDate(usuario.registrationDate, 'dd/MM/yyyy', 'en-Us');
            return usuario;
          }
          return response;
      }),
      catchError(e =>{
        if(e.status!=401) {
          this.router.navigate(['/users'])
          swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error al obtener al usuario',
            text: 'Error: ' + e.error.mensaje.error_description,
            showConfirmButton: false
          });
          console.log(e.error);
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
        }
        return throwError(e);
      })
    );
  }

  /**
   * Metodo para obtener un usuario segun su id
   *
   * @param username Nombre de usuario del usuario a obtener
   */
  getMyUserByUsername(username:string):Observable<any>{
    return this.http.get<Usuario>(urlUsuariosMyUser+username).pipe(
        catchError(e=>{

        if(e.status!=401) {
          this.router.navigate(['/modelos'])
          swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error al obtener al usuario',
            text: 'Error: ' + e.error,
            showConfirmButton: false
          });
          console.log(e.error);
          if (e.error.mensaje) {
            console.error(e.error);
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

  // /**
  //  * Metodo para deshabilitar un usuario
  //  *
  //  * @param id Id del usuario a borrar
  //  */
  // disable(id: number): Observable<any> {
  //   return this.http.get<Usuario>(urlEndPointUsuarios+'disable/'+id).pipe(
  //     catchError(e => {
  //       if (e.error.mensaje) {
  //         console.error(e.error.mensaje);
  //       }
  //       if (e.status == 400) { // Error de formulario
  //         return throwError(e);
  //       }
  //       return throwError(e);
  //     })
  //   );
  // }

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

  /**
   * Metodo para obtener la imagen del usuario, -1 busca todos los usuarios
   * @param id
   * @param saveImage
   */
  getUserImage(id: number, saveImage: boolean) : Observable<any>{
    return this.http.get<string>(urlImgUser+id).pipe(
      map((response:any)=>{
        if(response.list[id]!=undefined && saveImage){
          this.authService.saveURLUser(response.list[id])
        }
        return response;
    })
    );
  }

  getRoles(roles: any[]): string[] {
    let rolesString:string[] = [];
    roles.forEach(itemListaRoles => {
        rolesString.push(itemListaRoles.rolName);
    });
    return rolesString;
  }

  // async uploadImage(file: File, id): Promise<AxiosResponse> {
    uploadImage(file:File, id): Observable<HttpEvent<{}>>{
    let formData = new FormData();
    formData.append('file', file);
    formData.append('id', id)
    // Creamos httprequest para tener constancia del progreso de la peticion
    const req = new HttpRequest('POST',urlImgUpload+'users', formData,{
      reportProgress: true,

    });
    return this.http.request(req);

    // return await axios.post(
    //   urlImgUpload,
    //   formData,
    //   {
    //     // headers: {
    //     //   'Content-Type': 'multipart/form-data'
    //     // },
    //     onUploadProgress(e) {
    //       let progress = Math.round((e.loaded * 100.0) / e.total);
    //       console.log(progress);
    //       // imageUploadbar.setAttribute('value', progress);
    //     }
    //   }
    // );
    // imagePreview.src = res.data.secure_url;
    // return this.http.post(urlImgUpload, formData).pipe(
    //   map((response: any) =>{
    //     this.authService.saveCompleteUser(response.user as Usuario)
    //     return response.user as Usuario}),
    //
    //   catchError(e=>{
    //     console.log(e);
    //     if(e.status !=401 && e.error!= undefined) {
    //       if(e.error.message!= undefined && e.error.message.includes('Maximum upload size exceeded')) {
    //         swal.fire({
    //           icon: 'error',
    //           title: 'Error al subir imagen.',
    //           text: 'Tamaño del fichero supera el máximo permitido (2MB).'
    //         })
    //       }else{
    //         swal.fire({
    //           icon: 'error',
    //           title: 'Error al subir imagen.',
    //           text: e.error
    //         })
    //       }
    //
    //     }
    //     return throwError(e);
    //   })
    // );
  }
  registrationDate(user: Usuario): string {
    return formatDate(user.registrationDate, 'dd/MM/yyyy','en-Us');
  }

  /**
   * Metodo para comprobar mediante typescript que el mail es correcto
   */
  errorsEmail(usuario: Usuario){
    if(usuario.email.length<5){
      return true;
    }
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    return !emailRegex.test(usuario.email);
  }

  setRoles(user: Usuario, roles:String[]): Observable<any> {
    return this.http.post(urlUsuariosSetRoles+user.id, roles);
  }
}
