import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {CochesService} from '../../services/coches.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  @Input() paginator: any;
  @Input() paths: string[];
  pages: number[];
  idMarca: number=-1;
  pathConMarca: string;
  itemsPorPagina: number = 20;
  redirectPath: string = '/redirect/'+this.itemsPorPagina+'/marca';
  totalPaginas: number;
  paginaActual: number;
  opcionesDePagina: number[] = [10, 20, 50];
  from: number;
  pageEvent: PageEvent;
  to: number;
  cargado: boolean = false;
  pathSinMarca : string;

  constructor(private cochesService: CochesService, private router:Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.initPaginator();
  }

  ngOnChanges(changes: SimpleChanges) {
    let paginatorActualizado = changes['paginator'];
    if (paginatorActualizado!==undefined) {
      if (paginatorActualizado.previousValue) {
        this.initPaginator();
      }
    }
  }


  private initPaginator(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.itemsPorPagina = +params.get('pageSize');
      this.pathSinMarca = '/modelos/'+this.itemsPorPagina+'/page';
    });
    if (this.paginator !== undefined) {
      this.cargado = true;
      if(this.paths!==undefined) {
        this.pathConMarca = this.paths[1];
        // Si tiene marca asignamos la marca y si no, por defecto es -1
        if(this.paginator.content[0]) {
          this.idMarca = this.paginator.content[0].marca.idMarca;
        }
      }
      this.pages = new Array(this.paginator.totalPages).fill(0).map((valor,indice)=>indice+1);
      this.totalPaginas = this.paginator.totalPages;
      this.paginaActual = this.paginator.number+1;
      this.itemsPorPagina = this.paginator.size;
      let numMinFrom = 5;
      let numMinTo = 4;
      let numMinFrom1;
      let numMinTo1;
      switch (this.formatoPantalla()){
        case 'smallScreen':
          numMinFrom1 = 0;
          numMinTo1 = 2
          numMinFrom = 1;
          numMinTo = 2;
          break;
        case 'mediumScreen':
          numMinFrom1 = 1;
          numMinTo1 = 3;
          numMinFrom = 1;
          numMinTo = 2;
          break;
        case 'bigScreen':
          numMinFrom1 = 2;
          numMinTo1 = 4
          break;
      }
      this.from = Math.min(Math.max(1, this.paginator.number - numMinFrom1), this.paginator.totalPages - numMinFrom);
      this.to = Math.max(Math.min(this.paginator.totalPages, this.paginator.number + numMinTo1), numMinTo);

      if (this.paginator.totalPages > 5) {
        this.pages = new Array(this.to - this.from + 1).fill(0).map((_valor, indice) => indice + this.from);
      } else {
        this.pages = new Array(this.paginator.totalPages).fill(0).map((_valor, indice) => indice + 1);
      }
    }
  }

  paginatorActualizado(size:number): void {
    this.itemsPorPagina = size;
    this.redirectPath = '/redirect/'+this.itemsPorPagina+'/marca';
    this.pathSinMarca = '/modelos/'+this.itemsPorPagina+'/page';
    this.router.navigate([this.redirectPath,this.idMarca]);
  }

  actualizarPagina(page:number):void{
    this.paginaActual = page;
  }

  formatoPantalla(): string{
    if(screen.width<900){
      return 'smallScreen'
    }else if(screen.width>900 && screen.width<1200){
      return 'mediumScreen'
    }else{
      return 'bigScreen'
    }
  }
}
