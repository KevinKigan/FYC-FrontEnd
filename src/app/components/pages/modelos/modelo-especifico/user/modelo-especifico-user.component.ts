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
  private minimoPrecio: any;
  private minimoPotencia: any;
  private minimoEmisiones: any;
  private minimoConsumo: any;

  center = {lat: 24, lng: 12};
  display?: google.maps.LatLngLiteral;
  imagenPrincipal: string;

  constructor(private cochesService: CochesService,
              private activatedRoute: ActivatedRoute,
              private filtroService: FiltroService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.iniciar();
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
          this.cochesService.getListConsumo(this.idsConsumo).subscribe(consumos => {
            this.consumos = consumos;
          });
          this.cochesService.getDatosChart(this.cocheSeleccionado.idCoche).subscribe(chart => {
            this.chart = chart;

            this.cochesService.getDatosChartSemejantes(this.cocheSeleccionado.idCoche).subscribe(chartS => {
              this.asignarValores(chartS);
              this.formatValues();
              if(this.precioCS==0 && this.consumoCS==0 && this.cilindradaCS==0 && this.potenciaCS==0 && this.emisionesCS==0){
                this.semejantes = false;
              }
              this.boolChart = true;
              this.setLoading(false);
            });
          });
          this.cochesService.getListMotoresCombustion(this.idsMotor).subscribe(motores => {
            this.motoresCombustion = motores;
          });

        });

      });
    });

  }

  asignarValores(chartS: Map<string,string>){
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

  public chartLabelsRadar: Array<any> = ['Precio', 'Consumo Medio', 'Cilindrada', 'Potencia (CV)', 'Emisiones (CO2)'];

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
  compararPor(comparar: string) {
    console.log(comparar);
    this.comparar = comparar;
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
}

