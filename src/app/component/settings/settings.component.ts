import { Component } from '@angular/core';
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
