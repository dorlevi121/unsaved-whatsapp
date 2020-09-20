import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { countries } from '../../../assets/CountryCodes.js'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LanguageService } from 'src/app/_services/language.service';
import * as texts from '../../../assets/all-texts';
import { AnalyticsService } from 'src/app/_services/analytics.service.js';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  country;
  counries = [];
  formDetails: FormGroup;
  language: number;
  homeText = texts;
  isMobile: boolean = false;
  hrefLink: string;

  @ViewChild("link", { read: ElementRef }) link: ElementRef;

  $language: Subscription;

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

    this.$language = this.languageService.getLanguage().subscribe(lan => {
      this.language = lan === 'heb' ? 0 : 1;
    });

    this.formDetails.valueChanges.subscribe(val => {

      if (this.formDetails.valid && this.formDetails.value.phone.length > 9) {
        this.link.nativeElement.href = '';
        const countryCode = this.counries.find(c => c.code === this.formDetails.value.country);

        const allNumberPhone = countryCode.code_phone + this.formDetails.value.phone;
        allNumberPhone.match(/\d/g).join("");

        let message = encodeURIComponent(this.formDetails.value.message)
        if (message === 'null') {
          this.link.nativeElement.href = "https://wa.me/" + allNumberPhone;
          this.link.nativeElement.target = "_blank"
          this.hrefLink = "https://wa.me/" + allNumberPhone;
        }
        else {
          this.link.nativeElement.href = "https://wa.me/" + allNumberPhone + "?text=" + message;
          this.link.nativeElement.target = "_blank"
          this.hrefLink = "https://wa.me/" + allNumberPhone + "?text=" + message;
        }
      }
      else {
        this.link.nativeElement.href = "javascript:void(0);"
        this.link.nativeElement.target = ""
      }

      console.log(this.link.nativeElement.href);

    })
  }

  onSubmit() {
    if (!this.formDetails.valid)
      return;

    const countryCode = this.counries.find(c => c.code === this.formDetails.value.country);

    const allNumberPhone = countryCode.code_phone + this.formDetails.value.phone
    let message = encodeURIComponent(this.formDetails.value.message)
    // if (message === 'null') {
    //   window.open("https://wa.me/" + allNumberPhone.split(1));
    // }
    // else {
    //   window.open("https://wa.me/" + allNumberPhone.split(1) + "?text=" + message);
    // }

    this.cookieService.set('country', this.formDetails.value.country);
    this.analyticsService.event('sendMessage', {
      eventCategory: 'click on send btn',
      eventValue: allNumberPhone,
      message: message
    })
  }

  ngOnDestroy(): void {
    this.$language.unsubscribe();
  }

}
