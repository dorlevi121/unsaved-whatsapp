import { Injectable } from '@angular/core';
import { id } from '../../environments/analytics'

declare var ga: Function;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor() { }

  public event(eventName: string, params: {}) {
    console.log(ga('event', eventName, params));
  }

  public init(){
    ga('set', 'page', 'home page');
    ga('send', 'pageview');
  }

}
