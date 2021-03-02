import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Modelo} from '../../../models/modelo';
import {CochesService} from '../../services/coches.service';
import {ModelosComponent} from '../../pages/modelos/modelos.component';
import {mod} from 'ngx-bootstrap/chronos/utils';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  @Input() path:string
  private pathModelos: string = 'modelos/page/';
  private pathModelosPorMarca: string = 'modelos/marca/';
  private pathModeloEspecifico: string = 'modelo/';


  constructor(
      private router:Router,
      private activatedRoute: ActivatedRoute
      ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let idMarca = +params.get('marca');
      let pageSize = +params.get('pageSize');
      let modeloEspecifico = +params.get('modeloespecifico');
      let path='';
      if(modeloEspecifico>0){
        this.router.navigate([this.pathModeloEspecifico+modeloEspecifico]);
      }else {
        if (idMarca > 0) {
          path = 'modelos/'+ pageSize +'/marca/' + idMarca + '/page/0';
        } else {
          path = 'modelos/'+pageSize+'/page/' + 0;
        }
        this.router.navigate([path]);
      }
    });
  }
}
