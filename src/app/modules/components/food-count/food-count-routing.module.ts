import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodMenuComponent } from "../food-count/foodmenu/foodmenu.component";
import { FooddetailsComponent } from './fooddetails/fooddetails.component';

const routes: Routes = [
  { path: 'food-count', component: FoodMenuComponent },
  { path: 'foodDetails', component:FooddetailsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodCountRoutingModule { }
