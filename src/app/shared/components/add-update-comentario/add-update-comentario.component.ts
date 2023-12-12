import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Comentario } from 'src/app/models/cometario.model';


import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-update-comentario',
  templateUrl: './add-update-comentario.component.html',
  styleUrls: ['./add-update-comentario.component.scss'],
})
export class AddUpdateComentarioComponent implements OnInit {

  comentario: any;
  

  form = new FormGroup({
    
    nombre: new FormControl('', [Validators.required, Validators.minLength(4)]),
    apellido: new FormControl('', [Validators.required, Validators.minLength(4)]),
    coment: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  constructor(
    private router: Router,
    private firebaseService: FirebaseService,
    private utilservice: UtilsService
  ) {}

  ngOnInit() {
    // Si hay un comentario, inicializa el formulario con los valores del comentario
   
    }
    submit() {
      if (this.form.valid) {
         this.agregarComentario();
      }
    }

   agregarComentario() {
      if (this.form.valid) {
        
        const nuevoComentario: Comentario = {
          
          nombre: this.form.value.nombre,
          apellido: this.form.value.apellido,
          coment:this.form.value.coment,
        };
    
        this.firebaseService.postData(nuevoComentario).subscribe(
          (response) => {
            console.log('Comentario agregado exitosamente', response);
            
            this.utilservice.routerLink('/main/home');
            this.utilservice.presentToast({
              message: 'comentario Agregado con Éxito ',
              duration: 2500,
              color: 'success',
              position: 'middle',
              icon: 'checkmark-circle-outline'
            })
            this.form.reset();
          },
          (error) => {
            this.utilservice.presentToast({
              message:'error al agregar comentario',
              duration: 2500,
              color: 'primary',
              position: 'middle',
              icon: 'alert-circle-outline'
            })
          }
        );
      }
      


      
    }
  
 

}

 

