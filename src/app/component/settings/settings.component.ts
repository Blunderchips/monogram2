import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { debounceTime, distinctUntilChanged, Observable, take } from 'rxjs';
import { FormsState, SETTINGS_FORM_FORM_STATE, SettingsForm } from '../../forms';
import { ResetFormState } from '../../forms/forms.actions';
import { MnDocument, SaveSettingsForm, StorageState } from '../../storage';
import { ALIGNMENTS, GetAlignmentLabel } from '../../text-align.enum';
import { GetWeightLabel, WEIGHTS } from '../../text-weight.enum';

@UntilDestroy()
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  @Select(FormsState.settingsForm) settingsForm$: Observable<SettingsForm>;
  @Select(StorageState.selectedDocument) selectedDocument$: Observable<MnDocument>;

  id: string; // local copy of document ID

  get alignments(): TextAlignments {
    return ALIGNMENTS;
  }

  get weights(): TextWeights {
    return WEIGHTS;
  }

  get formName(): string {
    return SETTINGS_FORM_FORM_STATE;
  }

  /**
   * Document settings form control group.
   */
  settingsForm = new FormGroup({
    wordsPerMinute: new FormControl(400),
    chunkSize: new FormControl(3),
    alignment: new FormControl(ALIGNMENTS[0], [Validators.required]),
    weight: new FormControl(WEIGHTS[0], [Validators.required]),
  });

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.selectedDocument$.pipe(
      take(1),
    ).subscribe(document => {
      if (document) {
        this.settingsForm.patchValue({
          wordsPerMinute: document.wordsPerMinute,
          chunkSize: document.chunkSize,
          alignment: document.alignment,
          weight: document.weight,
        })
      }
    });

    this.selectedDocument$.pipe(
      untilDestroyed(this),
    ).subscribe(document => this.id = document.id);

    this.#subscribeToChanges();
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ResetFormState());
  }

  /**
   * @see GetAlignmentLabel
   */
  getAlignmentLabel(alignment: TextAlignment): string {
    return GetAlignmentLabel(alignment);
  }

  /**
   * @see GetWeightLabel
   */
  getWeightLabel(weight: TextWeight): string {
    return GetWeightLabel(weight);
  }

  #subscribeToChanges(): void {
    this.settingsForm
      .valueChanges
      .pipe(
        debounceTime(500), // todo make env variable
        distinctUntilChanged(),
        untilDestroyed(this),
      )
      .subscribe(() => this.store.dispatch(new SaveSettingsForm(this.id)));
  }

}
