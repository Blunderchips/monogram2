import { TestBed } from '@angular/core/testing';
import { Dialog } from '@capacitor/dialog';
import { PromptService } from './prompt.service';

describe('PromptService', () => {

  let service: PromptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('have a confirm dialogue', () => {
    expect(Dialog?.confirm).toBeDefined();
  });

});
