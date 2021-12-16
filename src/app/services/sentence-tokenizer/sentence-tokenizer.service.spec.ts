import { TestBed } from '@angular/core/testing';
import { SentenceTokenizerService } from './sentence-tokenizer.service';

describe('SentenceTokenizerService', () => {

  let service: SentenceTokenizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SentenceTokenizerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a method to tokenize sentences', () => {
    expect(service.split).toBeDefined();
  });

  it('should return an array when the splitter function is called', () => {
    const split = service.split('Hello world');
    // console.debug(typeof split);
    expect(Array.isArray(split)).toBeTrue();
  });

  it('should split sentences on full stops', () => {
    const input = 'Hello world. This is a test.'
    const split = service.split(input);
    // console.debug({ split });
    expect(split[0]).toEqual('Hello world.');
    expect(split[1]).toEqual('This is a test.');
  });

  it('should trim off trailing white space', () => {
    const input = 'Hello world.              This is a test.       '
    const split = service.split(input);
    // console.debug({ split });
    expect(split[0]).toEqual('Hello world.');
    expect(split[1]).toEqual('This is a test.');
  });

  it('should split sentences on question marks', () => {
    const input = 'Hello world? This is a test?'
    const split = service.split(input);
    // console.debug({ split });
    expect(split[0]).toEqual('Hello world?');
    expect(split[1]).toEqual('This is a test?');
  });

  it('should split sentences on exclamation marks', () => {
    const input = 'Hello world! This is a test!'
    const split = service.split(input);
    // console.debug({ split });
    expect(split[0]).toEqual('Hello world!');
    expect(split[1]).toEqual('This is a test!');
  });

  it('should trim off trailing tabs', () => {
    const input = 'Hello world.\t\t\t\tThis is a test.\t'
    const split = service.split(input);
    // console.debug({ split });
    expect(split[0]).toEqual('Hello world.');
    expect(split[1]).toEqual('This is a test.');
  });

  it('should trim off trailing linebreaks', () => {
    const input = 'Hello world.\n\n\n\nThis is a test.\n'
    const split = service.split(input);
    // console.debug({ split });
    expect(split[0]).toEqual('Hello world.');
    expect(split[1]).toEqual('This is a test.');
  });

  it('should return an empty array on null input', () => {
    const split = service.split(null);
    // console.debug({ split });
    expect(Array.isArray(split)).toBeTrue();
    expect(split.length).toBe(0);
  });

  it('should return an empty array on empty string input', () => {
    const anEmptyString = '';
    const split = service.split(anEmptyString);
    // console.debug({ split });
    expect(Array.isArray(split)).toBeTrue();
    expect(split.length).toBe(0);
  });

  it('should split sentences on line breaks', () => {
    const input = 'Hello world\nThis is a test\n'
    const split = service.split(input);
    // console.debug({ split });
    expect(split[0]).toEqual('Hello world');
    expect(split[1]).toEqual('This is a test');
  });

  it('should retain delimiters', () => {
    const input = 'Hello world.'
    const split = service.split(input);
    // console.debug({ split });
    expect(split[0].indexOf('.')).toBeGreaterThanOrEqual(0);
  });

});
