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

export const urlEndPoint                    = dns+"/api";
export const urlEndPointCoches              = urlEndPoint+"/coches/";
export const urlEndPointModelos             = urlEndPoint+"/modelos/";

export const urlChart                       = urlEndPointCoches+"chart";
export const urlVolumen                     = urlEndPointCoches+"volumen/";
export const urlConsumo                     = urlEndPointCoches+"consumo/";
export const urlTipoMotor                   = urlEndPointCoches+"tipo_motor/";
export const urlEmisiones                   = urlEndPointCoches+"emisiones/";
export const urlCochesPage                  = urlEndPointCoches+"page/";
export const urlCochesSave                  = urlEndPointCoches+"save";
export const urlListConsumo                 = urlEndPointCoches+"consumo";
export const urlCombustibles                = urlEndPointCoches+"tipos_combustibles";
export const urlTiposMotores                = urlEndPointCoches+"tipos_motores";
export const urlPreciosPagina               = urlEndPointCoches+"precios";
export const urlMotorElectrico              = urlEndPointCoches+"electrico/";
export const urlChartSemejantes             = urlEndPointCoches+"chartsemejantes";
export const urlMotorCombustion             = urlEndPointCoches+"combustion/";
export const urlCochesPorModelo             = urlEndPointCoches+"modelo/";
export const urlMotoresCombustion           = urlEndPointCoches+"motorescombustion";
export const urlNormativasConsumos          = urlEndPointCoches+"normativas_consumos";

export const urlMarcas                      = urlEndPointModelos+"marcas";
export const urlSaveMarca                   = urlEndPointModelos+"save_marca";
export const urlUploadImg                   = urlEndPointModelos+"imagen";
export const urlCarrocerias                 = urlEndPointModelos+"carrocerias";
export const urlModelosPage                 = urlEndPointModelos+"page/";
export const urlCarroceriasPorModelo        = urlEndPointModelos+"carrocerias_por_modelo";



export const urlImg                         = urlEndPoint+'/img';
export const urlImgUpload                   = urlImg+"/upload/";
export const urlImgPropietario              = urlImg+"/propietario";
export const urlImgModeloLogo               = urlImg+"/modeloslogo";
export const urlImgUser                     = urlImg+"/getUserImage/";
export const urlImgMarcaLogo                = urlImg+"/marcaslogo/";


export const urlEndPointUsuarios            = urlEndPoint+"/user/";
export const urlUsuariosMyUser              = urlEndPointUsuarios+"username/";
export const urlUsuariosIndex               = urlEndPointUsuarios+'index/';
export const urlUsuariosCreate              = urlEndPointUsuarios+'create';
export const urlUsuariosSetRoles            = urlEndPointUsuarios+'set_roles/';
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
