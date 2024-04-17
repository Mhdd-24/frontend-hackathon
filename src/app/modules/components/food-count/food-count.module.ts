import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodCountRoutingModule } from './food-count-routing.module';
import { FoodMenuComponent } from './foodmenu/foodmenu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgprimeModule } from '../../shared/ngprime/ngprime.module';
import { FooddetailsComponent } from './fooddetails/fooddetails.component';


@NgModule({
  declarations: [
    FoodMenuComponent,
    FooddetailsComponent
  ],
  imports: [
    CommonModule,
    FoodCountRoutingModule,
    NgprimeModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FoodCountModule { }
