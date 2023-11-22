import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateProductComponent } from 'src/app/shared/components/add-update-product/add-update-product.component';
import { User } from 'src/app/models/user.model';
import { Product } from 'src/app/models/products.model';
import { orderBy,where } from 'firebase/firestore';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private firebaseService: FirebaseService,
    private utilservice: UtilsService) { }



  products: Product[] = [];
  loading: boolean = false;



  ngOnInit() {
  }
 

  user(): User {
    return this.utilservice.getFromLocalStorage('user');
  }
  ionViewWillEnter() {
    this.getProducts();
  }

doRefresh(event) {
  setTimeout(() => {
    this.getProducts();
    event.target.complete();
  }, 1000);
}
//==== Obtener ganancias======
getProfits(){
  return  this.products.reduce((index, product) => index + product.price * product.soldUnits,0)
}

  //==== Obtener productos======
  getProducts() {
    let path = `users/${this.user().uid}/products`;

    this.loading = true;

    let query = [
      orderBy('soldUnits','desc')
    
    ]

    let sub = this.firebaseService.getCollectionData(path,query).subscribe({
      next: (res: any) => {
        console.log(res);
        this.products = res;

        this.loading = false;
        sub.unsubscribe();
      }
    })
  }

  //==== actualizar o agregar un producto===

  async addUpdateProduct(product?: Product) {
    let succes = await this.utilservice.presentModal({
      component: AddUpdateProductComponent,
      cssClass: 'add-update-modal',
      componentProps: { product }

    })
    if (succes) this.getProducts();

  }

  //===== Confirmar eliminacion del producto=======

  async confirmDeletProduct(product: Product) {
    this.utilservice.presentAlert({
      header: 'Eliminar Producto',
      message: '¿Quieres eliminar este producto?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',

        }, {
          text: 'Si, Eliminar',
          handler: () => {
            this.deleteProduct(product);
          }
        }
      ]
    });
  }




  //===== eliminar un documento =====////

  async deleteProduct(product: Product) {
    let path = `users/${this.user().uid}/products/${product.id}`
    const loading = await this.utilservice.loading();
    await loading.present();
    let imagepath = await this.firebaseService.getFilepath(product.image);
    await this.firebaseService.deleteFile(imagepath)



    this.firebaseService.deletDocument(path).then(async res => {

      this.products = this.products.filter(p => p.id !== product.id);

      this.utilservice.presentToast({
        message: 'producto Eliminado ',
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
