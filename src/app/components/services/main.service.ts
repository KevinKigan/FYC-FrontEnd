import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {urlEndPointImgLogo} from '../../../environments/environment';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }

  /**
   * Metodo para obtener el logo de la pagina
   *
   */
  getLogo():Observable<any>{
    return this.http.get(`${urlEndPointImgLogo}/FYClogo.png`).pipe(
      catchError(e =>{
        return throwError(e);
      }));
  }
}

