import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  constructor(private router: Router,
    private firebaseService: FirebaseService,
    private toastController: ToastController,private utilservice:UtilsService) { }

  ngOnInit() {
  }

  async submit() {
    if (this.form.valid){

      const loading = await this.utilservice.loading();
      await loading.present();

      this.firebaseService.sendRecoveryEmail(this.form.value.email)
      .then(res =>{

        this.utilservice.presentToast({
          message:'Correo Enviado con Exito',
          duration: 1500,
          color: 'primary',
          position: 'middle',
          icon:'mail-outline'

        })
        this.utilservice.routerLink('/auth');
        this.form.reset();
        
      
      })
      .catch(error =>{console.log(error);
        this.utilservice.presentToast({
          message:error.message,
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon:'alert-circle-outline'

        });
        
      
      }).finally(()=>{
        loading.dismiss();
      })
    }   
  }


  

}
