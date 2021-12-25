import { Injectable } from '@angular/core';
import { SentenceTokenizerService } from '../sentence-tokenizer';

export interface MnChunk {
  chunk: string;
  hasNextChunk: boolean;
  hasNextSegment: boolean;
}

@Injectable({ providedIn: 'root' })
export class ChunkerService {

  static readonly NULL_CHUNK: MnChunk = {
    chunk: '',
    hasNextChunk: false,
    hasNextSegment: false,
  }

  constructor(private splitter: SentenceTokenizerService) {
  }

  chunk(base: string, chunkSize: number, segment: number, offset = 0): MnChunk {
    if (chunkSize <= 0 || segment < 0 || !Number.isInteger(chunkSize) || !Number.isInteger(segment)) {
      // console.debug('Invalid input.');
      return ChunkerService.NULL_CHUNK;
    }
    const split = this.splitter.split(base);
    const numSegments = split.length;
    if (split.length <= 0 || segment >= numSegments) {
      // console.debug('Invalid split array.', split.length);
      return ChunkerService.NULL_CHUNK;
    }
    return this.extract(base, split, chunkSize, segment, numSegments, offset);
  }

  extract(base: string, split: Array<string>, chunkSize: number, segment: number, numSegments: number, offset = 0, cursor = 0, result = ''): MnChunk {
    const target = split[segment].split(' ');
    if (target.length <= cursor + offset) {
      return {
        chunk: result,
        hasNextChunk: false,
        hasNextSegment: segment < numSegments - 1,
      };
    } else if (chunkSize <= cursor) {
      return {
        chunk: result,
        hasNextChunk: true,
        hasNextSegment: segment < numSegments - 1,
      };
    }
    if (result?.trim().length !== 0) {
      result = `${result} ${target[cursor + offset]}`;
    } else {
      result = target[cursor + offset]; // init on first pass
    }
    return this.extract(base, split, chunkSize, segment, numSegments, offset, ++cursor, result);
  }

}
