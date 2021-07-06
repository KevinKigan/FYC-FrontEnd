import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './components/pages/home/home.component';
import {ModelosComponent} from './components/pages/modelos/modelos.component';
import {RedirectComponent} from './components/share/redirect/redirect.component';
import {MarcasComponent} from './components/pages/marcas/marcas.component';
import {ModeloEspecificoUserComponent} from './components/pages/modelos/modelo-especifico/user/modelo-especifico-user.component';
import {ConocemeComponent} from './components/pages/conoceme/conoceme.component';
import {LoginComponent} from './components/pages/credentials/login/login.component';
import {SignupComponent} from './components/pages/credentials/signup/signup.component';
import {UsuariosComponent} from './components/pages/usuarios/usuarios.component';
import {VerifyComponent} from './components/pages/credentials/verify/verify.component';
import {AuthGuard} from './components/guards/auth.guard';
import {UserdetailComponent} from './components/pages/usuarios/userdetail/userdetail.component';
import {MarcasdetailsComponent} from './components/pages/marcas/marcadetail/marcasdetails.component';
import {ModelodetailsComponent} from './components/pages/modelos/modelodetails/modelodetails.component';
// import {SignupComponent} from './components/pages/credentials/signup/signup.component';


const app_routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'sidebar', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'users', component: UsuariosComponent, canActivate: [AuthGuard, AuthGuard], data:{role:'ROLE_ADMIN'}},
  {path: 'modelo/:id', component: ModeloEspecificoUserComponent},
  {path: 'redirect/marca/:marca', component: RedirectComponent},
  {path: 'redirect/:pageSize/marca/:marca', component: RedirectComponent},
  {path: 'redirect/modeloespecifico/:modeloespecifico', component: RedirectComponent},
  {path: 'modelos', component: ModelosComponent},
  {path: 'marcas', component: MarcasComponent},
  {path: 'detalle_marcas', component: MarcasdetailsComponent},
  {path: 'modelos/:pageSize/page/:page', component: ModelosComponent},
  {path: 'modelos/:pageSize/marca/:marca/page/:page', component: ModelosComponent},
  {path: 'modelos/detalle_modelo/:idModelo', component: ModelodetailsComponent},
  {path: 'conoceme', component: ConocemeComponent},
];

@NgModule ({
  imports: [
    RouterModule.forRoot(app_routes, {useHash: true})
  ],
  exports: [
    RouterModule
  ]

})
export class AppRoutingModule{ }
