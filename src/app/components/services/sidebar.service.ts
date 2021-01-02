import {Injectable} from '@angular/core';
import {CochesService} from './coches.service';
import {Carroceria} from '../../models/carroceria';



@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  toggled = false;
  _hasBackgroundImage = true;
  carrocerias = [];

  constructor(
    private cochesService: CochesService
  ) {}

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
        badge: {
          text: 'Min ',
          class: 'bg-info text-dark'
        }
      },
      {
        title: 'Hasta',
        slider: true,
        minimo: '1',
        maximo: '100000',
        badge: {
          text: 'Max ',
          class: 'bg-info text-dark'
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
    submenus: [
      {
        title: 'General',
        slider: false,
      }
    ]
  };
  consumo = {
    title: 'Consumo',
    icon: 'fas fa-gas-pump',
    active: false,
    type: 'dropdown',
    slider: false,
    submenus: [
      {
        title: 'Pie chart',
        slider: false,
      }
    ]
  };
  potencia = {
    title: 'Potencia',
    icon: 'fas fa-tachometer-alt',
    active: false,
    type: 'dropdown',
    slider: false,
    submenus: [
      {
        title: 'Google maps',
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

  setPrecio(value: number, tipo: string) {
    let precio = value.toString();
    if (value >= 1000) {
      precio = Math.round(value / 1000) + 'k';
    }
    let precios: string[] = this.precio.badge.text.split(' - ');
    if (tipo == 'desde') {
      precios[0] = precio;
      this.precio.submenus[0].badge.text = precio;
      if (precio.includes('k')) {
        precio = precio.replace('k', '000');
      }
      let val: number = (+value + 1000);
      if (val >= 1000) {
        precio = Math.round(val / 1000) + 'k';
      }
      this.precio.submenus[1].minimo = val.toString();
      if (this.precio.submenus[1].badge.text != 'Max ') {
        this.precio.submenus[1].badge.text = precio;
        precios[1] = precio;
        this.precio.submenus[1].badge.text = precio;
        this.precio.badge.text = precios[0] + ' - ' + precios[1];
      }


    } else if (tipo == 'hasta') {
      precios[1] = precio;
      this.precio.submenus[1].badge.text = precio;
    }
    this.precio.badge.text = precios[0] + ' - ' + precios[1];
  }

  /**
   * Metodo para pedir todas las carrocerias
   *
   */
  getCarrocerias(): void{
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

  selecionarCarroceria(carroceriaSel:string):void{
    this.carrocerias.forEach(carroceria => {
      if (carroceria.title == carroceriaSel) {
        if(carroceria.selected == false){
          carroceria.selected = true;
          carroceria.class = 'selecccionado';
          this.carroceria.badge.text = carroceriaSel;
        }else {
          this.carroceria.badge.text = 'Todas';
          carroceria.selected = false;
          carroceria.class = '';
        }
      } else {
        carroceria.class = '';
      }
    });
  }

}
