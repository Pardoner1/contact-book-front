import { Component, OnInit } from '@angular/core';
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
export class NewPersonComponent implements OnInit {
  btnTextContact: string = '+contato';
  btnTextPerson: string = 'Enviar';
  isLoading: boolean = false;

  constructor(
    private apiService: ApiServiceService,
    private router: Router,
    private messagesService: MessagesService
  ) {
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.isLoading = false;
  }

  async createHandler(person: Person) {
    this.isLoading = true;
    try {
      await this.apiService.createPerson(person).pipe(first()).toPromise();

      this.isLoading = false;

      this.messagesService.add(`Contato adicionado com sucesso!`);

      this.router.navigate(['/']);
    } catch (error) {
      this.isLoading = false;
      this.messagesService.add(`Ocorreu um erro ao salvar o contato!`);
      console.error('Ocorreu um erro ao atualizar o contato:', error);
    }
  }
}
