import { TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { MonogramState } from '../state';
import { RendererService } from './renderer.service';

describe('RendererService', () => {

  let service: RendererService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([MonogramState,]),]
    });
    service = TestBed.inject(RendererService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
