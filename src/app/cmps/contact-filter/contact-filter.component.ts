import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { FilterBy } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
    selector: 'contact-filter',
    templateUrl: './contact-filter.component.html',
    styleUrls: ['./contact-filter.component.scss']
})
export class ContactFilterComponent implements OnInit, OnDestroy {

    constructor(private contactService: ContactService) { }
    private router = inject(Router)

    filterBy!: FilterBy
    filterBySubject$ = new Subject()
    destroySubject$ = new Subject()
    @ViewChild('searchInput') searchInputRef!: ElementRef;

    ngOnInit(): void {
        this.contactService.filterBy$
            .pipe(takeUntil(this.destroySubject$))
            .subscribe(filterBy => {
                this.filterBy = filterBy
            })

        this.filterBySubject$
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                takeUntil(this.destroySubject$)
            )
            .subscribe(x => {
                this.contactService.setFilter(this.filterBy)
            })
    }

    onSetFilterBy(value: string) {
        this.filterBySubject$.next(value)
        this.removeFocus();
        if (value) {
            this.router.navigate(['/contact'])
        }
    }
    removeFocus(): void {
        this.searchInputRef.nativeElement.blur();
      }

    ngOnDestroy(): void {
        this.destroySubject$.next(null)
        this.destroySubject$.unsubscribe()
    }

}
