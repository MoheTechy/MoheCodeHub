import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCommentFormComponent } from './job-comment-form.component';

describe('JobCommentFormComponent', () => {
  let component: JobCommentFormComponent;
  let fixture: ComponentFixture<JobCommentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobCommentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobCommentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
