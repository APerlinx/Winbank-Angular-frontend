import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core'
import { ContactImageService } from 'src/app/services/contact-image.service'

@Component({
  selector: 'app-contact-image',
  templateUrl: './contact-image.component.html',
  styleUrls: ['./contact-image.component.scss'],
})
export class ContactImageComponent implements OnInit, OnChanges {
  @Input() name!: string
  @Input() size: number = 50
  initials = ''
  backgroundColor = ''

  constructor(private contactImageService: ContactImageService) {}

  ngOnInit(): void {
    this.updateImageDetails();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['name']) {
      this.updateImageDetails();
    }
  }

  updateImageDetails(): void {
    this.initials = this.contactImageService.getInitials(this.name)
    this.backgroundColor = this.contactImageService.getRandomColor()
  }
}
