import { Component, OnInit } from '@angular/core';
import { FoodDetailsResponse } from '../models/food-count.models';
import { FoodService } from '../services/food-count.service';

@Component({
  selector: 'app-fooddetails',
  templateUrl: './fooddetails.component.html',
  styleUrl: './fooddetails.component.scss'
})
export class FooddetailsComponent implements OnInit  {
  loading: boolean = true;
  foods: FoodDetailsResponse[] = [];

  constructor(private foodService: FoodService) { }ngOnInit(): void {
    this.loading = true;
    this.foodService.getFoodMenu().subscribe({
      next: (foods: FoodDetailsResponse[] | FoodDetailsResponse) => {
        if (Array.isArray(foods)) {
          this.foods = foods;
        } else {
          this.foods = [foods];
        }
        console.log(this.foods);
        this.loading = false;
      },
      error: (error: any) => {
        console.log(error);
        this.loading = false;
      }
    });
  }



}
