import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotFounPageRoutingModule } from './not-foun-routing.module';

import { NotFounPage } from './not-foun.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotFounPageRoutingModule
  ],
  declarations: [NotFounPage]
})
export class NotFounPageModule {}
