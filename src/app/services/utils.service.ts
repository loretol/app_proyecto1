import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private loadingcontroller: LoadingController,
    private toastController: ToastController, private router: Router) { }


  //====== Loading======
  loading() {
    return this.loadingcontroller.create({ spinner: 'bubbles' })

  }
  //====== Toast======
  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastController.create(opts);
    toast.present();

  }
  //====== Enruta a cualquier pag disponible======
  routerLink(url: string) {
    return this.router.navigateByUrl(url);

  }
  //====== guardar un elemento de local storage======
  saveInLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value))

  }
  //====== obterner un elemento de local storage======
  getFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key))

  }

}