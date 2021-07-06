import {Component, OnInit} from '@angular/core';
import {UsuariosService} from '../../services/usuarios.service';
import {Usuario} from '../../../models/usuario';
import swal from 'sweetalert2';
import {AuthService} from '../../services/auth.service';
import {nouser} from '../../../../environments/environment';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  selectedUser:Usuario;
  loading: boolean = true;
  images: string[];
  nouser = nouser;
  listaTabla: any[] = [
    {campo:'Id',                icono:'fingerprint'},
    {campo:'Imagen',            icono:'image'},
    {campo:'Usuario',           icono:'user-alt'},
    {campo:'Email',             icono:'envelope'},
    {campo:'Habilitado',        icono:'low-vision'},
    {campo:'Verificado',        icono:'id-card'},
    {campo:'Registro',          icono:'calendar-alt'},
    {campo:'Roles',             icono:'leaf'},
    {campo:'Acciones',          icono:'edit'}
  ];
  listaUsuarios:Usuario[]=[];

  constructor(public usuariosService: UsuariosService, public authService: AuthService, public modalService: ModalService) {
  }

  ngOnInit(): void {
    this.usuariosService.getUsers(0).subscribe(response=>{
      this.listaUsuarios = response;
      this.usuariosService.getUserImage(-1, false).subscribe(value => {
        this.images = value.list;
      })
      this.loading = false;
      }
    );

  }

  habilitar(usuario: Usuario, habilitar:boolean) {
    let enable;
    let enable2;
    if(habilitar){
      enable = 'Habilitar';
      enable2 = 'habilitado';
    }else{
      enable = 'Deshabilitar';
      enable2 = 'deshabilitado';
    }
    swal.fire({
      title: '¿'+enable+' a '+usuario.username+'?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, '+enable+' usuario!'
    }).then((result) => {
      if (result.isConfirmed) {
        usuario.enabled = habilitar;
        this.usuariosService.update(usuario).subscribe(value => {
          swal.fire(
            'Actualizado!',
            'Se ha '+enable2+' al usuario '+usuario.username+'.',
            'success'
          )
        });
      }
    })
  }

  openModal(usuario: Usuario) {
    this.selectedUser = usuario;
    this.modalService.openModal();
  }
}
