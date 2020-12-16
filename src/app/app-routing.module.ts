import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './components/pages/home/home.component';
import {ModelosComponent} from './components/pages/modelos/modelos.component';
import {RedirectComponent} from './components/share/redirect/redirect.component';
import {MarcasComponent} from './components/pages/marcas/marcas.component';


const app_routes: Routes = [
  {path: '#', component: HomeComponent},
  {path: '#/', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'redirect/marca/:marca', component: RedirectComponent},
  {path: 'modelos', component: ModelosComponent},
  {path: 'marcas', component: MarcasComponent},
  {path: 'modelos/page/:page', component: ModelosComponent},
  {path: 'modelos/marca/:marca/page/:page', component: ModelosComponent},
  {path: 'home/direccion2', component: HomeComponent},
  {path: 'home/direccion3', component: HomeComponent},
  {path: 'home/direccion4', component: HomeComponent},
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
