import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({name: 'safeHtml'})
export class SafeHtml implements PipeTransform {
  constructor(private sanitizer:DomSanitizer){}

  transform(html) {
    return this.sanitizer.bypassSecurityTrustStyle(html);
    // return this.sanitizer.bypassSecurityTrustHtml(style);
    // return this.sanitizer.bypassSecurityTrustScript(value);
    // return this.sanitizer.bypassSecurityTrustUrl(value);
    // return this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }
}