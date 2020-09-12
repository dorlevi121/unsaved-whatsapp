import { Injectable } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { id } from '../../environments/analytics'

declare var ga: Function;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private $gaService: GoogleAnalyticsService) { }

  public event(eventName: string, params: any) {
    console.log(ga('event', eventName, params));
    this.$gaService.event(eventName, params.eventCategory, params.eventValue, params.message);
  }

  public init() {
    ga('set', 'page', 'home page');
    ga('send', 'pageview');
  }

}
