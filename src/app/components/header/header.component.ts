import { Component, OnInit } from '@angular/core';
import * as texts from '../../../assets/all-texts';

import { LanguageService } from 'src/app/_services/language.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  headerText = texts;
  language: number;

  constructor(private languageService: LanguageService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.languageService.getLanguage().subscribe(lan => {
      this.language = lan === 'heb' ? 0 : 1;
    })
  }

  setLanguage(language: 'heb' | 'eng') {
    this.languageService.setLanguage(language);
    this.cookieService.set( 'language', language );
  }

}
