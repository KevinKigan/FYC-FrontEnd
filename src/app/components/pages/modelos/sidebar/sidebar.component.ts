import {Component, OnInit} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {SidebarService} from '../../../services/sidebar.service';

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
  menus = [];
  submenu = [];
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


  formatLabel(value: number) {
    if (value >= 1000) {
      this.precio = Math.round(value / 1000) + 'k';
    } else {
      this.precio = value.toString();
    }
    return this.precio;
  }

  setPrecio(precio: number, tipo: string) {
    if (tipo == 'Desde') {
      this.sidebarservice.setPrecio(precio, 'desde');
    } else if (tipo == 'Hasta') {
      this.sidebarservice.setPrecio(precio, 'hasta');
    }
  }

  seleccionado(menu: string, value: string) {
    if (menu == 'Carroceria') {
      this.sidebarservice.selecionarCarroceria(value);
    }
    else if (menu == 'Sobrealimentacion'){
      this.sidebarservice.selecionarSobrealimentacion(value);
    }
  }

  filtrar() {
    this.sidebarservice.filtrar();
  }

  setMotor(value: any, submenu: any) {
    this.sidebarservice.setMotor(value, submenu);
  }
}
