import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private language: BehaviorSubject<'heb' | 'eng'>;
  currentLanguage: 'heb' | 'eng';

  constructor(private cookieService: CookieService) {
    const cookiesLanguage = this.cookieService.get('language');
    if (cookiesLanguage === 'heb' || cookiesLanguage === 'eng') {
      this.language = new BehaviorSubject<'heb' | 'eng'>(cookiesLanguage);
    }
    else {
      this.language = new BehaviorSubject<'heb' | 'eng'>('eng');
    }
  }

  setLanguage(language: 'heb' | 'eng') {
    this.currentLanguage = language;
    this.language.next(language);
  }

  getLanguage(): Observable<'heb' | 'eng'> {
    return this.language;
  }
}
