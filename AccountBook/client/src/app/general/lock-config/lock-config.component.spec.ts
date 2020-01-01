import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LockConfigComponent } from './lock-config.component';

describe('LockConfigComponent', () => {
  let component: LockConfigComponent;
  let fixture: ComponentFixture<LockConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LockConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LockConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
