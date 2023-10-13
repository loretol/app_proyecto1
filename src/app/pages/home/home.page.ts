import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  //se crea la variable emnsaje para guardar el dato 


mensaje: string="";
//se crea rutaActiva para recibir los datos
  constructor(private rutaActiva : ActivatedRoute,private storage: Storage) {
// este metodo se utliza para retornar la información
    this.rutaActiva.queryParams.subscribe(params =>{
      //luego se valida que la variable mensaje no venga vacio
      if(params['correoUsuario'])
      {
        this.mensaje= params['correoUsuario']
      }
    })
   }

  ngOnInit() { 
  }
//se llama la información que se guardo en el storage con el metodo get 
  async verStorage(){
    let nombre= await this.storage.get("nombreUsuario");
    console.log("el nombre guardado es "+ nombre)
  }

}
