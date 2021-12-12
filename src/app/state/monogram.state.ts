import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken, Store } from '@ngxs/store';
import { FormsState } from '../forms';
import { SetNewDocumentFormPristine } from '../forms/forms.actions';
import { SaveNewForm, SelectDocument } from './monogram.actions';
import { MnDocument, MonogramStateModel } from './monogram.model';

const MONOGRAM_STATE_TOKEN = new StateToken<MonogramStateModel>('monogram');

type MnStateContext = StateContext<MonogramStateModel>;

@State<MonogramStateModel>({
  name: MONOGRAM_STATE_TOKEN,
  defaults: {
    documents: [],
    selectedDocument: null,
  }
})
@Injectable()
export class MonogramState {

  constructor(private store: Store) {
  }

  @Selector()
  static documents(state: MonogramStateModel): Array<MnDocument> {
    return state.documents;
  }

  @Selector()
  static getSelectedDocument(state: MonogramStateModel): string | null {
    return state.selectedDocument;
  }

  @Action(SaveNewForm)
  saveNewForm(ctx: MnStateContext, action: SaveNewForm): void {

    const values = this.store.selectSnapshot(FormsState.textInputForm);

    const documents: Array<MnDocument> = ctx.getState()?.documents
      ? [...ctx.getState().documents]   // copy of documents array
      : [];                             // new empty array

    if (!values.model || !action.id) {
      return; // todo handle better
    }

    const newDoc: MnDocument = {
      ...values.model,
      id: action.id,
      updated: new Date().toISOString(),
    };

    const i = documents.findIndex(i => i.id === newDoc.id);
    if (i > -1) documents[i] = newDoc;
    else documents.push(newDoc);

    ctx.patchState({ documents });

    ctx.dispatch([
      new SetNewDocumentFormPristine(),
    ]);
  }

  @Action(SelectDocument)
  selectDocument(ctx: MnStateContext, action: SelectDocument): void {
    ctx.patchState({
      selectedDocument: action.id,
    });
  }

}
