import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Contact } from '../contact';
import { ContactService } from '../contacts.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
  // @Input() contact?: Contact;

  contact$!: Observable<Contact>

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private router: Router,
    private location: Location,
  ) { }

  ngOnInit() {
    this.contact$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.contactService.getContact(params.get('id')!))
    );
  }
 
  // getContact(): void{
  //   const id = Number(this.route.snapshot.paramMap.get('id'));
  //   this.contactService.getContact(id).subscribe(contact => this.contact = contact);
  // }

  gotoContacts(contact: Contact) {
    const contactId = contact ? contact.id : null; //pas along the contact id if available = selects item//
    this.router.navigate(['/contacts', {id: contactId}]);
    
  }

  // save(): void {
  //   if (this.contact) {
  //     this.contactService.updateContact(this.contact)
  //       .subscribe(() => this.goBack());
  //   }
  // }

}
