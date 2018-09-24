import { TestBed } from '@angular/core/testing';

import { MsgDataService } from './msg-data.service';

describe('MsgDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MsgDataService = TestBed.get(MsgDataService);
    expect(service).toBeTruthy();
  });
});
