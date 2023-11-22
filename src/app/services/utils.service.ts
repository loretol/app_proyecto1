import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AlertOptions, LoadingController, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private loadingcontroller: LoadingController,
    private toastController: ToastController,
    private router: Router,
    private modalControler: ModalController,
    private alertCtrl: AlertController
    ) { }


    

async takePicture (promptLabelHeader: string){
  return await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.DataUrl,
    source: CameraSource.Prompt,
    promptLabelHeader,
    promptLabelPhoto: 'Selecciona una imagen',
    promptLabelPicture: 'Toma una foto'
  });

  
};
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

  //===== Modal =======
  async presentModal(opts: ModalOptions) {
    const modal = await this.modalControler.create(opts);
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) return data;

  }
  dismissModal(data?: any) {
    return this.modalControler.dismiss(data)
  }

// ======= alerta =========
 async presentAlert(opts?: AlertOptions) {
  const alert = await this.alertCtrl.create(opts);
 
  await alert.present();
 }


}