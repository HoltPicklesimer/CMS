import { Contact } from './contact.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  @Output() selectedContact = new EventEmitter<Contact>();

  constructor() { }

  ngOnInit(): void {
  }

}
