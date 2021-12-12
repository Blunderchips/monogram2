import { MnDocument } from '../state/monogram.model';

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
  textInput: NgxsFormModel<MnDocument>;
  documentSearch: NgxsFormModel<DocumentSearchFormModel>;
}

export interface DocumentSearchFormModel {
  search: string;
}
