import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/interfaces/Contact';
import { Person } from 'src/app/interfaces/Person';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css'],
})
export class PersonFormComponent {
  @Output() onSubmit = new EventEmitter<Person>();
  @Input() btnText!: string;
  @Input() btnTextPerson!: string;
  @Input() personData: Person | null = null;
  contatos: Contact[] = [];
  contactInvalid: boolean;
  payloadData?: Person;

  personForm!: FormGroup;

  constructor() {
    if (this.contatos.length < 1) {
      this.contactInvalid = true;
    } else {
      this.contactInvalid = false;
    }
  }

  ngOnInit(): void {
    this.personForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
  }

  get name() {
    return this.personForm.get('name')!;
  }

  addContact(contato: Contact): void {
    this.contatos.push(contato);
  }

  removeContact(index: number): void {
    this.contatos.splice(index, 1);
  }

  submitPerson() {
    if (this.name.value.length < 2) {
      return;
    }

    if (this.contatos.length < 1) {
      this.contactInvalid = true;
      return;
    } else {
      this.contactInvalid = false;
    }

    this.payloadData = {
      name: this.personForm.value.name,
      contacts: this.contatos,
    };

    this.onSubmit.emit(this.payloadData);
    this.personForm.reset();
    this.contactInvalid = true;
    this.contatos = [];
  }
}
