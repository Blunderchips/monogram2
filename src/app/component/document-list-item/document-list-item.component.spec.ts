import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterTestingModule } from '@angular/router/testing';
import { v4 as uuid4 } from 'uuid';
import { MnDocument } from '../../storage';
import { DocumentListItemComponent } from './document-list-item.component';

describe('DocumentListItemComponent', () => {

  let component: DocumentListItemComponent;
  let fixture: ComponentFixture<DocumentListItemComponent>;

  const mockDocument: MnDocument = {
    id: uuid4(),
    name: 'Test document',
    textInput: 'hello world. How are you?',
    updated: new Date().toISOString(),
    wordsPerMinute: 400,
    alignment: 'text-align-center',
    chunkSize: 3,
    weight: 'mat-display-1',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DocumentListItemComponent,
      ],
      imports: [
        RouterTestingModule,
        MatIconModule,
        MatListModule,
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentListItemComponent);
    component = fixture.componentInstance;

    component.document = mockDocument;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
