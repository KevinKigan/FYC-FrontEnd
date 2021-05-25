import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {
  urlMarcas,
  urlModelosPage,
  urlCarrocerias,
  urlPreciosPagina,
  urlCochesPorModelo,
  urlConsumo,
  urlMotorCombustion,
  urlChart,
  urlChartSemejantes,
  urlEndPointModelos,
  urlImgMarcaLogo,
  urlImgModeloLogo,
  urlSaveMarca,
  urlImgUpload,
  urlCarroceriasPorModelo,
  urlTiposMotores,
  urlMotorElectrico,
  urlMotoresCombustion,
  urlListConsumo, urlTipoMotor, urlEmisiones, urlCombustibles, urlNormativasConsumos, urlCochesSave, urlVolumen
} from '../../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {Modelo} from '../../models/modelo';
import {Marca} from '../../models/marca';
import {Carroceria} from '../../models/carroceria';
import {Coche} from '../../models/coche';
import {Consumo} from '../../models/consumo';
import {MotorCombustion} from '../../models/motorCombustion';
import {AuthService} from './auth.service';
import {MotorElectrico} from '../../models/motorElectrico';
import {TipoMotor} from '../../models/tipoMotor';
import {Emisiones} from '../../models/emisiones';
import {TipoCombustible} from '../../models/tipoCombustible';
import {TipoEmisiones} from '../../models/tipoEmisiones';


@Injectable({
  providedIn: 'root'
})
export class CochesService {
  private ids: number[] = [];
  private modelos: Observable<any>;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {
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
    return this.http.post<string>(urlPreciosPagina, this.ids).pipe(
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
    return this.http.get<string>(urlChart + '/' + idCoche).pipe(
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
    return this.http.get<string>(urlChartSemejantes + '/' + idCoche).pipe(
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
    return this.http.get<Modelo>(urlEndPointModelos + id).pipe(
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
    return this.http.get<Coche[]>(urlCochesPorModelo + idModelo).pipe(
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
   * Metodo para obtener los consumos segun una lista
   * @param idsConsumos
   */
  getListConsumo(idsConsumos: number[]): Observable<any> {
    return this.http.post<Consumo[]>(urlListConsumo, idsConsumos).pipe(
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
   * Metodo para obtener el consumos segun si id
   * @param id
   */
  getConsumo(id: number): Observable<any> {
    return this.http.get<Consumo>(urlConsumo + id).pipe(
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
   *
   * Metodo para guardar el consumo
   * @param consumo a guardar
   */
  saveConsumo(consumo: Consumo): Observable<any> {
    return this.http.post<Consumo>(urlConsumo + 'save',consumo).pipe(
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
   *
   * Metodo para guardar el motor de combustion
   * @param motorCombustion a guardar
   */
  saveMotorCombustion(motorCombustion: MotorCombustion): Observable<any> {
    return this.http.post<Consumo>(urlMotorCombustion + 'save',motorCombustion).pipe(
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
  getListMotoresCombustion(idsMotores: number[]): Observable<any> {
    return this.http.post<MotorCombustion[]>(urlMotoresCombustion, idsMotores).pipe(
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
   * metodo para obtener el motor de combustion segun el id
   * @param id
   */
  getMotorCombustionByIdTipoMotor(id: number): Observable<any> {
    this.http.get<MotorCombustion>(urlMotorCombustion+'tipo_motor/'+id).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/modelos']);
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    ).subscribe(value => {
        console.log('retornado');
        console.log(value);
      }
    );

    return;
  }
  /**
   * metodo para obtener los motores de electricos segun una lista
   * @param idsMotores
   */
  getMotorElectrico(id: number): Observable<any> {
    return this.http.get<MotorElectrico>(urlMotorElectrico + id).pipe(
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
    return this.http.get<Modelo[]>(urlEndPointModelos + pageSize + '/idmarca/' + marca + '/page/' + page).pipe(
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
    return this.http.get<Modelo[]>(urlEndPointModelos + 'idmarca/' + marca).pipe(
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
    return urlEndPointModelos + pageSize + '/idmarca/' + marca + '/page/';
  }

  /**
   * Metodo para crear la ruta en el componente modelo
   *
   */
  getModelosPath(): string {
    return urlModelosPage;
  }

  /**
   * Metodo para obtener todas las marcas
   *
   */
  getMarcas(): Observable<any> {
    return this.http.get<Marca[]>(urlMarcas).pipe(
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
    return this.http.get<Carroceria[]>(urlCarrocerias).pipe(
      map((response: any) => {
        (response as Carroceria[]).map(carroceria => {
          return carroceria;
        });
        return response;
      })
    );
  }

  /**
   * Metodo para filtrar los modelos segun los parametros dados
   * @param filtros
   * @param page
   * @param pageSize
   */
  filtrar(filtros: any, page: number, pageSize: number): Observable<any> {
    console.log(filtros);
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
    return this.http.get(urlImgMarcaLogo + idMarca).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  /**
   * Metodo para obtener todos las urls de las imagenes de los modelos
   * @param idsModelosPagina
   */
  getUrlModelo(idsModelosPagina: number[]): Observable<any> {
    return this.http.post(urlImgModeloLogo, idsModelosPagina).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  /**
   * Metodo para guardar la marca modificada
   */
  saveMarca(marca: Marca): Observable<any> {
    return this.http.post(urlSaveMarca, marca);
  }

  /**
   * Metodo para actualizar la imagen de la marca
   * @param file
   * @param idMarca
   */
  uploadMarcaImage(file: File, idMarca): Observable<any> {
    let formData = new FormData();
    formData.append('file', file);
    formData.append('id', idMarca)
    // Creamos httprequest para tener constancia del progreso de la peticion
    const req = new HttpRequest('POST',urlImgUpload+'marcas', formData,{
      reportProgress: true,

    });
    return this.http.request(req);
  }

  getCarroceriasPorModelo(idsModelos: number[]): Observable<any> {
    return this.http.post(urlCarroceriasPorModelo, idsModelos);
  }

  /**
   * Metodo para obtener los tiempos de motores de los coches
   */
  getTiposMotor(idsTiposMotor: number[]): Observable<any> {
    return this.http.post(urlTiposMotores,idsTiposMotor);
  }

  /**
   * Metodo para obtener el tipo de motore del coche
   */
  getTipoMotor(id: number): Observable<any> {
    return this.http.get<TipoMotor>(urlTipoMotor+id).pipe(
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
   * Metodo para obtener todas las emisiones segun el id especificado
   * @param id
   */
  getEmisiones(id: number): Observable<any> {
    return this.http.get<Emisiones>(urlEmisiones+id);
  }

  /**
   * Metodo para obtener todos los tipos de combustibles
   */
  getTiposCombustibles(): Observable<any> {
    return this.http.get(urlCombustibles).pipe(
      map((response: any) => {
        (response.tipos_combustibles as TipoCombustible[]).map(tipo => {
          return tipo;
        });
        return response;
      })
    );
  }

  getTipoEmisiones(): Observable<any> {
    return this.http.get(urlNormativasConsumos).pipe(
      map((response: any) => {
        (response.normativas as TipoEmisiones[]).map(tipo => {
          return tipo;
        });
        return response;
      })
    );
  }

  saveCoche(coche: Coche): Observable<any> {
    return this.http.post(urlCochesSave, coche);
  }

  getVolumenById(idVolumen: number) {
    return this.http.get(urlVolumen+idVolumen);
  }
}
