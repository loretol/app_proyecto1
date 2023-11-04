import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingOpPageRoutingModule } from './sing-op-routing.module';

import { SingOpPage } from './sing-op.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingOpPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [SingOpPage]
})
export class SingOpPageModule {}
