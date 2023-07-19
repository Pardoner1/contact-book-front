import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/interfaces/Contact';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent {
  @Input() btnText!: string;
  @Input() contactData: Contact | null = null;

  contactForm!: FormGroup;

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      type: new FormControl('telefone'),
      value: new FormControl('', [Validators.required]),
    });
  }

  get type() {
    return this.contactForm.get('type')!;
  }

  get value() {
    return this.contactForm.get('value')!;
  }

  @Output() sendContact: EventEmitter<Contact> = new EventEmitter<Contact>();

  submitContact(): void {
    if (this.contactForm.invalid) {
      return;
    }

    this.sendContact.emit(this.contactForm.value);
    this.contactForm.reset();
    this.contactForm.setValue({ type: 'telefone', value: '' });
    this.contactForm.untouched;
  }
}
