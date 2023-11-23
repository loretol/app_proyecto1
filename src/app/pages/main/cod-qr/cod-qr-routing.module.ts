import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodQrPage } from './cod-qr.page';

const routes: Routes = [
  {
    path: '',
    component: CodQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodQrPageRoutingModule {}
