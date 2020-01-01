import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPaymentFormComponent } from './job-payment-form.component';

describe('JobPaymentFormComponent', () => {
  let component: JobPaymentFormComponent;
  let fixture: ComponentFixture<JobPaymentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobPaymentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobPaymentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
