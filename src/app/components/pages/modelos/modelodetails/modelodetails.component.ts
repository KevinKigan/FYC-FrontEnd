import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CochesService} from '../../../services/coches.service';
import {Coche} from '../../../../models/coche';
import {TipoMotor} from '../../../../models/tipoMotor';
import {ModalService} from '../../../services/modal.service';

@Component({
  selector: 'app-modelodetails',
  templateUrl: './modelodetails.component.html',
  styleUrls: ['./modelodetails.component.scss']
})
export class ModelodetailsComponent implements OnInit {

  loading: boolean = true;
  coches: Coche[] = [];
  selectedCoche: Coche;
  tiposMotores: TipoMotor[] = [];

  constructor(private modalService: ModalService,private cochesService: CochesService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.loading = true;
      let idModelo = +params.get('idModelo');
      this.cochesService.getCochesPorModelo(idModelo).subscribe(response => {
        this.coches = response;
        this.coches.sort((a, b) => {
          if (a.caryear > b.caryear) {
            return -1;
          } else {
            return 1;
          }
        });
        this.cochesService.getTiposMotor(this.coches.map(coche => coche.tipoMotor.idTipoMotor)).subscribe((response) => {
          this.tiposMotores = response['tipos_motores'];
          this.loading = false;
        });
      });
    });
  }


  openModal(coche: Coche) {
    this.selectedCoche = coche;
    this.modalService.openModal();
  }
}
