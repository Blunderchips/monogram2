import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { map, Observable } from 'rxjs';
import { MonogramState } from './state';
import { SelectDocument } from './state/monogram.actions';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @Select(MonogramState.getSelectedDocument) selectedDocument: Observable<string | null>

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router,
  ) {
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

}
