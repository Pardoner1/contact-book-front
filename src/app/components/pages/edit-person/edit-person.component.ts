import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/interfaces/Person';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { MessagesService } from 'src/app/services/messages.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css'],
})
export class EditPersonComponent {
  person!: Person;
  btnTextContact: string = '+contato';
  btnTextPerson: string = 'Enviar';

  constructor(
    private apiService: ApiServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private messagesService: MessagesService
  ) {}

  ngOnInit(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));

    this.apiService.getPerson(id).subscribe((item) => {
      this.person = item;
    });
  }

  async editHandler(person: Person) {
    try {
      await this.apiService.updatePerson(person).pipe(first()).toPromise();

      this.messagesService.add(`Contato atualizado com sucesso!`);

      this.router.navigate(['/']);
    } catch (error) {
      this.messagesService.add(`Ocorreu um erro ao atualizar o contato!`);
      console.error('Ocorreu um erro ao atualizar o contato:', error);
    }
  }
}
