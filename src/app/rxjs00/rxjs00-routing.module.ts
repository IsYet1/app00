import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Rxjs00Component } from './rxjs00.component';

const routes: Routes = [{ path: '', component: Rxjs00Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Rxjs00RoutingModule { }
