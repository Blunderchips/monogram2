import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { map, Observable } from 'rxjs';
import { v4 as uuid4 } from 'uuid';
import { DOCUMENT_SEARCH_FORM_STATE } from '../../forms';
import { SetSearchFormPristine } from '../../forms/forms.actions';
import { Documents, MnDocument, StorageState } from '../../storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  /**
   * List of documents from storage state.
   */
  @Select(StorageState.documents) documentsList$: Observable<Documents>;
  /**
   * Document searchbar input element.
   */
  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>;

  /**
   * Document search form.
   */
  searchForm = new FormGroup({
    search: new FormControl(),
  });

  constructor(private router: Router, private store: Store) {
  }

  get searchFormName(): string {
    return DOCUMENT_SEARCH_FORM_STATE;
  }

  get hasSearchValue(): boolean {
    return !!this.searchForm.get('search')?.value || false;
  }

  get documents$(): Observable<Documents> {
    const searchTerm: string | null = this.searchForm.get('search')?.value;
    return this.documentsList$.pipe(map(docs => this.#filterDocuments(docs, searchTerm)));
  }

  generateNewDocumentId(): Promise<boolean> {
    return this.router.navigateByUrl(`/document/${uuid4()}`); // todo try/catch exception
  }

  /**
   * Invoked when the document searchbar clear button is pressed.
   */
  clearSearchFormValues(): void {
    this.searchForm.get('search')?.setValue(null);
    this.searchInput.nativeElement.blur();
    this.store.dispatch(new SetSearchFormPristine());
  }

  // todo make a service & test, maybe use a pipe?
  #filterDocuments(documents: Documents, searchTerm: string | null): Documents {
    if (!searchTerm || searchTerm.trim().length <= 0) {
      return documents; // no search term provided, return documents array as is
    }
    return documents.filter(i => i.name.trim().toLowerCase().includes(searchTerm.trim().toLowerCase()));
  }

}
