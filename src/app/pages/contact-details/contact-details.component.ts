import { Component, OnDestroy, OnInit, inject } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import {
  Observable,
  Subscription,
  catchError,
  lastValueFrom,
  map,
  switchMap,
} from 'rxjs'
import { Contact } from 'src/app/models/contact.model'
import { User } from 'src/app/models/user.model'
import { ContactService } from 'src/app/services/contact.service'
import { UserService } from 'src/app/services/user.service'
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms'
import { Move } from 'src/app/models/move.model'
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit, OnDestroy {
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private contactService = inject(ContactService)
  private userService = inject(UserService)
  public loaderService = inject(LoaderService)
  subscription!: Subscription
  loggedInUser: User | null = null
  transactionForm!: FormGroup

  contact$!: Observable<Contact>
  contact!: Contact

  constructor(private fb: FormBuilder) {
    this.transactionForm = this.fb.group({
      amount: [
        '',
        [
          Validators.required,
          Validators.min(0),
          this.noSpecialChars,
          this.validateBalance.bind(this),
        ],
      ],
    })
  }

  ngOnInit(): void {
    // this.loaderService.setIsLoading(false)
    
    this.contact$ = this.route.data.pipe(map((data) => data['contact']))
    this.subscription = this.contact$.subscribe((contact) => {
      this.contact = contact
    })
    this.loggedInUser = this.userService.getUser()
  }

  onSend() {
    const amount = parseFloat(this.transactionForm.get('amount')?.value);

    if (!amount || !this.contact._id) return

    const move: Move = {
      toId: this.contact._id,
      to: this.contact.name,
      at: new Date(),
      amount: +amount,
    }

    this.userService.addMove(move)
    this.transactionForm.reset()
  }

  validateBalance(control: AbstractControl): ValidationErrors | null {
    const amount = control.value

    if (this.loggedInUser && amount > this.loggedInUser.balance) {
      return { insufficientBalance: true }
    }
    return null
  }

  validateNumber(control: AbstractControl): ValidationErrors | null {
    if (isNaN(control.value)) {
      return { notANumber: true }
    }
    return null
  }

  noSpecialChars(control: AbstractControl): { [key: string]: boolean } | null {
    if (!control.value) return null
    const regex = /^[a-zA-Z0-9]*$/
    const valid = regex.test(control.value)
    return valid ? null : { specialChars: true }
  }

  hasTransactionsWithContact(): boolean {
    if (!this.loggedInUser?.moves) return false;
    return this.loggedInUser.moves.some(move => move.toId === this.contact._id);
  }
  

  navigateBack() {
    this.router.navigateByUrl('/contact')
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
}
