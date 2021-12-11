export type UUID = string;

export interface MnDocument {
  id: UUID;
  textInput: string;
}

export interface MonogramStateModel {
  documents: Array<MnDocument>;
}
