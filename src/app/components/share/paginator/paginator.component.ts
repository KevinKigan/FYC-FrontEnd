import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {CochesService} from '../../services/coches.service';
import {Router} from '@angular/router';
import {ModelosComponent} from '../../pages/modelos/modelos.component';

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
  totalPaginas: number;
  itemsPorPagina: number;
  paginaActual: number;
  opcionesDePagina: number[] = [10, 20, 50];
  from: number;
  pageEvent: PageEvent;
  to: number;
  cargado: boolean = false;
  pathSinMarca = '/modelos/page';

  constructor(private cochesService: CochesService, private router:Router) {
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

      this.from = Math.min(Math.max(1, this.paginator.number - 2), this.paginator.totalPages - 5);
      this.to = Math.max(Math.min(this.paginator.totalPages, this.paginator.number + 4), 6);

      if (this.paginator.totalPages > 5) {
        this.pages = new Array(this.to - this.from + 1).fill(0).map((_valor, indice) => indice + this.from);
      } else {
        this.pages = new Array(this.paginator.totalPages).fill(0).map((_valor, indice) => indice + 1);
      }
    }
  }

  paginatorActualizado(size:number): void {
    this.itemsPorPagina = size;
    this.cochesService.updateItemsPorPagina(size).subscribe();
  }

  actualizarPagina(page:number):void{
    this.paginaActual = page;
  }
}
