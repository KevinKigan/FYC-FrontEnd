import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {Usuario} from '../../../../models/usuario';
import swal from 'sweetalert2';
import {UsuariosService} from '../../../services/usuarios.service';

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
    this.authService.login (this.user).subscribe(response => {
      this.authService.saveUser(response.access_token);
      this.authService.saveToken(response.access_token);
      this.usuariosService.getMyUserByUsername(response.username).subscribe(user =>{
        this.authService.saveCompleteUser(user);
      });
      let user = this.authService.user;
      this.router.navigate(['/modelos']);
      swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Sesión iniciada!',
        text: 'Se ha iniciado sesión exitosamente ' + user.username+'.',
        showConfirmButton: false,
        timer: 3000
      });
    });
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
