import { Component, OnInit } from '@angular/core';
import {CochesService} from '../../services/coches.service';
import {Volumen} from '../../../models/volumen';
import {ConocemeService} from '../../services/conoceme.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  _intro: any;
  _intro2: any;
  _introWelcome: any;
  itemsCarrousel: any[] = [];

  constructor(private cochesService: CochesService, private conocemeService: ConocemeService, private router: Router) { }

  ngOnInit(): void {
    this._intro = this.conocemeService.getIntroHome();
    this._intro2 = this.conocemeService.getIntroHome2();
    this._introWelcome = this.conocemeService.getIntroWelcomeHome();
    this.itemsCarrousel.push(
      {title: "Marcas", text: "Busca entre las diferentes marcas", image: 'marcas.jpg', path: '/marcas'},
      {title: "Modelos", text: "Encuentra el modelo que necesitas", image: 'modelos.png', path: '/modelos'});
  }

  redirectToItemPage(path: string) {
    this.router.navigate([path]);
  }

  screenSize() {
    return screen.width;
  }
}
