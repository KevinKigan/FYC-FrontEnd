import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {urlEndPointActualizarItemsPorPagina,urlEndPointModelosPorMarcaPage,urlEndPointMarcas, urlEndPointModelosPage} from '../../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {Modelo} from '../../models/modelo';
import {Marca} from '../../models/marca';

@Injectable({
  providedIn: 'root'
})
export class CochesService {

  constructor(private http: HttpClient, private router: Router) {
  }

  /**
   * Metodo para buscar una pagina de modelos
   *
   * @param page Pagina de modelos
   */
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

  /**
   * Metodo para buscar una pagina de modelos
   *
   * @param marca
   * @param page Pagina de modelos
   */
  getModelosPorMarca(marca: number,page: number): Observable<any> {
    return this.http.get<Modelo[]>(urlEndPointModelosPorMarcaPage+marca+'/page/' + page).pipe(
      map((response: any) => {
        (response.content as Modelo[]).map(modelo=>{
          return modelo;
        });
        return response;
      })
    );
  }
  /**
   * Metodo para buscar todos los modelos de una marca
   *
   * @param marca
   *
   */
  getModelosPorMarcaSinPaginar(marca: number): Observable<any> {
    return this.http.get<Modelo[]>(urlEndPointModelosPorMarcaPage+marca).pipe(
      map((response: any) => {
        (response as Modelo[]).map(modelo=>{
          return modelo;
        });
        return response;
      })
    );
  }

  /**
   * Metodo para crear la ruta de la marca en el componente modelo
   *
   * @param marca Marca id
   */
  getModelosPorMarcaPath(marca: number): string {
    return urlEndPointModelosPorMarcaPage+marca+'/page/';
  }

  /**
   * Metodo para crear la ruta en el componente modelo
   *
   */
  getModelosPath(): string {
    return urlEndPointModelosPage;
  }

  /**
   * Metodo para obtener todas las marcas
   *
   */
  getMarcas(): Observable<any> {
    return this.http.get<Marca[]>(urlEndPointMarcas).pipe(
      map((response: any) => {
        (response as Marca[]).map(marca=>{
          return marca;
        });
        return response;
      })
    );
  }

  /**
   * Metodo para actualizar el numero de items que
   * quiere el usuario por pagina
   *
   * @param size Numero de items
   */
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
