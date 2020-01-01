import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ConfirmDeleteComponent } from '../../../general/confirm-delete/confirm-delete.component';
import { MatDialogRef, MatBottomSheet } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../service/userManagement/authService/auth.service';
import { WorkOrderService } from '../../../service/transaction/workOrderService/work-order.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-job-comment-form',
  templateUrl: './job-comment-form.component.html',
  styleUrls: ['./job-comment-form.component.css']
})
export class JobCommentFormComponent implements OnInit {

  commentForm: any;
  inputData: any;
  user: any;

  constructor(
    private bottomSheet: MatBottomSheet,
    private dialogRef: MatDialogRef<JobCommentFormComponent>,
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private workOrderService: WorkOrderService,
    private toaster: ToastrService
  ) {
    this.commentForm = fb.group({
      'comment': [null, Validators.required]
    });
  }

  ngOnInit() {
    this.user = this.authService.getFromLocalStorage('currentUser');
  }

  btnClose() {
    if (this.commentForm.dirty) {
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

  save() {
    let id: number = this.route.snapshot.queryParams.id;
    this.inputData = {
      jobId: id,
      comment: this.commentForm.value.comment,
      createdBy: this.user.name
    }
    this.workOrderService.addComment(this.inputData).subscribe(res => {
      if (res['statusBool'] == -1) {
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

  get f() {
    return this.commentForm.controls;
  }

}
