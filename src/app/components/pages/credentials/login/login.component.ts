import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {Usuario} from '../../../../models/usuario';
import swal from 'sweetalert2';
import {UsuariosService} from '../../../services/usuarios.service';
import {nouser} from '../../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../credentials.scss']
})
export class LoginComponent implements OnInit {

  user:Usuario = new Usuario();

  constructor(private authService: AuthService, private router:Router, private usuariosService:UsuariosService) { }


  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Sesión ya iniciada',
        text: 'Hola '+this.authService.user.username+', ya has iniciado sesión.',
        showConfirmButton: false,
        timer: 3000
      })
      this.router.navigate(['/modelos'])
    }
  }

  entrar() {
    this.usuariosService.entrar(this.user, true);
  }

  forgottenPassword() {
    document.getElementById("formularioLogin").style.display="none";
    document.getElementById("forgotten").style.display="block";
  }

  irAlogin() {
    document.getElementById("formularioLogin").style.display="block";
    document.getElementById("forgotten").style.display="none";
  }
}
