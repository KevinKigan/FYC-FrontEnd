import {Component, OnInit} from '@angular/core';
import {Modelo} from '../../../../../models/modelo';
import {CochesService} from '../../../../services/coches.service';
import {ActivatedRoute, Router} from '@angular/router';
import {urlUploadImg} from '../../../../../../environments/environment';
import {Coche} from '../../../../../models/coche';
import {FiltroService} from '../../../../services/filtro.service';
import {Consumo} from '../../../../../models/consumo';
import {Volumen} from '../../../../../models/volumen';
import {MotorCombustion} from '../../../../../models/motorCombustion';
import {Sobrealimentacion} from '../../../../../models/sobrealimentacion';
import {Carroceria} from '../../../../../models/carroceria';
import {TipoEmisiones} from '../../../../../models/tipoEmisiones';
import {TipoCombustible} from '../../../../../models/tipoCombustible';
import {Emisiones} from '../../../../../models/emisiones';
import {MotorElectrico} from '../../../../../models/motorElectrico';
import {Marca} from '../../../../../models/marca';


@Component({
  selector: 'app-modelo-especifico',
  templateUrl: './modelo-especifico-user.component.html',
  styleUrls: ['./modelo-especifico-user.component.scss']
})
export class ModeloEspecificoUserComponent implements OnInit {
  public chartTypeRadar: string = 'radar';
  public chartType: string = 'bar';
  filtros: string[] = ['Precio', 'Consumo', 'Potencia', 'Emisiones', 'Cilindrada'];
  comparar: string = 'cualquiera';
  claseTxt: string = 'yHoverTxt';
  modelo: Modelo;
  coches: Coche[] = [];
  chartLabels: Array<any> = [];
  cocheSeleccionado: Coche;
  semejantes: boolean = true;
  consumos: Consumo[] = [];
  volumenes: Volumen[] = [];
  chart = new Map<string, string>();
  positivos = new Map<string, number>();
  chartOptionsRadar: any = {};
  boolChart: boolean = false;
  chartS = new Map<string, string>();
  motoresCombustion: MotorCombustion[] = [];
  loading: boolean;
  urlUploadImg = urlUploadImg;
  idsCoches: number[] = [];
  idsConsumo: number[] = [];
  idsVolumen: number[] = [];
  idsMotor: number[] = [];
  fila1: string[] = ['Precio', 'Potencia'];
  fila2: string[] = ['Consumo', 'Emisiones'];
  filaS1: any[] = [];
  filaS2: any[] = [];
  filaS: any[] = new Array([]);
  precioC: number;
  consumoC: number;
  category:string;
  cilindradaC: number;
  potenciaC: number;
  emisionesC: number;
  precioCS: number;
  consumoCS: number;
  cilindradaCS: number;
  potenciaCS: number;
  emisionesCS: number;
  chartDatasetsRadar: Array<any> = [];
  modeloChart: string = '';
  chartDatasetsPrecio: Array<any> = [];
  chartDatasetsEmisiones: Array<any> = [];
  chartDatasetsConsumo: Array<any> = [];
  chartDatasetsPotencia: Array<any> = [];
  images: Map<number, string> = new Map;
  private minimoPrecio: any;
  private minimoPotencia: any;
  private minimoEmisiones: any;
  private minimoConsumo: any;
  volumen: Volumen;
  carrocerias: Carroceria [] = [];
  tipoEmisiones: TipoEmisiones[];
  tipoCombustibles: TipoCombustible[];
  saved: number = 0;
  emisiones: Emisiones;
  enableSave: boolean = false;
  arrayCol: number[] = [0, 1, 2];
  arraRow: number[] = [0, 1, 2];
  arrayRow: any[] = [];
  motorCombustion: MotorCombustion;
  consumo: Consumo;
  motorElectrico: MotorElectrico;
  modelGen: any               [] = [];
  modelVolumen: any           [] = [];
  modelMotCombustion: any     [] = [];
  modelEmiCombustion: any     [] = [];
  modelConsCombustion: any    [] = [];
  modelConsAltCombustion: any [] = [];
  modelConsElectrico: any     [] = [];
  modelMotElectrico: any      [] = [];
  modelMotor: any             [] = [];
  camposGen: string[] = [
    'Marca',
    'Modelo',
    'Carrocería',
    'Año',
    'Precio (€)',
    'Transmisión',
    'Eje Motriz'
  ];
  iconsGen: string[] = [
    'fas fa-warehouse',
    'fas fa-car',
    'fas fa-car-side',
    'fas fa-hourglass-start',
    'fas fa-tags',
    'fas fa-cogs',
    'fas fa-tractor'
  ];
  iconsMotC: string[] = [
    'fas fa-prescription-bottle',
    'fas fa-database',
    'fas fa-dumbbell',
    'fas fa-truck-monster',
    'fas fa-dragon',
    'fas fa-gas-pump'
  ];

