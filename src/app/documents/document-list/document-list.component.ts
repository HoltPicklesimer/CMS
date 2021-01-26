import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document('1', 'Document 1', 'This is the first document', 'https://web.byui.edu/portal/student/', []),
    new Document('2', 'Document 2', 'This is the second document', 'https://web.byui.edu/portal/student/', []),
    new Document('3', 'Document 3', 'This is the third document', 'https://web.byui.edu/portal/student/', []),
    new Document('4', 'Document 4', 'This is the fourth document', 'https://web.byui.edu/portal/student/', []),
    new Document('5', 'Document 5', 'This is the fifth document', 'https://web.byui.edu/portal/student/', [])
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
