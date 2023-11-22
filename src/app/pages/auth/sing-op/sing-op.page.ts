import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-sing-op',
  templateUrl: './sing-op.page.html',
  styleUrls: ['./sing-op.page.scss'],
})
export class SingOpPage implements OnInit {

  form = new FormGroup({
    uid:new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)])

  })

  constructor(private router: Router,
    private firebaseService: FirebaseService,private utilservice:UtilsService) { }

  ngOnInit() {
  }

  async submit() {
    if (this.form.valid){

      const loading = await this.utilservice.loading();
      await loading.present();

      this.firebaseService.singnUp(this.form.value as User)
      .then( async res =>{
        await this.firebaseService.updateUser(this.form.value.name);

        let uid = res.user.uid;
        this.form.controls.uid.setValue(uid);
        this.setUserInfo(uid);
        

       
      
      })
      .catch(error =>{console.log(error);
        this.utilservice.presentToast({
          message:error.message,
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon:'alert-circle-outline'

        })
      
      }).finally(()=>{
        loading.dismiss();
      })
    }   
  }


  async setUserInfo(uid: string) {
    if (this.form.valid){

      const loading = await this.utilservice.loading();
      await loading.present();

      let path = `users/${uid}`;
      delete this.form.value.password;


      this.firebaseService.setDocument(path, this.form.value)
      .then( async res =>{


        //this.utilservice.saveInLocalStorage('user', this.form.value)
        this.utilservice.routerLink('/main/home');
        this.form.reset();
       
      
      })
      .catch(error =>{console.log(error);
        this.utilservice.presentToast({
          message:'error en el guardado de storage',
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon:'alert-circle-outline'

        })
      
      }).finally(()=>{
        loading.dismiss();
      })
    }   
  }

}
