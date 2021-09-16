import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {ModalService} from '../../../../services/modal.service';
import {CochesService} from '../../../../services/coches.service';
import {Router} from '@angular/router';
import {Marca} from '../../../../../models/marca';
import {Coche} from '../../../../../models/coche';
import {MotorCombustion} from '../../../../../models/motorCombustion';
import {MotorElectrico} from '../../../../../models/motorElectrico';
import {Consumo} from '../../../../../models/consumo';
import {TipoCombustible} from '../../../../../models/tipoCombustible';
import {TipoEmisiones} from '../../../../../models/tipoEmisiones';
import {Carroceria} from '../../../../../models/carroceria';
import swal from 'sweetalert2';
import {Emisiones} from '../../../../../models/emisiones';
import {Volumen} from '../../../../../models/volumen';

@Component({
  selector: 'app-modelo-especifico-admin',
  templateUrl: './modelo-especifico-admin.component.html',
  styleUrls: ['./modelo-especifico-admin.component.css']
})
export class ModeloEspecificoAdminComponent implements OnInit {

  @Input() coche: Coche;

  volumen: Volumen;
  btnsGen: boolean        [] = [];
  btnsVol: boolean        [] = [];
  btnsMotC: boolean       [] = [];
  btnsMotE: boolean       [] = [];
  btnsEmi: boolean        [] = [];
  btnsCons: boolean       [] = [];
  btnsConsAlt: boolean    [] = [];
  btnsConsEle: boolean    [] = [];
  errorsGen: string       [] = [];
  errorsMotC: string      [] = [];
  errorsMotE: string      [] = [];
  errorsEmi: string       [] = [];
  errorsVol: string       [] = [];
  errorsCons: string      [] = [];
  errorsConsAlt: string   [] = [];
  errorsConsEle: string   [] = [];
  carrocerias: Carroceria [] = [];
  tipoEmisiones: TipoEmisiones[];
  tipoCombustibles: TipoCombustible[];
  saved: number = 0;
  emisiones: Emisiones;
  enableSave: boolean = false;
  erroresCategoria: any[] = [
    this.errorsGen, this.errorsMotC, this.errorsMotE,
    this.errorsCons, this.errorsConsAlt, this.errorsConsEle, this.errorsEmi
  ];
  btns: any[] = [
    this.btnsGen, this.btnsMotC, this.btnsMotE,
    this.btnsCons, this.btnsConsAlt, this.btnsConsEle, this.btnsEmi, this.btnsVol
  ];
  btnsClassGen: string     [] = [];
  btnsClassMotC: string    [] = [];
  btnsClassMotE: string    [] = [];
  btnsClassEmi: string     [] = [];
  btnsClassCons: string    [] = [];
  btnsClassConsAlt: string [] = [];
  btnsClassConsEle: string [] = [];
  btnsClassVol: string     [] = [];
  btnsClass: any[] = [
    this.btnsClassGen, this.btnsClassMotC, this.btnsClassMotE, this.btnsClassCons,
    this.btnsClassConsAlt, this.btnsClassConsEle, this.btnsClassEmi, this.btnsClassVol
  ];
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
  camposNumber: string[] = [
    'Año de Lanzamiento', 'Precio (€)', 'Cilindrada (L)', 'Cilindros', 'Potencia (CV)', 'Consumo Ciudad',
    'Consumo Autopista', 'Consumo Mixto', 'Consumo Alt Ciudad', 'Consumo Alt Autopista', 'Consumo Alt Mixto',
    'Consumo Eléctrico Ciudad', 'Consumo Eléctrico Autopista', 'Consumo Eléctrico Mixto', 'CO2', 'CO2 Alternativo',
    'Tiempo de Carga 220V (h)', 'Potencia (CV) Versión', 'Potencia (kWh) Versión', 'Habitáculo (L)', 'Maletero (L)',
    'Habitáculo Versión', 'Maletero Versión'
  ];
  camposDecimal: string[] = [
    'Cilindrada (L)', , 'Consumo Ciudad',
    'Consumo Autopista', 'Consumo Mixto', 'Consumo Alt Ciudad', 'Consumo Alt Autopista', 'Consumo Alt Mixto',
    'Consumo Eléctrico Ciudad', 'Consumo Eléctrico Autopista', 'Consumo Eléctrico Mixto', 'Habitáculo (L)', 'Maletero (L)',
    'Habitáculo Versión (L)', 'Maletero Versión (L)'
  ];
  camposGen: string[] = [
    'Marca',
    'Modelo',
    'Carrocería',
    'Año de Lanzamiento',
    'Precio (€)',
    'Transmisión',
    'Eje Motriz'
  ];
  camposMotC: string[] = [
    'Cilindrada (L)',
    'Cilindros',
    'Potencia (CV)',
    'Turbo',
    'Compresor',
    'Tipo Combustible'
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


  constructor(public modalService: ModalService, private cochesService: CochesService, private router: Router) {
  }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.configurarItems();
  }

