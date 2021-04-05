import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Usuario} from '../../models/usuario';
import {urlLogin, credentials} from '../../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user: Usuario;
  private _token: string;


  constructor(private http:HttpClient) { }

  /**
   * Metodo para que un usuario pueda iniciar sesion y obtener el token
   *
   * @param usuario Usuario que inicia sesion
   */
  public login(usuario: Usuario):Observable<any>{
    // Transformamos las crecenciales a base 64
    let credentialsLogin = btoa(credentials);
    let httpHeaders = new HttpHeaders({
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization':'Basic '+credentialsLogin});
    let params = new URLSearchParams();
    params.set('grant_type','password');
    params.set('username',usuario.username);
    params.set('password',usuario.password);

    return this.http.post<any>(urlLogin, params.toString(), {headers:httpHeaders}).pipe(
      catchError(e => {
        if(e.status == 400){
          swal.fire('Error a iniciar sesión','Usuario o contraseña incorrectos', 'error');
          return throwError(e);
        }
      }));
  }

  /**
   * Metodo para guardar en el sessionStorage el usuario
   *
   * @param access_token
   */
  saveUser(access_token: string) {
    this._user = new Usuario();
    let payload = this.getTokenData(access_token);
    this._user.username = payload.username;
    this._user.email = payload.email;
    this._user.roles = payload.authorities;
    sessionStorage.setItem('user', JSON.stringify(this._user));
  }

  /**
   * Metodo para guardar en el sessionStorage el token
   *
   * @param access_token
   */
  saveToken(access_token: string) {
    this._token = access_token;
    sessionStorage.setItem('token', this._token);
  }

  /**
   * Obtener los datos decodificados del token
   *
   * @param access_token
   */
  getTokenData(access_token: string){
    if(access_token != null){
      return JSON.parse(atob(access_token.split('.')[1]));
    }else{
      return null;
    }

  }

  /**
   * Metodo para obtener el usuario del objeto o del sessionStorage
   *
   */
  public get user():Usuario{
    if(this._user != null) {
      return this._user;
    }else if (sessionStorage.getItem('user')!=null){
      this._user = JSON.parse(sessionStorage.getItem('user')) as Usuario
      return this._user;
    }
    return new Usuario();
  }

  /**
   * Metodo para obtener el token del objeto o del sessionStorage
   *
   */
  public get token():string{
    if(this._token != null) {
      return this._token;
    }else if (sessionStorage.getItem('token')!=null){
      this._token = sessionStorage.getItem('token')
      return this._token;
    }
    return null;
  }

  /**
   * Metodo para comprobar si el usuario esta autenticado o ha iniciado sesion
   */
  isAuthenticated():boolean{
    let payload = this.getTokenData(this.token);
    return payload != null && payload.user_name && payload.user_name.length > 0;
  }

  /**
   * Metodo para cerrar sesion
   */
  logout() {
    this._token = null;
    this._user = null;
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
  }

  /**
   * Metodo para comprobar si el usuario
   * tiene el rol solicitado
   * @param role
   */
  hasRole(role:string): boolean{
    return this.user.roles.includes(role);
  }
}
