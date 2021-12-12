import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TapIconComponent } from './tap-icon.component';

describe('TapIconComponent', () => {

  let component: TapIconComponent;
  let fixture: ComponentFixture<TapIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TapIconComponent,
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TapIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
