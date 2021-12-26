import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export class NavigationLink {

  constructor(public link: RouterLink, private router: Router) {
  }

  navigate(): Promise<boolean> {
    return this.router.navigate(this.link || []);
  }

}

@Injectable({ providedIn: 'root' })
export class DocumentNavigationService {

  constructor(private router: Router) {
  }

  documentDisplay(docId: UUID | null): NavigationLink {
    return new NavigationLink(['/', 'reader', docId], this.router);
  }

  documentText(docId: UUID | null): NavigationLink {
    return new NavigationLink(['/', 'document', docId], this.router);
  }

  documentSettings(docId: UUID | null): NavigationLink {
    return new NavigationLink(['/', 'settings', docId], this.router);
  }

}
