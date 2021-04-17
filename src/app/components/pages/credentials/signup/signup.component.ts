import {Component, OnInit, ViewChild} from '@angular/core';
import {Usuario} from '../../../../models/usuario';
import {UsuariosService} from '../../../services/usuarios.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../credentials.scss']
})
export class SignupComponent implements OnInit {
  @ViewChild('email') email: any;
  public passStrong: string;
  public colorStrong: string = 'redPass';
  public formulario:any;
  pass: string = '';
  usuario:Usuario = new Usuario();
  confirmPass: string ='';
  newUser: string='verifyNewUser';

  constructor(public usuariosService: UsuariosService) {
  }

  ngOnInit(): void {

  }

  fuerzaPass() {
    let fuerza = 0;
    if (this.usuario.password.length < 8) {
      //TODO no puede contener espacios
      this.passStrong = 'Contraseña débil';
      this.colorStrong = 'redPass';
      return;
    }
    let especiales = ['º', 'ª', '/', '!', '|', '"', '@', '·', '#', '$', '~', '%', '&', '¬', '(', ')', '=', '?', '\'', '¿', '¡', '`', '^', '[', '*', '+', ']', '´', '¨', '{', '}', 'ç', '-', '.', ',', ';', ':', '-', '_', '<', '>'];
    especiales.forEach(car => {
      if (this.usuario.password.toString().includes(car)) {
        fuerza += 1;
        return;
      }
    });
    // Si tiene mayusculas
    let expRegMayus = new RegExp('[A-Z]+');
    if(expRegMayus.test(this.usuario.password)){
      fuerza+=1;
    }
    // Si tiene minusculas
    let expRegMinus = new RegExp('[a-z]+');
    if(expRegMinus.test(this.usuario.password)){
      fuerza+=1;
    }
    // Si tiene numeros
    let expRegNums = new RegExp('[0-9]+');
    if(expRegNums.test(this.usuario.password)){
      fuerza+=1;
    }
    switch (fuerza) {
      case 0:{
        this.colorStrong = 'redPass';
        this.passStrong = 'Contraseña Débil';
        break;
      }
      case 1:{
        this.colorStrong = 'orangePass';
        this.passStrong = 'Contraseña Mejorable';
        break;
      }
      case 2:{
        this.colorStrong = 'yellowPass';
        this.passStrong = 'Contraseña Buena';
        break;
      }
      case 3:{
        this.colorStrong = 'lightGreenPass';
        this.passStrong = 'Contraseña Fuerte';
        break;
      }
      case 4:{
        this.colorStrong = 'greenPass';
        this.passStrong = 'Contraseña Muy Fuerte';
        break;
      }

    }
  }

  setPass(event) {
    this.pass = event.target.value;
  }
  setConfirmPass(event) {
    this.confirmPass = event.target.value;
  }

  registrar() {
    document.getElementById("formulario").style.display="none";
    document.getElementById("verify").style.display="block";
    this.usuariosService.create(this.usuario).subscribe(value=>{
      this.usuario = value.user;
      console.log(this.usuario);
      swal.fire({
        position: 'center',
        icon: 'success',
        text: value.message,
        showConfirmButton: false,
        timer: 3000
      });
      });
  }

  samePassword(): boolean{
    return this.pass!='' && this.confirmPass!='' && this.pass==this.confirmPass;
  }

  volverARegistro($event: any) {
    console.log('entramos');
    document.getElementById("formulario").style.display="block";
    document.getElementById("verify").style.display="none";
  }


  errors() {
    return !this.samePassword() ||
            this.usuariosService.errorsEmail(this.usuario)  ||
           !(this.usuario.username.length>4) ||
           this.usuario.username.includes('.');
  }
}
