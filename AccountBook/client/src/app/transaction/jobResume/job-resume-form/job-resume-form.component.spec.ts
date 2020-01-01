import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobResumeFormComponent } from './job-resume-form.component';

describe('JobResumeFormComponent', () => {
  let component: JobResumeFormComponent;
  let fixture: ComponentFixture<JobResumeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobResumeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobResumeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
