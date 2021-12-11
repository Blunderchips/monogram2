import { Injectable } from '@angular/core';
import { Selector, State, StateToken } from '@ngxs/store';
import { MnDocument, MonogramStateModel } from '../state/monogram.model';
import { defaultForm, FormStateModel, NgxsFormModel } from './forms.model';

const FORMS_STATE_TOKEN = new StateToken<MonogramStateModel>('forms');

export type InputForm = NgxsFormModel<MnDocument>;
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
  static textInputForm(state: FormStateModel): InputForm {
    return state.textInput;
  }

}
