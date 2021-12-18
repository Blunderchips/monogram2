export interface MnDocument {
  id: UUID;
  updated: string;
  // input form
  name: string;
  textInput: string;
  // settings
  wordsPerMinute: number;
  chunkSize: number;
  alignment: TextAlignment;
  weight: TextWeight;
}

export interface StorageStateModel {
  documents: Array<MnDocument>;
  selectedDocument: string | null;
}
