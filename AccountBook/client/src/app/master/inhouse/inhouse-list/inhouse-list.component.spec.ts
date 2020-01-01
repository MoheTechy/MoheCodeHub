import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InhouseListComponent } from './inhouse-list.component';

describe('InhouseListComponent', () => {
  let component: InhouseListComponent;
  let fixture: ComponentFixture<InhouseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InhouseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InhouseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
