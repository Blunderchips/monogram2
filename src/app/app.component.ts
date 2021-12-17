import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { map, Observable } from 'rxjs';
import { NewDocumentService } from './services/new-document';
import { SelectDocument, StorageState } from './storage';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @Select(StorageState.getSelectedDocumentId) selectedDocument: Observable<string | null>

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router,
    private newDoc: NewDocumentService,
  ) {
  }

  /**
   * @returns {string } a randomly generated UUID.
   */
  get uuid(): string {
    return this.newDoc.getValue();
  }

  get hasSelectedDocument(): Observable<boolean> {
    return this.selectedDocument.pipe(
      map(docId => !docId),
    );
  }

  ngOnInit(): void {
    this.router.events.pipe(
      untilDestroyed(this),
    ).subscribe(event => {
      if (event instanceof NavigationEnd) {
        const id = this.getDocumentId(this.route.snapshot);
        this.store.dispatch(new SelectDocument(id));
      }
    });
  }

  getDocumentId(route: ActivatedRouteSnapshot): string | null {
    const id = route.paramMap.get('id');
    if (id) {
      return id;
    } else if (route.firstChild) {
      return this.getDocumentId(route.firstChild);
    } else {
      return null;
    }
  }

  generateNewDocumentId(): void {
    this.newDoc.next(); // refresh document behavior subject
  }

}
