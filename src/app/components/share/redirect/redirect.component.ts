import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Modelo} from '../../../models/modelo';
import {CochesService} from '../../services/coches.service';
import {ModelosComponent} from '../../pages/modelos/modelos.component';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  @Input() path:string
  private pathModelos: string = 'modelos/page/';
  private pathModelosPorMarca: string = 'modelos/marca/';


  constructor(
      private router:Router,
      private activatedRoute: ActivatedRoute,
      private cochesService: CochesService
      ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let idMarca = +params.get('marca');
      let path='';
      if(idMarca>0){
        path = this.pathModelosPorMarca+idMarca+'/page/0';
      }else{
        path = this.pathModelos+0;
      }
      this.router.navigate([path]);
      // if(marca){
      //   modelos = this.cochesService.getModelosPorMarca(marca,page);
      //   this.paths = [];
      //   this.paths[0] = this.cochesService.getModelosPorMarcaPath(marca); // Path de peticion http
      //   this.paths[1] = '/modelos/marca/'+marca+'/page/'; // Path de peticion en app-routing-module
      // }else {
      //   modelos = this.cochesService.getModelos(page);
      // }
      // modelos.subscribe(response => {
      //   this.modelos = response.content as Modelo[];
      //   this.paginator = response;
      //   this.configurarItems();
      // });
    });
    // this.router.navigate(['/modelos/page/0']);
  }

}
