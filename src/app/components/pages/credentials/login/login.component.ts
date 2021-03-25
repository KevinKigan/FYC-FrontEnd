import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../credentials.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  entrar() {

  }

  forgottenPassword() {
    document.getElementById("formularioLogin").style.display="none";
    document.getElementById("forgotten").style.display="block";
  }

  irAlogin() {
    document.getElementById("formularioLogin").style.display="block";
    document.getElementById("forgotten").style.display="none";
  }
}
