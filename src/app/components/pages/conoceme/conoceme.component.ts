import { Component, OnInit } from '@angular/core';
import {ConocemeService} from '../../services/conoceme.service';
import {urlEndPointUploadImg,urlEndPointImgPropietario} from '../../../../environments/environment';

@Component({
  selector: 'app-conoceme',
  templateUrl: './conoceme.component.html',
  styleUrls: ['./conoceme.component.scss']
})
export class ConocemeComponent implements OnInit {

  constructor(private conocemeService: ConocemeService) { }

  urlEndPointUploadImg = urlEndPointUploadImg;
  urlEndPointImgPropietario = urlEndPointImgPropietario;
  header:string;


  ngOnInit(): void {
    this.header = this.conocemeService.getHeader();
  }

}
