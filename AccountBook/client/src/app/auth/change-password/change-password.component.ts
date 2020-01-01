import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/userManagement/authService/auth.service';
import { UserService } from '../../service/userManagement/userService/user.service';
import { ConfirmDeleteComponent } from '../../general/confirm-delete/confirm-delete.component';
import { MatDialogRef, MatBottomSheet } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  user: any;
  form: FormGroup;
  isError: Boolean = false;
  errMsg: String = '';

  private formSubmitAttempt: boolean;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private bottomSheet: MatBottomSheet,
    private dialogRef: MatDialogRef<ChangePasswordComponent>,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      password: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() { //Save 
    let obj = Object.assign({}, this.form.value);
    obj.emailId = this.user.userName;
    this.userService.changePassword(obj).subscribe(res => {
      this.toastr.success('Updated Successfully!', 'Success');
      this.dialogRef.close();
    })
  }

  btnClose() { //Cancel 
    if (this.form.dirty) {
      const bottomSheetRef = this.bottomSheet.open(ConfirmDeleteComponent, {
        data: { deleteItem: false },
        disableClose: false,
        hasBackdrop: true
      });
      bottomSheetRef.afterDismissed().subscribe(result => {
        if (result === true) {
          this.dialogRef.close();
        }
      }, err => {
        throw err
      });
    } else {
      this.dialogRef.close();
    }
  }

}
