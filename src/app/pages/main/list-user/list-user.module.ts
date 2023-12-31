import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListUserPageRoutingModule } from './list-user-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { ListUserPage } from './list-user.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListUserPageRoutingModule,
    SharedModule,
  ],
  declarations: [ListUserPage]
})
export class ListUserPageModule {}
