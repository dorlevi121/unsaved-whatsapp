import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LanguageService } from './_services/language.service';
import { CountryFlagDirective } from './_directives/country-flag.directive';
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';
import { environment } from 'src/environments/environment';
import { AdsenseModule } from 'ng2-adsense';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    CountryFlagDirective
  ],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'unsaved-whatsapp'
    }),
    NgxGoogleAnalyticsModule.forRoot(environment.analytics),
    AdsenseModule.forRoot({
      adClient: 'ca-pub-' + environment.adsense,
      adSlot: 7259870550,
    }),
    ReactiveFormsModule
  ],
  providers: [
    LanguageService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
