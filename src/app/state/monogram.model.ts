export type UUID = string;

export interface MnDocument {
  id: UUID;
  name: string;
  textInput: string;
  updated: string;
}

export interface MonogramStateModel {
  documents: Array<MnDocument>;
}
