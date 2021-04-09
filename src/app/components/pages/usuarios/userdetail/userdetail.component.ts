import {Component, OnInit} from '@angular/core';
import {UsuariosService} from '../../../services/usuarios.service';
import {ActivatedRoute} from '@angular/router';
import {Usuario} from '../../../../models/usuario';
import swal from 'sweetalert2';
import {nouser} from '../../../../../environments/environment';
import {AuthService} from '../../../services/auth.service';
import {HttpEventType} from '@angular/common/http';
import axios from 'axios';


@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['../usuarios.component.scss']
})
export class UserdetailComponent implements OnInit {

  user: Usuario;
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

  constructor(public usuariosService: UsuariosService, private activatedRoute: ActivatedRoute, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let id: number = +params.get('id');
      if (id) {
        this.usuariosService.getUserById(id).subscribe(user => {
          if (user.image == '' || user.image == null) {
            user.image = 'Sin imagen';
          }
          this.user = user;
          this.usuariosService.getUserImage(this.user.id).subscribe(value => {
            if (value.list[this.user.id] != undefined) {
              this.urlImageUser = value.list[this.user.id];
            } else {
              this.urlImageUser = nouser;
            }
          });
        });
      }
    });
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
          this.usuariosService.getUserImage(this.user.id).subscribe(value => {
            this.urlImageUser = value.list[this.user.id];
          });
        }
      });
    }
  }
}
