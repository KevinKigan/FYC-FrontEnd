import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public logo = 'G:/TFG/fyc-app/src/FYClogo.png';

  constructor() { }

  ngOnInit(): void {
  }

}
