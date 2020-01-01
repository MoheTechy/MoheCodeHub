import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';
@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})

export class ConfirmDeleteComponent implements OnInit {

  deleteItem: boolean;
  private result;

  constructor(
    private bottomSheetRef: MatBottomSheetRef,
    @Inject(MAT_BOTTOM_SHEET_DATA) private data: any
  ) { }

  ngOnInit() {
    this.deleteItem = this.data.deleteItem;
  }

  btnClose() {
    const confirmDelete = false;
    this.result = confirmDelete;
    this.bottomSheetRef.dismiss(this.result);
  }

  confirmDelete() {
    const confirmDelete = true;
    this.result = confirmDelete;
    this.bottomSheetRef.dismiss(this.result);
  }

}
