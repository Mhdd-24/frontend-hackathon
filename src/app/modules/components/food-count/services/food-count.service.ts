import { Injectable } from '@angular/core';
import { FoodEndpointService } from '../services/food-count-endpoint.service';

import { FoodCheckoutRequest, FoodOrderResponse, FoodCheckoutResponse, FoodVendorResponse } from '../models/fooddetails.models';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private foodEndPointService: FoodEndpointService) { }

  checkoutFood(foods: FoodCheckoutRequest): Observable<FoodCheckoutResponse> {
    return this.foodEndPointService.checkoutFoodEndPoint(foods).pipe<FoodCheckoutResponse>(map((res : FoodCheckoutResponse)  => {
      return res;
    }))
  }

  getFoodOrderList(formData: FormData) : Observable<FoodOrderResponse>{
    return this.foodEndPointService.getFoodOrderListEndPoint(formData).pipe<FoodOrderResponse>(map((res : FoodOrderResponse) => {
      console.log(res);
      return res;
    }))
  }

  getFoodVendorList(formData: FormData): Observable<FoodVendorResponse>{
    return this.foodEndPointService.getFoodVEndorListEndPoint(formData).pipe<FoodVendorResponse>(map((res : FoodVendorResponse) => {
      console.log(res);
      return res;
    }))
  }
}
