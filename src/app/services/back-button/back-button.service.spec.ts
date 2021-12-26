import { TestBed } from '@angular/core/testing';
import { BackButtonService } from './back-button.service';

describe('BackButtonService', () => {

  let service: BackButtonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackButtonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have an event observable', () => {
    expect(service.event).toBeDefined();
  });

  it('should have an event subject', () => {
    expect(service.subject).toBeDefined();
  });

});
