// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

const dns = "http://localhost:8080";

export const urlEndPoint = dns+"/api";
export const urlEndPointMarcas = urlEndPoint+"/coches/marcas";
export const urlEndPointImgLogo = urlEndPoint+"/img/logo";
export const urlEndPointImgMarcaLogo = urlEndPoint+"/img/marcaslogo/";
export const urlEndPointCochesPage = urlEndPoint+"/coches/page/";
export const urlEndPointModelosPage = urlEndPoint+"/coches/modelos/page/";
export const urlEndPointActualizarItemsPorPagina = urlEndPoint+"/coches/elementsforpage";

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
