import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispalyMsgComponent } from './dispaly-msg.component';

describe('DispalyMsgComponent', () => {
  let component: DispalyMsgComponent;
  let fixture: ComponentFixture<DispalyMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispalyMsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispalyMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
