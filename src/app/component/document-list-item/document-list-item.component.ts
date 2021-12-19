import { Component, Input, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    if (!this.document) {
      throw new Error('Document data cannot be undefined on list item'); // illegal argument exception
    }
  }

  menuButtonClicked($event: Event): void {
    $event.preventDefault();
  }

}
