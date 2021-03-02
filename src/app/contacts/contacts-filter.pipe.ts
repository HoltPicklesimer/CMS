import { Contact } from './contact.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contactsFilter',
})
export class ContactsFilterPipe implements PipeTransform {
  transform(contacts: Contact[], term: string): any {
    let result: Contact[] = [];

    if (term && term.length > 0) {
      result = contacts.filter((contact: Contact) => {
        return contact.name.toLowerCase().includes(term.toLowerCase());
      });
    }

    return result.length < 1 ? contacts : result;
  }
}
