import {Injectable} from '@angular/core';
import {CochesService} from './coches.service';
import {Carroceria} from '../../models/carroceria';
import {Modelo} from '../../models/modelo';
import {FiltroService} from './filtro.service';
import {Observable} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  toggled = false;
  _hasBackgroundImage = true;

  constructor(
    private cochesService: CochesService,
    private filtroService: FiltroService
  ) {}

  private carrocerias = [];
  private sobrealimentaciones = [
    {
      selected: false,
      value: 'Atmosférico',
      class: ''
    },{
      selected: false,
      value: 'Turbo',
      class: ''
    },
    {
      selected: false,
      value: 'Supercargador',
      class: ''
    }
  ];

  precio = {
    title: 'Precio',
    icon: 'fas fa-tags',
    active: false,
    type: 'dropdown',
    slider: true,
    badge: {
      text: 'Min - Max ',
      class: 'bg-warning text-dark'
    },
    submenus: [
      {
        title: 'Desde',
        slider: true,
        minimo: '1',
        maximo: '100000',
        value: '1',
        interval: '1000',
        badge: {
          text: 'Min ',
          class: 'bg-info text-dark badgePerso'
        }
      },
      {
        title: 'Hasta',
        slider: true,
        minimo: '1',
        value: '100000',
        maximo: '100000',
        interval: '1000',
        badge: {
          text: 'Max ',
          class: 'bg-info text-dark badgePerso'
        }
      }
    ]
  };
  header = {
    title: 'General',
    type: 'header'
  };
  carroceria = {
    title: 'Carroceria',
    icon: 'fas fa-car',
    active: false,
    type: 'dropdown',
    slider: false,
    value: FiltroService.CUALQUIERA,
    badge: {
      text: 'Todas',
      class: 'badge-danger'
    },
    submenus: this.carrocerias
  };
  motor = {
    title: 'Motor',
    icon: 'fas fa-wrench',
    active: false,
    type: 'dropdown',
    slider: true,
    badge: {
      text: 'Sin Filtro ',
      class: 'badge-danger'
    },
    submenus: [
      {
        title: 'Cilindrada (L)',
        slider: true,
        minimo: '0.5',
        interval: '0.1',
        maximo: '12',
        value: FiltroService.CUALQUIERA,
        badge: {
          text: FiltroService.CUALQUIERA,
          class: 'bg-info text-dark'
        }
      },
      {
        title: 'Cilindros ',
        slider: true,
        minimo: '2',
        maximo: '12',
        value: FiltroService.CUALQUIERA,
        badge: {
          text: FiltroService.CUALQUIERA,
          class: 'bg-info text-dark'
        }
      },
      {
        title: 'Sobrealimentacion',
        slider: false,
        icon: 'fas fa-wrench',
        active: false,
        type: 'dropdown',
        value: FiltroService.CUALQUIERA,
        badge: {
          text: FiltroService.CUALQUIERA,
          class: 'bg-info text-dark'
        },
        subs: this.sobrealimentaciones
      }
    ]
  };
  consumo = {
    title: 'Consumo',
    icon: 'fas fa-gas-pump',
    active: false,
    type: 'dropdown',
    slider: true,
    badge: {
      text: FiltroService.CUALQUIERA,
      class: 'bg-info text-dark'
    },
    submenus: [
      {
        title: 'Límite de consumo medio:',
        minimo: '0.1',
        maximo: '25.0',
        value: FiltroService.CUALQUIERA,
        interval: '0.5',
        slider: true,
      }
    ]
  };
  potencia = {
    title: 'Potencia',
    icon: 'fas fa-tachometer-alt',
    active: false,
    type: 'dropdown',
    slider: true,
    badge: {
      text: 'Min - Max ',
      class: 'bg-warning text-dark'
    },
    submenus: [
      {
        title: 'Desde',
        slider: true,
        minimo: '1',
        maximo: '1000',
        value: FiltroService.MINIMO,
        interval: '10',
        badge: {
          text: 'Min ',
          class: 'bg-info text-dark badgePerso'
        }
      },
      {
        title: 'Hasta',
        slider: true,
        minimo: '1',
        value: FiltroService.MAXIMO,
        maximo: '1000',
        interval: '10',
        badge: {
          text: 'Max ',
          class: 'bg-info text-dark badgePerso'
        }
      }
    ]
  };
  menus = [
    this.header,
    this.precio,
    this.carroceria,
    this.motor,
    this.consumo,
    this.potencia,
    {
      title: 'Extra',
      type: 'header'
    },
    {
      title: 'Documentacion',
      icon: 'fa fa-book',
      active: false,
      type: 'simple',
      badge: {
        text: 'Beta',
        class: 'badge-primary'
      },
    },
    {
      title: 'Calendario',
      icon: 'fa fa-calendar',
      active: false,
      type: 'simple'
    },
    {
      title: 'Ejemplos',
      icon: 'fa fa-folder',
      active: false,
      type: 'simple'
    }
  ];


  toggle() {
    this.toggled = !this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  getMenuList() {
    return this.menus;
  }

  get hasBackgroundImage() {
    return this._hasBackgroundImage;
  }

  set hasBackgroundImage(hasBackgroundImage) {
    this._hasBackgroundImage = hasBackgroundImage;
  }

  /**
   * Metodo para actualizar el valor relacionado
   * con el filtro de consumo
   *
   * @param consumo  Valor del consumo
   * @param submenu  Submenu de consumo
   */
  setConsumo(consumo: number, submenu: any) {
    let titulo = submenu.title.toString();
    this.consumo.badge.text = consumo.toString();
    if (titulo.includes('consumo medio')) {
      if(this.consumo.submenus[0].title.includes('Límite de consumo medio')){
        this.consumo.submenus[0].value = consumo.toString();
      }
    }
  }
  /**
   * Metodo para actualizar los valores relacionados
   * con el filtro de motor
   *
   * @param value   Valor del motor
   * @param tipo Parametro del motor que debe ser actualizado
   */
  setMotor(value: any, tipo: any) {
    let titulo = tipo.title.toString();
    this.motor.badge.text = 'Con Filtro ';
    if (titulo.includes('Cilindrada')) {
      this.motor.submenus[0].badge.text = value;
      this.motor.submenus[0].value = value;
    } else if (titulo.includes('Cilindros')) {
      this.motor.submenus[1].badge.text = value;
      this.motor.submenus[1].value = value;
    } else if (titulo.includes('Sobrealimentacion')) {
      this.sobrealimentaciones.forEach(sobre => {
        if (sobre.value == value) {
          if (sobre.selected == false) {
            sobre.selected = true;
            sobre.class = 'selecccionado';
            this.motor.submenus[2].value = value;
            if (value.length > 8) {
              value = value.substring(0, 8).concat('...')
            }
            this.motor.submenus[2].badge.text = value;
          } else {
            this.motor.submenus[2].badge.text = FiltroService.CUALQUIERA;
            this.motor.submenus[2].value = FiltroService.CUALQUIERA;
            sobre.selected = false;
            sobre.class = '';
          }
        } else {
          sobre.class = '';
        }
      });

    }
  }

  /**
   * Metodo para actualizar los valores relacionados
   * con el filtro de precio
   *
   * @param value   Valor del precio
   * @param submenu Submenu que lo contiene
   */
  setPrecio(value: number, submenu: any) {
    let tipo = submenu.title;
    let precio = value.toString();
    if (value >= 1000) {
      precio = Math.round(value / 1000) + 'k';
    }
    let precios: string[] = this.precio.badge.text.split(' - ');
    if (tipo == 'Desde') {
      value-=1; // Ajustamos el precio
      precios[0] = precio;
      this.precio.submenus[0].badge.text = precio;
      if (precio.includes('k')) {
        precio = precio.replace('k', '000');
      }
      let val: number = (+value + submenu.interval);
      if (val >= 1000) {
        precio = Math.round(val / 1000) + 'k';
      }
      this.precio.submenus[0].value = value.toString();
      if (this.precio.submenus[1].badge.text != 'Max ') {
        this.precio.submenus[1].minimo = val.toString();
        this.precio.submenus[1].badge.text = precio;
        precios[1] = precio;
        this.precio.submenus[1].badge.text = precio;
        this.precio.badge.text = precios[0] + ' - ' + precios[1];
      }


    } else if (tipo == 'Hasta') {
      precios[1] = precio;
      this.precio.submenus[1].value = value.toString();
      this.precio.submenus[1].badge.text = precio;
    }
    this.precio.badge.text = precios[0] + ' - ' + precios[1];
  }

  /**
   * Metodo para actualizar los valores relacionados
   * con el filtro de la potencia
   *
   * @param value   Valor de la potencia
   * @param submenu Submenu que lo contiene
   */
  setPotencia(value: number, submenu: any) {
    let tipo = submenu.title;
    let potencia = value.toString();
    if (value >= 1000) {
      potencia = Math.round(value / 1000) + 'k';
    }
    let potencias: string[] = this.potencia.badge.text.split(' - ');
    if (tipo == 'Desde') {
      value-=1; // Ajustamos la potencia
      potencias[0] = potencia;
      this.potencia.submenus[0].badge.text = potencia;
      if (potencia.includes('k')) {
        potencia = potencia.replace('k', '000');
      }
      let val: number = (+value + submenu.interval);
      if (val >= 1000) {
        potencia = Math.round(val / 1000) + 'k';
      }
      this.potencia.submenus[0].value = value.toString();
      if (this.potencia.submenus[1].badge.text != 'Max ') {
        this.potencia.submenus[1].minimo = val.toString();
        this.potencia.submenus[1].badge.text = potencia;
        potencias[1] = potencia;
        this.potencia.submenus[1].badge.text = potencia;
        this.potencia.badge.text = potencias[0] + ' - ' + potencias[1];
      }


    } else if (tipo == 'Hasta') {
      potencias[1] = potencia;
      this.potencia.submenus[1].value = value.toString();
      this.potencia.submenus[1].badge.text = potencia;
    }
    this.potencia.badge.text = potencias[0] + ' - ' + potencias[1];
  }

  /**
   * Metodo para pedir todas las carrocerias
   *
   */
  getCarrocerias(): void {
    if(this.carrocerias.length<1) {
      this.cochesService.getCarrocerias().subscribe(value => {
        value.forEach(value => {
          let menuCarroceria = {
            id: value.idCarroceria,
            title: value.carroceria,
            class: '',
            selected: false
          }
          this.carrocerias.push(menuCarroceria)
        });
      });
    }
  }

  /**
   * Metodo para actualizar los valores relacionados
   * con el filtro de la potencia
   * @param carroceriaSel
   */
  setCarroceria(carroceriaSel: string): void {
    this.carrocerias.forEach(carroceria => {
      if (carroceria.title == carroceriaSel) {
        if (carroceria.selected == false) {
          carroceria.selected = true;
          carroceria.class = 'selecccionado';
          this.carroceria.badge.text = carroceriaSel;
          this.carroceria.value = carroceriaSel;
        } else {
          this.carroceria.badge.text = 'Todas';
          this.carroceria.value = FiltroService.CUALQUIERA;
          carroceria.selected = false;
          carroceria.class = '';
          this.filtroService.reset('carroceria')
        }
      } else {
        carroceria.class = '';
        carroceria.selected = false;
      }
    });
  }

  /**
   * Metodo para acualizar lso filtros con los submenus
   */
  actualizarFiltros() {
    // Añade el filtro de precios
    this.filtroService.setPrecio(this.precio.submenus);
    // Si hay alguna carroceria seleccionada la añade al filtro
    this.carroceria.submenus.forEach(value => {
      if (value.selected) {
        this.filtroService.setCarroceria(value.title);
      }
    });
    this.filtroService.setMotor(this.motor.submenus)
    this.filtroService.setConsumo(this.consumo.submenus)
    this.filtroService.setPotencia(this.potencia.submenus)
  }
}
