import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './components/pages/home/home.component';
import {ModelosComponent} from './components/pages/modelos/modelos.component';
import {RedirectComponent} from './components/share/redirect/redirect.component';


const app_routes: Routes = [
  {path: '#', component: HomeComponent},
  {path: '#/', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'redirect', component: RedirectComponent},
  {path: 'modelos', component: ModelosComponent},
  {path: 'modelos/page/:page', component: ModelosComponent},
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
