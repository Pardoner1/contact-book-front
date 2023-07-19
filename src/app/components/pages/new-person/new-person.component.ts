import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from 'src/app/interfaces/Person';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { MessagesService } from 'src/app/services/messages.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-new-person',
  templateUrl: './new-person.component.html',
  styleUrls: ['./new-person.component.css'],
})
export class NewPersonComponent {
  btnTextContact: string = '+contato';
  btnTextPerson: string = 'Enviar';

  constructor(
    private apiService: ApiServiceService,
    private router: Router,
    private messagesService: MessagesService
  ) {}

  async createHandler(person: Person) {
    try {
      await this.apiService.createPerson(person).pipe(first()).toPromise();

      this.messagesService.add(`Contato adicionado com sucesso!`);

      this.router.navigate(['/']);
    } catch (error) {
      // Trate possíveis erros aqui, caso necessário.
      this.messagesService.add(`Ocorreu um erro ao salvar o contato!`);
      console.error('Ocorreu um erro ao atualizar o contato:', error);
    }
  }
}
