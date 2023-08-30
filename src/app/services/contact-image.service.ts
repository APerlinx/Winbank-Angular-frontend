import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactImageService {
  private colorMap: Map<string, string> = new Map();

  constructor() { }

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

  getColorForName(name: string): string {
    if (!this.colorMap.has(name)) {
      const color = this.getRandomColor();
      this.colorMap.set(name, color);
    }
    return this.colorMap.get(name) as string;
  }

}
