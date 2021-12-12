import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { debounceTime, distinctUntilChanged, map, Observable, take } from 'rxjs';
import { FormsState, INPUT_FORM_STATE, InputForm } from '../forms';
import { MonogramState } from '../state';
import { SaveNewForm } from '../state/monogram.actions';
import { MnDocument } from '../state/monogram.model';

/**
 * Document text input form.
 */
@UntilDestroy()
@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit {

  @Input() id: string | null;

  inputForm = new FormGroup({
    name: new FormControl('Untitled Document'),
    textInput: new FormControl(''),
  });

  @Select(FormsState.textInputForm) inputForm$: Observable<InputForm>;
  @Select(MonogramState.documents) documents$: Observable<Array<MnDocument>>;

  constructor(private store: Store) {
  }

  get formName(): string {
    return INPUT_FORM_STATE;
  }

  get isFormDirty$(): Observable<boolean> {
    return this.inputForm$.pipe(map(i => i.dirty));
  }

  ngOnInit(): void {
    this.documents$.pipe(
      take(1),
    ).subscribe(documents => {
      const selectedDocument = documents.find(i => i.id === this.id);
      this.inputForm.patchValue({ ...selectedDocument });
    });

    this.#subscribeToChanges();
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
