import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy
} from '@angular/core'
import { Contact } from 'src/app/models/contact.model'

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactListComponent {
  @Input() contacts: Contact[] | null = null
  @Output() remove = new EventEmitter<string>()
}
