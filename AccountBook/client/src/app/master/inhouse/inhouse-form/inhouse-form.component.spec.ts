import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InhouseFormComponent } from './inhouse-form.component';

describe('InhouseFormComponent', () => {
  let component: InhouseFormComponent;
  let fixture: ComponentFixture<InhouseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InhouseFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InhouseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
