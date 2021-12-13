import { Injectable } from '@angular/core';
import { SentenceTokenizerService } from './sentence-tokenizer.service';

export interface MnChunk {
  chunk: string;
  hasNextChunk: boolean;
}

@Injectable({ providedIn: 'root' })
export class ChunkerService {

  static readonly NULL_CHUNK: MnChunk = {
    chunk: '',
    hasNextChunk: false,
  }

  constructor(private splitter: SentenceTokenizerService) {
  }

  chunk(base: string, chunkSize: number, segment: number, offset = 0): MnChunk {
    if (chunkSize <= 0 || segment < 0 || !Number.isInteger(chunkSize) || !Number.isInteger(segment)) {
      // console.debug('Invalid input.');
      return ChunkerService.NULL_CHUNK;
    }
    const split = this.splitter.split(base);
    if (split.length <= 0 || segment > split.length) {
      // console.debug('Invalid split array.', split.length);
      return ChunkerService.NULL_CHUNK;
    }
    return this.extract(base, split, chunkSize, segment, offset);
  }

  extract(base: string, split: Array<string>, chunkSize: number, segment: number, offset = 0, cursor = 0, result = ''): MnChunk {
    const target = split[segment].split(' ');
    if (target.length <= cursor + offset) {
      return {
        chunk: result,
        hasNextChunk: false,
      };
    } else if (chunkSize <= cursor) {
      return {
        chunk: result,
        hasNextChunk: true,
      };
    }
    if (result?.trim().length !== 0) {
      result = `${result} ${target[cursor + offset]}`;
    } else {
      result = target[cursor + offset]; // init on first pass
    }
    return this.extract(base, split, chunkSize, segment, offset, ++cursor, result);
  }

}
