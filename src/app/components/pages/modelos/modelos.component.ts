import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {CochesService} from '../../services/coches.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Coche} from '../../../models/coche';
import {Modelo} from '../../../models/modelo';
import {Marca} from '../../../models/marca';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {SidebarService} from '../../services/sidebar.service';
import {FiltroService} from '../../services/filtro.service';
import {limitBigMidSizeScreen, limitLargeSizeScreen, limitMidSizeScreen} from '../../../config/config';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-coches',
  templateUrl: './modelos.component.html',
  styleUrls: ['./modelos.component.scss']
})
export class ModelosComponent implements OnInit {
  @Input() marca: Marca;
  coches: Coche[];
  modelos: Modelo[];
  modelos_totales: Modelo[];
  pageSize: number;
  listaGlobal: any[] = new Array([]);
  loading: boolean = true;
  paginator: any;
  paths: string[];
  urlMarca: string;
  controlMarca = new FormControl();
  mostrarPaginator: boolean = true;
  static TODOS: string = '-- Todos --';
  static TODAS: string = '-- Todas --';
  controlModelo = new FormControl();
  opcionesMarca: Observable<string[]>;
  opcionesModelo: Observable<string[]>;
  results: Observable<string[]>;
  marcas: Marca[];
  nombre_marcas: string[] = [];
  nombre_modelos: string[] = [];
  modelosUrl = new Map<number, string>();
  marcaSelected: string = '';
  modeloSelected: string = '';
  slide = 'slideOff';
  zindex = 'zIndexOut';
  precios = new Map<string, string>();
  imgMarca = new Map<number, string>();

  constructor(
    private cochesService: CochesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public sidebarservice: SidebarService,
    private filtroService: FiltroService,
  ) {
  }

  ngOnInit(): void {
    if (this.marca === undefined) {
      this.marca = new Marca();
    }
    this.iniciar();

  }


