import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {
  urlEndPointModelosPorMarcaPage,
  urlEndPointMarcas,
  urlEndPointModelosPage,
  urlEndPointCarrocerias,
  urlEndPointFiltrar,
  urlEndPointModelo,
  urlEndPointPreciosPagina,
  urlEndPointCochesPorModelo,
  urlEndPointConsumo,
  urlEndPointMotorCombustion,
  urlEndPointChart,
  urlEndPointChartSemejantes,
  urlEndPointModelos,
  urlEndPointImgMarcaLogo,
  urlEndPointImgModeloLogo
} from '../../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {Modelo} from '../../models/modelo';
import {Marca} from '../../models/marca';
import {Carroceria} from '../../models/carroceria';
import {Coche} from '../../models/coche';
import {Consumo} from '../../models/consumo';
import {MotorCombustion} from '../../models/motorCombustion';


@Injectable({
  providedIn: 'root'
})
export class CochesService {
  private ids: number[] = [];
  private modelos: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
  }

  /**
   * Metodo para buscar una pagina de modelos
   *
   * @param page Pagina de modelos
   * @param pageSize
   */
  getModelos(page: number, pageSize: number): Observable<any> {
    this.modelos = this.http.get<Modelo[]>(urlEndPointModelos + pageSize + '/page/' + page).pipe(
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
  asignarPreciosPorPagina(modelos: Modelo[]): Observable<any> {
    modelos.forEach(modelo => {
      this.ids.push(modelo.idModelo);
    });
    return this.http.post<string>(urlEndPointPreciosPagina, this.ids).pipe(
      map(value => {
        return value as unknown as Map<string, string>;
      })
    );
  }

  /**
   * Metodo para obtener los datos del coche para las graficas
   *
   * @param idCoche
   */
  getDatosChart(idCoche: number): Observable<any> {
    return this.http.get<string>(urlEndPointChart + '/' + idCoche).pipe(
      map(value => {
        return value as unknown as Map<string, string>;
      })
    );
  }

  /**
   * Metodo para obtener los datos semejantes al coche dado para las graficas
   *
   * @param idCoche
   */
  getDatosChartSemejantes(idCoche: number): Observable<any> {
    return this.http.get<string>(urlEndPointChartSemejantes + '/' + idCoche).pipe(
      map(value => {
        return value as unknown as Map<string, string>;
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

  /**
   * Metodo para obtener los coches que son de cieto modelo
   * @param idModelo
   */
  getCochesPorModelo(idModelo: number): Observable<any> {
    return this.http.get<Coche[]>(urlEndPointCochesPorModelo + idModelo).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/modelos']);
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  /**
   * Metodo para obtener lso consumos segun una lista
   * @param idsConsumos
   */
  getConsumo(idsConsumos: number[]): Observable<any> {
    return this.http.post<Consumo[]>(urlEndPointConsumo, idsConsumos).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/modelos']);
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  /**
   * metodo para obtener los motores de combustion segun una lista
   * @param idsMotores
   */
  getMotorCombustion(idsMotores: number[]): Observable<any> {
    return this.http.post<MotorCombustion[]>(urlEndPointMotorCombustion, idsMotores).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/modelos']);
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  /**
   * Metodo para buscar una pagina de modelos
   *
   * @param marca
   * @param page Pagina de modelos
   * @param pageSize
   */
  getModelosPorMarca(marca: number, page: number, pageSize: number): Observable<any> {
    return this.http.get<Modelo[]>(urlEndPointModelosPorMarcaPage + pageSize + '/idmarca/' + marca + '/page/' + page).pipe(
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
    return this.http.get<Modelo[]>(urlEndPointModelosPorMarcaPage + 'idmarca/' + marca).pipe(
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
   * @param pageSize
   */
  getModelosPorMarcaPath(marca: number, pageSize: number): string {
    return urlEndPointModelosPorMarcaPage + pageSize + '/idmarca/' + marca + '/page/';
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

  /**
   * Metodo para filtrar los modelos segun los parametros dados
   * @param filtros
   * @param page
   * @param pageSize
   */
  filtrar(filtros: any, page: number, pageSize: number): Observable<any> {
    console.log(filtros);
    console.log(pageSize);
    return this.http.post<any>(`${urlEndPointModelos}${pageSize}/filtros/page/${page}`, filtros).pipe(
      map((response: any) => {
        (response.content as Modelo[]).map(modelo => {
          return modelo;
        });
        return response;
      })
    );
  }

  /**
   * Metodo para obtener todos las urls de las imagenes de las marcas
   * @param idMarca
   */
  getUrlMarca(idMarca: number): Observable<any> {
    return this.http.get(urlEndPointImgMarcaLogo + idMarca).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  /**
   * Metodo para obtener todos las urls de las imagenes de los modelos
   * @param idsModelosPagina
   */
  getUrlModelo(idsModelosPagina: number[]) {
    return this.http.post(urlEndPointImgModeloLogo, idsModelosPagina).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
