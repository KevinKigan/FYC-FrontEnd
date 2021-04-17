import {Component, Input, OnInit} from '@angular/core';
import {UsuariosService} from '../../../services/usuarios.service';
import {ActivatedRoute} from '@angular/router';
import {Usuario} from '../../../../models/usuario';
import swal from 'sweetalert2';
import {nouser} from '../../../../../environments/environment';
import {HttpEventType} from '@angular/common/http';
import {ModalService} from '../../../services/modal.service';
import {AuthService} from '../../../services/auth.service';


@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['../usuarios.component.scss']
})
export class UserdetailComponent implements OnInit {

  @Input()
  user: Usuario;

  changeRol: string[] = [];
  urlImageUser: string;
  public selectedImage: File;
  progress: number = 0;
  listaTabla: any[] = [
    {campo: 'Nombre de Usuario', icono: 'user-alt'},
    {campo: 'Imagen', icono: 'image'},
    {campo: 'Email', icono: 'envelope'},
    {campo: 'Fecha de Registro', icono: 'calendar-alt'},
    {campo: 'Roles', icono: 'leaf'},
    {campo: 'Habilitado', icono: 'low-vision'},
    {campo: 'Verificado', icono: 'id-card'}
  ];


  task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Primary', completed: false, color: 'primary'},
      {name: 'Accent', completed: false, color: 'accent'},
      {name: 'Warn', completed: false, color: 'warn'}
    ]
  };

  allComplete: boolean = false;

  ngOnInit(): void {
    if (this.user.image == '' || this.user.image == null) {
      this.user.image = 'Sin imagen';
    }
    this.usuariosService.getUserImage(this.user.id, false).subscribe(value => {
      console.log(value);
      if (value.list[this.user.id] != undefined) {
        this.urlImageUser = value.list[this.user.id];
      } else {
        this.urlImageUser = nouser;
      }
    });
  }

  constructor(public usuariosService: UsuariosService, public authService: AuthService, public modalService: ModalService) {
  }

  selectImage(event) {
    this.selectedImage = event.target.files[0];
    this.progress = 0;
    if (this.selectedImage.type.indexOf('image') < 0) {
      swal.fire({
        icon: 'warning',
        title: 'Fallo en la selección',
        text: 'El archivo debe ser de tipo imagen.',
      });
      this.selectedImage = null;
    }
  }

  uploadImage() {
    if (!this.selectedImage) {
      swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Debes seleccionar una imagen.',
        showConfirmButton: false,
        timer: 2000
      });
    } else {
      this.usuariosService.uploadImage(this.selectedImage, this.user.id)
        .subscribe(event => {
          console.log(event);
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((event.loaded / event.total) * 100);
            console.log(this.progress);
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.user = response.user as Usuario;
            swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Imagen actualizada correctamente.',
              showConfirmButton: false,
              timer: 2000
            });
            this.usuariosService.getUserImage(this.user.id, false).subscribe(value => {
              this.urlImageUser = value.list[this.user.id];
            });
          }
        });
    }
  }

  saveChanges() {
    this.usuariosService.update(this.user).subscribe(value => {
      if(this.changeRol.length>0) {
        this.usuariosService.setRoles(this.user, this.changeRol).subscribe(value1 => {
          this.user.roles = value1.roles;
        });
      }
      if (value.message != undefined) {
        swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario actualizado.',
          text: value.message,
          showConfirmButton: false,
          timer: 2000
        });
      }
    });
  }

  closeModal() {
    this.urlImageUser = '';
    this.selectedImage = null;
    this.modalService.closeModal();
  }

  containsRole(rol: string): boolean {
    let roles: string[] = this.usuariosService.getRoles(this.user.roles);
    return roles.includes(rol);
  }

  getImage() {
    if (this.urlImageUser == '') {
      this.usuariosService.getUserImage(this.user.id, false).subscribe(value => {
        this.urlImageUser = value.list[this.user.id];
      });
    }
    return this.urlImageUser;
  }

  hasErrors() {
    return this.usuariosService.errorsEmail(this.user) ||
      this.user.username.length < 4 ||
      this.user.username.includes('.');
  }

  setRole(rol: string) {
    if(this.changeRol && this.changeRol.includes(rol)){
     this.changeRol = this.changeRol.filter(e => e !== rol);
    }else {
      this.changeRol.push(rol);
    }
  }
}
