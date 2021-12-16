import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken, Store } from '@ngxs/store';
import { FormsState } from '../forms';
import { SetNewDocumentFormPristine } from '../forms/forms.actions';
import { DateCompareService } from '../services/date-compare';
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

  constructor(
    private store: Store,
    private dateCompare: DateCompareService,
  ) {
  }

  @Selector()
  static documents(state: MonogramStateModel): Array<MnDocument> {
    return state.documents;
  }

  @Selector()
  static getSelectedDocumentId(state: MonogramStateModel): string | null {
    return state.selectedDocument;
  }

  @Selector()
  static getSelectedDocument(state: MonogramStateModel): MnDocument | null {
    return state.documents.find(doc => doc.id === state.selectedDocument) || null;
  }

  @Action(SaveNewForm)
  saveNewForm(ctx: MnStateContext, action: SaveNewForm): void {

    const values = this.store.selectSnapshot(FormsState.textInputForm);

    // todo validate form values

    const state = ctx.getState();
    const documents: Array<MnDocument> = Array.isArray(state?.documents)
      ? [...ctx.getState().documents]   // copy of documents array
      : [];                             // new empty array

    if (!values?.model || !action?.id) {
      return; // todo handle better
    }

    const newDoc: MnDocument = {
      ...values.model,
      id: action.id,
      updated: new Date().toISOString(),
    };

    // todo comment & test
    const i = documents.findIndex(i => i.id === newDoc.id);
    if (i > -1) documents[i] = newDoc;
    else documents.push(newDoc);
    // --

    ctx.patchState({ documents: documents.sort(this.dateCompare.compare) });

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
