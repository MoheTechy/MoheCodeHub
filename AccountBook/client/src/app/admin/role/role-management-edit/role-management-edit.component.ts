import { Component, OnInit } from '@angular/core';
import { PermissionService } from '../../../service/userManagement/permissionService/permission.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { RoleManagementService } from '../../../service/userManagement/roleManagementService/role-management.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDeleteComponent } from '../../../general/confirm-delete/confirm-delete.component';
import { MatBottomSheet } from '@angular/material';
import { AuthService } from '../../../service/userManagement/authService/auth.service';
import { CustomValidators } from '../../../general/customValidators';
import { Globals } from '../../../globals'
@Component({
  selector: 'app-role-management-edit',
  templateUrl: './role-management-edit.component.html',
  styleUrls: ['./role-management-edit.component.css']
})

export class RoleManagementEditComponent implements OnInit {

  permissions = [];
  inputData: any;
  data: any;
  chkAllWrite = true;
  chkAllRead = true;
  chkAllReadWrite = true;
  user: any;
  permissionData = [];
  isNew: boolean = false;
  isEdit: boolean = false;
  roleForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private permissionService: PermissionService,
    private roleManagementService: RoleManagementService,
    private toaster: ToastrService,
    private bottomSheet: MatBottomSheet,
    private authService: AuthService,
    private fb: FormBuilder,
    private globals: Globals
  ) {
    this.globals.viewName = 'Roles'
    this.roleForm = fb.group({
      'id': '',
      'name': [null, Validators.compose([Validators.required, CustomValidators.nospaceValidator()])],
      'description': [null],
    });
  }

  ngOnInit() {
    let id: number = this.route.snapshot.queryParams.id;
    if (!id) {
      this.isNew = true;
    }
    else {
      this.isEdit = true;
      this.bindData(id);
    }
    this.getPermissions(id);
    this.user = this.authService.getFromLocalStorage('currentUser');
  }

  getPermissions = (id) => {
    if (id) {
      this.permissionService.getRecordByID(id).then(res => {
        this.permissions = res;
        if (this.permissions.length > 0) {
          this.showPermissions();
        }
      });
    }
    else {
      this.permissionService.getRecord().then(res => {
        this.permissions = res;
        if (this.permissions.length > 0) {
          this.showPermissions();
        }
      })
    }
  }

  changeRead = (id, checked) => {
    if (this.permissions !== undefined && this.permissions.length > 0) {
      this.permissions.forEach(element => {
        if (element.id === id) {
          element.isRead = !checked;
          if (element.isRead || element.isRead == false) {
            element.isWrite = false;
          }
        }
      });
    }
    this.showPermissions();
  }

  changeWrite = (id, checked) => {
    if (this.permissions !== undefined && this.permissions.length > 0) {
      this.permissions.forEach(element => {
        if (element.id === id) {
          element.isWrite = !checked;
          if (element.isWrite) {
            element.isRead = true;
          }
        }
      });
    }
    this.showPermissions();
  }

  selectAllRead = () => {
    if (this.permissions) {
      this.permissions.forEach(el => {
        el.isRead = this.chkAllRead;
        if (this.chkAllRead) {
          el.isWrite = !this.chkAllRead;
        }
      });
      this.chkAllRead = !this.chkAllRead;
    }
    this.showPermissions();
  }

  selectAllWrite = () => {
    if (this.permissions) {
      this.permissions.forEach(el => {
        el.isWrite = this.chkAllWrite;
        el.isRead = this.chkAllWrite;
      });
      this.chkAllWrite = !this.chkAllWrite;
    }
    this.showPermissions();
  }

  selectAllReadWrite = () => {
    if (this.permissions) {
      this.permissions.forEach(el => {
        el.isWrite = this.chkAllReadWrite;
        el.isRead = this.chkAllReadWrite;
      });
      this.chkAllReadWrite = !this.chkAllReadWrite;
    }
    this.showPermissions();
  }

  bindData = (id) => {
    this.roleManagementService.getRecordByID(id).then(res => {
      if (res) {
        this.data = res;
        this.roleForm.patchValue({
          name: this.data.name,
          description: this.data.description
        })
        if (this.permissions.length > 0) {
          this.showPermissions();
        }
      }
    });
  }

  save(permissionData): void {
    let rolesPermissionData = permissionData;
    const access = [];
    rolesPermissionData.forEach(arr => {
      if (arr.module == "") {
        access.push({
          id: arr.id,
          module: arr.module,
          name: arr.name,
          isRead: arr.isRead,
          isWrite: arr.isWrite,
          isActive: arr.isActive
        });
      }
    });
    let inputs = [];
    inputs[0] = {
      id: this.route.snapshot.queryParams.id,
      roleName: this.roleForm.value.name,
      roleDescription: this.roleForm.value.description,
      createdBy: this.user.name,
      updatedBy: this.user.name,
      rolesPermissionData: access
    }
    let id = this.route.snapshot.queryParams.id
    if (id !== undefined) {
      this.preparePermissions();
      this.roleManagementService.updateRecord(inputs[0]).subscribe(res => {
        if (res['statusBool'] == -1) {
          this.toaster.error(res['statusText']);
        }
        else {
          this.toaster.success(res['statusText']);
          this.router.navigateByUrl('admin/viewRole');
        }
      }, err => {
        throw err;
      });
      for (let i = 0; i < rolesPermissionData.length; i++) {
        if (!rolesPermissionData[i].module) {
          this.roleManagementService.updateRolePermissionRecord(rolesPermissionData[i]).subscribe(res => {
          }, err => {
            throw err;
          })
        }
      }
    } else {
      this.preparePermissions();
      this.roleManagementService.createRecord(inputs[0]).subscribe(res => {
        if (res['statusBool'] == -1) {
          this.toaster.error(res['statusText']);
        }
        else {
          this.toaster.success(res['statusText']);
          this.router.navigateByUrl('admin/viewRole');
        }
      }, err => {
        throw err;
      });
    }
  }

  preparePermissions = () => {
    if (this.permissions) {
      const arr = [];
      this.permissions.forEach(element => {
        if (element.isRead === undefined) {
          element.isRead = false;
        }
        if (element.isWrite === undefined) {
          element.isWrite = false;
        }
        arr.push({
          module: element.module,
          name: element.name,
          isRead: element.isRead,
          isWrite: element.isWrite,
          isActive: element.isActive
        });
      });
      this.permissions = arr;
    }
  }

  showPermissions = () => {
    let temp = [];
    let uniqueModules = [];
    this.permissions.forEach(element => {
      let flag = false;
      if (uniqueModules.length === 0) {
        uniqueModules.push(element.module);
      } else {
        uniqueModules.forEach(elem => {
          if (elem === element.module) {
            flag = true;
          }
        });
        if (!flag) {
          uniqueModules.push(element.module);
        }
      }
    });
    if (uniqueModules.length > 0) {
      uniqueModules.forEach(elem => {
        let isFirst = false;
        this.permissions.forEach((element, index) => {
          if (elem === element.module) {
            if (!isFirst) {
              isFirst = true;
              temp.push({
                id: element.id,
                module: element.module,
                name: '',
                isRead: '',
                isWrite: '',
                isActive: element.isActive
              });
              temp.push({
                id: element.id,
                module: '',
                name: element.name,
                isRead: element.isRead,
                isWrite: element.isWrite,
                isActive: element.isActive
              });
            } else {
              temp.push({
                id: element.id,
                module: '',
                name: element.name,
                isRead: element.isRead,
                isWrite: element.isWrite,
                isActive: element.isActive
              });
            }
          }
        });
      });
    }
    this.permissionData = temp;
  }

  btnClose() {
    if (this.roleForm.dirty) {
      const bottomSheetRef = this.bottomSheet.open(ConfirmDeleteComponent, {
        data: { deleteItem: false },
        disableClose: false,
        hasBackdrop: true
      });
      bottomSheetRef.afterDismissed().subscribe(result => {
        if (result === true) {
          this.router.navigateByUrl('admin/viewRole');
        }
      });
    } else {
      this.router.navigateByUrl('admin/viewRole');
    }
  }

  get f() {
    return this.roleForm.controls;
  }

}
