import { Directive, ElementRef,  HostListener, Input } from '@angular/core';


@Directive({
  selector: '[appMiDirectivaColor]'
})
export class MiDirectivaColorDirective {
  constructor(private el: ElementRef) {}

  @Input() defaultColor = '';

  @Input() appMiDirectivaColor = '';

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.appMiDirectivaColor || this.defaultColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

}