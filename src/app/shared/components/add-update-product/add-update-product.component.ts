import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/products.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.scss'],
})
export class AddUpdateProductComponent implements OnInit {

  @Input() product: Product

  form = new FormGroup({
    id: new FormControl(''),
    image: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    price: new FormControl(null, [Validators.required, Validators.minLength(0)]),
    soldUnits: new FormControl(null, [Validators.required, Validators.minLength(0)]),

  })

  constructor(private router: Router,
    private firebaseService: FirebaseService, private utilservice: UtilsService) { }

  user = {} as User;




  ngOnInit() {
    this.user = this.utilservice.getFromLocalStorage('user');
    if (this.product) this.form.setValue(this.product);


  }
  //===== tomar o seleccionar una imagen=====

  async takeImage() {
    const dataUrl = (await this.utilservice.takePicture('imagen del producto')).dataUrl
    this.form.controls.image.setValue(dataUrl);

  }
  submit() {
    if (this.form.valid) {
      if (this.product) this.updateProduct();
      else this.createProduct();
    }
  }
  // ====== convertir valores de tipo string a number ======
  setNumberInput() {
    let { soldUnits, price } = this.form.controls;

    if (soldUnits.value) soldUnits.setValue(parseFloat(soldUnits.value));
    if (price.value) price.setValue(parseFloat(price.value));
  }



  // ======crear producto=====
  async createProduct() {
    let path = `users/${this.user.uid}/products`
    const loading = await this.utilservice.loading();
    await loading.present();

    // ======= subir la imagen y obtener la url=======

    let dataUrl = this.form.value.image;
    let imagepath = `${this.user.uid}/${Date.now()}`;
    let imageUrl = await this.firebaseService.uploadImage(imagepath, dataUrl);
    this.form.controls.image.setValue(imageUrl);

    delete this.form.value.id

    this.firebaseService.addDocument(path, this.form.value).then(async res => {

      this.utilservice.dismissModal({ success: true });
      
      this.firebaseService.singnUp(this.form.value as User)
      .then(async res => {
        await this.firebaseService.updateUser(this.form.value.name);

        let uid = res.user.uid;

      })
      

      this.utilservice.presentToast({
        message: 'Producto Agregado con Éxito ',
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

  //========== actualizar producto======
  async updateProduct() {
    let path = `users/${this.user.uid}/products/${this.product.id}`
    const loading = await this.utilservice.loading();
    await loading.present();

    // ======= cambio de imagen subir la nueva y obtener la url=======
    if (this.form.value.image !== this.product.image) {
      let dataUrl = this.form.value.image;
      let imagepath = await this.firebaseService.getFilepath(this.product.image);
      let imageUrl = await this.firebaseService.uploadImage(imagepath, dataUrl);
      this.form.controls.image.setValue(imageUrl);
    }

    delete this.form.value.id

    this.firebaseService.updateDocument(path, this.form.value).then(async res => {

      this.utilservice.dismissModal({ success: true });

      this.utilservice.presentToast({
        message: 'Producto Actualizado con Éxito ',
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

