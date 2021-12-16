import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DOCUMENT_SEARCH_FORM_STATE } from '../../forms';
import { MnDocument, StorageState } from '../../storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  @Select(StorageState.documents) documents: Observable<Array<MnDocument>>;

  /**
   * Document search form.
   */
  searchForm = new FormGroup({
    search: new FormControl(),
  });

  get searchFormName(): string {
    return DOCUMENT_SEARCH_FORM_STATE;
  }

}
