import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { v4 as uuid4 } from 'uuid';
import { DOCUMENT_SEARCH_FORM_STATE } from '../../forms';
import { SetSearchFormPristine } from '../../forms/forms.actions';
import { MnDocument, StorageState } from '../../storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  @Select(StorageState.documents) documents: Observable<Array<MnDocument>>;

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

}
