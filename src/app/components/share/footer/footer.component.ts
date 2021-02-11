import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  public author: any = {name: 'Kevin', lastName: 'Gómez'};
  public year: number;

  constructor() { }

  ngOnInit(): void {
    this.year = new Date().getFullYear();
  }
  //TODO que no aparezca el footer hasta que este cargada la pagina
}
