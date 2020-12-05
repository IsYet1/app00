import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

import { Rxjs00RoutingModule } from './rxjs00-routing.module';
import { Rxjs00Component } from './rxjs00.component';

@NgModule({
  declarations: [Rxjs00Component],
  imports: [
    CommonModule,
    MatButtonModule,
    Rxjs00RoutingModule
  ]
})
export class Rxjs00Module { }