  /**
   * Metodo para configurar las marcas en listas de 5 elementos
   * y que se muestren por filas de dichos elementos
   */
  configurarItems() {
    this.configurarGeneral();
    this.configurarVolumen();
    this.configurarMotores();
    this.configurarSelects();
  }

  /**
   * Metodo para cerrar el modal
   * y reiniciar las variables
   */
  closeModal() {
    this.coche = null;
    this.btns.forEach((lista: boolean[]) => {
      lista.fill(true, 0, lista.length);
    });
    this.btnsClass.forEach((lista: string[]) => {
      lista.fill('peach-gradient', 0, lista.length);
    });
    this.volumen = null;
    this.modelGen               = [];
    this.modelVolumen           = [];
    this.modelMotCombustion     = [];
    this.modelEmiCombustion     = [];
    this.modelConsCombustion    = [];
    this.modelConsAltCombustion = [];
    this.modelConsElectrico     = [];
    this.modelMotElectrico      = [];
    this.modelMotor             = [];
    this.motorCombustion = null;
    this.consumo = null;
    this.motorElectrico = null;
    this.modalService.closeModal();
  }

  saveChanges() {
    this.coche.caryear = this.modelGen[3];
    this.coche.precio = this.modelGen[4];
    this.coche.transmision = this.modelGen[5];
    switch (this.modelGen[6]) {
      case 'Total':
        this.coche.ejeMotriz = 'AWD';
        break;
      case 'Delantero':
        this.coche.ejeMotriz = 'FWD';
        break;
      case 'Trasero':
        this.coche.ejeMotriz = 'RWD';
        break;
    }
    this.carrocerias.forEach(carroceria => {
      if (carroceria.carroceria == this.modelGen[2]) {
        this.coche.carroceria = carroceria;
      }
    });
    if (this.modelEmiCombustion[1] != null) {
      this.emisiones.co2 = +this.modelEmiCombustion[0];
      this.emisiones.tipoEmisiones.tipoEmisiones = this.modelEmiCombustion[1];
      this.cochesService.getTipoEmisiones();
      this.tipoEmisiones.forEach(tipoEmisiones => {
        if (tipoEmisiones.tipoEmisiones == this.emisiones.tipoEmisiones.tipoEmisiones) {
          this.emisiones.tipoEmisiones = tipoEmisiones;
        }
      });
      this.motorCombustion.emisiones = this.emisiones;
    }
    this.motorCombustion.cilindrada = +this.modelMotCombustion[0];
    this.motorCombustion.cilindros = +this.modelMotCombustion[1];
    this.motorCombustion.hp = +this.modelMotCombustion[2];
    this.tipoCombustibles.forEach(combustible => {
      if (combustible.tipoCombustible.includes(this.modelMotCombustion[5])) {
        this.motorCombustion.combustible.tipoCombustibleNormal = combustible;
      }
    });
    if (this.consumo.idConsumoNormal != null) {
      this.consumo.idConsumoNormal.ciudad    = this.modelConsCombustion[0];
      this.consumo.idConsumoNormal.autopista = this.modelConsCombustion[1];
      this.consumo.idConsumoNormal.combinado = this.modelConsCombustion[2];
    }
    if (this.consumo.idConsumoAlternativo != null) {
      this.consumo.idConsumoAlternativo.ciudad    = this.modelConsAltCombustion[0];
      this.consumo.idConsumoAlternativo.autopista = this.modelConsAltCombustion[1];
      this.consumo.idConsumoAlternativo.combinado = this.modelConsAltCombustion[2];
    }
    if (this.consumo.idConsumoElectrico != null) {
      this.consumo.idConsumoElectrico.ciudad    = this.modelConsElectrico[0];
      this.consumo.idConsumoElectrico.autopista = this.modelConsElectrico[1];
      this.consumo.idConsumoElectrico.combinado = this.modelConsElectrico[2];
    }

    this.modelMotCombustion[3] == 'Si' ?
      this.motorCombustion.sobrealimentacion.turbo = true : this.motorCombustion.sobrealimentacion.turbo = false;
    this.modelMotCombustion[4] == 'Si' ?
      this.motorCombustion.sobrealimentacion.supercargador = true : this.motorCombustion.sobrealimentacion.supercargador = false;
    this.cochesService.saveConsumo(this.consumo).subscribe(value => {
      this.consumo = value.consumo;
      this.coche.consumo = this.consumo;
      this.saved++;
      this.checkSaveCoche();
    });
    if (this.motorCombustion != null) {
      this.motorCombustion.emisiones = this.emisiones;
      this.cochesService.saveMotorCombustion(this.motorCombustion).subscribe(value => {
        this.motorCombustion = value.motorCombustion;
        this.saved++;
        this.checkSaveCoche();
      });
    }
    if (this.motorElectrico != null) {
      this.motorElectrico.tCarga220v = this.modelMotElectrico[0];
      let indHP: number = 0;
      let indKWh: number = 0;
      for (let i = 0; i < this.modelMotElectrico.length; i++) {
        if (this.camposMotElectrico[i].includes('kWh')) {
          this.motorElectrico.potenciasElectricas[indKWh].potencia = +this.modelMotElectrico[i];
          indKWh++;
        } else if (this.camposMotElectrico[i].includes('CV')) {
          this.motorElectrico.hps[indHP].hp = +this.modelMotElectrico[i];
          indHP++;
        }
      }
      this.coche.tipoMotor.motorCombustion = this.motorCombustion;
      if (this.motorElectrico != null) {
        this.cochesService.saveMotorElectrico(this.motorElectrico).subscribe(value => {
          this.motorElectrico = value.motorElectrico;
          this.saved++;
          this.checkSaveCoche();
        });
      }
    }
    if (this.volumen != null) {
      if (this.volumen.volumenHatchback != null) {
        this.volumen.volumenHatchback.volumenHabitaculo = +this.modelVolumen[0];
        this.volumen.volumenHatchback.volumenMaletero = +this.modelVolumen[1];
      } else if (this.volumen.volumen4p != null) {
        this.volumen.volumen4p.volumenHabitaculo = +this.modelVolumen[0];
        this.volumen.volumen4p.volumenMaletero = +this.modelVolumen[1];
      }
      if (this.volumen.volumen2p != null) {
        this.volumen.volumen2p.volumenHabitaculo = +this.modelVolumen[0];
        this.volumen.volumen2p.volumenMaletero = +this.modelVolumen[1];
      }
      this.cochesService.saveVolumen(this.volumen).subscribe(value => {
        this.volumen = value.volumen;
        this.saved++;
        this.checkSaveCoche();
      });
    }
    if (this.motorElectrico != null) {
      this.coche.tipoMotor.motorElectrico = this.motorElectrico;
    }
  }

