import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
// tambien se puede utlizar los datos creando un objeto, en este caso form
// lleva los atributos rut y password para luego llamarlos desde otra page
  formlogin={
    rut:"",
    password:""
  }

  //rut: string="" se puede utilizar así  o con un formLogin
  //password: string=""

  constructor(private router:Router) { }

  ngOnInit() {
  }

  iniciarSesion()
  {

    //console.log("rut" + this.rut) para ver la variable (sin utilizar el form)
    //console.log("password" + this.password)
    console.log("password" + this.formlogin.rut)
    console.log("password" + this.formlogin.password)
    
    //se crea let para agrupar o seleccionar los datos que se usatan en otra page
    let datosEnviar : NavigationExtras = {
      queryParams : {rutUsuario:this.formlogin.rut,
      edad:24 }
    }
    //metodo navigate nos da la opcion de ir a otra page dentro del boton iniciar sesion
    // ademas de darnos la opcion de poder enviar los datos utilizando "let datosEnviar"
    // luego debes prepar la otra page para que reciba estos datos ej:home.page.ts

    this.router.navigate(['/home'], datosEnviar);


  }

}
