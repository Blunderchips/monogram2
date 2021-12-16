import { TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { StorageState } from '../../storage';
import { RendererService } from './renderer.service';

describe('RendererService', () => {

  let service: RendererService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([
          StorageState
        ]),
      ],
    });
    service = TestBed.inject(RendererService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
