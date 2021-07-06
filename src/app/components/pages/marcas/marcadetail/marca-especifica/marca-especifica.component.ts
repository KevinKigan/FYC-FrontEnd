import {Component, EventEmitter, HostListener, Input, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Marca} from '../../../../../models/marca';
import {ModalService} from '../../../../services/modal.service';
import {CochesService} from '../../../../services/coches.service';
import swal from 'sweetalert2';
import {HttpEventType} from '@angular/common/http';
import {Modelo} from '../../../../../models/modelo';
import {MdbTableDirective} from 'angular-bootstrap-md';
import {Router} from '@angular/router';


@Component({
  selector: 'app-marca-especifica',
  templateUrl: './marca-especifica.component.html',
  styleUrls: ['./marca-especifica.component.scss']
})
export class MarcaEspecificaComponent implements OnInit {

  @Input() marca: Marca;
  @Input() image: string;
  @Output() private actualizadaImagen = new EventEmitter<Map<string,string>>();
  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective;
  @HostListener('input') oninput() {
    this.searchItems();
  }

  progress: number = 0;
  selectedImage: File;
  fade: string = 'fadeIn';
  searchText: string = '';
  modelos: Modelo[] = [];
  modelosOriginal: Modelo[] = [];
  nombreModelos: string[] = [];
  btn1: boolean = true;
  paths: string[];
  btn2: boolean = true;
  btn1class: string = 'peach-gradient';
  btn2class: string = 'peach-gradient';
  previous: string;
  carrocerias: string[] = []


  constructor(public modalService: ModalService, private cochesService: CochesService, private router: Router) { }

  ngOnInit() {
  }

  /**
   * Metodo para actualizar los modelos cuando
   * se cambia de marca o se filtra
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges){
    let m: Marca = changes.marca.currentValue;
    this.cochesService.getModelosPorMarcaSinPaginar(this.marca.idMarca).subscribe(value => {
      this.modelos = value;
      let idsModelos = this.modelos.map(modelo => modelo.idModelo);
      this.cochesService.getCarroceriasPorModelo(idsModelos).subscribe(mapa_carrocerias => {
        this.carrocerias = mapa_carrocerias.carrocerias;
      })
      this.modelos.sort((modeloA, modeloB) => {
        if (modeloA.modelo.toUpperCase() < modeloB.modelo.toUpperCase()) {
          return -1;
        } else {
          return 1;
        }
      });
      if(this.modelosOriginal.length==0){
        this.modelosOriginal = this.modelos;
      }
      this.nombreModelos = this.modelos.map(modelo => modelo.modelo);
      this.mdbTable.setDataSource(this.nombreModelos);
      this.previous = this.mdbTable.getDataSource();
    })
  }

  /**
   * Metodo para buscar los modelos segun
   * el string pedido
   */
  searchItems() {
    const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.modelos = this.modelosOriginal;
    }
    if (this.searchText) {
      this.nombreModelos = this.mdbTable.searchLocalDataBy(this.searchText);
      this.modelos = this.modelosOriginal.filter(modelo=>
      {
        if(this.nombreModelos.includes(modelo.modelo)){
          return modelo;
        }
      })
      this.mdbTable.setDataSource(prev);
    }
  }

  /**
   * Metodo para cerrar el modal
   * y reiniciar las variables
   */
  closeModal() {
    this.btn1 = true;
    this.btn2 = true;
    this.modelosOriginal = [];
    this.carrocerias = [];
    this.btn1class = 'peach-gradient';
    this.btn2class = 'peach-gradient';
    this.modalService.closeModal();
  }

  /**
   * Metodo para actualizar los botones
   * de habilitar y deshabilitar
   * @param number
   */
  changeEnableButton(number: number) {
    switch (number){
      case 1:{
        if(this.btn1 == false) {
          this.btn1 = true;
          this.btn1class = 'peach-gradient';
        }else{
          this.btn1 = false;
          this.btn1class = 'dusty-grass-gradient';
        }
        break;
      }case 2:{
        if(this.btn2 == false) {
          this.btn2 = true;
          this.btn2class = 'peach-gradient';
        }else{
          this.btn2 = false;
          this.btn2class = 'dusty-grass-gradient';
        }
        break;
      }
    }
  }

  /**
   * Metodo para guardar los cambios
   */
  saveChanges() {
    swal.fire({
      title: '¿Actualizar la marca a '+this.marca.marcaCoche+'?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Guardar`,
      denyButtonText: `No guardar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.cochesService.saveMarca(this.marca).subscribe(value =>{
          if(value.message != undefined){
            swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Marca guardada',
              text: value.message,
              showConfirmButton: false,
              timer: 2000
            });
          }else if(value.error != undefined){
            swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Error al actualizar la marca',
              text: value.error,
              showConfirmButton: false,
              timer: 3000
            });
          }
        });
      }
    })
  }

  /**
   * Metodo para seleccionar una imagen
   * @param event
   */
  selectImage(event) {
    this.selectedImage = event.target.files[0];
    this.progress = 0;
    if (this.selectedImage.type.indexOf('image/png') < 0) {
      swal.fire({
        icon: 'warning',
        title: 'Fallo en la selección',
        text: 'El archivo debe ser de tipo imagen y extensión PNG.',
      });
      this.selectedImage = null;
    }
  }

  /**
   * Metodo para actualizar una imagen en el servidor
   */
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
      this.cochesService.uploadMarcaImage(this.selectedImage, this.marca.idMarca)
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.marca = response.marca as Marca;
            swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Imagen actualizada correctamente.',
              showConfirmButton: false,
              timer: 2000
            });
            this.cochesService.getUrlMarca(this.marca.idMarca).subscribe(urls => {
              this.image = urls[this.marca.idMarca];
              let map: Map<string,string> = new Map;
              map.set('id', String(this.marca.idMarca))
              map.set('image', this.image)
              this.actualizadaImagen.emit(map);
            });
          }
        });
    }
  }

  editarModelo(idModelo: number) {
    this.closeModal();
    this.router.navigate(['/modelos/detalle_modelo',idModelo]);
  }
}
