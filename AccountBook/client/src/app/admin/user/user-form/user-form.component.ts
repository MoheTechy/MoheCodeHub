import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatBottomSheet } from '@angular/material';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmDeleteComponent } from '../../../general/confirm-delete/confirm-delete.component';
import { UserService } from '../../../service/userManagement/userService/user.service';
import { RoleManagementService } from '../../../service/userManagement/roleManagementService/role-management.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../service/userManagement/authService/auth.service';
import { CustomValidators } from '../../../general/customValidators';
import { Globals } from '../../../globals';

@Component({
  selector: 'app--user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})

export class UserFormComponent implements OnInit {

  inputData: any;
  roles = [];
  ROLES = [];
  selectedRoles = [];
  selected: any;
  user: any;
  isNew: boolean = false;
  isUpdate: boolean = false;
  userForm: FormGroup;

  constructor(
    private bottomSheet: MatBottomSheet,
    private dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private userService: UserService,
    private roleService: RoleManagementService,
    private toaster: ToastrService,
    private authService: AuthService,
    private fb: FormBuilder,
    private globals: Globals
  ) {
    this.globals.viewName = 'User';
    this.userForm = fb.group({
      'id': '',
      'name': [null, Validators.compose([Validators.required, CustomValidators.nospaceValidator()])],
      'loginId': [null, Validators.compose([Validators.required, CustomValidators.nospaceValidator()])],
      'emailId': [null, Validators.compose([Validators.required, CustomValidators.emailPattern()])],
      'contactNumber': [null, Validators.compose([Validators.required, CustomValidators.phoneNumberPattern()])],
      'role': [null, Validators.required]
    });
  }

  ngOnInit() {
    this.user = this.authService.getFromLocalStorage('currentUser');
    this.getRoles();
    if (Object.keys(this.data).length !== 0) {
      this.isUpdate = true;
      this.bindRoles(this.data.roles);
    debugger
      this.userForm.patchValue({
        name: this.data.name,
        loginId: this.data.loginId,
        emailId: this.data.emailId,
        role: this.selected,
        contactNumber: this.data.contactNumber
      })
    }
    else {
      this.isNew = true;
    }
  }

  getRoles = () => {
    this.roleService.getRecord().then(res => {
      this.ROLES = res;
      if (this.ROLES.length > 0) {
        this.ROLES.forEach(element => {
          this.roles.push(element.name);
        });
      }
    });
  }

  bindRoles = (roles) => {
    if (roles !== undefined && roles.length > 0) {
      const arr = [];
      let x;
      x = roles.split(',');
      x.forEach(element => {
        element = element.trim();
        if (element !== undefined) {
          arr.push(element);
        }
      });
      this.selected = arr;
    }
  }

  save(): void {
    this.inputData = {
      name: this.userForm.value.name,
      loginId: this.userForm.value.loginId,
      emailId: this.userForm.value.emailId,
      role: this.userForm.value.role,
      contactCode: null,
      contactNumber: this.userForm.value.contactNumber,
      createdBy: this.user.name,
      updatedBy: this.user.name
    };
    this.prepareRoles(this.inputData.role);
    this.inputData.role = this.selectedRoles;
    let id: number = this.data.id;
    if (id) {
      this.inputData.id = this.data.id;
      this.userService.updateRecord(this.inputData).subscribe(res => {
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
          this.dialogRef.close();
        }
      }, err => {
        throw err
      });
    } else {
      this.userService.createRecord(this.inputData).subscribe(res => {
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
          this.dialogRef.close();
        }
      }, err => {
        throw err
      });
    }
  }

  prepareRoles = (selectedRoles) => {
    if (this.ROLES !== undefined && this.ROLES.length > 0) {
      if (selectedRoles !== undefined && selectedRoles.length > 0) {
        const arr = [];
        selectedRoles.forEach(element => {
          this.ROLES.forEach(row => {
            if (element === row.name) {
              arr.push({
                'id': row.id,
              });
            }
          });
        });
        this.selectedRoles = arr;
      }
    }
  }

  btnClose() {
    if (this.userForm.dirty) {
      const bottomSheetRef = this.bottomSheet.open(ConfirmDeleteComponent, {
        data: { deleteItem: false },
        disableClose: false,
        hasBackdrop: true
      });
      bottomSheetRef.afterDismissed().subscribe(result => {
        if (result === true) {
          this.dialogRef.close();
        }
      });
    } else {
      this.dialogRef.close();
    }
  }

  get f() {
    return this.userForm.controls;
  }

}
