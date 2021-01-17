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
  @Input() loading:boolean;
  menus = [];
  submenu = [];
  precio: string = '';

  constructor(public sidebarservice: SidebarService, public filtroService: FiltroService) {
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

  seleccionado(submenu: any, value: string) {
    let menu = submenu.title;
    if (menu == 'Carroceria') {
      this.setCarroceria(value);
    }
    else if (menu == 'Sobrealimentacion'){
      this.setMotor(value,submenu);
    }
  }

  setCarroceria(value: string) {
    this.sidebarservice.setCarroceria(value);
    this.actualizar();
  }

  setPrecio(precio: number, submenu: any) {
    this.sidebarservice.setPrecio(precio,submenu);
    this.actualizar();
  }

  setMotor(value: any, submenu: any) {
    this.sidebarservice.setMotor(value, submenu);
    this.actualizar();
  }
  setConsumo(consumo: string, submenu: any) {
    this.sidebarservice.setConsumo(consumo, submenu);
    this.actualizar();
  }

  actualizar(){
    this.sidebarservice.actualizarFiltros();
    this.filtrar.emit(true);
  }

  // setLoading(load: boolean) {
  //   this.filtroService.setLoading(load);
  //   console.log("SidebarComponent lo ponemos a "+load);
  //   this.loading = this.filtroService.getLoading();
  // }

  // logProgresiveSlider(position): number{
  //     // position will be between 0 and 100
  //     var minp = 0;
  //     var maxp = 100;
  //
  //     // The result should be between 100 an 10000000
  //     var minv = Math.log(100);
  //     var maxv = Math.log(10000000);
  //
  //     // calculate adjustment factor
  //     var scale = (maxv-minv) / (maxp-minp);
  //
  //     return Math.exp(minv + scale*(position-minp));
  //   }
}
