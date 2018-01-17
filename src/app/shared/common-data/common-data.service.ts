import { Injectable } from '@angular/core';

@Injectable()
export class CommonDataService {

  private api_url = "";

  constructor() { }

  public getServerUrl(): String {
    return this.api_url;
  }

}
