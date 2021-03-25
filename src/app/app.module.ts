import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/share/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { FooterComponent } from './components/share/footer/footer.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {MatPaginatorModule} from "@angular/material/paginator";
import { ModelosComponent } from './components/pages/modelos/modelos.component';
import { PaginatorComponent } from './components/share/paginator/paginator.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {GoogleMapsModule} from '@angular/google-maps';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RedirectComponent } from './components/share/redirect/redirect.component';
import { MarcasComponent } from './components/pages/marcas/marcas.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { SidebarComponent } from './components/pages/modelos/sidebar/sidebar.component';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {MatSliderModule} from '@angular/material/slider';
import {LoadingComponent} from './components/share/loading/loading.component';
import { ModeloEspecificoComponent } from './components/pages/modelos/modelo-especifico/modelo-especifico.component';
import { ConocemeComponent } from './components/pages/conoceme/conoceme.component';
import { LoginComponent } from './components/pages/credentials/login/login.component';
import { SignupComponent } from './components/pages/credentials/signup/signup.component';
import { UsuariosComponent } from './components/pages/usuarios/usuarios.component';
import { VerifyComponent } from './components/pages/credentials/verify/verify.component';
import { ForgottenPasswordComponent } from './components/pages/credentials/forgotten-password/forgotten-password.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ModelosComponent,
    PaginatorComponent,
    RedirectComponent,
    MarcasComponent,
    SidebarComponent,
    LoadingComponent,
    ModeloEspecificoComponent,
    ConocemeComponent,
    LoginComponent,
    SignupComponent,
    UsuariosComponent,
    VerifyComponent,
    ForgottenPasswordComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    MatPaginatorModule,
    MatSelectModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatInputModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    PerfectScrollbarModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    PerfectScrollbarModule,
    MatSliderModule,
    GoogleMapsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
