import { Component, OnInit } from '@angular/core';
import { countries } from '../../../assets/CountryCodes.js'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LanguageService } from 'src/app/_services/language.service';
import * as texts from '../../../assets/all-texts';
import { AnalyticsService } from 'src/app/_services/analytics.service.js';
import { CookieService } from 'ngx-cookie-service';
declare let ga: Function;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  country;
  counries = [];
  formDetails: FormGroup;
  language: number;
  homeText = texts;
  isMobile: boolean = false;

  constructor(private languageService: LanguageService, private analyticsService: AnalyticsService,
    private cookieService: CookieService) {
    for (let index = 0; index < countries.length; index++) {
      this.counries[index] = {
        "name": countries[index].name,
        "code_phone": countries[index].dial_code,
        "code": countries[index].code,
        "image": 'https://www.countryflags.io/' + countries[index].code + '/shiny/32.png'
      }
    }
  }

  ngOnInit(): void {
    this.country = this.cookieService.get('country')
    this.formDetails = new FormGroup({
      'country': new FormControl(this.country ? this.country : '+972', Validators.required),
      'phone': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(9)]),
      'message': new FormControl(null)
    });

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(navigator.userAgent)) {
      this.isMobile = true;
    }

    this.languageService.getLanguage().subscribe(lan => {
      this.language = lan === 'heb' ? 0 : 1;
    });
  }

  onSubmit() {
    if (!this.formDetails.valid)
      return;
    const countryCode = this.counries.find(c => c.code === this.formDetails.value.country);

    const allNumberPhone = countryCode.code_phone + this.formDetails.value.phone
    let message = encodeURIComponent(this.formDetails.value.message)
    if (message === 'null') {
      window.open("https://wa.me/" + allNumberPhone.split(1));
    }
    else {
      window.open("https://wa.me/" + allNumberPhone.split(1) + "?text=" + message);
    }

    this.cookieService.set('country', countryCode);
    this.analyticsService.event('sendMessage', {
      eventCategory: 'send',
      eventValue: allNumberPhone,
      message: message
    })
  }

}
