import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Marca} from '../../../models/marca';
import {CochesService} from '../../services/coches.service';
import {urlEndPointImgMarcaLogo} from '../../../../environments/environment'
import {FiltroService} from '../../services/filtro.service';


@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css']
})
export class MarcasComponent implements OnInit {

  listaGlobal: any[] = new Array([]);
  marcas:Marca[];
  urlEndPointImgMarcaLogo = urlEndPointImgMarcaLogo;
  loading:boolean;

  constructor(
    private cochesService: CochesService,
    private activatedRoute: ActivatedRoute,
    private filtroService: FiltroService) { }

  ngOnInit(): void {
    this.setLoading(true);
    this.activatedRoute.paramMap.subscribe(params => {
      this.cochesService.getMarcas().subscribe(response => {
        this.marcas = response as Marca[];

        this.marcas.sort((a, b) => {
          if(a.marcaCoche.toUpperCase()<b.marcaCoche.toUpperCase()){
            return -1
          }else {
            return 1;
          }
        })
        this.configurarItems();
        this.setLoading(false);
      });
    });
  }

  configurarItems() {
    let listaDeCinco: Marca[] = [];
    let listaGlobalAux = [];
    let i = 1;
    this.marcas.forEach(marca => {
      if ((i % 5 == 0 && i != 0)|| i==this.marcas.length) {
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
}