import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {
  urlEndPointActualizarItemsPorPagina,
  urlEndPointModelosPorMarcaPage,
  urlEndPointMarcas,
  urlEndPointModelosPage,
  urlEndPointCarrocerias, urlEndPointFiltrar, urlEndPointModelo, urlEndPointPreciosPagina
} from '../../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {Modelo} from '../../models/modelo';
import {Marca} from '../../models/marca';
import {Carroceria} from '../../models/carroceria';
import {mod} from 'ngx-bootstrap/chronos/utils';
import {Coche} from '../../models/coche';

export interface IHash {
  [details: string]: string;
}

@Injectable({
  providedIn: 'root'
})
export class CochesService {
  private ids:number[]=[];
  private modelos: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
  }

  /**
   * Metodo para buscar una pagina de modelos
   *
   * @param page Pagina de modelos
   */
  getModelos(page: number): Observable<any> {
    this.modelos = this.http.get<Modelo[]>(urlEndPointModelosPage + page).pipe(
      map((response: any) => {
        (response.content as Modelo[]).map(modelo => {
          return modelo;
        });
        return response;
      })
    );
    return this.modelos;
  }

  /**
   * Metodo para obtener los precios de los modelos seleccionados
   * en la pagina actual
   *
   * @param modelos
   */
  asignarPreciosPorPagina(modelos:Modelo[]): Observable<any> {
    // this.ids = modelos.
    modelos.forEach(modelo =>{
      this.ids.push(modelo.idModelo);
    })
    return this.http.post<string>(urlEndPointPreciosPagina, this.ids).pipe(
      map(value => {
        return value as unknown as IHash;
      })
    );
  }


  /**
   * Metodo para buscar un modelo
   *
   * @param id id del modelo
   */
  getModelo(id: number): Observable<any> {
    return this.http.get<Modelo>(urlEndPointModelo + id).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/modelos']);
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  // getCochesPorModelo(idModelo:number):Observable<any>{
  //   return this.http.get<Coche[]>()
  // }

  /**
   * Metodo para buscar una pagina de modelos
   *
   * @param marca
   * @param page Pagina de modelos
   */
  getModelosPorMarca(marca: number, page: number): Observable<any> {
    return this.http.get<Modelo[]>(urlEndPointModelosPorMarcaPage + marca + '/page/' + page).pipe(
      map((response: any) => {
        (response.content as Modelo[]).map(modelo => {
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
    return this.http.get<Modelo[]>(urlEndPointModelosPorMarcaPage + marca).pipe(
      map((response: any) => {
        (response as Modelo[]).map(modelo => {
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
    return urlEndPointModelosPorMarcaPage + marca + '/page/';
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
        (response as Marca[]).map(marca => {
          return marca;
        });
        return response;
      })
    );
  }

  /**
   * Metodo para obtener todas las carrocerias
   *
   */
  getCarrocerias(): Observable<any> {
    return this.http.get<Carroceria[]>(urlEndPointCarrocerias).pipe(
      map((response: any) => {
        (response as Carroceria[]).map(carroceria => {
          return carroceria;
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
  updateItemsPorPagina(size: number): Observable<any> {
    return this.http.put(urlEndPointActualizarItemsPorPagina, size).pipe(
      catchError(e => {
        if (e.status == 400) { // Error al enviar
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }

  /**
   * Metodo para obtener todas las carrocerias
   *
   */
  // getCarrocerias(): Observable<any> {
  //   return this.http.get<Carroceria[]>(urlEndPointCarrocerias).pipe(
  //     map((response: any) => {
  //       (response as Carroceria[]).map(carroceria=>{
  //         return carroceria;
  //       });
  //       return response;
  //     })
  //   );
  // }
  filtrar(filtros: any, page: number): Observable<any> {
    console.log(filtros);
    return this.http.post<any>(`${urlEndPointFiltrar}/page/${page}`, filtros).pipe(
      map((response: any) => {
        (response.content as Modelo[]).map(modelo => {
          return modelo;
        });
        return response;
      })
    );
  }

}
