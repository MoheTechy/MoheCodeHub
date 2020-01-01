import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-lock-config',
  templateUrl: './lock-config.component.html',
  styleUrls: ['./lock-config.component.css']
})

export class LockConfigComponent implements OnInit {
  lockStatus: String;
  expectStatus: String;
  private result;

  constructor(
    private dialogRef: MatDialogRef<LockConfigComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit() {
    this.lockStatus = this.data ? "locked" : "unlocked";
    this.expectStatus = this.data ? "unlock" : "lock";
  }

  btnClose = () => {
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
