import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateProductComponent } from 'src/app/shared/components/add-update-product/add-update-product.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private firebaseService: FirebaseService, 
    private utilSrevice: UtilsService) { }

  ngOnInit() {
  }
  //==== Cerrar sesion======
  singOut() {
    this.firebaseService.signOut();
  }

  //==== actualizar o agregar un producto===

  addUpdateProduct(){
    this.utilSrevice.presentModal({
      component: AddUpdateProductComponent,
      cssClass:'add-update-modal'

    })

  }




}
