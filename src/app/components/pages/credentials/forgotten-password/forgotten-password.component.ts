import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UsuariosService} from '../../../services/usuarios.service';
import {Usuario} from '../../../../models/usuario';
import swal from 'sweetalert2';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['../credentials.scss']
})
export class ForgottenPasswordComponent implements OnInit {

  @Output() private volver = new EventEmitter<boolean>();
  @Input() usuario: Usuario;
  usernameEmail: string = '';
  newPass: string = 'forgottenPassword';

  constructor(private usuariosService: UsuariosService) {
  }

  ngOnInit(): void {
  }

  volverALogin() {
    this.volver.emit(true);
  }

  getNewPassword() {
    this.usuariosService.sendCodeVerification(this.usernameEmail, 'forgottenPassword').subscribe(value => {
          swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se te ha enviado un nuevo código en el caso de que estés registrado',
            showConfirmButton: false,
            timer: 3000
          });
      }
    );
  }
}
