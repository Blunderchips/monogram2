import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SentenceTokenizerService {

  static readonly SPLITTER = /(?<=[.!?\n])/;

  split(text: string | null): Array<string> {
    if (!text) {
      return [];
    }
    return text.split(SentenceTokenizerService.SPLITTER)
      .map(i => i?.trim())            // trim off trailing & leading white space
      .filter(i => i?.length !== 0);  // filter out empty/null strings
  }

}
