import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

declare var gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor() { }

  public event(eventName: string, params: {}) {
    console.log(gtag('event', eventName, params));

  }

  public init() {
    try {

      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = 'https://www.googletagmanager.com/gtag/js?id=' + environment.analytics;
      document.head.appendChild(script1);

      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '` + environment.analytics + `', {'send_page_view': false});
      `;
      document.head.appendChild(script2);
    } catch (ex) {
      console.error('Error appending google analytics');
      console.error(ex);
    }
  }

}
