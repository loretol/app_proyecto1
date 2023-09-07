import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  //se crea la variable emnsaje para guardar el dato 


mensaje: string="";
//se crea rutaActiva para recibir los datos
  constructor(private rutaActiva : ActivatedRoute) {
// este metodo se utliza para retornar la información
    this.rutaActiva.queryParams.subscribe(params =>{
      //luego se valida que la variable mensaje no venga vacio
      if(params['rutUsuario'])
      {
        this.mensaje= params['rutUsuario']
      }
    })
   }

  ngOnInit() {
  }

}
