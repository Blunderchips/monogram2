import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { App } from '@capacitor/app';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { map, Observable } from 'rxjs';
import { DocumentNavigationService } from './services/document-navigation';
import { SelectDocument, StorageState } from './storage';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  @Select(StorageState.selectedDocumentId) selectedDocument: Observable<string | null>

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router,
    private documentNavigation: DocumentNavigationService,
  ) {
  }

  get hasSelectedDocument(): Observable<boolean> {
    return this.selectedDocument.pipe(
      map(docId => !docId),
    );
  }

  get tabButtonWidth(): number {    // todo test
    const numButton = 4;            // number of bottom navigation buttons
    return 100 / (numButton || 1);  // cannot divide by zero so default to 1
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

  async ngOnDestroy(): Promise<void> {
    await App.removeAllListeners();
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

  displayLink(): Observable<RouterLink> {
    return this.selectedDocument.pipe(map(docId => {
      return this.documentNavigation.documentDisplay(docId).link;
    }));
  }

  textLink(): Observable<RouterLink> {
    return this.selectedDocument.pipe(map(docId => {
      return this.documentNavigation.documentText(docId).link;
    }));
  }

  settingsLink(): Observable<RouterLink> {
    return this.selectedDocument.pipe(map(docId => {
      return this.documentNavigation.documentSettings(docId).link;
    }));
  }

}
