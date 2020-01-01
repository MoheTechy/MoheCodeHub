import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatIconModule,
  MatSelectModule,
  MatOptionModule,
  MatDatepickerModule,
  MatBottomSheetModule,
  MatListModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatStepperModule,
  MatDialogModule,
  MatRadioModule,
  MatCardModule,
  MatSlideToggleModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './user/user-form/user-form.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { ConfirmDialogComponent } from '../general/confirm-dialog/confirm-dialog.component'
import { PermissionViewComponent } from './permission/permission-view/permission-view.component';
import { RoleManagementViewComponent } from './role/role-management-view/role-management-view.component';
import { RoleManagementEditComponent } from './role/role-management-edit/role-management-edit.component';
import { LockConfigComponent } from '../general/lock-config/lock-config.component';
import { PermissionUserAndRolelistComponent } from './permission/permission-user-and-rolelist/permission-user-and-rolelist.component';
import { PermissionFormComponent } from './permission/permission-form/permission-form.component';
@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatBottomSheetModule,
    MatListModule,
    MatButtonToggleModule,
    MatRadioModule,
    MatCheckboxModule,
    MatStepperModule,
    MatDialogModule,
    MatCardModule,
    MatSlideToggleModule
  ],
  declarations: [
    UserFormComponent,
    UserListComponent,
    ConfirmDialogComponent,
    PermissionViewComponent,
    RoleManagementViewComponent,
    RoleManagementEditComponent,
    LockConfigComponent,
    PermissionUserAndRolelistComponent,
    PermissionFormComponent
  ],
  entryComponents: [
    ConfirmDialogComponent,
    LockConfigComponent,
    PermissionUserAndRolelistComponent
  ]
})
export class AdminModule { }
