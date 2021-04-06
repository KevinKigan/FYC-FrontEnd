import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import swal from 'sweetalert2';
import {Usuario} from '../../../../models/usuario';
import {UsuariosService} from '../../../services/usuarios.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['../credentials.scss']
})
export class VerifyComponent implements OnInit {
  @Output() private volver = new EventEmitter<boolean>();
  @Input() usuario: Usuario;
  @Input() tipo: string;
  codigo: string = '';

  constructor(private usuariosService: UsuariosService) {
  }

  ngOnInit(): void {
  }

  reenviarCodigo() {
    this.usuariosService.sendCodeVerification(String(this.usuario.id),this.tipo).subscribe(value => {
      console.log('recibido');
    });
    swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Código enviado!',
      text: 'Se ha enviado un nuevo código a ' + this.usuario.email,
      showConfirmButton: false,
      timer: 3000
    });
  }

  volverARegistro() {
    this.volver.emit(true);
  }

  verificarCodigo() {
    console.log(this.usuario);
    this.usuariosService.checkCodeVerification(this.usuario.id, this.codigo).subscribe(value => {
      if(value.menssaje!=null || value.menssaje!=undefined){
        swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Verificación exitosa ' + this.usuario.username,
          showConfirmButton: false,
          timer: 3000
        });
      }else if(value.error!=null || value.error!=undefined){
        swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No se ha podido verificar: ' + value.error,
          showConfirmButton: false,
          timer: 3000
        });
      }
    });
  }
}
