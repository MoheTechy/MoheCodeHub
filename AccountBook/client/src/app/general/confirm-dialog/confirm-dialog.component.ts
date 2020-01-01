import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})

export class ConfirmDialogComponent implements OnInit {

  private result;

  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) { }

  ngOnInit() {
  }

  btnClose() {
    const confirm = false;
    this.result = confirm;
    this.dialogRef.close(this.result);
  }

  confirm() {
    const confirm = true;
    this.result = confirm;
    this.dialogRef.close(this.result);
  }

}
