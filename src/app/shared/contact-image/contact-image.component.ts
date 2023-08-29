// contact-image.component.ts
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-image',
  templateUrl: './contact-image.component.html',
  styleUrls: ['./contact-image.component.scss']
})
export class ContactImageComponent implements OnInit {

  @Input() name!: string;
  initials = '';
  backgroundColor = '';

  ngOnInit(): void {
    this.initials = this.getInitials(this.name);
    this.backgroundColor = this.getRandomColor();
  }

  getInitials(name: string): string {
    let names = name.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  }

  getRandomColor(): string {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}
