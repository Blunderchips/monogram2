import { Component, Input, OnInit } from '@angular/core';
import { DocumentNavigationService } from '../../services/document-navigation';
import { MnDocument } from '../../storage';

@Component({
  selector: 'app-document-list-item',
  templateUrl: './document-list-item.component.html',
  styleUrls: ['./document-list-item.component.scss']
})
export class DocumentListItemComponent implements OnInit {

  /**
   * Document from storage. Cannot be null.
   */
  @Input() document: MnDocument;

  constructor(private docNac: DocumentNavigationService) {
  }

  get link(): RouterLink {
    return this.docNac.documentDisplay(this.document.id).link;
  }

  ngOnInit(): void {
    if (!this.document) {
      throw new Error('Document data cannot be undefined on list item'); // illegal argument exception
    }
  }

}
