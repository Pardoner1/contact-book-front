import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from 'src/app/interfaces/Person';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  people?: Person[];

  constructor(
    private apiService: ApiServiceService,
    private router: Router,
    private messagesService: MessagesService
  ) {
    this.getPeople();
  }

  getPeople(): void {
    this.apiService.getAll().subscribe((people) => (this.people = people));
  }

  async deletePerson(person: Person) {
    await this.apiService.removePerson(person).subscribe();

    this.people = this.people?.filter((p) => p.id !== person.id);

    this.messagesService.add(`Contato excluído com sucesso!`);

    this.getPeople();
  }

  async editPerson(person: Person) {
    await this.apiService.updatePerson(person).subscribe();

    this.messagesService.add(`Contato atualizado com sucesso!`);

    this.router.navigate(['/']);
  }
}
