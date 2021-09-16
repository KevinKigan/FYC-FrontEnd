import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConocemeService {

  constructor() { }

  private header: string = 'Hola amante de la automoción,'

  private _intro: string = 'Me gustaría darte la bienvenida a mi página Find Your Car. Me llamo Kevin y esta página web esta hecha ' +
    'como parte de mi educación y aprendizaje en la Universidad de Alcalá. Gracias a esta enseñanza, puedo mostrar mis tres grandes pasiones, siendo éstas ' +
    'la informatica, la creación de nuevos preyectos y desafios, sean de cualquier ámbito ya que me encanta "crear", y todo aquello relacionado con el mundo ' +
    'del motor o automovilismo.';
  private _intro2: string = 'Esta página está tanto orientada al público general como a aquellos apasionados de los coches, dando apoyo y facilitando la obtención ' +
    'de información a cualquier persona que lo necesite. En FYC podrás encontrar un coche que se adapte a tus necesidades y tus gustos, ver aquellos modelos ' +
    'que se asemejan a aquel que tengas en mente para poder compararlos, que sientas que tu elección es la más acertada para ti y tener la posibilidad de ' +
    'comunicarte con otras personas que puedan darte consejos en el caso de tener el modelo u opinar al respecto';


  private _introWelcomeHome: string = 'Bienvenido a Find Your Car,';

  private _introHome: string = 'Aquí encontrarás una gran variedad de vehiculos para que que tengas la certeza de que el modelo que estás' +
    ' buscando es el ideal para ti. Podrás ver cuales son sus competidores más directos y asi poder compararlos con tu modelo preferente o perderte e investigar qué ' +
    'es lo que más te interes.'

  private _introHome2: string = 'Tendrás a tu disposición numerosos filtros para que, sea cual sea el aspecto que te interese, puedas encontrar el modelo que buscas, ya sean ' +
    'especificaciones del motor, consumos, emisiones y muchos otros. '



  getHeader():string{
    return this.header;
  }

  getIntro(): string {
    return this._intro;
  }
  getIntroHome(): string {
    return this._introHome;
  }

  getIntroHome2(): string {
    return this._introHome2;
  }
  getIntroWelcomeHome(): string {
    return this._introWelcomeHome;
  }

  getIntro2(): string {
    return this._intro2;
  }
}
