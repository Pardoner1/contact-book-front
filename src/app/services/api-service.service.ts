import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../interfaces/Person';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  private baseApiUrl = 'https://contact-book-api-6f6e02dfcada.herokuapp.com/';
  // private baseApiUrl = (environment as any).baseApiUrl;
  private apiUrl = `${this.baseApiUrl}api/people`;

  constructor(private http: HttpClient) {}

  getPerson(person: Person): Observable<Person> {
    const url = `${this.apiUrl}/${person.id}`;
    return this.http.get<Person>(url);
  }

  getAll(): Observable<Person[]> {
    return this.http.get<Person[]>(this.apiUrl);
  }

  createPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.apiUrl, JSON.stringify(person));
  }

  updatePerson(person: Person): Observable<Person> {
    const url = `${this.apiUrl}/${person.id}`;
    return this.http.patch<Person>(url, JSON.stringify(person));
  }

  removePerson(person: Person) {
    const url = `${this.apiUrl}/${person.id}`;
    return this.http.delete(url);
  }
}
