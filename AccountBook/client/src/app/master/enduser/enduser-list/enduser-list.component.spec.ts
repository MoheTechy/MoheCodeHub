import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnduserListComponent } from './enduser-list.component';

describe('EnduserListComponent', () => {
  let component: EnduserListComponent;
  let fixture: ComponentFixture<EnduserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnduserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnduserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
