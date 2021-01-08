import {Injectable} from '@angular/core';
import {ModelosComponent} from '../pages/modelos/modelos.component';

@Injectable({
  providedIn: 'root'
})
export class FiltroService {

  constructor() {
  }

  private static MINIMO: string = '1';
  private static MAXIMO: string = '100000';
  private static CUALQUIERA: string = 'cualquiera';
  private filtro: boolean = false;

  private precio =
    {
      title: 'precio',
      minimo: '1',
      maximo: '1000000000'
    }
  ;
  private carroceria = {
    title: 'carroceria',
    value: 'cualquiera'
  };

  private motor = [];
  private consumo = [];
  private potencia = [];


  setPrecio(submenus: any) {
    if (submenus[0].value != FiltroService.MINIMO || submenus[1].value != FiltroService.MAXIMO) {
      this.precio.minimo = submenus[0].value;
      this.precio.maximo = submenus[1].value;
      this.setFiltro(true);
    }
  }

  setCarroceria(value: any) {
    this.carroceria.value = value;
    console.log(value);
    if (this.carroceria.value != FiltroService.CUALQUIERA) {
      this.setFiltro(true);
    }
  }

  reset(filtro: string) {
    if (filtro == 'todos') {
      this.setFiltro(false);
      this.precio.minimo = FiltroService.MINIMO;
      this.precio.maximo = FiltroService.MAXIMO;
    } else {
      switch (filtro) {
        case 'precio':
          this.precio.minimo = FiltroService.MINIMO;
          this.precio.maximo = FiltroService.MAXIMO;
          break;
        case 'carroceria':
          this.carroceria.value = FiltroService.CUALQUIERA;
          break;
        case 'consumo':
          this.precio.minimo = FiltroService.MINIMO;
          this.precio.maximo = FiltroService.MAXIMO;
          break;
        case 'motor':
          this.precio.minimo = FiltroService.MINIMO;
          this.precio.maximo = FiltroService.MAXIMO;
          break;
        case 'potencia':
          this.precio.minimo = FiltroService.MINIMO;
          this.precio.maximo = FiltroService.MAXIMO;
          break;

      }
    }
  }

  getFiltros(): any {

    let filtro = [];
    if (this.comprobarFiltroPrecio()) {
      filtro[filtro.length] = this.precio;
    }
    if (this.comprobarFiltroCarroceria()) {
      filtro[filtro.length] = this.carroceria;
    }

    // this.carroceria,
    // this.motor,
    // this.consumo,
    // this.potencia,
    return filtro;
  }

  /**
   * Metodo para comprobar si se quiere filtrar
   * por precio o esta inicializado por defecto
   *
   */
  comprobarFiltroPrecio(): boolean {
    console.log('this.precio.minimo '+ this.precio.maximo);
    console.log('FiltroService.MINIMO '+ FiltroService.MAXIMO);
    return !(this.precio.minimo == FiltroService.MINIMO && this.precio.maximo == FiltroService.MAXIMO);
  }

  /**
   * Metodo para comprobar si se quiere filtrar
   * por carroceria o esta inicializada por defecto
   *
   */
  comprobarFiltroCarroceria(): boolean {
    return !(this.carroceria.value == FiltroService.CUALQUIERA);
  }

  private setFiltro(bool: boolean) {
    this.filtro = bool;
  }

  getFiltro(): boolean {
    return this.filtro;
  }
}

