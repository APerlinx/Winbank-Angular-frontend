import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
    selector: 'contact-index',
    templateUrl: './contact-index.component.html',
    styleUrls: ['./contact-index.component.scss']
})
export class ContactIndexComponent implements OnInit, OnDestroy {

    constructor(private contactService: ContactService) { }
    subscription!: Subscription
    // contacts: Contact[] | null = null
    contacts$!: Observable<Contact[]>
    private router = inject(Router)

    ngOnInit(): void {
        this.contacts$ = this.contactService.contacts$
        // this.subscription = this.contactService.contacts$.subscribe(contacts => {
        //     this.contacts = contacts
        // })
    }

    onRemoveContact(contactId: string) {
        this.contactService.deleteContact(contactId).subscribe({
            error: err => console.log('err:', err)
        })
    }

    ngOnDestroy(): void {
        // this.subscription.unsubscribe()
    }

    isContactsRouteActive(): boolean {
        return this.router.url === '/contact'
     }

}
