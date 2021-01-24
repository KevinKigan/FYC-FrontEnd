import {Component, OnInit} from '@angular/core';
import {Modelo} from '../../../../models/modelo';
import {CochesService} from '../../../services/coches.service';
import {ActivatedRoute} from '@angular/router';
import {urlEndPointUploadImg} from '../../../../../environments/environment';


@Component({
  selector: 'app-modelo-especifico',
  templateUrl: './modelo-especifico.component.html',
  styleUrls: ['./modelo-especifico.component.scss']
})
export class ModeloEspecificoComponent implements OnInit {

  modelo: Modelo;
  urlEndPointUploadImg = urlEndPointUploadImg;

  constructor(private cochesService: CochesService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params =>{
      let id = +params.get("id");
      this.cochesService.getModelo(id).subscribe(modelo =>{
        this.modelo = modelo;
      });
    })
  }
  public chartType: string = 'radar';

  public chartDatasets: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'My Second dataset' }
  ];

  public chartLabels: Array<any> = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 250, 220, .2)',
      borderColor: 'rgba(0, 213, 132, .7)',
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

}
