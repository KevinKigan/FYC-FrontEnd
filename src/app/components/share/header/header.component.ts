import {Component, OnInit, ViewChild} from '@angular/core';
import {urlEndPointImgLogo} from '../../../../environments/environment';
import {limitSizeScreen} from '../../../../main';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  urlEndPointImgLogo = urlEndPointImgLogo;
  tipoUsuario: string = 'Usuario';
  slide = 'slideOff';

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

  /**
   * Metodo para retornar el estado del slide
   *
   */
  getSlide() {
    if(screen.width<limitSizeScreen) {
      return this.slide;
    }else {
      return '';
    }
  }
  /**
   * Metodo para retornar si tiene o no animacion
   * por tamaño de pantalla
   */
  getAnimation() {
    if(screen.width<limitSizeScreen) {
      return 'animation';
    }else{
      return '';
    }
  }

  /**
   * Metodo para actualizar el estado del slide
   * al contrario al que tuviera previamente
   *
   */
  setSlide() {
    if (this.slide == 'slideIn') {
      this.slide = 'slideOut';
    } else {
      this.slide = 'slideIn';
    }
  }
  /**
   * Metodo para actualizar el estado del slide
   * a escondido cada vez que se pincha en el link y la ventana es pequeña
   *
   */
  setSlideOut() {
    this.slide = 'slideOut';
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
