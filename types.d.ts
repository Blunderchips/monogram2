export interface MnDocument {
  id?: string; // uuid
  name: string;
  description: string;
}

export interface MnPage {
  pageNumber: number;
  text: string;
  parentPage: string; // UUID (FK)
}
