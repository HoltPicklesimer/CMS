import { HttpClient } from '@angular/common/http';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Message } from './message.model';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messages: Message[] = [];
  private maxMessageId: number;
  messageChangedEvent = new EventEmitter<Message[]>();

  constructor(private http: HttpClient) {
    this.fetchMessages();
  }

  getMessages() {
    return this.messages.slice();
  }

  getMessage(id: string) {
    return this.messages.find((m) => m.id === id);
  }

  addMessage(message: Message) {
    message.id = String(this.getMaxId());
    this.messages.push(message);
    this.storeMessages();
  }

  getMaxId(): number {
    let maxId = 0;

    this.messages.forEach((message: Message) => {
      const currentId = +message.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    });

    return maxId;
  }

  fetchMessages() {
    this.http
      .get<Message[]>(
        'https://ng-cms-d4319-default-rtdb.firebaseio.com/messages.json'
      )
      .subscribe((messages: Message[]) => {
        this.messages = messages.sort((a, b) =>
          a.id < b.id ? -1 : a.id > b.id ? 1 : 0
        );
        this.maxMessageId = this.getMaxId();
        this.messageChangedEvent.next(this.messages.slice());
      });
  }

  storeMessages() {
    this.http
      .put(
        'https://ng-cms-d4319-default-rtdb.firebaseio.com/messages.json',
        this.messages
      )
      .subscribe(() => {
        this.messageChangedEvent.next(this.messages.slice());
      });
  }
}
