import { Injectable } from '@angular/core';
import { Selector, State, StateToken } from '@ngxs/store';
import { MnDocument } from '../state/monogram.model';
import { defaultForm, DocumentSearchFormModel, FormStateModel, NgxsFormModel } from './forms.model';

const FORMS_STATE_TOKEN = new StateToken<FormStateModel>('forms');

export type InputForm = NgxsFormModel<MnDocument>;
export const INPUT_FORM_STATE = 'forms.textInput';

export type DocumentSearchForm = NgxsFormModel<DocumentSearchFormModel>;
export const DOCUMENT_SEARCH_FORM_STATE = 'forms.documentSearch';

@State<FormStateModel>({
  name: FORMS_STATE_TOKEN,
  defaults: {
    textInput: { ...defaultForm },
    documentSearch: { ...defaultForm },
  }
})
@Injectable()
export class FormsState {

  @Selector()
  static textInputForm(state: FormStateModel): InputForm {
    return state.textInput;
  }

  @Selector()
  static documentSearchForm(state: FormStateModel): DocumentSearchForm {
    return state.documentSearch;
  }

}
