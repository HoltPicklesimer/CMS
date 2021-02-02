import { DocumentService } from './document.service';
import { Document } from './document.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  @Output() selectedDocument: Document;

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    this.documentService.documentSelectedEvent
    .subscribe(
      (document: Document) => {
        this.selectedDocument = document;
      }
    )
  }

}
