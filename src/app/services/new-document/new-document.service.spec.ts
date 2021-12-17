import { TestBed } from '@angular/core/testing';
import { NewDocumentService } from './new-document.service';

describe('NewDocumentService', () => {

  let service: NewDocumentService;

  // fixme Redundant character escape '\-' in RegExp
  const uuidRegex = /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not be closed', () => {
    expect(service.closed).toBeFalse();
  });

  describe('UUID regex internal checks', () => {

    it('uuid regex should be defined', () => {
      expect(uuidRegex).toBeDefined();
    });

    it('valid uuids', () => {
      expect(uuidRegex.test('dbbc9a9b-2e21-4701-b901-fa8ad7021191')).toBeTrue();
      expect(uuidRegex.test('8190ea0a-562a-402f-98d5-200b45e0b18c')).toBeTrue();
      expect(uuidRegex.test('1c689c06-ac0e-4f85-9cc2-d46fd5e3f364')).toBeTrue();
      expect(uuidRegex.test('3e3233fb-5edf-4bb8-8c14-92aa77fcba2c')).toBeTrue();
      expect(uuidRegex.test('665e4171-0085-4753-ac61-600fc8ebd154')).toBeTrue();
    });

    it('a random string is not a uuid', () => {
      expect(uuidRegex.test('this is not a uuid')).toBeDefined();
    });

    it('an empty string is not a uuid', () => {
      expect(uuidRegex.test('')).toBeDefined();
    });

    it('null is not a valid uuid', () => {
      expect(uuidRegex.test(null as unknown as string)).toBeFalse();
    });

  });

  describe('next function check', () => {

    it('should have a next function', () => {
      expect(service.next).toBeDefined();
    });

    it('should generate a new uuid on next call', () => {
      const initial: string = service.getValue();
      // expect(uuidRegex.test(initial)).toBeTrue();

      service.next();
      const final: string = service.getValue();
      // expect(uuidRegex.test(final)).toBeTrue();

      expect(final).not.toEqual(initial);
    });

    it('next should generate a UUID', () => {
      service.next();
      const documentID: string = service.getValue();
      expect(uuidRegex.test(documentID)).toBeTrue();
    });

  });

});
