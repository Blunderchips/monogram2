import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { debounceTime, distinctUntilChanged, Observable } from 'rxjs';
import { FormsState, INPUT_FORM_STATE } from '../forms';
import { SaveNewForm } from '../state/monogram.actions';

/**
 * Document text input form.
 */
@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit {

  inputForm = new FormGroup({
    name: new FormControl('Untitled Document'),
    textInput: new FormControl(''),
  });

  @Select(FormsState.isInputFormDirty) isFormDirty$: Observable<boolean>;

  get formName(): string {
    return INPUT_FORM_STATE;
  }

  constructor(private store: Store) {
  }

  // todo unsubscribe
  ngOnInit(): void {
    this.inputForm
      .valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe(() => this.store.dispatch(new SaveNewForm()));
  }

}
