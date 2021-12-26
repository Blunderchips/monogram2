import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule } from '../../app-routing.module';
import { DocumentNavigationService } from './document-navigation.service';

describe('DocumentNavigationService', () => {

  let service: DocumentNavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(AppRoutingModule.routes),
      ]
    });
    service = TestBed.inject(DocumentNavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
