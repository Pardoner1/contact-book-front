import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from 'src/app/interfaces/Person';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-new-person',
  templateUrl: './new-person.component.html',
  styleUrls: ['./new-person.component.css'],
})
export class NewPersonComponent {
  showModal: boolean = false;
  btnTextContact: string = '+contato';
  btnTextPerson: string = 'Enviar';

  constructor(
    private apiService: ApiServiceService,
    private router: Router,
    private messagesService: MessagesService
  ) {}

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  async createHandler(person: Person) {
    await this.apiService.createPerson(person).subscribe();

    this.messagesService.add(`Contato adicionado com sucesso!`);

    this.router.navigate(['/']);
  }
}
