import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {urlEndPointActualizarItemsPorPagina, urlEndPointModelosPage} from '../../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {Modelo} from '../../models/modelo';

@Injectable({
  providedIn: 'root'
})
export class CochesService {

  urlEndPointModelosPage = urlEndPointModelosPage;
  urlEndPointActualizarItemsPorPagina = urlEndPointActualizarItemsPorPagina;

  constructor(private http: HttpClient, private router: Router) {
  }

  getModelos(page: number): Observable<any> {
    return this.http.get<Modelo[]>(urlEndPointModelosPage + page).pipe(
      map((response: any) => {
        (response.content as Modelo[]).map(modelo=>{
          return modelo;
        });
        return response;
      })
    );
  }

  updateItemsPorPagina(size: number):Observable<any>{
    return this.http.put(urlEndPointActualizarItemsPorPagina,size).pipe(
      catchError(e => {
        if (e.status == 400) { // Error al enviar
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }

}
