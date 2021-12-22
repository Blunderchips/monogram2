export interface MnDocument {
  id: UUID;
  updated: string;
  // input form
  name: string;
  textInput: string;
  // settings
  wordsPerMinute: number;
  /**
   * Number of words to render.
   */
  chunkSize: number;
  alignment: TextAlignment;
  weight: TextWeight;
}

export type Documents = Array<MnDocument>;

export interface StorageStateModel {
  documents: Documents;
  selectedDocument: string | null;
}
