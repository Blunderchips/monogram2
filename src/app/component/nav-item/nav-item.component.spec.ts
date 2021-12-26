import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { of, take } from 'rxjs';
import { v4 as uuid4 } from 'uuid';
import { AppRoutingModule } from '../../app-routing.module';
import { DocumentNavigationService } from '../../services/document-navigation';
import { NavItemComponent } from './nav-item.component';

describe('NavItemComponent', () => {

  let component: NavItemComponent;
  let fixture: ComponentFixture<NavItemComponent>;

  let docNav: DocumentNavigationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        NavItemComponent,
      ],
      imports: [
        RouterTestingModule,
        MatButtonModule,
        MatIconModule,
        RouterTestingModule.withRoutes(AppRoutingModule.routes),
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavItemComponent);
    component = fixture.componentInstance;

    docNav = TestBed.inject(DocumentNavigationService);
    component.link = docNav.documentDisplay(uuid4()).link;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('active state checks', () => {
    it('should not return null when testing if active', () => {
      expect(component.active).toBeDefined();
    });
    it('should be active when on the link route', async () => {
      await docNav.documentDisplay(uuid4()).navigate();
      fixture.detectChanges();
      expect(component.active).toBeTrue();
    });
    it('should not be active when not on the link route', async () => {
      await docNav.documentSettings(uuid4()).navigate();
      fixture.detectChanges();
      expect(component.active).toBeFalse();
    });
  });

  describe('colour state checks', () => {
    it('should return "primary" when the link is active', async () => {
      await docNav.documentDisplay(uuid4()).navigate();
      fixture.detectChanges();
      expect(component.colour).toBe('primary');
    });
    it('should return "null" when the link is not active', async () => {
      await docNav.documentSettings(uuid4()).navigate();
      fixture.detectChanges();
      expect(component.colour).toBeNull();
    });
  });

  describe('routerLink disabled state checks', () => {
    it('should enable router link when item is enabled', async () => {
      await docNav.documentDisplay(uuid4()).navigate();
      component.disabled = of(false); // this is what we are testing
      fixture.detectChanges();
      component.routerLink.pipe(take(1)).subscribe(link => {
        expect(link).toBeDefined()
      });
    });
    it('should disable router link when item is disabled', async () => {
      await docNav.documentDisplay(uuid4()).navigate();
      component.disabled = of(true); // this is what we are testing
      fixture.detectChanges();
      component.routerLink.pipe(take(1)).subscribe(link => {
        expect(link).toBeNull();
      });
    });
  });

});