  /**
   * Metodo para iniciarlizar el componente
   */
  iniciar(): void {
    this.setLoading(true);
    this.activatedRoute.paramMap.subscribe(params => {
      let page = +params.get('page'); // El operador suma transforma el string en un number
      let marca = +params.get('marca');
      this.pageSize = +params.get('pageSize');
      if (!page || page < 0) {
        page = 0;
      }
      if (!this.pageSize || this.pageSize <= 0) {
        this.pageSize = 20;
      }
      this.marca.idMarca = marca;

      this.cochesService.getMarcas().subscribe(response => {
        this.marcas = response as Marca[];

        this.marcas.sort((a, b) => {
          if (a.marcaCoche.toUpperCase() < b.marcaCoche.toUpperCase()) {
            return -1;
          } else {
            return 1;
          }
        });
        this.nombre_marcas.push(ModelosComponent.TODAS);
        this.marcas.forEach(marca => {
          this.nombre_marcas.push(marca.marcaCoche);
        });
        this.marcaSeleccionada(marca, page, false);
        this.opcionesMarca = this.controlMarca.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value, 'marca'))
        );
        this.marcas.forEach(marcaFor => {
          if (marcaFor.idMarca == marca) {
            this.marcaSelected = marcaFor.marcaCoche;
          }
        });
      });
    });
  }

  /**
   * Metodo para que los items se muestren en formato
   * de cinco elementos por fila
   *
   */
  configurarItems() {
    let listaDeCinco: Modelo[] = [];
    let listaGlobalAux = [];
    let i = 1;
    let num_items = 0;
    if (screen.width < limitMidSizeScreen) {
      num_items = 2;
    } else if (screen.width > limitMidSizeScreen && screen.width < limitBigMidSizeScreen) {
      num_items = 3;
    } else if (screen.width > limitBigMidSizeScreen && screen.width < limitLargeSizeScreen) {
      num_items = 4;
    } else {
      num_items = 5;
    }
    this.modelos.forEach(modelo => {
      if ((i % num_items == 0 && i != 0) || i == this.modelos.length) {
        listaDeCinco.push(modelo);
        listaGlobalAux.push(listaDeCinco);
        listaDeCinco = [];
      } else {
        listaDeCinco.push(modelo);
      }
      i++;
    });
    this.listaGlobal = listaGlobalAux;
    this.setLoading(false);
  }

  /**
   * Metodo para que se actualize el componente
   * cuando se actualiza el paginador
   *
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges) {
    let paginatorActualizado = changes['paginator'];

    if (paginatorActualizado.previousValue) {
      this.ngOnInit();
    }

  }

  /**
   * metodo para filtrar los modelos o marcas
   * y comprobar si se encuentran en el array
   *
   * @param value nomrbe de la marca o modelo a filtrar
   * @param parametro tipo de parametro a filtrar
   * @private
   */
  private _filter(value: string, parametro: string): string[] {
    const filterValue = value.toLowerCase();
    if (parametro == 'modelo') {
      return this.nombre_modelos.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    } else if (parametro == 'marca') {
      return this.nombre_marcas.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    }
  }

  /**
   * Metodo que se ejecuta cuando se selecciona una marca para
   * buscar los vehiculos de esa marca
   *
   * @param event
   */
  selectionMarca(event: MatAutocompleteSelectedEvent): void {
    let marcaString = event.option.value as string;
    let idMarca = -1;
    this.marcas.forEach(marca => {
      if (marca.marcaCoche == marcaString) {
        idMarca = marca.idMarca;
        this.marca.idMarca = marca.idMarca;
      }
    });
    this.mostrarPaginator = true;
    this.modeloSelected = '';
    if (marcaString == ModelosComponent.TODAS) {
      this.nombre_modelos = [];
      this.marca.idMarca = -1;
      this.router.navigate(['modelos']);
      this.marcaSeleccionada(null, 0, false);
    } else {
      this.router.navigate(['/modelos/20/marca', idMarca, 'page', 0]);
      this.marcaSeleccionada(idMarca, 0, false);
    }
  }


  /**
   * Metodo para que se autoactualice la lista de modelos
   * segun la marca seleccionada
   *
   * @param event
   */
  selectionModelo(event: MatAutocompleteSelectedEvent): void {
    this.modeloSelected = event.option.value as string;
    let idMarca = -1;
    this.marcas.forEach(marca => {
      if (marca.marcaCoche == this.marcaSelected) {

        idMarca = marca.idMarca;
      }
    });
    this.mostrarPaginator = false;
    if (this.modeloSelected == ModelosComponent.TODOS) {
      this.marcaSeleccionada(idMarca, 0, false);
    } else {
      this.marcaSeleccionada(idMarca, 0, true);
    }
  }

  /**
   * Metodo para comprobar si se ha seleccionado una marca y obtener los vehiculos
   * por marca y pagina si es corecto
   *
   * @param marca Marca de vehiculo
   * @param page  Numero de pagina a buscar
   * @param modelo
   */
  marcaSeleccionada(marca: number, page: number, modelo: boolean): void {
    let modelos;
    let modelosTotales;
    this.setLoading(true);
    if (marca) {
      this.cochesService.getUrlMarca(marca).subscribe(urls => {
        this.imgMarca = urls[0];
      });
      // Especificamos cual es la marca con la que estamos trabajando
      this.marcas.forEach(marcaF => {
        if (marcaF.idMarca == marca) {
          this.marcaSelected = marcaF.marcaCoche;
        }
      });
      this.cochesService.getUrlMarca(marca).subscribe(urls => {
        this.urlMarca = urls[marca];
      });
      modelos = this.cochesService.getModelosPorMarca(marca, page, this.pageSize);
      this.paths = [];
      this.paths[0] = this.cochesService.getModelosPorMarcaPath(marca, this.pageSize); // Path de peticion http
      this.paths[1] = '/modelos/' + this.pageSize + '/marca/' + marca + '/page/'; // Path de peticion en app-routing-module
      modelosTotales = this.cochesService.getModelosPorMarcaSinPaginar(marca);

      modelosTotales.subscribe(response => {
        this.nombre_modelos = [];
        this.modelos_totales = response;
        this.nombre_modelos.push(ModelosComponent.TODOS);
        this.modelos_totales.forEach(modelo => {
          this.nombre_modelos.push(modelo.modelo);
        });
        this.opcionesModelo = this.controlModelo.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value, 'modelo'))
        );
      });
    } else if (this.filtroService.getFiltro()) {
      modelos = this.getModelosFiltrados(page, this.pageSize);
    } else {
      modelos = this.cochesService.getModelos(page, this.pageSize);
    }
    modelos.subscribe(response => {
      this.modelos = response.content as Modelo[];
      if (modelo) {
        this.modelos = this.modelos_totales.filter(modelo => modelo.modelo == this.modeloSelected);
      }
      this.paginator = response;
      let idsModelosPagina: number[]=[];
      this.modelos.forEach(mod =>{
        idsModelosPagina.push(mod.idModelo)
      });
      this.cochesService.getUrlModelo(idsModelosPagina).subscribe(urls => {
        this.modelosUrl = urls;
      });
      this.configurarItems();
      this.cochesService.asignarPreciosPorPagina(this.modelos).subscribe(response => {
        this.precios = response;
      });
    });
  }

  /**
   * Metodo para borrar el valor del selector
   * cuando se ha dejado de hacer focus en el
   *
   * @param event
   */
  borrarValor(event): void {
    event.target.value = '';
    this.opcionesMarca = this.controlMarca.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, 'marca'))
    );
    this.opcionesModelo = this.controlModelo.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, 'modelo'))
    );
  }

  /**
   * Metodo para obtener la url de la marca si existe y
   * en caso contrario, retornar una imagen por defecto
   */
  getUrlMarca() {
    if (this.urlMarca === undefined || this.urlMarca == null ) {
      return 'https://dl.dropboxusercontent.com/s/p076br0njm8vx43/fyclogo.png?dl=0';
    } else {
      return this.urlMarca;
    }
  }

  /**
   * Metodo para retornar el estado del slide
   *
   */
  getSlide() {
    return this.slide;
  }

  /**
   * Metodo para actualizar el estado del slide
   * al contrario al que tuviera previamente
   *
   */
  setSlide() {
    if (this.slide == 'slideIn') {
      this.slide = 'slideOut';
      this.zindex = 'zIndexOut';
    } else {
      this.slide = 'slideIn';
      this.zindex = 'zIndexIn';
    }
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  }

  /**
   * Metodo para obtener el estado del sidebar
   */
  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  /**
   * Metodo para esconder el sidebar
   */
  hideSidebar() {
    this.sidebarservice.setSidebarState(true);
  }

  /**
   * Metodo para buscar los modelos filtrados
   * @param page
   * @param pageSize
   */
  getModelosFiltrados(page: number, pageSize: number): Observable<any> {
    return this.cochesService.filtrar(this.filtroService.getFiltros(), page, pageSize);
  }

  /**
   * Metodo para reinicializar el componente y busque utilizando los filtros
   * @param $event
   */
  actualizarFiltros($event: any) {
    this.router.navigate(['/modelos']);
    this.iniciar();
  }

  /**
   * Metodo para actualizar el
   * booleano de loading
   * @param load
   */
  setLoading(load: boolean) {
    this.filtroService.setLoading(load);
    this.loading = this.filtroService.getLoading();
  }

  /**
   * Metodo para comprobar si no tiene precio el modelo
   * @param precios
   * @param modelo
   */
  isNaN(precios: Map<string, string>, modelo: Modelo): boolean {
    return precios[modelo.modelo + '/' + modelo.marca.marcaCoche] == 'N/A';
  }

  /**
   * Metodo para formatear los precios de los modelos
   * @param precios
   * @param modelo
   */
  formatPrecio(precios: Map<string, string>, modelo: Modelo): string {
    let precio = precios[modelo.modelo + '/' + modelo.marca.marcaCoche];
    if (precio) {
      if (precio.length >= 4) {
        precio = precio.substring(0, precio.length - 3) + '.' + precio.substring(precio.length - 3, precio.length);
        if (precio.length >= 8) {
          precio = precio.substring(0, precio.length - 7) + '.' + precio.substring(precio.length - 7, precio.length);
        }
      }
    }
    return precio;
  }

  /**
   * Metodo para buscar la url del modelo y en caso
   * de no encontrarla, retorna una por defecto
   * @param idModelo
   */
  getUrlModelo(idModelo: any) {
    if (this.modelosUrl[idModelo] == undefined) {
      return 'https://dl.dropboxusercontent.com/s/vdhgs1xu5nseb7j/defaultImageModelo.jpg?dl=0';
    } else {
      return this.modelosUrl[idModelo];
    }
  }
}