  iconsMotE: string[] = [
    'fas fa-stopwatch',
    'fas fa-dumbbell',
    'fas fa-dumbbell',
    'fas fa-dumbbell',
    'fas fa-dumbbell',
    'fas fa-dumbbell'
  ];
  iconsCons: string[] = [
    'fas fa-water',
    'fas fa-water',
    'fas fa-water'
  ];
  iconsEmi: string[] = [
    'fas fa-skull-crossbones',
    'fas fa-globe-europe'
  ];
  iconsVol: string[] = [
    'fas fa-shuttle-van',
    'fas fa-shuttle-van'
  ];
  camposMotC: string[] = [
    'Cilindrada (L)',
    'Cilindros',
    'Potencia (CV)',
    'Turbo',
    'Compresor',
    'Combustible'
  ];
  camposConC: string[] = [
    'Consumo Ciudad',
    'Consumo Autopista',
    'Consumo Mixto'
  ];
  camposConAltC: string[] = [
    'Consumo Alt Ciudad',
    'Consumo Alt Autopista',
    'Consumo Alt Mixto'
  ];
  camposConE: string[] = [
    'Consumo Eléctrico Ciudad',
    'Consumo Eléctrico Autopista',
    'Consumo Eléctrico Mixto'
  ];

  camposEmi: string[] = [
    'CO2',
    'Normativa Euro'
  ];
  camposMotElectrico: string[] = [];
  camposVol: string[] = [];
  selects: string[] = ['Carrocería', 'Transmisión', 'Eje Motriz', 'Turbo', 'Compresor', 'Tipo Combustible', 'Normativa Euro'];
  private marcasString: string[] = [];
  private modelosString: string[] = [];
  private carroceriasString: string[] = [];
  private tipoCombustiblesString: string[] = [];
  private tipoEmisionesString: string[] = [];
  private transmisionesString: string[] = ['Automatico', 'Manual'];
  private booleanString: string[] = ['Si', 'No'];
  private traccionesString: string[] = ['Total', 'Delantero', 'Trasero'];
  marcas: Marca[];
  elements: any[] = [
    this.marcasString, this.modelosString, this.carroceriasString,
    this.transmisionesString, this.traccionesString, this.booleanString,
    this.booleanString, this.tipoCombustiblesString, this.tipoEmisionesString
  ];
  private marcaSelected: Marca;
  private versionesElectricas: number;
  private itemsToSave: number = 0;


  center = {lat: 24, lng: 12};
  display?: google.maps.LatLngLiteral;
  imagenPrincipal: string;

  constructor(private cochesService: CochesService,
              private activatedRoute: ActivatedRoute,
              private filtroService: FiltroService) {
  }

  ngOnInit(): void {
    this.iniciar();
  }

  /**
   * Metodo para configurar las marcas en listas de 5 elementos
   * y que se muestren por filas de dichos elementos
   */
  configurarItems() {
    this.configurarGeneral();
    this.configurarVolumen();
    this.configurarMotores();
  }

