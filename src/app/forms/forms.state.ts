import { Injectable } from '@angular/core';
import { Selector, State, StateToken } from '@ngxs/store';
import { MnDocument } from '../storage';
import { defaultForm, DocumentSearchFormModel, FormStateModel, NgxsFormModel } from './forms.model';

export const FORMS_STATE_TOKEN = new StateToken<FormStateModel>('forms');

export type InputForm = NgxsFormModel<MnDocument>;
export const INPUT_FORM_STATE = 'forms.textInput';

export type DocumentSearchForm = NgxsFormModel<DocumentSearchFormModel>;
export const DOCUMENT_SEARCH_FORM_STATE = 'forms.documentSearch';

export type SettingsForm = NgxsFormModel<DocumentSearchFormModel>;
export const SETTINGS_FORM_FORM_STATE = 'forms.settings';

@State<FormStateModel>({
  name: FORMS_STATE_TOKEN,
  defaults: {
    textInput: { ...defaultForm },
    documentSearch: { ...defaultForm },
    settings: { ...defaultForm },
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

  @Selector()
  static settingsForm(state: FormStateModel): DocumentSearchForm {
    return state.settings;
  }

}
