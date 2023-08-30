import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[evStop]'
})
export class EvStopDirective {

    constructor() { }

    @HostListener('click', ['$event'])
    onClick(ev: MouseEvent) {
        ev.stopPropagation()
    }

}
