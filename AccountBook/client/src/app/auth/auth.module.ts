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
  MatToolbarModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './change-password/change-password.component';

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
    MatToolbarModule,
    MatProgressSpinnerModule
  ],
  declarations: [ChangePasswordComponent]
})

export class AuthModule { }
