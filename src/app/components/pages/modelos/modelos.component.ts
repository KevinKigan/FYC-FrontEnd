import {Component, OnInit, SimpleChanges} from '@angular/core';
import {CochesService} from '../../services/coches.service';
import {ActivatedRoute} from '@angular/router';
import {Coche} from '../../../models/coche';
import {Modelo} from '../../../models/modelo';
import {isElementScrolledOutsideView} from '@angular/cdk/overlay/position/scroll-clip';

@Component({
  selector: 'app-coches',
  templateUrl: './modelos.component.html',
  styleUrls: ['./modelos.component.css']
})
export class ModelosComponent implements OnInit {

  coches: Coche[];
  modelos: Modelo[];
  listaGlobal: any[] = new Array([]);
  paginator: any;

  constructor(
    private cochesService: CochesService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page = +params.get('page'); // El operador suma transforma el string en un number
      if (!page || page<0) {
        page = 0;
      }
      this.cochesService.getModelos(page).subscribe(response => {
        this.modelos = response.content as Modelo[];
        this.paginator = response;
        this.configurarItems();
      });
    });
  }

  configurarItems() {
    let listaDeCinco: Modelo[] = [];
    let listaGlobalAux = [];
    let i = 1;
    this.modelos.forEach(modelo => {
      if ((i % 5 == 0 && i != 0)|| i==this.modelos.length) {
        listaDeCinco.push(modelo);
        listaGlobalAux.push(listaDeCinco);
        listaDeCinco = [];
      } else {
        listaDeCinco.push(modelo);
      }
      i++;
    });
    this.listaGlobal = listaGlobalAux;
  }

  ngOnChanges(changes: SimpleChanges) {
    let paginatorActualizado = changes['paginator'];

    if (paginatorActualizado.previousValue) {
      this.ngOnInit();
    }

  }


}
