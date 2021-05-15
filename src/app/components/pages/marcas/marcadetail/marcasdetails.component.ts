import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {MdbTableDirective} from 'angular-bootstrap-md';
import {Marca} from '../../../../models/marca';
import {CochesService} from '../../../services/coches.service';
import {ModalService} from '../../../services/modal.service';

@Component({
  selector: 'app-marcadetail',
  templateUrl: './marcasdetails.component.html',
  styleUrls: ['./marcasdetails.component.scss']
})
export class MarcasdetailsComponent implements OnInit {
  @ViewChild(MdbTableDirective, {static: true}) mdbTable: MdbTableDirective;
  marcas: Marca[];
  selectedMarca: Marca;
  imagenes = new Map<number, string>();
  loading: boolean;
  value = '';
  searchText: string = '';
  previous: string;

  constructor(private cochesService:CochesService, private modalService: ModalService) {
  }

  @HostListener('input') oninput() {
    this.searchItems();
  }

  ngOnInit() {
    this.iniciar();
  }

  iniciar() {
    this.loading = true;
    this.cochesService.getMarcas().subscribe(response => {
      this.cochesService.getUrlMarca(-1).subscribe(urls => {
        this.imagenes = urls;
        this.loading = false;
      });
      this.marcas = response as Marca[];
      this.mdbTable.setDataSource(this.marcas);
      this.previous = this.mdbTable.getDataSource();
    });
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.marcas = this.mdbTable.getDataSource();
    }
    if (this.searchText) {
      this.marcas = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }

  eliminarMarca(marca: Marca) {

  }

  openModal(marca: Marca) {
    this.selectedMarca = marca;
    this.modalService.openModal();
  }

  getUrlMarca(idMarca: number) {
    if(this.imagenes[idMarca]==undefined){
      return 'https://dl.dropboxusercontent.com/s/1m5yy8wwpexgfyh/defaultImageMarca.png?dl=0';
    }else {
      return this.imagenes[idMarca];
    }
  }

  /**
   * Metodo para actualizar la imagen de la marca en el listado
   * mediante el emitter de marca-especifica.ts
   * @param map
   */
  actualizarImagen(map: Map<string,string>) {
    this.imagenes[map.get('id')] = map.get('image');
  }
}

