// ---------------------------------------
// Email: quickapp@ebenmonney.com
// Templates: www.ebenmonney.com/templates
// (c) 2023 www.ebenmonney.com/mit-license
// ---------------------------------------

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { LocalStoreManager } from './local-store-manager.service';
import { DBkeys } from './db-keys';
import { LoginResponse } from '../models/login-response.model';
import { ConfigurationService } from './configuration.service';
import { Observable } from 'rxjs';
import { UserLoginResponse } from '../login/types/login-response.model';

@Injectable()
export class OidcHelperService {
  private readonly clientId = 'quickapp_spa';
  private readonly scope = 'openid email phone profile offline_access roles';

  private readonly tokenEndpoint = '/connect/token';

  get loginUrl() { return this.configurationService.baseUrl + '/event/login'; }
  get signUpUrl() { return this.configurationService.baseUrl + '/event/signup'; }

  protected get requestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json, text/plain, */*'
    });

    return { headers };
  }

  constructor(
    private http: HttpClient,
    private localStorage: LocalStoreManager, private configurationService: ConfigurationService) {

  }

  loginWithPassword(userName: string, password: string): Observable<UserLoginResponse> {
    const body = { email: userName, password: password, username: 'null' }
    return this.http.post<UserLoginResponse>(this.loginUrl, JSON.stringify(body), this.requestHeaders);
  }

  signupWithPassword(userName: string, password: string): Observable<UserLoginResponse> {
    const body = { email: userName, password: password, username: 'null' }
    return this.http.post<UserLoginResponse>(this.signUpUrl, JSON.stringify(body), this.requestHeaders);
  }

  refreshLogin() {
    const header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const params = new HttpParams()
      .append('refresh_token', this.refreshToken ?? '')
      .append('client_id', this.clientId)
      .append('grant_type', 'refresh_token');

    return this.http.post<LoginResponse>(this.tokenEndpoint, params, { headers: header });
  }

  get accessToken(): string | null {
    return this.localStorage.getData(DBkeys.ACCESS_TOKEN);
  }

  get accessTokenExpiryDate(): Date | null {
    return this.localStorage.getDataObject<Date>(DBkeys.TOKEN_EXPIRES_IN, true);
  }

  get refreshToken(): string | null {
    return this.localStorage.getData(DBkeys.REFRESH_TOKEN);
  }

  get isSessionExpired(): boolean {
    if (this.accessTokenExpiryDate == null) {
      return true;
    }

    return this.accessTokenExpiryDate.valueOf() <= new Date().valueOf();
  }
}
