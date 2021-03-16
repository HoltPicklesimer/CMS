import { ContactService } from './../contacts/contact.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from './message.model';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messages: Message[] = [];
  private maxMessageId: number;
  messageChangedEvent = new EventEmitter<Message[]>();

  constructor(
    private http: HttpClient,
    private contactService: ContactService
  ) {
    this.fetchMessages();
  }

  getMessages() {
    return this.messages.slice();
  }

  getMessage(id: string) {
    return this.messages.find((m) => m.id === id);
  }

  addMessage(message: Message) {
    if (!message) {
      return;
    }

    // make sure id of the new Message is empty
    message.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http
      .post<{ message: string; createdMessage: Message }>(
        'http://localhost:3000/messages',
        message,
        { headers: headers }
      )
      .subscribe((responseData) => {
        // add new message to messages
        responseData.createdMessage.sender = this.contactService.getContact(
          '101'
        );
        this.messages.push(responseData.createdMessage);
        this.sortAndSend();
      });
  }

  fetchMessages() {
    this.http
      .get<Message[]>('http://localhost:3000/messages')
      .subscribe((response: any) => {
        this.messages = response.messages;
        this.sortAndSend();
      });
  }

  sortAndSend() {
    this.messageChangedEvent.next(
      this.messages
        .slice()
        .sort((a, b) =>
          Number(a.id) < Number(b.id) ? -1 : Number(a.id) > Number(b.id) ? 1 : 0
        )
    );
  }
}
