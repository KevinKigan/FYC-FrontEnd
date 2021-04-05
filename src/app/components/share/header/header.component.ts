import {Component, OnInit, ViewChild} from '@angular/core';
import {limitInfSizeScreen} from '../../../config/config';
import {AuthService} from '../../services/auth.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  tipoUsuario: string = 'Usuario';
  slide = 'slideOffHeader';

  panelOpenState: boolean;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.panelOpenState = false;
  }

  logout():void{
    let user = this.authService.user.username;
    this.authService.logout();
    swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Sesión cerrada',
      text: 'Hola '+user+', has cerrado sesión correctamente.',
      showConfirmButton: false,
      timer: 3000
    })
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
    if(screen.width<limitInfSizeScreen) {
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
    if(screen.width<limitInfSizeScreen) {
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
    if (this.slide == 'slideInHeader') {
      this.slide = 'slideOutHeader';
    } else {
      this.slide = 'slideInHeader';
    }
  }
  /**
   * Metodo para actualizar el estado del slide
   * a escondido cada vez que se pincha en el link y la ventana es pequeña
   *
   */
  setSlideOut() {
    this.slide = 'slideOutHeader';
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
