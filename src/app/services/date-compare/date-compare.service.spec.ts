import { TestBed } from '@angular/core/testing';
import * as dayjs from 'dayjs';
import { v4 as uuid4 } from 'uuid';
import { MnDocument } from '../../storage/monogram.model';
import { DateCompareService } from './date-compare.service';

describe('DateCompareService', () => {

  let service: DateCompareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateCompareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a compare function', () => {
    expect(service.compare).toBeDefined();
  });

  describe('compare function check', () => {

    it('should return zero if the dates are the same', () => {

      const date: dayjs.Dayjs = dayjs();

      const docA: MnDocument = {
        id: uuid4(),
        name: 'Doc A',
        textInput: 'Hello world',
        updated: date.clone().toISOString(),
      };

      const docB: MnDocument = {
        id: uuid4(),
        name: 'Doc B',
        textInput: 'another hello world',
        updated: date.clone().toISOString(),
      };

      expect(service.compare(docA, docB)).toBe(0);
    });

    it('should return -1 if A was edited after B', () => {

      const date: dayjs.Dayjs = dayjs();

      const docA: MnDocument = {
        id: uuid4(),
        name: 'Doc A',
        textInput: 'Hello world',
        updated: date.clone().add(1, 'hour').toISOString(),
      };

      const docB: MnDocument = {
        id: uuid4(),
        name: 'Doc B',
        textInput: 'another hello world',
        updated: date.clone().toISOString(),
      };

      expect(service.compare(docA, docB)).toBe(-1);
    });

    // it('should handle null dates', () => {
    //
    //   const date: dayjs.Dayjs = dayjs();
    //
    //   const docA: MnDocument = {
    //     id: uuid4(),
    //     name: 'Doc A',
    //     textInput: 'Hello world',
    //     updated: date.clone().add(1, 'hour').toISOString(),
    //   };
    //
    //   const docB: MnDocument = {
    //     id: uuid4(),
    //     name: 'Doc B',
    //     textInput: 'another hello world',
    //     updated: null as unknown as string,
    //   };
    //
    //   expect(service.compare(docA, docB)).toBe(-1);
    // });

  });

  describe('check arrays', () => {

    it('should not change the array if the dates are the same', () => {

      const date: dayjs.Dayjs = dayjs();

      const docA: MnDocument = {
        id: uuid4(),
        name: 'Doc A',
        textInput: 'Hello world',
        updated: date.clone().toISOString(),
      };

      const docB: MnDocument = {
        id: uuid4(),
        name: 'Doc B',
        textInput: 'another hello world',
        updated: date.clone().toISOString(),
      };

      const docC: MnDocument = {
        id: uuid4(),
        name: 'Doc C',
        textInput: 'yet another hello world',
        updated: date.clone().toISOString(),
      };

      const arr = [
        docA,
        docB,
        docC,
      ];

      expect(arr.sort(service.compare)).toEqual(arr);
    });

    it('should sort an array if a date is greater', () => {

      const date: dayjs.Dayjs = dayjs();

      const docA: MnDocument = {
        id: uuid4(),
        name: 'Doc A',
        textInput: 'Hello world',
        updated: date.clone().toISOString(),
      };

      const docB: MnDocument = {
        id: uuid4(),
        name: 'Doc B',
        textInput: 'another hello world',
        updated: date.clone().toISOString(),
      };

      const docC: MnDocument = {
        id: uuid4(),
        name: 'Doc C',
        textInput: 'yet another hello world',
        updated: date.clone().add(1, 'hour').toISOString(),
      };

      const arr = [
        docA,
        docB,
        docC,
      ];

      expect(arr.sort(service.compare)).toEqual([
        docC,
        docA,
        docB,
      ]);
    });

    it('should sort an array if a date is smaller', () => {

      const date: dayjs.Dayjs = dayjs();

      const docA: MnDocument = {
        id: uuid4(),
        name: 'Doc A',
        textInput: 'Hello world',
        updated: date.clone().toISOString(),
      };

      const docB: MnDocument = {
        id: uuid4(),
        name: 'Doc B',
        textInput: 'another hello world',
        updated: date.clone().add(1, 'hour').toISOString(),
      };

      const docC: MnDocument = {
        id: uuid4(),
        name: 'Doc C',
        textInput: 'yet another hello world',
        updated: date.clone().add(2, 'hour').toISOString(),
      };

      const arr = [
        docA,
        docB,
        docC,
      ];

      expect(arr.sort(service.compare)).toEqual([
        docC,
        docB,
        docA,
      ]);
    });

  });

});
