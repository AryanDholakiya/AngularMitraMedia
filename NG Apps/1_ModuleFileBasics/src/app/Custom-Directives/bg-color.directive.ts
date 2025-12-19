import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[specialDirective]',
  standalone: false,
})
export class BgColorDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    //we just inject like this and use it
    setTimeout(() => {
      this.renderer.setStyle(
        this.el.nativeElement,
        'transition',
        'all 0.6s ease'
      );
    }, 2000);
  }

  @HostListener('mouseenter')
  OnMouseEnter() {
    // this.el.nativeElement.style.color = 'yellow'; // mostly we use this.
    this.renderer.setStyle(this.el.nativeElement, 'color', 'yellow');
    this.renderer.setStyle(this.el.nativeElement, 'background-color', 'green');

    this.el.nativeElement.innerHTML = 'Cames from Custom-Directive';

    setTimeout(() => {
      this.el.nativeElement.innerHTML = 'Reactive Form';
    }, 1500);
  }

  @HostListener('mouseleave')
  OnMouseLeave() {
    this.renderer.removeStyle(this.el.nativeElement, 'color');
    this.renderer.removeStyle(this.el.nativeElement, 'background-color');
  }
}
