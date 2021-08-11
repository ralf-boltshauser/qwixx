import { TestBed } from '@angular/core/testing';
import { AppModule } from '../app.module';

import { MultiplayerService } from './multiplayer.service';

describe('MultiplayerService', () => {
  let service: MultiplayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    });
    service = TestBed.inject(MultiplayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
