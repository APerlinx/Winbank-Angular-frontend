import { Component, OnInit, inject } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { filter, map } from 'rxjs'
import { Contact } from 'src/app/models/contact.model'
import { ContactService } from 'src/app/services/contact.service'
import { FormGroup, Validators,FormBuilder } from '@angular/forms'

@Component({
  selector: 'contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss'],
})
export class ContactEditComponent implements OnInit {
  private contactService = inject(ContactService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  contactForm!: FormGroup

  title: string = 'Add Contact'

  // contact: Partial<Contact> = this.contactService.getEmptyContact()
  contact = this.contactService.getEmptyContact() as Contact

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required], []],
      email: ['', [Validators.required], []],
      phone: ['', [Validators.required], []],
    })
  }

  ngOnInit(): void {

    this.route.data
      .pipe(
        map((data) => data['contact']),
        filter((contact) => !!contact)
      )
      .subscribe((contact) => {
        this.contact = contact

        if (this.contact._id) {
          this.title = 'Edit Contact'
          this.contactForm.patchValue({
            name: this.contact.name,
            email: this.contact.email,
            phone: this.contact.phone,
          })
        }
      })

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.title = 'Edit Contact'
      } else {
        this.title = 'Add Contact'
      }
    })
  }

  onSaveContact() {    
    if (this.contactForm.valid) {
      this.contact = { ...this.contact, ...this.contactForm.value }

      this.contactService.saveContact(this.contact).subscribe({
        next: () => this.router.navigateByUrl('/contact'),
        error: (err) => {
          console.error('Error saving contact:', err)
        },
      })
    } else {
      Object.keys(this.contactForm.controls).forEach((key) => {
        const control = this.contactForm.get(key)
        if (control) {
          control.markAsTouched()
        }
      })
      console.warn('Form is not valid!')
    }
  }

  navigateBack(): void {
    this.contact._id
      ? this.router.navigateByUrl(`contact/${this.contact._id}`)
      : this.router.navigateByUrl(`contact`)
  }
}
