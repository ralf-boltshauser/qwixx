import { TestBed } from '@angular/core/testing';
import { AppModule } from '../app.module';

import { PwaService } from './pwa.service';

describe('PwaService', () => {
  let service: PwaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    });
    service = TestBed.inject(PwaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
