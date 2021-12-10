import { Injectable } from '@angular/core';
import { State, StateToken } from '@ngxs/store';

export type TextInputFormStateModel = any;

const MONOGRAM_STATE_TOKEN = new StateToken<TextInputFormStateModel>('monogram');

@State<TextInputFormStateModel>({
  name: MONOGRAM_STATE_TOKEN,
  defaults: {}
})
@Injectable()
export class MonogramState {
}
