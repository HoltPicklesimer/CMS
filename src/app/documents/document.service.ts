import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documentListChangedEvent = new Subject<Document[]>();
  private documents: Document[] = [];
  private maxDocumentId: number;

  constructor(private http: HttpClient) {
    this.fetchDocuments();
  }

  getDocuments() {
    return this.documents.slice();
  }

  getDocument(id: string) {
    return this.documents.find((d) => d.id === id);
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }

    this.documents.splice(pos, 1);
    this.storeDocuments();
  }

  getMaxId(): number {
    let maxId = 0;

    this.documents.forEach((document) => {
      const currentId = +document.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    });

    return maxId;
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }

    this.maxDocumentId++;
    newDocument.id = String(this.maxDocumentId);
    this.documents.push(newDocument);
    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.storeDocuments();
  }

  fetchDocuments() {
    this.http
      .get<Document[]>(
        'https://ng-cms-d4319-default-rtdb.firebaseio.com/documents.json'
      )
      .subscribe((documents: Document[]) => {
        this.documents = documents.sort((a, b) =>
          a.name < b.name ? -1 : a.name > b.name ? 1 : 0
        );
        this.maxDocumentId = this.getMaxId();
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }

  storeDocuments() {
    this.http
      .put(
        'https://ng-cms-d4319-default-rtdb.firebaseio.com/documents.json',
        this.documents
      )
      .subscribe(() => {
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }
}
