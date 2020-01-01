import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { WorkOrderService } from '../../../service/transaction/workOrderService/work-order.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../service/userManagement/authService/auth.service';
import { CustomValidators } from '../../../general/customValidators';
import { ClientService } from '../../../service/master/clientService/client.service';
import { EnduserServiceService } from '../../../service/master/enduserService/enduser-service.service';
import { LocationService } from '../../../service/master/locationService/location.service';
import { ScopeService } from '../../../service/master/scopeService/scope.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatBottomSheet, MatDialog } from '@angular/material';
import { ConfirmDeleteComponent } from '../../../general/confirm-delete/confirm-delete.component';
import { ClientFormComponent } from '../../../master/client/client-form/client-form.component';
import { EnduserFormComponent } from '../../../master/enduser/enduser-form/enduser-form.component';
import { LocationFormComponent } from '../../../master/location/location-form/location-form.component';
import { ScopeFormComponent } from '../../../master/scope/scope-form/scope-form.component';
import { DtpBindFormatService } from '../../../service/general/dtpBindFormatService/dtp-bind-format.service';

@Component({
  selector: 'app-work-order-add',
  templateUrl: './work-order-add.component.html',
  styleUrls: ['./work-order-add.component.css']
})
export class WorkOrderAddComponent implements OnInit {

  workOrderForm: any;
  user: any;
  isUpdate: boolean = false;
  isNew: boolean = false;
  inputData: any;
  clients: any;
  endUsers: any;
  locations: any;
  scopes: any;
  projects: any;
  data: any;

  constructor(
    private WorkOrderService: WorkOrderService,
    private route: ActivatedRoute,
    private toaster: ToastrService,
    private authService: AuthService,
    private bottomSheet: MatBottomSheet,
    private fb: FormBuilder,
    private ClientService: ClientService,
    private EnduserServiceService: EnduserServiceService,
    private LocationService: LocationService,
    private ScopeService: ScopeService,
    private router: Router,
    private dialog: MatDialog,
    private dtpBinder: DtpBindFormatService

  ) {
    this.workOrderForm = fb.group({
      'project': [null, Validators.compose([Validators.required, CustomValidators.nospaceValidator()])],
      'enquiryDate': [null, Validators.compose([Validators.required])],
      'client': [null, Validators.compose([Validators.required])],
      'endUser': [null, Validators.compose([Validators.required])],
      'clientCoordinator': [null, Validators.compose([Validators.required, CustomValidators.nospaceValidator()])],
      'enquiryHandled': [{ value: 'someValue', disabled: true }, Validators.compose([Validators.required])],
      'location': [null, Validators.compose([Validators.required])],
      'scope': [null, Validators.compose([Validators.required])],
      'workType': [null, Validators.compose([Validators.required])],
      'noOfDays': [null, Validators.required],
      'remarks': [null]
    });
  }

  ngOnInit() {
    this.projects = [{ id: '1', name: 'cuteInspection' }, { id: '2', name: 'cuteOffice' }];
    this.ClientService.getRecord().then(res => {
      this.clients = res;
    })
    // this.EnduserServiceService.getEndUsers().then(res => {
    //   this.endUsers = res;
    // })
    this.LocationService.getRecord().then(res => {
      this.locations = res;
    })
    this.ScopeService.getRecord().then(res => {
      this.scopes = res;
    })
    this.user = this.authService.getFromLocalStorage('currentUser');
    let id: number = this.route.snapshot.queryParams.id;
    if (id) {
      this.WorkOrderService.getJobById(id).then(res => {
        this.data = res;
        this.isUpdate = true;
        this.workOrderForm.patchValue({
          project: this.data.project,
          enquiryDate: this.data.enqDate,
          client: this.data.clientId,
          endUser: this.data.endUserId,
          clientCoordinator: this.data.clientCoordinator,
          enquiryHandled: this.data.enquiryHandled,
          location: this.data.locationId,
          scope: this.data.scopeId,
          workType: this.data.workType,
          noOfDays: this.data.noOfDays,
          remarks: this.data.remarks
        })
      })
    }
    else {
      this.isNew = true;
      this.workOrderForm.patchValue({
        enquiryHandled: this.user.name
      })
    }
  }

