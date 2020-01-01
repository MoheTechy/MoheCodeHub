import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionUserAndRolelistComponent } from './permission-user-and-rolelist.component';

describe('PermissionUserAndRolelistComponent', () => {
  let component: PermissionUserAndRolelistComponent;
  let fixture: ComponentFixture<PermissionUserAndRolelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionUserAndRolelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionUserAndRolelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
