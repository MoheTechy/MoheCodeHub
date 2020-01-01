import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { PermissionService } from '../../../service/userManagement/permissionService/permission.service';

@Component({
  selector: 'app-permission-user-and-rolelist',
  templateUrl: './permission-user-and-rolelist.component.html',
  styleUrls: ['./permission-user-and-rolelist.component.css']
})

export class PermissionUserAndRolelistComponent implements OnInit {
  
  user: any; 
  selectedPermission: any; 
  userData: any = []; 
  roleData: any = [];
  public module: string; 
  public name: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private permissionService: PermissionService
  ) { }

  ngOnInit() {
    this.getUserRolePermission();
  }

  getUserRolePermission() {
    this.permissionService.getUserRoleByID(this.data).then(res => {
      this.selectedPermission = res;
      this.module = this.selectedPermission[0].module;
      this.name = this.selectedPermission[0].name;
      var flags = [], i;
      for (i = 0; i < this.selectedPermission.length; i++) {
        if (flags[this.selectedPermission[i].roles]) continue;
        flags[this.selectedPermission[i].roles] = true;
        this.roleData.push(this.selectedPermission[i].roles);
      }
      for (i = 0; i < this.selectedPermission.length; i++) {
        if (flags[this.selectedPermission[i].users]) continue;
        flags[this.selectedPermission[i].users] = true;
        this.userData.push(this.selectedPermission[i].users);
      }
    })
  }

}
