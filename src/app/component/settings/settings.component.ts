import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { debounceTime, distinctUntilChanged, Observable, take } from 'rxjs';
import { FormsState, SETTINGS_FORM_FORM_STATE, SettingsForm } from '../../forms';
import { ResetFormState } from '../../forms/forms.actions';
import { PromptService } from '../../services/prompt';
import { DeleteDocument, MnDocument, SaveSettingsForm, StorageState } from '../../storage';
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

  /**
   * Document settings form control group.
   */
  settingsForm = new FormGroup({
    wordsPerMinute: new FormControl(),
    chunkSize: new FormControl(),
    alignment: new FormControl(null, [Validators.required]),
    weight: new FormControl(null, [Validators.required]),
  });

  constructor(private store: Store, private prompt: PromptService) {
  }

  get alignments(): TextAlignments {
    return ALIGNMENTS;
  }

  get weights(): TextWeights {
    return WEIGHTS;
  }

  get formName(): string {
    return SETTINGS_FORM_FORM_STATE;
  }

  ngOnInit(): void {
    this.selectedDocument$.pipe(
      take(1),
    ).subscribe(document => this.settingsForm.patchValue({
      wordsPerMinute: document.wordsPerMinute || 400,
      chunkSize: document.chunkSize || 3,
      alignment: document.alignment || ALIGNMENTS[0],
      weight: document.weight || WEIGHTS[0],
    }));

    this.selectedDocument$.pipe(
      untilDestroyed(this),
    ).subscribe(document => this.id = document?.id);

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

  deleteDocument(): void {
    this.prompt.confirm(
      'Are you sure?',
      'Delete this document? This action cannot be undone.'
    ).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteDocument(this.id));
      }
    })
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
