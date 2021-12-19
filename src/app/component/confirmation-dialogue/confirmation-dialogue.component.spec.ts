import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogue, ConfirmationDialogueComponent } from './confirmation-dialogue.component';

describe('ConfirmationDialogueComponent', () => {

  let component: ConfirmationDialogueComponent;
  let fixture: ComponentFixture<ConfirmationDialogueComponent>;

  const dialogueData: ConfirmationDialogue = {
    title: 'test title',
    message: 'test message',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ConfirmationDialogueComponent,
      ],
      imports: [
        MatDialogModule,
      ],
      providers: [
        {
          provide: MAT_DIALOG_DATA, useValue: dialogueData
        },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
