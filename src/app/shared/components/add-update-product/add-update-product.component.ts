import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.scss'],
})
export class AddUpdateProductComponent  implements OnInit {

  form = new FormGroup({
    id:new FormControl(''),
    image: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    price: new FormControl('', [Validators.required, Validators.minLength(0)]),
    soldUnits: new FormControl('', [Validators.required, Validators.minLength(0)]),

  })

  constructor(private router: Router,
    private firebaseService: FirebaseService,private utilservice:UtilsService) { }

    user = {} as User;




  ngOnInit() {
  this.user = this.utilservice.getFromLocalStorage('user');

  }
  //===== tomar o seleccionar una imagen=====

  async takeImage(){
    const dataUrl = (await this.utilservice.takePicture('imagen del producto')).dataUrl
    this.form.controls.image.setValue(dataUrl);

  }

  async submit() {
    if (this.form.valid){

      let path = `users/${this.user.uid}/products`

      const loading = await this.utilservice.loading();
      await loading.present();

      // ======= subir la imagen y obtener la url=======
      let dataUrl = this.form.value.image;
      let imagepath = `${this.user.uid}/${Date.now()}`;
      let imageUrl = await this.firebaseService.uploadImage(imagepath, dataUrl);
      this.form.controls.image.setValue(imageUrl);
      delete this.form.value.id

      this.firebaseService.addDocument(path,this.form.value).then(async res=>{

        this.utilservice.dismissModal({ success :true});

        this.utilservice.presentToast({
          message:'producto creado exitosamente',
          duration: 2500,
          color: 'success',
          position: 'middle',
          icon:'checkmark-circle-outline'
        })

        

      })


      this.firebaseService.singnUp(this.form.value as User)
      .then( async res =>{
        await this.firebaseService.updateUser(this.form.value.name);

        let uid = res.user.uid;
        
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


  
}
