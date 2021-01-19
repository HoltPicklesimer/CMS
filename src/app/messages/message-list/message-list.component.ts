import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] =
  [
    new Message("1", "Class A", "Will we go over the hw in class A?", "Bob Ross"),
    new Message("2", "Class B", "What is the hw for Class B?", "Forest Burns"),
    new Message("3", "Class C", "What time is Class C?", "Frodo Baggins")
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}
