import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/_services/language.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  language: boolean = true;

  constructor(private languageService: LanguageService) { }

  ngOnInit(): void {
    this.languageService.getLanguage().subscribe(lan => {
      this.language = lan === 'heb' ? false : true;
    })
  }

}
