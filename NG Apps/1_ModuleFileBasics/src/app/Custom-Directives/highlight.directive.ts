import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[Highlight]',
  standalone: false,
})
export class HighlightDirective {
  constructor() {}
  @Input() myCustomColor = '';

  private el = inject(ElementRef);
  private renderer = inject(Renderer2); //Recommended

  @HostListener('mouseenter')
  OnMouseEnter() {
    this.el.nativeElement.style.color = 'DodgerBlue';

    //Recommended
    // this.renderer.setStyle(this.el.nativeElement, 'color', 'DodgerBlue'); // or we can do like this also.
  }

  @HostListener('mouseleave')
  OnMouseLeave() {
    this.el.nativeElement.style.color = 'Black';

    //Recommended
    //this.renderer.removeStyle(this.el.nativeElement, 'color'); //NOTE:removeStyle ma third attribute na aave
  }

  @HostListener('click')
  OnClick() {
    this.el.nativeElement.style.color = this.myCustomColor;
  }
}
