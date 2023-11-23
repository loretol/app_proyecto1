import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])

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

      this.firebaseService.signIn(this.form.value as User)
      .then(res =>{

        this.getUserInfo(res.user.uid);
      
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


  async getUserInfo(uid: string) {
    if (this.form.valid){

      const loading = await this.utilservice.loading();
      await loading.present();

      let path = `users/${uid}`;
      


      this.firebaseService.getDocument(path).then( async (user: User) =>{

        this.utilservice.saveInLocalStorage('user',user)
        this.utilservice.routerLink('/main/home');
        this.form.reset();

        this.utilservice.presentToast({
          message:`Bienvenido ${user.name}`,
          duration: 2500,
          color: 'secondary',
          position: 'middle',
          icon:'happy-outline'

        })
       
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
