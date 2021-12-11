import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DocumentComponent } from './document.component';

describe('DocumentComponent', () => {

  let component: DocumentComponent;
  let fixture: ComponentFixture<DocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DocumentComponent,
      ],
      imports: [
        RouterTestingModule,
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
