import { Injectable } from '@angular/core';
import { ConfigurationService } from '../../../services/configuration.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { EndpointBase } from '../../../services/endpoint-base.service';

import {  FoodCheckoutRequest, FoodOrderResponse, FoodCheckoutResponse, FoodVendorResponse } from '../models/fooddetails.models';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodEndpointService extends EndpointBase {

  checkoutURL() { return this.configuration.baseUrl + '/foodOrder/placeorder'; }
  foodOrderURL() { return this.configuration.baseUrl + '/foodOrder/getDayOrder'; }
  FoodVendorURL() { return this.configuration.baseUrl + '/foodOrder/vendorOrderDetails'; }

  constructor(private configuration: ConfigurationService, http: HttpClient, authService: AuthService) {
    super(http, authService);
  }

  checkoutFoodEndPoint(food: FoodCheckoutRequest): Observable<FoodCheckoutResponse> {
    const body = JSON.stringify(food);
    return this.http.post<FoodCheckoutResponse>(this.checkoutURL(), body, this.requestHeaders).pipe(
      catchError(error => {
        return this.handleError(error, () => this.checkoutFoodEndPoint(food));
      })
    );
  }

  getFoodOrderListEndPoint(formData: FormData): Observable<FoodOrderResponse> {
    return this.http.post<FoodOrderResponse>(this.foodOrderURL(), formData);
  }

  getFoodVEndorListEndPoint(formData: FormData): Observable<FoodVendorResponse>{
    return this.http.post<FoodVendorResponse>(this.FoodVendorURL(), formData);
  }

}
