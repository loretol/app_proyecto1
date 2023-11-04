import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingOpPage } from './sing-op.page';

const routes: Routes = [
  {
    path: '',
    component: SingOpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingOpPageRoutingModule {}
