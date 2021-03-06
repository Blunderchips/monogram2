import { TestBed } from '@angular/core/testing';
import { ChunkerService, MnChunk } from './chunker.service';

describe('ChunkerService', () => {

  let service: ChunkerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChunkerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a chunker function', () => {
    expect(service.chunk).toBeDefined();
  });

  it('should have a null/empty chunk definition', () => {
    expect(ChunkerService.NULL_CHUNK).toBeDefined();
  });

  describe('parameter validation', () => {

    it('should return an empty string if chunk size is zero', () => {
      expect(service.chunk('hello world', 0, 0)).toBe(ChunkerService.NULL_CHUNK);
    });

    it('should return an empty string if chunk size is a negative number', () => {
      expect(service.chunk('hello world', -1, 0)).toBe(ChunkerService.NULL_CHUNK);
    });

    it('should return an empty string if index is a negative number', () => {
      expect(service.chunk('hello world', 10, -1)).toBe(ChunkerService.NULL_CHUNK);
    });

    it('should return an empty string if index is not an integer', () => {
      expect(service.chunk('hello world', 10, 0.4)).toBe(ChunkerService.NULL_CHUNK);
    });

    it('should return an empty string if chunk size is not an integer', () => {
      expect(service.chunk('hello world', 0.10, 1)).toBe(ChunkerService.NULL_CHUNK);
    });

    it('should return an empty string if base string is empty', () => {
      expect(service.chunk('', 1, 1)).toBe(ChunkerService.NULL_CHUNK);
    });

    it('should return an empty string if index is greater than the length of the split array', () => {
      expect(service.chunk('hello. world.', 1, 100)).toBe(ChunkerService.NULL_CHUNK);
    });

  });

  it('should extract a clamped chunk', () => {
    const expected: MnChunk = {
      chunk: 'hello.', hasNextChunk: false, hasNextSegment: true,
    }
    expect(service.chunk('hello. world.', 3, 0)).toEqual(expected);
  });

  it('should process a sub-chunk', () => {
    const expected: MnChunk = {
      chunk: 'hello', hasNextChunk: true, hasNextSegment: true,
    }
    expect(service.chunk('hello hello. world.', 1, 0)).toEqual(expected);
  });

  it('should process chunk sizes', () => {
    const expected: MnChunk = {
      chunk: 'hello world.', hasNextChunk: false, hasNextSegment: true,
    }
    expect(service.chunk('hello world. world.', 2, 0)).toEqual(expected);
  });

  it('should process segments', () => {
    const expected: MnChunk = {
      chunk: 'world.', hasNextChunk: false, hasNextSegment: false,
    }
    expect(service.chunk('hello world. world.', 1, 1)).toEqual(expected);
  });

  it('should process cursors', () => {
    const expected: MnChunk = {
      chunk: 'two.', hasNextChunk: false, hasNextSegment: true,
    }
    expect(service.chunk('one two. three.', 2, 0, 1)).toEqual(expected);
  });

  it('should process offset overflow with chunks', () => {
    expect(service.chunk('one two. three.', 2, 0, 3)).toEqual({
      chunk: '', hasNextChunk: false, hasNextSegment: true, // testing again segment zero so it does have another segment
    });
  });

  it('should process offsets & chunk size', () => {
    const expected: MnChunk = {
      chunk: 'this and this', hasNextChunk: true, hasNextSegment: false,
    }
    expect(service.chunk('hello world this test this and this I am fine', 3, 0, 4,)).toEqual(expected);
  });

  it('should process offsets & chunk size', () => {
    const expected: MnChunk = {
      chunk: '5 6 7 8', hasNextChunk: false, hasNextSegment: false,
    }
    expect(service.chunk('1 2 3 4 5 6 7 8', 5, 0, 4,)).toEqual(expected);
  });

  it('should process next segments when true', () => {
    const result = service.chunk('hello world. world.', 1, 0);
    expect(result.hasNextSegment).toBeTrue();
  });

  it('should process next segments when there is none', () => {
    const result = service.chunk('hello world. world.', 1, 1);
    expect(result.hasNextSegment).toBeFalse();
  });

  it('should handle segment overflow', () => {
    expect(service.chunk('hello world. world.', 1, 2)).toEqual(ChunkerService.NULL_CHUNK);
  });

  it('should handle segment overflow (extreme case)', () => {
    expect(service.chunk('hello world. world.', 1, 110)).toEqual(ChunkerService.NULL_CHUNK);
  });

});
