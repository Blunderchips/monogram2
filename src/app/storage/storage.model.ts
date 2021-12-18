export interface MnDocument {
  id: UUID;
  name: string;
  textInput: string;
  updated: string;
}

export interface StorageStateModel {
  documents: Array<MnDocument>;
  selectedDocument: string | null;
}
