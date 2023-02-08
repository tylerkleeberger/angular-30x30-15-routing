import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ContactDetailsComponent } from "../contact-details/contact-details.component";
import { ContactListComponent } from "../contact-list/contact-list.component";

const contactsRoutes: Routes = [
    { path: 'contacts', component: ContactListComponent, data: { animation: 'contacts' } },
    { path: 'contact/:id', component: ContactDetailsComponent, data: { animation: 'contact' } }
];

@NgModule({
    imports: [
        RouterModule.forChild(contactsRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ContactsRoutingModule { }