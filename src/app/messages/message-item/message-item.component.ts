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
    this.messageSender = this.message?.sender?.name;

    this.contactService.contactListChangedEvent.subscribe(() => {
      const contact: Contact = this.contactService.getContact(
        this.message.sender?.id
      );
      this.messageSender = contact?.name;
    });
  }
}
