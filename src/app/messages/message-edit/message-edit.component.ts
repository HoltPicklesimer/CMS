import { Component, ElementRef, EventEmitter, OnInit, ViewChild, Output } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject', {static: false}) subject: ElementRef;
  @ViewChild('msgText', {static: false}) msgText: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender: string = 'Ethan Picklesimer';

  constructor() { }

  ngOnInit(): void {
  }

  onSendMessage() {
    let newSubject = this.subject.nativeElement.value;
    let newMessage = this.msgText.nativeElement.value;
    let message = new Message('0', newSubject, newMessage, this.currentSender);
    this.addMessageEvent.emit(message);
  }

  onClear() {
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
  }

}
