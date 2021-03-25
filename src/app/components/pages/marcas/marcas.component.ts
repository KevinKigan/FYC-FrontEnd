import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Marca} from '../../../models/marca';
import {CochesService} from '../../services/coches.service';
import {urlImgMarcaLogo} from '../../../../environments/environment';
import {FiltroService} from '../../services/filtro.service';
import {limitBigMidSizeScreen, limitInfSizeScreen, limitMidSizeScreen} from '../../../config/config';


@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.scss']
})
export class MarcasComponent implements OnInit {

  listaGlobal: any[] = new Array([]);
  marcas: Marca[];
  urlImgMarcaLogo = urlImgMarcaLogo;
  loading: boolean;
  imagenes = new Map<number, string>();

  constructor(
    private cochesService: CochesService,
    private activatedRoute: ActivatedRoute,
    private filtroService: FiltroService) {
  }

  /**
   * Metodo para iniciar el componente
   *
   */
  ngOnInit(): void {
    this.setLoading(true);
    this.activatedRoute.paramMap.subscribe(params => {
      this.cochesService.getMarcas().subscribe(response => {
        this.marcas = response as Marca[];

        this.marcas.sort((a, b) => {
          if (a.marcaCoche.toUpperCase() < b.marcaCoche.toUpperCase()) {
            return -1;
          } else {
            return 1;
          }
        });
        this.configurarItems();
        this.setLoading(false);
        this.cochesService.getUrlMarca(-1).subscribe(urls => {
          this.imagenes = urls;
        });
      });
    });
  }

  /**
   * Metodo para configurar las marcas en listas de 5 elementos
   * y que se muestren por filas de dichos elementos
   */
  configurarItems() {
    let listaDeCinco: Marca[] = [];
    let listaGlobalAux = [];
    let i = 1;
    let num_items = 0;
    if (screen.width < limitInfSizeScreen) {
      num_items = 2;
    } else if (screen.width > limitInfSizeScreen && screen.width < limitMidSizeScreen) {
      num_items = 3;
    } else if (screen.width > limitMidSizeScreen && screen.width < limitBigMidSizeScreen) {
      num_items = 4;
    } else {
      num_items = 5;
    }
    this.marcas.forEach(marca => {
      if ((i % num_items == 0 && i != 0) || i == this.marcas.length) {
        listaDeCinco.push(marca);
        listaGlobalAux.push(listaDeCinco);
        listaDeCinco = [];
      } else {
        listaDeCinco.push(marca);
      }
      i++;
    });
    this.listaGlobal = listaGlobalAux;
  }

  setLoading(load: boolean) {
    this.filtroService.setLoading(load);
    this.loading = this.filtroService.getLoading();
  }

  getUrlMarca(idMarca: number) {
    if(this.imagenes[idMarca]==undefined){
      return 'https://dl.dropboxusercontent.com/s/1m5yy8wwpexgfyh/defaultImageMarca.png?dl=0';
    }else {
      return this.imagenes[idMarca];
    }
  }
}
