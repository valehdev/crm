import {Injectable} from '@angular/core';
import {ContentType} from "@angular/http/src/enums";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {CookieService} from "ngx-cookie-service";
import {CommonDataService} from "../shared/common-data/common-data.service";
import 'rxjs/Rx';


@Injectable()
export class AuthService {

  token = null;
  redirectUrl: string;

  readonly ADMIN = '1';
  readonly NORMAL = '2';

  errors = {
    "200": "Success",
    "301": "Place does not allow this track",
    "302": "Place blocked this artist",
    "303": "Already done",
    "401": "User is not logged in. Unauthenticated",
    "402": "Unknown error",
    "403": "Your activity in this place has suspended.",
    "405": "Wrong request. Something is missing in request. Wrong request fields",
    "406": "Email is already registered",
    "407": "Credentials incorrect",
    "408": "Email is not confirmed",
    "409": "No such data",
    "410": "Already exists",
    "411": "Limit is reached",
    "412": "Password and confirm password are different",
    "413": "Not current music",
    "414": "Place is offline"
  }

  constructor(
      private _http: Http,
      private _cookieService: CookieService,
      private _commonData: CommonDataService
  ) {}

  /**
   * Authentication
   */

  public login(user) {

    let url = this._commonData.getServerUrl() + 'login';
    let body = JSON.stringify(user);

    return this._http.post(url, body).map(
      result => result.json()
    );

  }

  public logout() {

    let url = this._commonData.getServerUrl() + 'logout';
    let body = this.getPostCredentials();

    return this._http.post(url, JSON.stringify(body)).map(
      result => result.json()
    );

  }

  public changePassword() {

    let url = this._commonData.getServerUrl() + 'updateUser';
    let body = this.getPostCredentials();

    return this._http.post(url, body).map(
      result => result.json()
    );

  }

  public getUserStatus() {

    if (this._cookieService.get('user_status') == this.ADMIN) {
      return 'admin';
    } else if (this._cookieService.get('user_status') == this.NORMAL) {
      return 'normal';
    }

  }

  public isLoggedIn(): Boolean {
    return this._cookieService.get('api_token') != null;
  }

  public getUserId() {
    return this._cookieService.get('user_id');
  }

  public getToken() {
    return this._cookieService.get('api_token')
  }

  public getPostCredentials() {

    return {
      api_token: this.getCookie('api_token'),
      user_id: this.getCookie('user_id')
    };

  }

  public getGetCredentials(): String {
    return 'user_id/' + this.getUserId() + '/api_token/' + this.getToken();
  }

  public setCookie(key, value) {
    return this._cookieService.set(key, value);
  }

  public getCookie(key) {
    return this._cookieService.get(key);
  }

  public clearAllCookies() {
    this._cookieService.deleteAll();
  }



  public getError(code): String {
    return this.errors[code]
  }

  public checkError(code): Boolean {
    return code == "200";
  }

}
