import { Component, OnInit, Inject, PLATFORM_ID, Renderer2, ElementRef, OnDestroy } from '@angular/core';
import { LanguageService } from './_services/language.service';
import { AnalyticsService } from './_services/analytics.service'
import { Meta, Title } from '@angular/platform-browser';
import { CountryService } from './_services/country.service'
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  language;

  $languageSubscriber: Subscription;

  constructor(private languageService: LanguageService, private meta: Meta,
    private title: Title, private analyticsService: AnalyticsService) {
    analyticsService.init();
  }

  ngOnInit(): void {
    this.addSeo();
    this.$languageSubscriber = this.languageService.getLanguage().subscribe(lan => {
      this.language = lan;
    });
  }

  addSeo() {
    this.meta.addTags([
      { name: 'description', content: 'Sending whatsapp message to unsaved number | שליחת הודעת וואטסאפ למספר לא שמור' },
      { name: 'robots', content: 'index, follow' },
      {
        name: 'keywords', content: 'WhatsApp, unsave, unsave whatsapp, sending whatsapp message to unsaved number, sending whatsapp to unsaved number, whatsapp to unsaved number, sending whatsapp, sending whatsapp to unsaved number, sending whatsapp message to unsaved number,' +
          'וואטסאפ, שליחת הודעת וואטסאפ למספר לא שמור, שליחת וואטסאפ למספר לא שמור, וואטסאפ למספר לא שמור, שליחת וואטסאפ, שליחת whatsapp למספר לא שמור, שליחת הודעת whatsapp למספר לא שמור'
      },
      { name: 'og:title', content: 'Sending whatsapp message to unsaved number | שליחת הודעת וואטסאפ למספר לא שמור' },
      { name: 'og:url', content: 'https://www.unsave.net/' },
      { name: 'og:description', content: 'Sending whatsapp message to unsaved number | שליחת הודעת וואטסאפ למספר לא שמור' },
      { name: 'og:image', content: '/assets/images/logo/logo-unsave.jpg' },

    ]);
    this.title.setTitle('Sending whatsapp message to unsaved number | שליחת הודעת וואטסאפ למספר לא שמור');
  }

  ngOnDestroy(): void {
    this.$languageSubscriber.unsubscribe();
  }

}
