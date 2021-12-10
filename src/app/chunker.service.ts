import { Injectable } from '@angular/core';
import { SentenceTokenizerService } from './sentence-tokenizer.service';

export interface MnChunk {
  chunk: string | null | any;
  hasNextChunk: boolean;
}

@Injectable({ providedIn: 'root' })
export class ChunkerService {

  static readonly NULL_CHUNK: MnChunk = {
    chunk: null,
    hasNextChunk: false,
  }

  constructor(private splitter: SentenceTokenizerService) {
  }

  chunk(base: string, chunkSize: number, segment: number, cursor = 0): MnChunk {
    if (chunkSize <= 0 || segment < 0 || !Number.isInteger(chunkSize) || !Number.isInteger(segment)) {
      // console.debug('Invalid input.');
      return ChunkerService.NULL_CHUNK;
    }
    const split = this.splitter.split(base);
    if (split.length <= 0 || segment > split.length) {
      // console.debug('Invalid split array.', split.length);
      return ChunkerService.NULL_CHUNK;
    }
    return this.extract(base, split, chunkSize, segment, cursor);
  }

  extract(base: string, split: Array<string>, chunkSize: number, segment: number, cursor: number, result = ''): MnChunk {
    const target = split[segment].split(' ');
    if (target.length === cursor) {
      return {
        chunk: result,
        hasNextChunk: false,
      };
    } else if (cursor === chunkSize) {
      return {
        chunk: result,
        hasNextChunk: true,
      };
    }
    if (result?.trim().length !== 0) {
      result = `${result} ${target[cursor]}`;
    } else {
      result = target[cursor]; // init on first pass
    }
    return this.extract(base, split, chunkSize, segment, ++cursor, result);
  }

}