  checkSaveCoche() {
    if (this.saved == this.itemsToSave) {
      this.cochesService.saveCoche(this.coche).subscribe(response => {
        if (response.error != undefined) {
          swal.fire({
            title: 'Error al guardar',
            position: 'center',
            icon: 'error',
            text: response.error,
            showConfirmButton: false,
            timer: 2000
          });
        } else if (response.message != undefined) {
          swal.fire({
            title: 'Guardado correctamente',
            position: 'center',
            icon: 'success',
            text: response.message,
            showConfirmButton: false,
            timer: 2000
          });
        }
      });
    }
  }

  /**
   * Metodo para actualizar los botones
   * de habilitar y deshabilitar
   * @param type
   * @param index
   */
  changeEnableButton(type: string, index: number) {
    let indexGlobal: number = -1;
    switch (type) {
      case 'gen': {
        indexGlobal = 0;
        break;
      }
      case 'motC': {
        indexGlobal = 1;
        break;
      }
      case 'motE': {
        indexGlobal = 2;
        break;
      }
      case 'cons': {
        indexGlobal = 3;
        break;
      }
      case 'consAlt': {
        indexGlobal = 4;
        break;
      }
      case 'consEle': {
        indexGlobal = 5;
        break;
      }
      case 'emi': {
        indexGlobal = 6;
        break;
      }
      case 'vol': {
        indexGlobal = 7;
        break;
      }
    }
    if (this.btns[indexGlobal][index] == false) {
      this.btns[indexGlobal][index] = true;
      this.btnsClass[indexGlobal][index] = 'peach-gradient';
    } else {
      this.btns[indexGlobal][index] = false;
      this.btnsClass[indexGlobal][index] = 'dusty-grass-gradient';
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

  /**
   * Metodo para obtener la lista de
   * elementos segun el campo para los select
   * @param campo Itentificativo de la lista a
   * devolver
   */
  getElements(campo: string): string[] {
    switch (campo) {
      case 'Marca':
        return this.elements[0];
      case 'Modelo':
        return this.elements[1];
      case 'Carrocería':
        return this.elements[2];
      case 'Transmisión':
        return this.elements[3];
      case 'Eje Motriz':
        return this.elements[4];
      case 'Turbo':
        return this.elements[5];
      case 'Compresor':
        return this.elements[6];
      case 'Tipo Combustible':
        return this.elements[7];
      case 'Normativa Euro':
        return this.elements[8];
    }
  }

  /**
   * Metood para configurar los campos que se muestran
   * mediante un select en el html
   * @private
   */
  private configurarSelects() {

    this.cochesService.getMarcas().subscribe(marcas => {
      marcas.sort((a, b) => {
        if (a.marcaCoche.toUpperCase() < b.marcaCoche.toUpperCase()) {
          return -1;
        } else {
          return 1;
        }
      }).forEach(marca => {
        this.marcasString[this.marcasString.length] = marca.marcaCoche;
      });
      this.marcas = marcas;
      this.marcas.forEach(marca => {
        if (marca.marcaCoche == this.modelGen[0]) {
          this.marcaSelected = marca;
        }
      });
      this.actualizarModelos();
    });
  }

  /**
   * Metodo para configurar los modelos generales
   * @private
   */
  private configurarGeneral() {
    this.modelGen[0] = this.coche.marca.marcaCoche;
    this.modelGen[1] = this.coche.modelo.modelo;
    this.modelGen[2] = this.coche.carroceria.carroceria;
    this.modelGen[3] = this.coche.caryear;
    this.modelGen[4] = this.coche.precio;
    this.modelGen[5] = this.coche.transmision;
    switch (this.coche.ejeMotriz) {
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
    for (let i = 0; i < this.modelGen.length; i++) {
      this.btnsGen[i] = true;
      this.btnsClassGen[i] = 'peach-gradient';
    }
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
    this.cochesService.getTipoMotor(this.coche.tipoMotor.idTipoMotor).subscribe(value => {
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
        for (let i = 0; i < this.modelMotCombustion.length; i++) {
          this.btnsMotC[i] = true;
          this.btnsClassMotC[i] = 'peach-gradient';
        }
        if (this.motorCombustion.emisiones) {
          this.cochesService.getEmisiones(this.motorCombustion.emisiones.idEmisiones).subscribe(value => {
            this.emisiones = value;
            if (value.co2 != -1) {
              this.modelEmiCombustion[0] = value.co2;
            }
            if (value.tipoEmisiones != null) {
              this.modelEmiCombustion[1] = value.tipoEmisiones.tipoEmisiones;
            }
            for (let i = 0; i < this.modelMotCombustion.length; i++) {
              this.btnsEmi[i] = true;
              this.btnsClassEmi[i] = 'peach-gradient';
            }
            this.configurarColumnas(this.modelEmiCombustion, 6);
          });
        }

        this.cochesService.getConsumo(this.coche.consumo.idConsumo).subscribe(value => {
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
          for (let i = 0; i < this.modelConsCombustion.length; i++) {
            this.btnsCons[i] = true;
            this.btnsClassCons[i] = 'peach-gradient';
          }
          for (let i = 0; i < this.modelConsAltCombustion.length; i++) {
            this.btnsConsAlt[i] = true;
            this.btnsClassConsAlt[i] = 'peach-gradient';
          }
          for (let i = 0; i < this.modelConsElectrico.length; i++) {
            this.btnsConsEle[i] = true;
            this.btnsClassConsEle[i] = 'peach-gradient';
          }
        });
      }
      if (value.motorElectrico != null) {
        this.itemsToSave++;
        this.motorElectrico = value.motorElectrico;
        this.modelMotElectrico[0] = this.motorElectrico.tCarga220v;
        this.camposMotElectrico[0] = 'Tiempo de Carga 220V (h)';
        this.btnsMotE[0] = true;
        this.btnsClassMotE[0] = 'peach-gradient';

        let version: number = 1;
        this.motorElectrico.hps.forEach(hps => {
          this.modelMotElectrico[this.modelMotElectrico.length] = hps.hp;
          this.camposMotElectrico[this.modelMotElectrico.length - 1] = 'Potencia (CV) Versión ' + (version);
          this.btnsMotE[this.btnsMotE.length] = true;
          this.btnsClassMotE[this.btnsClassMotE.length] = 'peach-gradient';
          version++;
        });
        version = 1;
        this.motorElectrico.potenciasElectricas.forEach(kWh => {
          this.modelMotElectrico[this.modelMotElectrico.length] = kWh.potencia;
          this.camposMotElectrico[this.modelMotElectrico.length - 1] = 'Potencia (kWh) Versión ' + (version);
          this.btnsMotE[this.btnsMotE.length] = true;
          this.btnsClassMotE[this.btnsClassMotE.length] = 'peach-gradient';
          version++;
        });
        this.versionesElectricas = version - 1;
        this.configurarColumnas(this.modelMotElectrico, 2);
      }
    });
  }

  changeSelect(element: string) {
    if (element == 'Marca') {
      this.actualizarModelos();
    }
  }

  actualizarModelos() {
    this.cochesService.getModelosPorMarcaSinPaginar(this.marcaSelected.idMarca).subscribe(modelos => {
      modelos.sort((a, b) => {
        if (a.modelo.toUpperCase() < b.modelo.toUpperCase()) {
          return -1;
        } else {
          return 1;
        }
      }).forEach(modelo => {
        this.modelosString[this.modelosString.length] = modelo.modelo;
      });
    });
  }

  /**
   *  Metodo para comprobar errores
   * @param campo  Nombre del campo del modelo a revisar
   * @param campos Lista de campos a los que hacer referencia (general, consumos, motor combustion...)
   * @param model  Valor del modelo al que hace referencia el campo (Ej: cilindrada => 2)
   */
  checkErrors(campo: string, campos: string, model: string) {
    let errores: string[] = [];
    let numero: string = ' debe ser un número';
    let obligatorio: string = ' es obligatorio';
    let camposCheck: any[] = [];
    let modelCheck: any[] = [];
    let index: number;
    let categoria: string[];
    switch (campos) {
      case 'gen': {
        camposCheck = this.camposGen;
        modelCheck = this.modelGen;
        categoria = this.errorsGen;
        index = 0;
        break;
      }
      case 'motC': {
        camposCheck = this.camposMotC;
        modelCheck = this.modelMotCombustion;
        index = 1;
        break;
      }
      case 'motE': {
        camposCheck = this.camposMotElectrico;
        modelCheck = this.modelMotElectrico;
        index = 2;
        break;
      }
      case 'cons': {
        camposCheck = this.camposConC;
        modelCheck = this.modelConsCombustion;
        index = 3;
        break;
      }
      case 'consAlt': {
        camposCheck = this.camposConAltC;
        modelCheck = this.modelConsAltCombustion;
        index = 4;
        break;
      }
      case 'consEle': {
        camposCheck = this.camposConE;
        modelCheck = this.modelConsElectrico;
        index = 5;
        break;
      }
      case 'emi': {
        camposCheck = this.camposEmi;
        modelCheck = this.modelEmiCombustion;
        index = 6;
        break;
      }
      case 'vol': {
        camposCheck = this.camposVol;
        modelCheck = this.modelVolumen;
        index = 7;
        break;
      }
    }
    camposCheck.forEach(campoFE => {
      let campoFEMod = campoFE;
      if (campoFE.includes('Versión')) {
        campoFEMod = campoFE.replace(/ [0-9]/, '');
      }
      if (this.camposNumber.includes(campoFEMod)) {
        model = modelCheck[camposCheck.indexOf(campoFE)].toString();
        if (isNaN(+model)) {
          errores[errores.length] = 'El campo ' + campoFE + numero;
        }
        if (model.trim() == '') {
          errores[errores.length] = 'El campo ' + campoFE + obligatorio;
        }
      }
    });
    this.erroresCategoria[index] = errores;
    this.errorsGen = this.erroresCategoria[0];
    this.errorsMotC = this.erroresCategoria[1];
    this.errorsMotE = this.erroresCategoria[2];
    this.errorsCons = this.erroresCategoria[3];
    this.errorsConsAlt = this.erroresCategoria[4];
    this.errorsConsEle = this.erroresCategoria[5];
    this.errorsEmi = this.erroresCategoria[6];
    this.errorsVol = this.erroresCategoria[7];

    errores.length > 0 ? this.enableSave = true : this.enableSave = false;
  }

  private configurarColumnas(model: any[], index: number) {
    this.arrayRow[index] = [];
    for (let i = 0; i < model.length / this.arrayCol.length; i++) {
      this.arrayRow[index][i] = i;
    }
  }

  private configurarVolumen() {
    this.volumen = this.coche.modelo.volumen;
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
        for (let i = 0; i < itms * 2; i++) {
          this.btnsClassVol[this.btnsClassVol.length] = 'peach-gradient';
          this.btnsVol[i] = true;
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
}
