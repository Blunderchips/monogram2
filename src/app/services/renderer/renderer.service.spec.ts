import { TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { round } from 'lodash-es';
import { StorageState } from '../../storage';
import { RendererService } from './renderer.service';

// todo test this service!

describe('RendererService', () => {

  let service: RendererService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([
          StorageState
        ]),
      ],
    });
    service = TestBed.inject(RendererService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('words per minute function', () => {
    it('should not return not a number (NaN)', () => {
      expect(service.wordsPerMinuteToMilliseconds(100)).not.toBeNaN();
    });
    it('should not return null', () => {
      expect(service.wordsPerMinuteToMilliseconds(100)).not.toBeNull();
    });
    it('should return a number greater than or equal to zero', () => {
      expect(service.wordsPerMinuteToMilliseconds(100)).toBeGreaterThanOrEqual(0);
    });
    it('should a finite number', () => {
      const result: number = service.wordsPerMinuteToMilliseconds(100);
      // console.debug({ result });
      expect(Number.isFinite(result)).toBeTrue();
    });

    describe('wpm result checks', () => {
      it('should calculate 10 words per minute', () => {
        const result: number = service.wordsPerMinuteToMilliseconds(10); // a word every 6 seconds
        // console.debug({ result });
        expect(result).toEqual(6 * 1000);
      });
      it('should calculate 6 words per minute', () => {
        const result: number = service.wordsPerMinuteToMilliseconds(6); // a word every 10 seconds
        // console.debug({ result });
        expect(result).toEqual(10 * 1000);
      });
      it('should calculate 60 words per minute', () => {
        const result: number = service.wordsPerMinuteToMilliseconds(60); // a word every second
        // noinspection PointlessArithmeticExpressionJS
        expect(result).toEqual(1 * 1000);
      });
      it('should calculate 120 words per minute', () => {
        const result: number = service.wordsPerMinuteToMilliseconds(120); // a word every half second
        // noinspection PointlessArithmeticExpressionJS
        expect(result).toEqual(0.5 * 1000);
      });
      it('should calculate a world every 2 minutes', () => {
        const result: number = service.wordsPerMinuteToMilliseconds(0.5); // a word every 2 minutes
        // console.debug({ result });
        const twoMinInSeconds = 120;
        expect(result).toEqual(twoMinInSeconds * 1000);
      });
      it('should return 0 when the input is zero', () => {
        const result: number = service.wordsPerMinuteToMilliseconds(0);
        // console.debug({ result });
        expect(result).toEqual(0);
      });
      it('should return 0 when the input is null', () => {
        const result: number = service.wordsPerMinuteToMilliseconds(null as unknown as number);
        // console.debug({ result });
        expect(result).toEqual(0);
      });
      it('should return 0 when the input is Not a Number (NaN)', () => {
        const result: number = service.wordsPerMinuteToMilliseconds(Number.NaN);
        // console.debug({ result });
        expect(result).toEqual(0);
      });
      it('should return 0 when the input is smaller than 0', () => {
        const result: number = service.wordsPerMinuteToMilliseconds(-1);
        // console.debug({ result });
        expect(result).toEqual(0);
      });
      it('should return 0 when the input is smaller than 0 (extreme case)', () => {
        const result: number = service.wordsPerMinuteToMilliseconds(Number.NEGATIVE_INFINITY);
        // console.debug({ result });
        expect(result).toEqual(0);
      });
    });
  });

  describe('lodash round function sanity checks', () => {
    it('should be defined', () => {
      expect(round).toBeDefined();
    });
    it('should round numbers', () => {
      const initial = 0.12345;
      const final = 0.12; // two decimal places
      expect(round(initial, 2)).toEqual(final);
    });
  });

});
