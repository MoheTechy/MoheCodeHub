import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJobInvoiceComponent } from './add-job-invoice.component';

describe('AddJobInvoiceComponent', () => {
  let component: AddJobInvoiceComponent;
  let fixture: ComponentFixture<AddJobInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddJobInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJobInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
