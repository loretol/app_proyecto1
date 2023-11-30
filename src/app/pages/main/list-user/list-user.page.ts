import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Comentario } from 'src/app/models/cometario.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateComentarioComponent } from 'src/app/shared/components/add-update-comentario/add-update-comentario.component';


@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.page.html',
  styleUrls: ['./list-user.page.scss'],
})
export class ListUserPage implements OnInit {
  

data: any[] =[];

 
  constructor(private firebaseService: FirebaseService, private utilservice: UtilsService) {}

  async addUpdateComentario(comentario?: Comentario) {
    let succes = await this.utilservice.presentModal({
      component: AddUpdateComentarioComponent,
      cssClass: 'add-update-modal',
      componentProps: { comentario }

    })
    if (succes) this.getComentarios();

  }
  
  
  ionViewWillEnter() {
    this.getComentarios();
  }

doRefresh(event) {
  setTimeout(() => {
    this.getComentarios();
    event.target.complete();
  }, 1000);
}

ngOnInit() {
  
}

getComentarios() {
  this.firebaseService.getData().subscribe(data =>{
    this.data = data;
    console.log(this.data)
  })
  
}













}


 


  