  /**
   * Metodo para iniciar el componente
   *
   */
  iniciar() {
    this.setLoading(true);
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      this.category = params.get('category');
      this.cochesService.getModelo(id).subscribe(modelo => {
        this.modelo = modelo;
        this.modeloChart = this.modelo.modelo;
        this.cochesService.getUrlModelo([this.modelo.idModelo]).subscribe( url=>{
          this.imagenPrincipal = url[this.modelo.idModelo];
        });
        this.cochesService.getCochesPorModelo(this.modelo.idModelo).subscribe(value => {
          value.forEach(coche => {
            this.coches.push(coche);
            this.idsCoches.push(coche.idCoche);
            this.idsConsumo.push(coche.consumo.idConsumo);
            this.idsVolumen.push(coche.modelo.idVolumen);
            this.idsMotor.push(coche.tipoMotor.idTipoMotor);
            this.cocheSeleccionado = coche;
          });
          this.configurarItems();
          this.cochesService.getListConsumo(this.idsConsumo).subscribe(consumos => {
            this.consumos = consumos;
          });
          if(this.cocheSeleccionado.precio > 0) {
            this.cochesService.getDatosChart(this.cocheSeleccionado.idCoche).subscribe(chart => {
              this.chart = chart;

              this.cochesService.getDatosChartSemejantes(this.cocheSeleccionado.idCoche, 'Precio').subscribe(chartS => {
                this.asignarValores(chartS);
                this.formatValues();
                if (this.precioCS == 0 && this.consumoCS == 0 && this.cilindradaCS == 0 && this.potenciaCS == 0 && this.emisionesCS == 0) {
                  this.semejantes = false;
                }
                this.boolChart = true;
                this.setLoading(false);
              });
            });
          }else{
            this.setLoading(false);
          }
          this.cochesService.getListMotoresCombustion(this.idsMotor).subscribe(motores => {
            this.motoresCombustion = motores;
          });

        });

      });
    });

  }

  asignarValores(chartS: Map<string,string>){
    let ids: number[] = [];
    console.log(chartS);
    ids.push(+chartS['idmodeloConsumoMax']);
    ids.push(+chartS['idmodeloConsumoMin']);
    ids.push(+chartS['idmodeloEmisionesMax']);
    ids.push(+chartS['idmodeloEmisionesMin']);
    ids.push(+chartS['idmodeloPotenciaMax']);
    ids.push(+chartS['idmodeloPotenciaMin']);
    ids.push(+chartS['idmodeloPrecioMax']);
    ids.push(+chartS['idmodeloPrecioMin']);
    this.images.set(+chartS['idmodeloConsumoMax'],  'https://dl.dropboxusercontent.com/s/vdhgs1xu5nseb7j/defaultImageModelo.jpg?dl=0');
    this.images.set(+chartS['idmodeloConsumoMin'],  'https://dl.dropboxusercontent.com/s/vdhgs1xu5nseb7j/defaultImageModelo.jpg?dl=0');
    this.images.set(+chartS['idmodeloEmisionesMax'],'https://dl.dropboxusercontent.com/s/vdhgs1xu5nseb7j/defaultImageModelo.jpg?dl=0');
    this.images.set(+chartS['idmodeloEmisionesMin'],'https://dl.dropboxusercontent.com/s/vdhgs1xu5nseb7j/defaultImageModelo.jpg?dl=0');
    this.images.set(+chartS['idmodeloPotenciaMax'], 'https://dl.dropboxusercontent.com/s/vdhgs1xu5nseb7j/defaultImageModelo.jpg?dl=0');
    this.images.set(+chartS['idmodeloPotenciaMin'], 'https://dl.dropboxusercontent.com/s/vdhgs1xu5nseb7j/defaultImageModelo.jpg?dl=0');
    this.images.set(+chartS['idmodeloPrecioMax'],   'https://dl.dropboxusercontent.com/s/vdhgs1xu5nseb7j/defaultImageModelo.jpg?dl=0');
    this.images.set(+chartS['idmodeloPrecioMin'],   'https://dl.dropboxusercontent.com/s/vdhgs1xu5nseb7j/defaultImageModelo.jpg?dl=0');
    this.cochesService.getUrlModelo(ids).subscribe(urls =>{
      ids.forEach(id => {
        if (urls[id] != undefined) {
          this.images.set(id,urls [id]);
        }
      });
    });
    this.chartS = chartS;
    this.precioC = +this.chart['Precio'];
    this.consumoC = +this.chart['ConsumoMedio'];
    this.cilindradaC = +this.chart['Cilindrada'];
    this.potenciaC = +this.chart['Potencia'];
    this.emisionesC = +this.chart['CO2'];

    this.precioCS = +this.chartS['mediaPrecio'];
    this.consumoCS = +this.chartS['mediaConsumo'];
    this.cilindradaCS = +this.chartS['mediaCilindrada'];
    this.potenciaCS = +this.chartS['mediaPotencia'];
    this.emisionesCS = +this.chartS['mediaEmisiones'];
    let marcaPrecioMinCS    = this.chartS['modeloPrecioMin'].substring(this.chartS['modeloPrecioMin'].indexOf("/")+1,this.chartS['modeloPrecioMin'].size);
    let marcaPrecioMaxCS    = this.chartS['modeloPrecioMax'].substring(this.chartS['modeloPrecioMax'].indexOf("/")+1,this.chartS['modeloPrecioMax'].size);
    let marcaPotenciaMinCS  = this.chartS['modeloPotenciaMin'].substring(this.chartS['modeloPotenciaMin'].indexOf("/")+1,this.chartS['modeloPotenciaMin'].size);
    let marcaPotenciaMaxCS  = this.chartS['modeloPotenciaMax'].substring(this.chartS['modeloPotenciaMax'].indexOf("/")+1,this.chartS['modeloPotenciaMax'].size);
    let marcaConsumoMinCS   = this.chartS['modeloConsumoMin'].substring(this.chartS['modeloConsumoMin'].indexOf("/")+1,this.chartS['modeloConsumoMin'].size);
    let marcaConsumoMaxCS   = this.chartS['modeloConsumoMax'].substring(this.chartS['modeloConsumoMax'].indexOf("/")+1,this.chartS['modeloConsumoMax'].size);
    let marcaEmisionesMinCS = this.chartS['modeloEmisionesMin'].substring(this.chartS['modeloEmisionesMin'].indexOf("/")+1,this.chartS['modeloEmisionesMin'].size);
    let marcaEmisionesMaxCS = this.chartS['modeloEmisionesMax'].substring(this.chartS['modeloEmisionesMax'].indexOf("/")+1,this.chartS['modeloEmisionesMax'].size);

    let modeloPrecioMinCS    = this.chartS['modeloPrecioMin'].substring(0,this.chartS['modeloPrecioMin'].indexOf('/'));
    let modeloPrecioMaxCS    = this.chartS['modeloPrecioMax'].substring(0,this.chartS['modeloPrecioMax'].indexOf('/'));
    let modeloPotenciaMinCS  = this.chartS['modeloPotenciaMin'].substring(0,this.chartS['modeloPotenciaMin'].indexOf('/'));
    let modeloPotenciaMaxCS  = this.chartS['modeloPotenciaMax'].substring(0,this.chartS['modeloPotenciaMax'].indexOf('/'));
    let modeloConsumoMinCS   = this.chartS['modeloConsumoMin'].substring(0,this.chartS['modeloConsumoMin'].indexOf('/'));
    let modeloConsumoMaxCS   = this.chartS['modeloConsumoMax'].substring(0,this.chartS['modeloConsumoMax'].indexOf('/'));
    let modeloEmisionesMinCS = this.chartS['modeloEmisionesMin'].substring(0,this.chartS['modeloEmisionesMin'].indexOf('/'));
    let modeloEmisionesMaxCS = this.chartS['modeloEmisionesMax'].substring(0,this.chartS['modeloEmisionesMax'].indexOf('/'));

    this.filaS1 = [];
    this.filaS2 = [];
    this.filaS = [];
    this.filaS1.push({title:'Precio más reducido',    marca:marcaPrecioMinCS   ,modelo: modeloPrecioMinCS   ,imagen:this.chartS['modeloPrecioMinImage'],   idModelo:this.chartS['idmodeloPrecioMin']});
    this.filaS1.push({title:'Precio más alto',        marca:marcaPrecioMaxCS   ,modelo: modeloPrecioMaxCS   ,imagen:this.chartS['modeloPrecioMaxImage'],   idModelo:this.chartS['idmodeloPrecioMax']});
    this.filaS1.push({title:'Potencia más reducida',  marca:marcaPotenciaMinCS ,modelo: modeloPotenciaMinCS ,imagen:this.chartS['modeloPotenciaMinImage'], idModelo:this.chartS['idmodeloPotenciaMin']});
    this.filaS1.push({title:'Potencia más alta',      marca:marcaPotenciaMaxCS ,modelo: modeloPotenciaMaxCS ,imagen:this.chartS['modeloPotenciaMaxImage'], idModelo:this.chartS['idmodeloPotenciaMax']});
    this.filaS2.push({title:'Consumo más reducido',   marca:marcaConsumoMinCS  ,modelo: modeloConsumoMinCS  ,imagen:this.chartS['modeloConsumoMinImage'],  idModelo:this.chartS['idmodeloConsumoMin']});
    this.filaS2.push({title:'Consumo más alto',       marca:marcaConsumoMaxCS  ,modelo: modeloConsumoMaxCS  ,imagen:this.chartS['modeloConsumoMaxImage'],  idModelo:this.chartS['idmodeloConsumoMax']});
    this.filaS2.push({title:'Emisiones más reducidas',marca:marcaEmisionesMinCS,modelo: modeloEmisionesMinCS,imagen:this.chartS['modeloEmisionesMinImage'],idModelo:this.chartS['idmodeloEmisionesMin']});
    this.filaS2.push({title:'Emisiones más altas',    marca:marcaEmisionesMaxCS,modelo: modeloEmisionesMaxCS,imagen:this.chartS['modeloEmisionesMaxImage'],idModelo:this.chartS['idmodeloEmisionesMax']});
    this.filaS.push(this.filaS1);
    this.filaS.push(this.filaS2);
  }

  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(255,238,16,0.2)',
        'rgba(103,103,103,0.3)',
      ],
      borderColor: [
        'rgba(162,157,0,1)',
        // 'rgba(162,157,0,1)',
        // 'rgb(255,0,0)',
        'rgba(103, 103,103,1)',
      ],
      borderWidth: 2,
    }
  ];

  public chartLabelsRadar: Array<any> = ['Precio', 'Consumo Medio', 'Cilindrada', 'Potencia(CV)', 'Emisiones (CO2)'];

  public chartColorsRadar: Array<any> = [
    {
      borderColor: 'rgba(162,157,0,0.7)',
      backgroundColor: 'rgba(255,238,16,0.2)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(103,103,103,0.3)',
      borderColor: 'rgba(103,103,103,0.7)',
      borderWidth: 2,
    }
  ];


  public chartClicked(e: any): void {
  }

  public chartHovered(e: any): void {
  }


  setLoading(load: boolean) {
    this.filtroService.setLoading(load);
    this.loading = this.filtroService.getLoading();
  }

  /**
   * Metodo para retornar el string de sobrealimentacion en
   * funcion de el parametro booleano del objeto Sobrealimentacion
   *
   * @param sobrealimentacion
   */
  sobreAlimentacion(sobrealimentacion: Sobrealimentacion): string {
    if (sobrealimentacion.turbo) {
      return 'Turbo';
    } else if (sobrealimentacion.supercargador) {
      return 'Compresor';
    } else {
      return 'Atmosférico';
    }
  }

  /**
   * Metodo para formatear los valores del chartRadar en un rango
   * de 0 a 5 y asingar los valores reales a los chart de tipo bar
   *
   */
  formatValues() {
    this.positivos['precioCOriginal'] = this.precioC;
    this.positivos['precioCSOriginal'] = this.precioCS;
    this.positivos['potenciaCSOriginal'] = this.potenciaCS;
    this.positivos['potenciaCOriginal'] = this.potenciaC;
    this.positivos['consumoCSOriginal'] = this.consumoCS;
    this.positivos['consumoCOriginal'] = this.consumoC;
    this.positivos['emisionesCSOriginal'] = this.emisionesCS;
    this.positivos['emisionesCOriginal'] = this.emisionesC;
    let minimo: number = 10;

    //Precio
    if (this.precioC > this.precioCS) {
      this.minimoPrecio = this.precioCS;
      this.precioCS = this.precioCS * 5 / this.precioC;
      if (this.precioCS < minimo) {
        minimo = this.precioCS;
      }
      this.precioC = 5;
      this.precioCS = Math.round(this.precioCS * 100) / 100;
    } else {
      this.minimoPrecio = this.precioC;
      this.precioC = this.precioC * 5 / this.precioCS;
      if (this.precioC < minimo) {
        minimo = this.precioC;
      }
      this.precioCS = 5;
      this.precioC = Math.round(this.precioC * 100) / 100;
    }
    //Potencia
    if (this.potenciaC > this.potenciaCS) {
      this.minimoPotencia = this.potenciaCS;
      this.potenciaCS = this.potenciaCS * 5 / this.potenciaC;
      if (this.potenciaCS < minimo) {
        minimo = this.potenciaCS;
      }
      this.potenciaC = 5;
      this.potenciaCS = Math.round(this.potenciaCS * 100) / 100;
    } else {
      this.minimoPotencia = this.potenciaCS;
      this.potenciaC = this.potenciaC * 5 / this.potenciaCS;
      if (this.potenciaC < minimo) {
        minimo = this.potenciaC;
      }
      this.potenciaCS = 5;
      this.potenciaC = Math.round(this.potenciaC * 100) / 100;
    }
    //Cilindrada
    if (this.cilindradaC > this.cilindradaCS) {
      this.cilindradaCS = this.cilindradaCS * 5 / this.cilindradaC;
      if (this.cilindradaCS < minimo) {
        minimo = this.cilindradaCS;
      }
      this.cilindradaC = 5;
      this.cilindradaCS = Math.round(this.cilindradaCS * 100) / 100;
    } else {
      this.cilindradaC = this.cilindradaC * 5 / this.cilindradaCS;
      if (this.cilindradaC < minimo) {
        minimo = this.cilindradaC;
      }
      this.cilindradaCS = 5;
      this.cilindradaC = Math.round(this.cilindradaC * 100) / 100;
    }
    //Consumo
    if (this.consumoC > this.consumoCS) {
      this.minimoConsumo = this.consumoCS;
      this.consumoCS = this.consumoCS * 5 / this.consumoC;
      if (this.consumoCS < minimo) {
        minimo = this.consumoCS;
      }
      this.consumoC = 5;
      this.consumoCS = Math.round(this.consumoCS * 100) / 100;
    } else {
      this.minimoConsumo = this.consumoC;
      this.consumoC = this.consumoC * 5 / this.consumoCS;
      if (this.consumoC < minimo) {
        minimo = this.consumoC;
      }
      this.consumoCS = 5;
      this.consumoC = Math.round(this.consumoC * 100) / 100;
    }
    //Emisiones
    if (this.emisionesC > this.emisionesCS) {
      this.minimoEmisiones = this.emisionesCS;
      this.emisionesCS = this.emisionesCS * 5 / this.emisionesC;
      if (this.emisionesCS < minimo) {
        minimo = this.emisionesCS;
      }
      this.emisionesC = 5;
      this.emisionesCS = Math.round(this.emisionesCS * 100) / 100;
    } else {
      this.minimoEmisiones = this.emisionesCS;
      this.emisionesC = this.emisionesC * 5 / this.emisionesCS;
      if (this.emisionesC < minimo) {
        minimo = this.emisionesC;
      }
      this.emisionesCS = 5;
      this.emisionesC = Math.round(this.emisionesC * 100) / 100;
    }
    if (minimo > 2) {
      minimo -= 2;
    }
    this.chartLabels = [this.modelo.modelo, 'Modelos Similares'];
    this.chartOptionsRadar = {
      scale: {
        angleLines: {
          display: true
        },
        ticks: {
          suggestedMin: minimo,
          suggestedMax: 5
        }
      },
      plugins: {
        legend: {
          labels: {
            font: {
              size: 18
            }
          }
        }
      },
      responsive: true
    };
    this.minimoPrecio = Math.round(this.minimoPrecio *= 0.85);
    this.minimoPotencia *= 0.85;
    this.minimoEmisiones *= 0.85;
    this.minimoConsumo *= 0.85;

    this.chartDatasetsRadar = [
      {data: [this.precioC, this.consumoC, this.cilindradaC, this.potenciaC, this.emisionesC], label: this.modelo.modelo},
      {data: [this.precioCS, this.consumoCS, this.cilindradaCS, this.potenciaCS, this.emisionesCS], label: 'Modelos similares'}
    ];
    this.chartDatasetsPrecio = [{data: [this.positivos['precioCOriginal'], this.positivos['precioCSOriginal']], label: 'Precio (€)'},];
    this.chartDatasetsConsumo = [{
      data: [this.positivos['consumoCOriginal'], this.positivos['consumoCSOriginal']],
      label: 'Consumo (L/100Km)'
    },];
    this.chartDatasetsEmisiones = [{
      data: [this.positivos['emisionesCOriginal'], this.positivos['emisionesCSOriginal']],
      label: 'Emisiones (CO2)'
    },];
    this.chartDatasetsPotencia = [{
      data: [this.positivos['potenciaCOriginal'], this.positivos['potenciaCSOriginal']],
      label: 'Potencia (CV)'
    },];
  }

  /**
   * Metodo para comparar los modelos semejantes
   * en funcion del parametro solicitado
   *
   * @param comparar Parametro de comparacion solicitado
   */
  compararPorFiltro() {
    this.cochesService.getDatosChartSemejantes(this.cocheSeleccionado.idCoche, this.comparar).subscribe(chartS => {
      this.asignarValores(chartS);
      this.formatValues();
      if(this.precioCS==0 && this.consumoCS==0 && this.cilindradaCS==0 && this.potenciaCS==0 && this.emisionesCS==0){
        this.semejantes = false;
      }
      this.boolChart = true;
      this.setLoading(false);
    });
  }


  /**
   * Metodo para obtener los datos de la grafica en
   * funcion del nombre de la grafica
   *
   * @param f Nombre de grafica
   */
  getChartDatasets(f: string) {
    switch (f) {
      case 'Precio':
        return this.chartDatasetsPrecio;
      case 'Potencia':
        return this.chartDatasetsPotencia;
      case 'Consumo':
        return this.chartDatasetsConsumo;
      case 'Emisiones':
        return this.chartDatasetsEmisiones;
    }
  }

  public chartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          suggestedMin: 50
        }
      }]
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 18
          }
        }
      }
    },
    responsive: true
  };

  /**
   * Metodo para espeficicar el minimo valor en el eje Y de
   * la grafica
   *
   * @param f Nombre de la grafica
   */
  getOptions(f: string) {
    switch (f) {
      case 'Precio':
        this.chartOptions.scales.yAxes[0].ticks.suggestedMin = this.minimoPrecio;
        break;
      case 'Potencia':
        this.chartOptions.scales.yAxes[0].ticks.suggestedMin = this.minimoPotencia;
        break;
      case 'Consumo':
        this.chartOptions.scales.yAxes[0].ticks.suggestedMin = this.minimoConsumo;
        break;
      case 'Emisiones':
        this.chartOptions.scales.yAxes[0].ticks.suggestedMin = this.minimoEmisiones;
        break;
    }
    return this.chartOptions;
  }

  /**
   * Metodo para calcular si el modelo es mejor o peor
   * segun el parametro f que los modelo similares
   *
   * @param f Nombre de la grafica
   */
  positivo(f: string) {
    switch (f) {
      case 'Precio':
        return this.positivos['precioCOriginal'] < this.positivos['precioCSOriginal'];
      case 'Potencia':
        return this.positivos['potenciaCOriginal'] > this.positivos['potenciaCSOriginal'];
      case 'Consumo':
        return this.positivos['consumoCOriginal'] < this.positivos['consumoCSOriginal'];
      case 'Emisiones':
        return this.positivos['emisionesCOriginal'] < this.positivos['emisionesCSOriginal'];
    }
  }

  /**
   * Mertodo para calcular el procentaje real de los
   * valores de las graficas
   *
   * @param f Nombre de la grafica
   */
  obtenerPorcentaje(f: string) {
    switch (f) {
      case 'Precio':
        if (this.positivos['precioCOriginal'] > this.positivos['precioCSOriginal']) {
          return ((Math.round((this.positivos['precioCOriginal'] / this.positivos['precioCSOriginal']) * 10000) / 10000) * 100 - 100).toFixed(2);
        } else {
          return ((Math.round((this.positivos['precioCSOriginal'] / this.positivos['precioCOriginal']) * 10000) / 10000) * 100 - 100).toFixed(2);
        }
      case 'Potencia':
        if (this.positivos['potenciaCOriginal'] > this.positivos['potenciaCSOriginal']) {
          return ((Math.round((this.positivos['potenciaCOriginal'] / this.positivos['potenciaCSOriginal']) * 10000)) / 100 - 100).toFixed(2);
        } else {
          return ((Math.round((this.positivos['potenciaCSOriginal'] / this.positivos['potenciaCOriginal']) * 10000)) / 100 - 100).toFixed(2);
        }
      case 'Consumo':
        if (this.positivos['consumoCOriginal'] > this.positivos['consumoCSOriginal']) {
          return ((Math.round((this.positivos['consumoCOriginal'] / this.positivos['consumoCSOriginal']) * 10000) / 10000) * 100 - 100).toFixed(2);
        } else {
          return ((Math.round((this.positivos['consumoCSOriginal'] / this.positivos['consumoCOriginal']) * 10000) / 10000) * 100 - 100).toFixed(2);
        }
      case 'Emisiones':
        if (this.positivos['emisionesCOriginal'] > this.positivos['emisionesCSOriginal']) {
          return ((Math.round((this.positivos['emisionesCOriginal'] / this.positivos['emisionesCSOriginal']) * 10000) / 10000) * 100 - 100).toFixed(2);
        } else {
          return ((Math.round((this.positivos['emisionesCSOriginal'] / this.positivos['emisionesCOriginal']) * 100) / 100) * 100 - 100).toFixed(2);
        }
    }
  }


  mouseEnter(modelo: any,ind1:any,ind2:any) {
    if ( document.getElementById(modelo+'Txt'+ind1+ind2).classList.contains('noHoverTxt')){
      document.getElementById(modelo+'Txt'+ind1+ind2).classList.remove('noHoverTxt');
      document.getElementById(modelo+'Txt'+ind1+ind2).classList.add('yHoverTxt');
    }else{
      document.getElementById(modelo+'Txt'+ind1+ind2).classList.remove('yHoverImg');
      document.getElementById(modelo+'Txt'+ind1+ind2).classList.add('noHoverTxt');
    }
    if ( document.getElementById(modelo+ind1+ind2).classList.contains('noHoverImg')){
      document.getElementById(modelo+ind1+ind2).classList.remove('noHoverImg');
      document.getElementById(modelo+ind1+ind2).classList.add('yHoverImg');
    }else{
      document.getElementById(modelo+ind1+ind2).classList.remove('yHoverImg');
      document.getElementById(modelo+ind1+ind2).classList.add('noHoverImg');
    }

  }

  /**
   * Metodo para configurar los modelos generales
   * @private
   */
  private configurarGeneral() {
    this.modelGen[0] = this.modelo.marca.marcaCoche;
    this.modelGen[1] = this.modelo.modelo;
    if(!this.cocheSeleccionado.carroceria.carroceria.includes('NULL')){
      this.modelGen[2] = this.cocheSeleccionado.carroceria.carroceria;
    } else{
      this.modelGen[2] = 'No disponible';
    }
    this.modelGen[3] = this.cocheSeleccionado.caryear;
    if(this.cocheSeleccionado.precio > 0){
      this.modelGen[4] = this.cocheSeleccionado.precio;
    } else{
      this.modelGen[4] = 'No disponible';
    }
    this.modelGen[5] = this.cocheSeleccionado.transmision;
    switch (this.cocheSeleccionado.ejeMotriz) {
      case 'AWD':
        this.modelGen[6] = 'Total';
        break;
      case 'FWD':
        this.modelGen[6] = 'Delantero';
        break;
      case 'RWD':
        this.modelGen[6] = 'Trasero';
        break;
    }
    this.configurarColumnas(this.modelGen, 0);
    this.cochesService.getCarrocerias().subscribe(carrocerias => {
      this.carrocerias = carrocerias;
      carrocerias.forEach(carroceria => {
        this.carroceriasString[this.carroceriasString.length] = carroceria.carroceria;
      });
    });
  }

  /**
   * Metodos para configurar los modelos relacionados con
   * el motor como tipo de motor, consumos o emisiones
   * @private
   */
  private configurarMotores() {
    this.cochesService.getTiposCombustibles().subscribe(combustibles => {
      this.tipoCombustibles = combustibles.tipos_combustibles;
      // combustibles[0].forEach(combustible => tipoCombustibles.push(combustible));
      this.tipoCombustibles.filter(combustible => {
        if (!combustible.tipoCombustible.includes('Electricidad')) {
          return combustible;
        }
      }).forEach(combustible => {
        this.tipoCombustiblesString[this.tipoCombustiblesString.length] = combustible.tipoCombustible;
      });
    });
    this.cochesService.getTipoEmisiones().subscribe(normativas => {
      this.tipoEmisiones = normativas.normativas;
      this.tipoEmisiones.forEach(normativa => {
        this.tipoEmisionesString[this.tipoEmisionesString.length] = normativa.tipoEmisiones;
      });
    });
    this.cochesService.getTipoMotor(this.cocheSeleccionado.tipoMotor.idTipoMotor).subscribe(value => {
      if (value.motorCombustion != null) {
        this.itemsToSave++;
        this.motorCombustion = value.motorCombustion;
        this.modelMotCombustion[0] = this.motorCombustion.cilindrada;
        this.modelMotCombustion[1] = this.motorCombustion.cilindros;
        this.modelMotCombustion[2] = this.motorCombustion.hp;
        this.motorCombustion.sobrealimentacion.turbo == true ? this.modelMotCombustion[3] = 'Si' : this.modelMotCombustion[3] = 'No';
        this.motorCombustion.sobrealimentacion.supercargador == true ? this.modelMotCombustion[4] = 'Si' : this.modelMotCombustion[4] = 'No';
        this.modelMotCombustion[5] = this.motorCombustion.combustible.tipoCombustibleNormal.tipoCombustible;
        this.configurarColumnas(this.modelMotCombustion, 1);
        if (this.motorCombustion.emisiones) {
          this.cochesService.getEmisiones(this.motorCombustion.emisiones.idEmisiones).subscribe(value => {
            this.emisiones = value;
            if (value.co2 != -1) {
              this.modelEmiCombustion[0] = value.co2;
            }
            if (value.tipoEmisiones != null) {
              this.modelEmiCombustion[1] = value.tipoEmisiones.tipoEmisiones;
            }
            this.configurarColumnas(this.modelEmiCombustion, 6);
          });
        }

        this.cochesService.getConsumo(this.cocheSeleccionado.consumo.idConsumo).subscribe(value => {
          this.consumo = value;
          this.itemsToSave++;
          if (this.consumo.idConsumoNormal != null) {
            this.modelConsCombustion[0] = this.consumo.idConsumoNormal.ciudad;
            this.modelConsCombustion[1] = this.consumo.idConsumoNormal.autopista;
            this.modelConsCombustion[2] = this.consumo.idConsumoNormal.combinado;
            this.configurarColumnas(this.modelConsCombustion, 3);
          }
          if (this.consumo.idConsumoAlternativo != null) {
            this.modelConsAltCombustion[0] = this.consumo.idConsumoAlternativo.ciudad;
            this.modelConsAltCombustion[1] = this.consumo.idConsumoAlternativo.autopista;
            this.modelConsAltCombustion[2] = this.consumo.idConsumoAlternativo.combinado;
            this.configurarColumnas(this.modelConsAltCombustion, 4);
          }
          if (this.consumo.idConsumoElectrico != null) {
            this.modelConsElectrico[0] = this.consumo.idConsumoElectrico.ciudad;
            this.modelConsElectrico[1] = this.consumo.idConsumoElectrico.autopista;
            this.modelConsElectrico[2] = this.consumo.idConsumoElectrico.combinado;
            this.configurarColumnas(this.modelConsElectrico, 5);
          }
        });
      }
      if (value.motorElectrico != null) {
        this.itemsToSave++;
        this.motorElectrico = value.motorElectrico;
        this.modelMotElectrico[0] = this.motorElectrico.tCarga220v;
        this.camposMotElectrico[0] = 'Tiempo de Carga 220V (h)';
        let version: number = 1;
        this.motorElectrico.hps.forEach(hps => {
          this.modelMotElectrico[this.modelMotElectrico.length] = hps.hp;
          this.camposMotElectrico[this.modelMotElectrico.length - 1] = 'Potencia (CV) Versión ' + (version);
          version++;
        });
        version = 1;
        this.motorElectrico.potenciasElectricas.forEach(kWh => {
          this.modelMotElectrico[this.modelMotElectrico.length] = kWh.potencia;
          this.camposMotElectrico[this.modelMotElectrico.length - 1] = 'Potencia (kWh) Versión ' + (version);
          version++;
        });
        this.versionesElectricas = version - 1;
        this.configurarColumnas(this.modelMotElectrico, 2);
      }
    });
  }
  private configurarColumnas(model: any[], index: number) {
    this.arrayRow[index] = [];
    for (let i = 0; i < model.length / this.arrayCol.length; i++) {
      this.arrayRow[index][i] = i;
    }
  }

  private configurarVolumen() {
    this.volumen = this.cocheSeleccionado.modelo.volumen;
    if (this.volumen != null) {
      this.cochesService.getVolumenById(this.volumen.idVolumen).subscribe(value => {
        this.volumen = value;
        this.itemsToSave++;
        let itms: number = 0;
        if (value.volumen2p != null) {
          this.modelVolumen[this.modelVolumen.length] = value.volumen2p.volumenHabitaculo;
          this.modelVolumen[this.modelVolumen.length] = value.volumen2p.volumenMaletero;
          itms++;
        }
        if (value.volumen4p != null) {
          this.modelVolumen[this.modelVolumen.length] = value.volumen4p.volumenHabitaculo;
          this.modelVolumen[this.modelVolumen.length] = value.volumen4p.volumenMaletero;
          itms++;
        }
        if (value.volumenHatchback != null) {
          this.modelVolumen[this.modelVolumen.length] = value.volumenHatchback.volumenHabitaculo;
          this.modelVolumen[this.modelVolumen.length] = value.volumenHatchback.volumenMaletero;
          itms++;
        }
        if (itms == 1) {
          this.camposVol[this.camposVol.length] = 'Habitáculo (L)';
          this.camposVol[this.camposVol.length] = 'Maletero (L)';
        } else if (itms > 1) {
          for (let i = 0; i < itms; i++) {
            this.camposVol[this.camposVol.length] = 'Habitáculo Versión' + i + ' (L)';
            this.camposVol[this.camposVol.length] = 'Maletero Versión' + i + ' (L)';
          }
        }
        this.configurarColumnas(this.modelVolumen, 7);
      });
    }
  }

  /**
   * Metodo para comprobar si el campo se encuentra
   * dentro de la lista de elementos que tienen que
   * ser un select
   * @param campo Nombre del campo
   * @param selects Array con los campos
   */
  contains(campo: string, selects: string[]) {
    return selects.includes(campo);
  }

  screenSize() {
    return screen.width;
  }
}

