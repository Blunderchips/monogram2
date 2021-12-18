import { DocumentSearchForm, InputForm, SettingsForm } from './forms.state';

export const defaultForm: NgxsFormModel<any> = {
  model: undefined,
  status: 'null',
  dirty: false,
  errors: {},
}

export interface NgxsFormModel<T> {
  model: T | undefined;
  dirty: boolean;
  errors: any;
  status: string;
}

export interface FormStateModel {
  textInput: InputForm;
  documentSearch: DocumentSearchForm;
  settings: SettingsForm;
}

export interface DocumentSearchFormModel {
  search: string;
}
