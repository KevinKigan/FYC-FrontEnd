import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {urlEndPointActualizarItemsPorPagina,urlEndPointMarcas, urlEndPointModelosPage} from '../../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {Modelo} from '../../models/modelo';
import {Marca} from '../../models/marca';

@Injectable({
  providedIn: 'root'
})
export class CochesService {

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

  getMarcas(): Observable<any> {
    return this.http.get<Marca[]>('http://localhost:8080/api/coches/marcas').pipe(
      map((response: any) => {
        (response as Marca[]).map(marca=>{
          return marca;
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
