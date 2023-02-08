import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Contact } from './contact';
import { MessagesService } from '../messages.service';
import { CONTACTS } from './contacts/mock-contacts';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  model = 'contacts';
  
  //get list: returns one item
  getContacts(): Observable<Contact[]> {
    // this.messageService.add('ContactSerice: fetched Contacts');
    // return of(CONTACTS);


    return this.http.get<Contact[]>(this.getUrl())
    .pipe(tap(_ => this.log('fetched contacts')),
    catchError(this.handleError<Contact[]>('getContacts', []))
   );
  }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      //send error to remote login infrastructure (must set up separately)
      console.error(error);
      //transforms error for user consumption (create an error message)
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }


  //get by id
  getContact(id: number | string): Observable<Contact> {
    // return this.getContacts().pipe(
    //   map((contacts: Contact[]) => contacts.find(contact => contact.id === +id)!));
    
    
    const url = `${this.getUrl()}/${id}`;
    return this.http.get<Contact>(url).pipe(tap(_ => this.log(`fetched hero id=${id}`)),
    catchError(this.handleError<Contact>(`getContact id=${id}`)));
  }

  //Update contact on server -- PUT
  updateContact(contact: Contact): Observable<any> {
    return this.http.put(this.getUrlWithID(contact.id), contact, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${contact.id}`)),
      catchError(this.handleError<any>('updateContact'))
    );
  }

  //Add new contact on server -- POST
  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.getUrl(), contact, this.httpOptions)
    .pipe(tap((newContact: Contact) => this.log(`added contact with id=${newContact.id}`)),
    catchError(this.handleError<Contact>('addContact'))
    )
  }

  //Delete contact on server -- DELETE
  deleteContact(id: number): Observable<Contact> {
    const url = `${this.getUrl()}/${id}`;
    return this.http.delete<Contact>(url, this.httpOptions)
    .pipe(tap(_ => this.log(`deleted contact id=${id}`)),
    catchError(this.handleError<Contact>('deleteContact'))
    );
  }

  //Search Feature -- GET
  searchContacts(term: string): Observable<Contact[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Contact[]>(`${this.localHost}/?name_like=${term}`)
    .pipe(tap(x => x.length ? 
      this.log(`found contacts matching "${term}"`) :
      this.log(`no contacts matching "${term}"`)),
      catchError(this.handleError<Contact[]>('searchContacts', []))
    );
  }


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
  };

  // private contactsUrl = 'api/contacts';

  private getUrl() {
    return `${BASE_URL}/${this.model}`;
  }

  private getUrlWithID(id) {
    return `${this.getUrl()}/${id}`;
  }

  private localHost = 'http://localhost:3000/contacts'

  constructor(
    private http: HttpClient,
    private messageService: MessagesService) { }

  private log(message: string) {
    this.messageService.add(`ContactService: ${message}`);
  }
}
