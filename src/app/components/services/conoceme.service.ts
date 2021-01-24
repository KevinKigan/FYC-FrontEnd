import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConocemeService {

  constructor() { }

  private header: string = 'hola ' +
    'adios'

  getHeader():string{
    return this.header;
  }
}
