// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

const dns = "http://localhost:8080";
// import {URL_BACKEND} from '../app/config/config';
//
// const dns = URL_BACKEND;

export const urlEndPoint                         = dns+"/api";
export const urlEndPointChart                    = urlEndPoint+"/coches/chart";
export const urlEndPointMarcas                   = urlEndPoint+"/modelos/marcas";
export const urlEndPointModelo                   = urlEndPoint+"/modelo/";
export const urlEndPointModelos                  = urlEndPoint+"/modelos/";
export const urlEndPointImgLogo                  = urlEndPoint+"/img/logo";
export const urlEndPointFiltrar                  = urlEndPoint+"/modelos/filtros";
export const urlEndPointConsumo                  = urlEndPoint+"/coches/consumo";
export const urlEndPointUploadImg                = urlEndPoint+"/modelos/imagen";
export const urlEndPointCochesPage               = urlEndPoint+"/coches/page/";
export const urlEndPointCarrocerias              = urlEndPoint+"/carrocerias";
export const urlEndPointModelosPage              = urlEndPoint+"/modelos/page/";
export const urlEndPointImgMarcaLogo             = urlEndPoint+"/img/marcaslogo/";
export const urlEndPointImgModeloLogo            = urlEndPoint+"/img/modeloslogo";
export const urlEndPointPreciosPagina            = urlEndPoint+"/modelos/precios";
export const urlEndPointImgPropietario           = urlEndPoint+"/img/propietario";
export const urlEndPointChartSemejantes          = urlEndPoint+"/coches/chartsemejantes";
export const urlEndPointMotorCombustion          = urlEndPoint+"/coches/motorescombustion";
export const urlEndPointCochesPorModelo          = urlEndPoint+"/coches/modelo/";
export const urlEndPointModelosPorMarcaPage      = urlEndPoint+"/modelospormarca/";


export const urlEndPointUsuarios      = urlEndPoint+"/user";
export const urlEndPointUsuariosIndex = urlEndPointUsuarios+'/index/';
export const urlEndPointUsuariosCreate = urlEndPointUsuarios+'/create';


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
