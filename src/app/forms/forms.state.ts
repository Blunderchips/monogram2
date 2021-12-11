import { Injectable } from '@angular/core';
import { Selector, State, StateToken } from '@ngxs/store';
import { MonogramStateModel } from '../state/monogram.model';
import { defaultForm, FormStateModel } from './forms.model';

const FORMS_STATE_TOKEN = new StateToken<MonogramStateModel>('forms');

export const INPUT_FORM_STATE = 'forms.textInput';

@State<FormStateModel>({
  name: FORMS_STATE_TOKEN,
  defaults: {
    textInput: { ...defaultForm },
  }
})
@Injectable()
export class FormsState {

  @Selector()
  static isInputFormDirty(state: FormStateModel): boolean {
    return state.textInput.dirty;
  }

}
