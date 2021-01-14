import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {CochesService} from '../../services/coches.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Coche} from '../../../models/coche';
import {Modelo} from '../../../models/modelo';
import {isElementScrolledOutsideView} from '@angular/cdk/overlay/position/scroll-clip';
import {Marca} from '../../../models/marca';
import {FormControl} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {SidebarService} from '../../services/sidebar.service';
import {FiltroService} from '../../services/filtro.service';

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
  listaGlobal: any[] = new Array([]);
  loading: boolean=true;
  paginator: any;
  paths: string[];
  controlMarca = new FormControl();
  mostrarPaginator: boolean=true;

  controlModelo = new FormControl();
  opcionesMarca: Observable<string[]>;
  opcionesModelo: Observable<string[]>;
  results: Observable<string[]>;
  marcas:Marca[];
  nombre_marcas:string[]=[];
  nombre_modelos:string[]=[];
  marcaSelected: string = '';
  modeloSelected: string = '';
  slide = 'slideOff';

  constructor(
    private cochesService: CochesService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    public sidebarservice: SidebarService,
    private filtroService: FiltroService,
  ) {
  }

  ngOnInit(): void {
    this.iniciar()
  }



  /**
   * Metodo para iniciarlizar el componente
   *
   */
  iniciar():void{
    this.setLoading(true);
    this.activatedRoute.paramMap.subscribe(params => {
      let page  = +params.get('page'); // El operador suma transforma el string en un number
      let marca = +params.get('marca');
      if (!page || page<0) {
        page = 0;
      }

      this.cochesService.getMarcas().subscribe(response => {
        this.marcas = response as Marca[];

        this.marcas.sort((a, b) => {
          if(a.marcaCoche.toUpperCase()<b.marcaCoche.toUpperCase()){
            return -1
          }else {
            return 1;
          }
        });
        this.marcas.forEach(marca => {
          this.nombre_marcas.push(marca.marcaCoche);
        });
        this.marcaSeleccionada(marca,page, false);
        //   this.nombre_modelos.push(modelo.modelo);
        // });
        // this.modelos.forEach(modelo => {
        this.opcionesMarca = this.controlMarca.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value,'marca'))
        );
        this.marcas.forEach(marcaFor =>{
          if(marcaFor.idMarca==marca){
            this.marcaSelected= marcaFor.marcaCoche;
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
    this.modelos.forEach(modelo => {
      if ((i % 5 == 0 && i != 0)|| i==this.modelos.length) {
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
    if(parametro=='modelo'){
      return this.nombre_modelos.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    }else if(parametro=='marca') {
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
    this.marcas.forEach(marca=>{
        if(marca.marcaCoche==marcaString){
          idMarca=marca.idMarca;
        }
    });
    this.mostrarPaginator=true;
    this.modeloSelected ='';
    this.marcaSeleccionada(idMarca,0,false)
    // this.autocompleteControl.setValue('');
    // event.option.focus();
    // event.option.deselect();
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
    this.marcas.forEach(marca=>{

      if(marca.marcaCoche==this.marcaSelected){
        idMarca=marca.idMarca;
      }
    });
    this.mostrarPaginator=false;
    this.marcaSeleccionada(idMarca,0, true)
  }

  /**
   * Metodo para comprobar si se ha seleccionado una marca y obtener los vehiculos
   * por marca y pagina si es corecto
   *
   * @param marca Marca de vehiculo
   * @param page  Numero de pagina a buscar
   * @param modelo
   */
  marcaSeleccionada(marca:number,page:number,modelo:boolean):void{
    let modelos;
    let modelosTotales;
    this.setLoading(true);
    if(marca){
      // Especificamos cual es la marca con la que estamos trabajando
      this.marcas.forEach(marcaF =>{
        if(marcaF.idMarca==marca){
          this.marcaSelected = marcaF.marcaCoche;
        }
      });
      modelos = this.cochesService.getModelosPorMarca(marca,page);
      this.paths = [];
      this.paths[0] = this.cochesService.getModelosPorMarcaPath(marca); // Path de peticion http
      this.paths[1] = '/modelos/marca/'+marca+'/page/'; // Path de peticion en app-routing-module

    }else if(this.filtroService.getFiltro()) {
      modelos = this.getModelosFiltrados(page);
    }else {
      modelos = this.cochesService.getModelos(page);
    }
    modelosTotales = this.cochesService.getModelosPorMarcaSinPaginar(marca);
    modelos.subscribe(response => {
      this.modelos = response.content as Modelo[];
      if(modelo){
        this.modelos = this.modelos_totales.filter(modelo=> modelo.modelo==this.modeloSelected);
      }
      this.paginator = response;
      this.configurarItems();
    });
    modelosTotales.subscribe(response=>{
      this.nombre_modelos = [];
      this.modelos_totales = response;
      this.modelos_totales.forEach(modelo=>{
        this.nombre_modelos.push(modelo.modelo);
      });
      this.opcionesModelo = this.controlModelo.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value,'modelo'))
      );
    });

  }

  /**
   * Metodo para borrar el valor del selector
   * cuando se ha dejado de hacer focus en el
   *
   * @param event
   */
  borrarValor(event):void{
    event.target.value='';
    this.opcionesMarca = this.controlMarca.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value,'marca'))
    );
    this.opcionesModelo = this.controlModelo.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value,'modelo'))
    );
  }

  /**
   * Metodo para retornar el estado del slide
   *
   */
  getSlide(){
    return this.slide;
  }

  /**
   * Metodo para actualizar el estado del slide
   * al contrario al que tuviera previamente
   *
   */
  setSlide(){
    if(this.slide=='slideIn'){
      this.slide = 'slideOut';
    }else{
      this.slide = 'slideIn';
    }
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  hideSidebar() {
    this.sidebarservice.setSidebarState(true);
  }

  getModelosFiltrados(page:number):Observable<any>{
    return this.cochesService.filtrar(this.filtroService.getFiltros(),page)
  }

  actualizarFiltros($event: any){
    this.router.navigate(['/modelos']);
    this.iniciar();
  }

  setLoading(load: boolean) {
    this.filtroService.setLoading(load);
    let tiempo = new Date ();
    console.log("ModelosComponent lo ponemos a "+load+" Milis: "+tiempo.getTime());
    this.loading = this.filtroService.getLoading();
    console.log('this.loading = '+this.loading);
  }
}



