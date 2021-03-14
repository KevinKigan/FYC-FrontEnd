import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {Usuario} from '../../models/usuario';
import {urlEndPointUsuariosCreate, urlEndPointUsuariosIndex} from '../../../environments/environment';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient, private router: Router) {
  }

  getIndex(page: number): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(urlEndPointUsuariosIndex + 20 + '/page/' + page).pipe(
      map((response: any) => {
        // let usuario: Usuario = response.content[0];
        // console.log(usuario);
        (response.content as Usuario[]).map(usuario => {
          // console.log(usuario);
          return usuario;
        });
        return response.content;
      })
    );
  }

  create(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(urlEndPointUsuariosCreate,usuario).pipe(
      catchError(e => {
        if (e.status == 400) { // Error de formulario
          return throwError(e);
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }
}
