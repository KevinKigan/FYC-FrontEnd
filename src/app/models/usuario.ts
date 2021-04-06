export class Usuario {
  id:number;
  username:string='';
  password:string='';
  email:string='';
  image:string;
  enabled: boolean = true;
  verified: boolean = false;
  registrationDate: string;
  roles: string[] = [];
}