  get f() {
    return this.workOrderForm.controls;
  }

  save(): void {
    let id: number = this.route.snapshot.queryParams.id;
    this.inputData = {
      id: this.route.snapshot.queryParams.id,
      project: this.workOrderForm.value.project,
      enquiryDate: (this.dtpBinder.convert(this.workOrderForm.value.enquiryDate)),
      client: this.workOrderForm.value.client,
      endUser: this.workOrderForm.value.endUser,
      clientCoordinator: this.workOrderForm.value.clientCoordinator,
      enquiryHandled: this.user.name,
      location: this.workOrderForm.value.location,
      scope: this.workOrderForm.value.scope,
      remarks: this.workOrderForm.value.remarks,
      workType: this.workOrderForm.value.workType,
      noOfDays: this.workOrderForm.value.noOfDays,
      createdBy: this.user.name,
      updatedBy: this.user.name
    };
    if (id) {
      this.WorkOrderService.updateRecord(this.inputData).subscribe(res => {
        if (res['statusBool'] == -1) {
          this.toaster.error(res['statusText']);
        }
        else if (res['statusBool'] == -2) {
          this.toaster.error(res['statusText']);
        }
        else if (res['statusBool'] == -3) {
          this.toaster.error(res['statusText']);
        }
        else {
          this.toaster.success(res['statusText']);
          if (this.isNew) {
            this.router.navigateByUrl('transaction/viewWorkOrder');
          }
          else {
            this.router.navigate(['transaction/viewDetailedWorkOrder'], { queryParams: { id: id } });
          }
        }
      }, err => {
        throw err
      });
    } else {
      this.WorkOrderService.createRecord(this.inputData).subscribe(res => {
        if (res['statusBool'] == -1) {
          this.toaster.error(res['statusText']);
        }
        else if (res['statusBool'] == -2) {
          this.toaster.error(res['statusText']);
        }
        else if (res['statusBool'] == -3) {
          this.toaster.error(res['statusText']);
        }
        else {
          this.toaster.success(res['statusText']);
          if (this.isNew) {
            this.router.navigateByUrl('transaction/viewWorkOrder');
          }
          else {
            this.router.navigate(['transaction/viewDetailedWorkOrder'], { queryParams: { id: id } });
          }
        }
      }, err => {
        throw err
      });
    }
  }

  btnClose() {
    let id: number = this.route.snapshot.queryParams.id;
    if (this.isNew) {
      if (this.workOrderForm.dirty) {
        const bottomSheetRef = this.bottomSheet.open(ConfirmDeleteComponent, {
          data: { deleteItem: false },
          disableClose: false,
          hasBackdrop: true
        });
        bottomSheetRef.afterDismissed().subscribe(result => {
          if (result === true) {
            this.router.navigateByUrl('transaction/viewWorkOrder');
          }
        });
      } else {
        this.router.navigateByUrl('transaction/viewWorkOrder');
      }
    }
    else {
      if (this.workOrderForm.dirty) {
        const bottomSheetRef = this.bottomSheet.open(ConfirmDeleteComponent, {
          data: { deleteItem: false },
          disableClose: false,
          hasBackdrop: true
        });
        bottomSheetRef.afterDismissed().subscribe(result => {
          if (result === true) {
            this.router.navigate(['transaction/viewDetailedWorkOrder'], { queryParams: { id: id } });
          }
        });
      } else {
        this.router.navigate(['transaction/viewDetailedWorkOrder'], { queryParams: { id: id } });
      }
    }

  }

  addClient() {
    let dialogRef = this.dialog.open(ClientFormComponent, {
      data: {},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  addEndUser() {
    let dialogRef = this.dialog.open(EnduserFormComponent, {
      data: {},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  addLocation() {
    let dialogRef = this.dialog.open(LocationFormComponent, {
      data: {},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  addScope() {
    let dialogRef = this.dialog.open(ScopeFormComponent, {
      data: {},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

}

