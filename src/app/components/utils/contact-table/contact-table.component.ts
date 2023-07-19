import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Contact } from 'src/app/interfaces/Contact';

@Component({
  selector: 'app-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrls: ['./contact-table.component.css'],
})
export class ContactTableComponent {
  @Input() contacts!: Contact[];
  @Output() deleteContact: EventEmitter<number> = new EventEmitter<number>();

  handleClick(index: number): void {
    this.deleteContact.emit(index);
  }
}
