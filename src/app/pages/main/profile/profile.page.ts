import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/products.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private router: Router,
    private firebaseService: FirebaseService, private utilservice: UtilsService) { }

  ngOnInit() {
  }
  user(): User {
    return this.utilservice.getFromLocalStorage('user');
  }

  //======= tomar o seleccionar una foto de perfil =========

  async takeImage() {
    let user = this.user();
    let path = `users/${user.uid}`

    const dataUrl = (await this.utilservice.takePicture('imagen de perfil')).dataUrl
    
    const loading = await this.utilservice.loading();
    await loading.present();

    let imagepath = `${user.uid}/profile`;
    user.image = await this.firebaseService.uploadImage(imagepath, dataUrl);

    this.firebaseService.updateDocument(path, {image: user.image}).then(async res => {

      this.utilservice.saveInLocalStorage('user', user)

      this.utilservice.presentToast({
        message: 'Imagen actualizada exitosamente ',
        duration: 2500,
        color: 'success',
        position: 'middle',
        icon: 'checkmark-circle-outline'
      })
    })
      .catch(error => {
        console.log(error);
        this.utilservice.presentToast({
          message: error.message,
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        })

      }).finally(() => {
        loading.dismiss();
      })
    

  }

}
