import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from 'src/app/interfaces/Person';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { MessagesService } from 'src/app/services/messages.service';
import { first } from 'rxjs/operators';

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
    try {
      await this.apiService.removePerson(person).pipe(first()).toPromise();

      this.people = this.people?.filter((p) => p.id !== person.id);

      this.messagesService.add(`Contato excluído com sucesso!`);

      this.people = this.people?.filter((p) => p.id !== person.id);

      // this.getPeople();
    } catch (error) {
      this.messagesService.add(`Ocorreu um erro ao excluir o contato!`);
      console.error('Ocorreu um erro ao excluir o contato:', error);
    }
  }

  editPerson(person: Person) {
    const id = person.id;
    this.router.navigate([`/person/edit/${id}`]);
  }
}
