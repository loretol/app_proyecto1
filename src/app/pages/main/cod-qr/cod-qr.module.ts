import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';

import { CodQrPageRoutingModule } from './cod-qr-routing.module';
import { QRCodeModule } from 'angularx-qrcode';

import { CodQrPage } from './cod-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CodQrPageRoutingModule,
    SharedModule,
    QRCodeModule
  ],
  declarations: [CodQrPage]
})
export class CodQrPageModule {}
