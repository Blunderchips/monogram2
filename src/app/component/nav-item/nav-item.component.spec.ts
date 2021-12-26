import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, take } from 'rxjs';
import { v4 as uuid4 } from 'uuid';
import { AppRoutingModule } from '../../app-routing.module';
import { NavItemComponent } from './nav-item.component';

describe('NavItemComponent', () => {

  let component: NavItemComponent;
  let fixture: ComponentFixture<NavItemComponent>;

  let router: Router;

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
    router = TestBed.inject(Router);

    component.link = ['/', 'reader', uuid4()];

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
      await router.navigateByUrl(`/reader/${uuid4()}`);
      fixture.detectChanges();
      expect(component.active).toBeTrue();
    });
    it('should not be active when not on the link route', async () => {
      await router.navigateByUrl(`/settings/${uuid4()}`);
      fixture.detectChanges();
      expect(component.active).toBeFalse();
    });
  });

  describe('colour state checks', () => {
    it('should return "primary" when the link is active', async () => {
      await router.navigateByUrl(`/reader/${uuid4()}`);
      fixture.detectChanges();
      expect(component.colour).toBe('primary');
    });
    it('should return "null" when the link is not active', async () => {
      await router.navigateByUrl(`/settings/${uuid4()}`);
      fixture.detectChanges();
      expect(component.colour).toBeNull();
    });
  });

  describe('routerLink disabled state checks', () => {
    it('should enable router link when item is enabled', async () => {
      await router.navigateByUrl(`/reader/${uuid4()}`);
      component.disabled = of(false);
      fixture.detectChanges();
      component.routerLink.pipe(take(1)).subscribe(link => {
        expect(link).toBeDefined()
      });
    });
    it('should disable router link when item is disabled', async () => {
      await router.navigateByUrl(`/reader/${uuid4()}`);
      component.disabled = of(true);
      fixture.detectChanges();
      component.routerLink.pipe(take(1)).subscribe(link => {
        expect(link).toBeNull();
      });
    });
  });

});
