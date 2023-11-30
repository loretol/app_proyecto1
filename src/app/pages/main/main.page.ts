import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor(private router: Router,private firebaseService: FirebaseService,
    private utilservice: UtilsService) { }

  pages = [
    {title:'Inicio', url: '/main/home', icon: 'home-outline'},
    {title:'Perfil', url: '/main/profile', icon: 'person-outline'},
    {title:'Ubicación', url: '/main/location', icon: 'location-outline'},
    {title:'Codigo QR', url: '/main/cod-qr', icon: 'qr-code-outline'},
    {title:'Comentarios', url: '/main/list-user', icon: 'document-text-outline'},
  ]
  currentPath: string = '';

  ngOnInit() {
    this.router.events.subscribe((event:any)=> {
      if(event?.url) this.currentPath= event.url;
    })
  }

   //==== Cerrar sesion======
   singOut() {
    this.firebaseService.signOut();
  }
  user(): User {
    return this.utilservice.getFromLocalStorage('user');
  }



}
