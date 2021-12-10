export interface MonogramStateModel {
  forms: {
    textInput: NgxsFormModel<any>;
  };
}

export const defaultForm: NgxsFormModel<unknown> = {
  model: {},
  status: 'null',
  dirty: false,
  error: {},
}

export interface NgxsFormModel<T> {
  model: T | undefined;
  dirty: boolean;
  error: any;
  status: string;
}
