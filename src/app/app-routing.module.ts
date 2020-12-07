import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './components/pages/home/home.component';


const app_routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'home/direccion1', component: HomeComponent},
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