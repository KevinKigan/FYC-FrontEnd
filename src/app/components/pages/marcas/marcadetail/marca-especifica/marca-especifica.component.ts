import {Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Marca} from '../../../../../models/marca';
import {ModalService} from '../../../../services/modal.service';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {CochesService} from '../../../../services/coches.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-marca-especifica',
  templateUrl: './marca-especifica.component.html',
  styleUrls: ['./marca-especifica.component.css']
})
export class MarcaEspecificaComponent implements OnInit {

  @Input() marca: Marca;
  fade: string = 'fadeIn';
  btn1: boolean = true;
  btn2: boolean = true;
  btn1class: string = 'peach-gradient';
  btn2class: string = 'peach-gradient';

  constructor(public modalService: ModalService, private cochesService: CochesService) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.btn1 = true;
    this.btn2 = true;
    this.btn1class = 'peach-gradient';
    this.btn2class = 'peach-gradient';
    this.modalService.closeModal();
  }

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
}
