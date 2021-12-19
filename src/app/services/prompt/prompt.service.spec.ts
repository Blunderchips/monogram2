import { TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogue } from '../../component/confirmation-dialogue';
import { PromptService } from './prompt.service';

describe('PromptService', () => {

  let service: PromptService;

  const dialogueData: ConfirmationDialogue = {
    title: 'test title',
    message: 'test message',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
      ],
      providers: [
        {
          provide: MAT_DIALOG_DATA, useValue: dialogueData
        },
        { provide: MatDialogRef, useValue: {} },
      ],
    });
    service = TestBed.inject(PromptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
