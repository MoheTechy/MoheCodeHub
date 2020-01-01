import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Globals } from '../../../globals';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { TemplateService } from '../../../service//master/templateService/template.service';
import { MatPaginator, MatSort, MatTableDataSource, MatBottomSheet, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { AuthService } from '../../../service/userManagement/authService/auth.service';
import { ConfirmDeleteComponent } from '../../../general/confirm-delete/confirm-delete.component';
import { ToastrService } from 'ngx-toastr';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { ScopeService } from '../../../service/master/scopeService/scope.service';
import { ScopeFormComponent } from '../../../master/scope/scope-form/scope-form.component';
import { DtpBindFormatService } from '../../../service/general/dtpBindFormatService/dtp-bind-format.service';
import { debug } from 'util';
const URL = 'http://localhost:3000/api/template';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });
  templateForm: any;
  user: any;
  isUpdate: boolean = false;
  isNew: boolean = false;
  inputData: any;
  scopes: any;
  file: any;
  scopeName: string;

  constructor(
    private globals: Globals,
    private fb: FormBuilder,
    private templateService: TemplateService,
    private authService: AuthService,
    private dialogRef: MatDialogRef<TemplateComponent>,
    private bottomSheet: MatBottomSheet,
    private toaster: ToastrService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private ScopeService: ScopeService,
    private dtpService: DtpBindFormatService
  ) {
    this.templateForm = fb.group({
      'templateName': [null, Validators.required],
      'template': [null],
      'scope': [null, Validators.required]
    });
  }

  ngOnInit() {

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      this.file = file;
    };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
    };

    this.user = this.authService.getFromLocalStorage('currentUser');
    if (Object.keys(this.data).length !== 0) {
      this.isUpdate = true;
      this.templateForm.patchValue({
        templateName: this.data.templateName,
        scope: this.data.scope
      })
    }
    else {
      this.isNew = true;
    }
    this.ScopeService.getRecord().then(res => {
      this.scopes = res;
    })
    let id: number = this.data.id;
    if (id) {
      this.ScopeService.getRecordByID(this.templateForm.value.scope).then(result => {
        this.scopeName = result.scopeName;
      });
    }
  }

  nameChanged() {
    if (this.file && this.templateForm.value.templateName && this.templateForm.value.scope) {
      this.file.file.name = this.templateForm.value.templateName + '_' + this.scopeName + '_' + this.file.file.name;
    }
  }

  get f() {
    return this.templateForm.controls;
  }

  btnClose() {
    if (this.templateForm.dirty) {
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

  getScopeName(scopeId) {
    let id: number = this.data.id;
    if (id) {
      this.ScopeService.getRecordByID(scopeId).then(result => {
        this.scopeName = result.scopeName;
      });
    } else {
      this.ScopeService.getRecordByID(this.templateForm.value.scope).then(result => {
        this.scopeName = result.scopeName;
      });
    }
  }

  save(): void {
    this.nameChanged();
    this.inputData = {
      templateName: this.templateForm.value.templateName,
      templateFileName:this.file.file.name,
      scope: this.templateForm.value.scope,
      createdBy: this.user.name,
      updatedBy: this.user.name
    };
    this.getScopeName(this.templateForm.value.scope);
    let id: number = this.data.id;
    if (id) {
      this.inputData.id = this.data.id;
      this.templateService.updateRecord(this.inputData).subscribe(res => {
        if (res['statusBool'] == -1) {
          this.toaster.error(res['statusText']);
        }
        else {
          this.uploader.uploadAll();
          this.toaster.success(res['statusText']);
          this.dialogRef.close();
        }
      }, err => {
        throw err
      });
    } else {
      this.templateService.createRecord(this.inputData).subscribe(res => {
        if (res['statusBool'] == -1) {
          this.toaster.error(res['statusText']);
        }
        else {
          this.uploader.uploadAll();
          this.toaster.success(res['statusText']);
          this.dialogRef.close();
        }
      }, err => {
        throw err
      });
    }
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

