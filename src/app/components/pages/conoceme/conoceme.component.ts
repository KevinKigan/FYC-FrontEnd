import { Component, OnInit } from '@angular/core';
import {ConocemeService} from '../../services/conoceme.service';
import {urlImgPropietario,urlImgBackKnowme} from '../../../../environments/environment';

@Component({
  selector: 'app-conoceme',
  templateUrl: './conoceme.component.html',
  styleUrls: ['./conoceme.component.scss']
})
export class ConocemeComponent implements OnInit {

  constructor(private conocemeService: ConocemeService) { }

  urlImgPropietario = urlImgPropietario;
  urlImgBackKnowme = urlImgBackKnowme;
  header:string;
  intro:string;
  intro2:string;


  ngOnInit(): void {
    this.header = this.conocemeService.getHeader();
    this.intro = this.conocemeService.getIntro();
    this.intro2 = this.conocemeService.getIntro2();
  }

}
