import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFounPage } from './not-foun.page';

const routes: Routes = [
  {
    path: '',
    component: NotFounPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotFounPageRoutingModule {}
