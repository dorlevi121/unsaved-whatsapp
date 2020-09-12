import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { AfterViewInit, Directive, ElementRef, Inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCountryFlags]'
})
export class CountryFlagDirective implements AfterViewInit {
  private readonly OFFSET = 127397;

  constructor(private el: ElementRef, private renderer: Renderer2, @Inject(PLATFORM_ID) private platformId: Object) {
    // renderer.addClass(el.nativeElement, 'country-flags');
  }

  ngAfterViewInit() {
    if(isPlatformBrowser(this.platformId)) {
      const select: any = this.el.nativeElement as HTMLSelectElement;
      for (let opt of select.options) {
        const flag = this.toFlag(opt.value);
        this.renderer.setAttribute(opt, 'data-before', flag);
        opt.innerHTML = `${opt.innerHTML} ${flag}`;
      }
    }

  }

  private toFlag(code: string) {
    const base = 127462 - 65;
    const cc = code.toUpperCase();
    const res = String.fromCodePoint(...cc.split('').map(c => base + c.charCodeAt(0)));
    return res;
  }
}
