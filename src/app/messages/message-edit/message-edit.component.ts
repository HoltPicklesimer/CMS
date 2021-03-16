import { ContactService } from './../../contacts/contact.service';
import { MessageService } from './../message.service';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  ViewChild,
  Output,
} from '@angular/core';
import { Message } from '../message.model';
import { Contact } from 'src/app/contacts/contact.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'],
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject', { static: false }) subject: ElementRef;
  @ViewChild('msgText', { static: false }) msgText: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender: Contact;

  constructor(
    private messageService: MessageService,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.currentSender = this.contactService.getContact('101');
    this.contactService.contactListChangedEvent.subscribe((contacts) => {
      this.currentSender = contacts.find((contact) => contact.id == '101');
    });
  }

  onSendMessage() {
    const newSubject = this.subject.nativeElement.value;
    const newContent = this.msgText.nativeElement.value;
    console.log(this.currentSender);
    const message = new Message(
      '0',
      newSubject,
      newContent,
      this.currentSender
    );
    this.messageService.addMessage(message);
    this.onClear();
  }

  onClear() {
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
  }
}
