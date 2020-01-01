import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobReportFormComponent } from './job-report-form.component';

describe('JobReportFormComponent', () => {
  let component: JobReportFormComponent;
  let fixture: ComponentFixture<JobReportFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobReportFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
