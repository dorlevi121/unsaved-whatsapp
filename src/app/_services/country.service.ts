import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  country: string;
  countrySubject: Subject<string>;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.countrySubject = new Subject<string>();
   }

  setCountry() {
    if (this.cookieService.get('country')) {
      this.country = this.cookieService.get('country');
      this.countrySubject.next(this.country);
    }
    else {
      this.http.get(')https://ipinfo.io?token=c7c08455aec30f').toPromise()
        .then((data: any) => {
          this.country = data.country;
          this.countrySubject.next(this.country);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  setCookiesCountry(country: string) {
    this.cookieService.set('country', country);
  }
}
