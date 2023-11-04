import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,AbstractControl, ValidatorFn } from '@angular/forms';
import { FormControl,FormsModule,} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';
import { IonicModule } from '@ionic/angular';
import Cliente from 'src/app/interfaces/clases.interfaces';


@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.page.html',
  styleUrls: ['./registro-cliente.page.scss'],
})


export class RegistroClientePage implements OnInit {
  clienteForm: FormGroup;
  
  constructor(
    private toastController: ToastController,
    private router: Router,
    private firestoreService: FirestoreService,
    private formBuilder: FormBuilder)
    {
      this.clienteForm= new FormGroup({
        rut: new FormControl('',Validators.required),
        nombre: new FormControl('',Validators.required),
        apaterno: new FormControl('',Validators.required),
        amaterno:  new FormControl('',Validators.required),
        edad:  new FormControl('',Validators.required),
        direccion: new FormControl('',Validators.required),
        telefono:  new FormControl('',Validators.required),
        email:  new FormControl('',Validators.required),
        password:  new FormControl('',Validators.required),
      })
    }
    async clienteAgregadoExitosamente() {
      const toast = await this.toastController.create({
        message: 'Cliente agregado con éxito',
        duration: 3000,
        position: 'top',
        
      });
      
      toast.present();

      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 2000);

      console.log(this.clienteForm.value);
      await this.firestoreService.addCliente(this.clienteForm.value)
       
    }
    ngOnInit() {
     
      } 
   

}
