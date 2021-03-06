export const environment = {
  production: true
};

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// const dns = "http://localhost:8080";
import {URL_BACKEND} from '../app/config/config';

const dns = URL_BACKEND;

export const urlEndPoint                    = dns+"/api";
export const urlEndPointCoches              = urlEndPoint+"/coches/";
export const urlEndPointModelos             = urlEndPoint+"/modelos/";
export const urlChart                       = urlEndPointCoches+"chart";
export const urlMarcas                      = urlEndPointModelos+"marcas";
export const urlConsumo                     = urlEndPointCoches+"consumo";
export const urlUploadImg                   = urlEndPointModelos+"imagen";
export const urlCochesPage                  = urlEndPointCoches+"page/";
export const urlCarrocerias                 = urlEndPointModelos+"carrocerias";
export const urlModelosPage                 = urlEndPointModelos+"page/";
export const urlPreciosPagina               = urlEndPointCoches+"precios";
export const urlChartSemejantes             = urlEndPointCoches+"chartsemejantes";
export const urlMotorCombustion             = urlEndPointCoches+"motorescombustion";
export const urlCochesPorModelo             = urlEndPointCoches+"modelo/";


export const urlImg                         = urlEndPoint+'/img';
export const urlImgUpload                   = urlImg+"/upload";
export const urlImgPropietario              = urlImg+"/propietario";
export const urlImgModeloLogo               = urlImg+"/modeloslogo";
export const urlImgUser                     = urlImg+"/getUserImage/";
export const urlImgMarcaLogo                = urlImg+"/marcaslogo/";


export const urlEndPointUsuarios            = urlEndPoint+"/user/";
export const urlUsuariosMyUser              = urlEndPointUsuarios+"username/";
export const urlUsuariosIndex               = urlEndPointUsuarios+'index/';
export const urlUsuariosCreate              = urlEndPointUsuarios+'create';
export const urlUsuariosSendVerificateCode  = urlEndPointUsuarios+'send_verification_code/';
export const urlUsuariosCheckVerificateCode = urlEndPointUsuarios+'check_verification_code/';

export const urlLogin = dns + '/oauth/token';
export const credentials = 'findyourcarapp' +':' + 'pJZbsWpVjyDwfKj';
export const nouser = 'https://dl.dropboxusercontent.com/s/wc73isc87220p2c/nouser.png?dl=0'


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
