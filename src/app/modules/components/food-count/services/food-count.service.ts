import { Injectable } from '@angular/core';
import { FoodEndpointService } from '../services/food-count-endpoint.service';
import { Observable, map } from 'rxjs';
import { Food, FoodSaveResponse, FoodDetailsResponse } from '../models/food-count.models';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private foodEndPointService: FoodEndpointService) { }

  saveFood(food: Food): Observable<FoodSaveResponse> {
    return this.foodEndPointService.saveFood(food).pipe<FoodSaveResponse>(map(res => {
      return res;
    }))
  }

  getFoodMenu(): Observable<FoodDetailsResponse> {
    return this.foodEndPointService.getFoodMenu().pipe<FoodDetailsResponse>(map(res => {
      return res;
    }))
  }
}
