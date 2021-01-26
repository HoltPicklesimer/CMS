import { Document } from './document.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  @Output() selectedDocument = new EventEmitter<Document>();

  constructor() { }

  ngOnInit(): void {
    console.log(this.selectedDocument);
  }

}
