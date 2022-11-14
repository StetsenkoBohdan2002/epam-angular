import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})
export class ClickedOutsideDirective {
  @Output() clickOutside: EventEmitter<boolean> = new EventEmitter<boolean>();
  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    if (!this.elemRef.nativeElement.contains(event.target)) {
      this.clickOutside.emit(false);
    }
  }

  constructor(private elemRef: ElementRef, private renderer: Renderer2) {}
}
