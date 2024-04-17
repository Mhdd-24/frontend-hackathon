import { Injectable } from '@angular/core';
import { ConfigurationService } from '../../../services/configuration.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { EndpointBase } from '../../../services/endpoint-base.service';
import { Observable, catchError } from 'rxjs';
import { Food, FoodSaveResponse, FoodDetailsResponse } from '../models/food-count.models';

@Injectable({
  providedIn: 'root'
})
export class FoodEndpointService extends EndpointBase {

  get saveFoodURL() { return this.configuration.baseUrl + '/food'; }
  get getFoodMenuURL() { return this.configuration.baseUrl + '/food-menu'; }

  constructor(private configuration: ConfigurationService, http: HttpClient, authService: AuthService) {
    super(http, authService);
  }

  saveFood(food: Food): Observable<FoodSaveResponse> {
    return this.http.post<FoodSaveResponse>(this.saveFoodURL, JSON.stringify(food), this.requestHeaders).pipe(
      catchError(error => {
        return this.handleError(error, () => this.saveFood(food));
      })
    );
  }

  getFoodMenu(): Observable<FoodDetailsResponse> {
    return this.http.get<FoodDetailsResponse>(this.getFoodMenuURL, this.requestHeaders).pipe(
      catchError(error => {
        return this.handleError(error, () => this.getFoodMenu());
      })
    );
  }
}
