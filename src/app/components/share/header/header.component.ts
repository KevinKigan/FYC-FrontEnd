import {Component, OnInit, ViewChild} from '@angular/core';
import {urlEndPointImgLogo} from '../../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  urlEndPointImgLogo = urlEndPointImgLogo;
  tipoUsuario: string = 'Usuario';

  // public logo = 'G:/TFG/fyc-app/src/FYClogo.png';
    panelOpenState: boolean;
  constructor() { }

  ngOnInit(): void {
    this.panelOpenState = false;
  }

  alternarUsuario():void{
    if(this.tipoUsuario.includes('Usuario')){
      this.tipoUsuario='Administrador';
    }else{
      this.tipoUsuario='Usuario';
    }
  }

  // comprobarNavbar():void{
  //     let prevScrollpos = window.pageYOffset;
  //     let bool;
  //     window.onscroll = ev => function() {
  //       let currentScrollPos = window.pageYOffset;
  //       if (prevScrollpos > currentScrollPos) {
  //         console.log("Mostrar");
  //
  //       } else {
  //         console.log("Ocultar");
  //         // document.getElementById("navbar").style.top = "-50px";
  //         return false;
  //       }
  //       prevScrollpos = currentScrollPos;
  //     }
  //
  //
  // }
  // ponerafalse():void{
  //   this.mostrarNavbar=false;
  // }
  // poneratrue():void{
  //   this.mostrarNavbar=true;
  // }
}
