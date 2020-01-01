import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobReportTemplateListComponent } from './job-report-template-list.component';

describe('JobReportTemplateListComponent', () => {
  let component: JobReportTemplateListComponent;
  let fixture: ComponentFixture<JobReportTemplateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobReportTemplateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobReportTemplateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
