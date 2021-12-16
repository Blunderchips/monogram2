import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { ReaderComponent } from './reader.component';

describe('ReaderComponent', () => {

  let component: ReaderComponent;
  let fixture: ComponentFixture<ReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ReaderComponent
      ],
      imports: [
        NgxsModule.forRoot(),
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});