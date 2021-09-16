import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {SidebarService} from '../../../services/sidebar.service';
import {FiltroService} from '../../../services/filtro.service';

// import { MenusService } from './menus.service';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({height: 0})),
      state('down', style({height: '*'})),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class SidebarComponent implements OnInit {
  @Output() private filtrar = new EventEmitter<boolean>();
  @Input() loading: boolean;
  menus = [];
  submenu = [];
  interval: number = 1;
  precio: string = '';

  constructor(public sidebarservice: SidebarService) {
    this.menus = sidebarservice.getMenuList();
  }

  ngOnInit() {
    this.sidebarservice.getCarrocerias();
  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  /**
   * Metodo para actualizar el estado del desplegable
   *
   * @param currentMenu
   */
  toggle(currentMenu) {
    if (currentMenu.type === 'dropdown') {
      this.menus.forEach(element => {
        if (element === currentMenu) {
          currentMenu.active = !currentMenu.active;
        } else {
          element.active = false;
        }
      });
    }
  }

  /**
   * Metodo para actualizar el estado del desplegable entre submenus
   * @param menu
   * @param submenu
   */
  toggleSubmenu(menu, submenu) {
    if (submenu.type === 'dropdown') {
      this.menus.forEach(element => {
        if (element === menu) {
          this.submenu = element;
          element.submenus.forEach(element2 => {
            if (element2 === submenu) {
              submenu.active = !submenu.active;
            }
          });
        }
      });
    }
  }

  /**
   * Metodo para actualizar la clase en el html
   * @param currentMenu
   */
  getState(currentMenu) {
    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }

  hasBackgroundImage() {
    return this.sidebarservice.hasBackgroundImage;
  }

  /**
   * Metodo para actualizar el estado del slide
   * al contrario al que tuviera previamente
   *
   */
  setSlide() {
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  }

  /**
   * Metodo para formatear el valor en el caso de ser superior a 1000
   *
   * @param value
   */
  formatLabel(value: number) {
    if (value >= 1000) {
      this.precio = Math.round(value / 1000) + 'k';
    } else {
      this.precio = value.toString();
    }
    // this.interval = cambiarIntervalo(value);
    return this.precio;
  }

  /**
   * Metodo para actualizar el valor segun el menu
   *
   * @param submenu
   * @param value
   */
  seleccionado(submenu: any, value: string) {
    let menu = submenu.title;
    if (menu == 'Carroceria') {
      this.setCarroceria(value);
    } else if (menu == 'Sobrealimentacion') {
      this.setMotor(value, submenu);
    }
  }

  /**
   * Metodo para actuallizar la carrocaria y emitir una nueva busqueda filtrada
   * @param value
   */
  setCarroceria(value: string) {
    this.sidebarservice.setCarroceria(value);
    this.actualizar();
  }

  /**
   * Metodo para actuallizar el precio y emitir una nueva busqueda filtrada
   * @param precio
   * @param submenu
   */
  setPrecio(precio: number, submenu: any) {
    this.sidebarservice.setPrecio(precio, submenu);
    this.actualizar();
  }

  /**
   * Metodo para actuallizar la potencia y emitir una nueva busqueda filtrada
   * @param potencia
   * @param submenu
   */
  setPotencia(potencia: number, submenu: any) {
    this.sidebarservice.setPotencia(potencia, submenu);
    this.actualizar();
  }

  /**
   * Metodo para actuallizar el motor y emitir una nueva busqueda filtrada
   * @param value
   * @param submenu
   */
  setMotor(value: any, submenu: any) {
    this.sidebarservice.setMotor(value, submenu);
    this.actualizar();
  }

  /**
   * Metodo para actuallizar el consumo y emitir una nueva busqueda filtrada
   * @param consumo
   * @param submenu
   */
  setConsumo(consumo: number, submenu: any) {
    this.sidebarservice.setConsumo(consumo, submenu);
    this.actualizar();
  }

  /**
   * Metodo para actualizar filtros y emitir la busqueda
   */
  actualizar() {
    this.sidebarservice.actualizarFiltros();
    this.filtrar.emit(true);
  }

  resetFilters(){
    this.menus = this.sidebarservice.resetFilters();
    this.actualizar();
  }
}
