import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { debounceTime, distinctUntilChanged, map, Observable, take } from 'rxjs';
import { FormsState, INPUT_FORM_STATE, InputForm } from '../../forms';
import { ResetFormState } from '../../forms/forms.actions';
import { MnDocument, SaveNewForm, StorageState } from '../../storage';

/**
 * Document text input form.
 */
@UntilDestroy()
@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit, OnDestroy {

  /**
   * Target document ID.
   */
  @Input() id: string | null;

  /**
   * Angular form object.
   */
  inputForm = new FormGroup({
    name: new FormControl('Untitled Document'), // todo make default document title env variable
    textInput: new FormControl(''),
  });

  @Select(FormsState.textInputForm) inputForm$: Observable<InputForm>;
  @Select(StorageState.getSelectedDocument) selectedDocument$: Observable<MnDocument>;

  constructor(private store: Store) {
  }

  get formName(): string {
    return INPUT_FORM_STATE;
  }

  get isFormDirty$(): Observable<boolean> {
    return this.inputForm$.pipe(map(i => i.dirty));
  }

  ngOnInit(): void {
    this.selectedDocument$.pipe(
      take(1),
    ).subscribe(document => {
      if (document) {
        this.inputForm.patchValue({
          name: document.name,
          textInput: document.textInput,
        })
      }
    });

    this.#subscribeToChanges();
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ResetFormState());
  }

  #subscribeToChanges(): void {
    this.inputForm
      .valueChanges
      .pipe(
        debounceTime(500), // todo make env variable
        distinctUntilChanged(),
        untilDestroyed(this),
      )
      .subscribe(() => this.store.dispatch(new SaveNewForm(this.id)));
  }

}
