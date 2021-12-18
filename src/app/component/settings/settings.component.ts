import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SETTINGS_FORM_FORM_STATE } from '../../forms';
import { ALIGNMENTS, GetAlignmentLabel } from '../../text-align.enum';
import { GetWeightLabel, WEIGHTS } from '../../text-weight.enum';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

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
    wordsPerMinute: new FormControl(),
    chunkSize: new FormControl(),
    alignment: new FormControl(ALIGNMENTS[0], [Validators.required]),
    weight: new FormControl(WEIGHTS[0], [Validators.required]),
  });

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

}
