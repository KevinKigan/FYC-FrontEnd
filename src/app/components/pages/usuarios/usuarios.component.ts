import {Component, OnInit} from '@angular/core';
import {UsuariosService} from '../../services/usuarios.service';
import {Usuario} from '../../../models/usuario';
import swal from 'sweetalert2';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  listaTabla: any[] = [
    {campo:'Id',                icono:'fingerprint'},
    {campo:'Imagen',            icono:'image'},
    {campo:'Nombre de Usuario', icono:'user-alt'},
    {campo:'Email',             icono:'envelope'},
    {campo:'Habilitado',        icono:'low-vision'},
    {campo:'Verificado',        icono:'id-card'},
    {campo:'Fecha de Registro', icono:'calendar-alt'},
    {campo:'Roles',             icono:'leaf'},
    {campo:'Acciones',          icono:'edit'}
  ];
  listaUsuarios:Usuario[]=[];

  constructor(private usuariosService: UsuariosService, public authService: AuthService) {
  }

  ngOnInit(): void {
    this.usuariosService.getUsers(0).subscribe(response=>{
      // console.log(response);
      this.listaUsuarios = response;
      }
    );

  }

  eliminarUsuario(usuario: Usuario) {
    swal.fire({
      title: 'Seguro que quieres borrar al usuario '+usuario.username+'?',
      text: "No se podrán revertir los cambios!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar usuario!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosService.delete(usuario.id).subscribe(value => {
          swal.fire(
            'Borrado!',
            'Se ha borrado al usuario '+usuario.username+'.',
            'success'
          )
        });
      }
    })
  }

  getRoles(roles: any[]): string {
    let rolesString:string = '';
    roles.forEach(itemListaRoles => {
      if(rolesString!=''){
        rolesString+=', '+itemListaRoles.rolName;
      }else {
        rolesString+=itemListaRoles.rolName
      }
    });
    return rolesString;
  }
}
