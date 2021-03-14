import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import swal from 'sweetalert2';
import {Usuario} from '../../../../models/usuario';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['../credentials.scss']
})
export class VerifyComponent implements OnInit {
  @Output() private volver = new EventEmitter<boolean>();
  @Input() usuario: Usuario

  constructor() { }

  ngOnInit(): void {
  }

  reenviarCodigo() {
    swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Se ha enviado un nuevo código a '+this.usuario.email,
      showConfirmButton: false,
      timer: 1500
    })
  }

  volverARegistro() {
    this.volver.emit(true);
  }
}
