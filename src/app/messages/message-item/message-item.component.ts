import { Contact } from './../../contacts/contact.model';
import { ContactService } from './../../contacts/contact.service';
import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css'],
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  messageSender: string;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    const contact: Contact = this.contactService.getContact(
      this.message.sender
    );
    this.messageSender = contact?.name;

    this.contactService.contactListChangedEvent.subscribe(() => {
      if (!this.messageSender) {
        const contact: Contact = this.contactService.getContact(
          this.message.sender
        );
        this.messageSender = contact?.name;
      }
    });
  }
}
