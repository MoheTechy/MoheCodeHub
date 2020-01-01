import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppDashboardComponent } from './app-dashboard/app-dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './service/userManagement/authService/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { UserFormComponent } from './admin/user/user-form/user-form.component';
import { UserListComponent } from './admin/user/user-list/user-list.component';
import { SpinnerComponent } from './general/spinner/spinner.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { PermissionViewComponent } from './admin/permission/permission-view/permission-view.component';
import { RoleManagementViewComponent } from './admin/role/role-management-view/role-management-view.component';
import { RoleManagementEditComponent } from './admin/role/role-management-edit/role-management-edit.component';
import { ClientListComponent } from './master/client/client-list/client-list.component';
import { ClientFormComponent } from './master/client/client-form/client-form.component';
import { EnduserListComponent } from './master/enduser/enduser-list/enduser-list.component';
import { EnduserFormComponent } from './master/enduser/enduser-form/enduser-form.component';
import { LocationListComponent } from './master/location/location-list/location-list.component';
import { LocationFormComponent } from './master/location/location-form/location-form.component';
import { AssociateFormComponent } from './master/associate/associate-form/associate-form.component';
import { AssociateListComponent } from './master/associate/associate-list/associate-list.component';
import { ScopeFormComponent } from './master/scope/scope-form/scope-form.component';
import { ScopeListComponent } from './master/scope/scope-list/scope-list.component';
import { FreelancerFormComponent } from './master/freelancer/freelancer-form/freelancer-form.component';
import { FreelancerListComponent } from './master/freelancer/freelancer-list/freelancer-list.component';
import { CountryListComponent } from './master/country/country-list/country-list.component';
import { CountryFormComponent } from './master/country/country-form/country-form.component';
import { CurrencyListComponent } from './master/currency/currency-list/currency-list.component';
import { CurrencyFormComponent } from './master/currency/currency-form/currency-form.component';
import { WorkOrderListComponent } from './transaction/workOrder/work-order-list/work-order-list.component';
import { WorkOrderAddComponent } from './transaction/workOrder/work-order-add/work-order-add.component';
import { WorkOrderViewComponent } from './transaction/workOrder/work-order-view/work-order-view.component';
import { JobCommentFormComponent } from './transaction/jobComment/job-comment-form/job-comment-form.component';
import { InhouseListComponent } from './master/inhouse/inhouse-list/inhouse-list.component';
import { InhouseFormComponent } from './master/inhouse/inhouse-form/inhouse-form.component';
import { TemplateListComponent } from './master/template/template-list/template-list.component';
import { AddJobInvoiceComponent } from './transaction/jobInvoice/add-job-invoice/add-job-invoice.component';
import { AccountingComponent } from './master/accounting/accounting.component';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: AppDashboardComponent },
  { path: 'auth/changePassword', component: ChangePasswordComponent, canActivate: [AuthGuard] },

  { path: 'admin/viewPermission', component: PermissionViewComponent, canActivate: [AuthGuard] },
  { path: 'admin/viewRole', component: RoleManagementViewComponent, canActivate: [AuthGuard] },
  { path: 'general/spinner', component: SpinnerComponent, canActivate: [AuthGuard] },
  { path: 'admin/userForm', component: UserFormComponent, canActivate: [AuthGuard] },
  { path: 'admin/viewUser', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'admin/roleForm', component: RoleManagementEditComponent, canActivate: [AuthGuard] },

  { path: 'master/viewEndUser', component: EnduserListComponent, canActivate: [AuthGuard] },
  { path: 'master/endUser', component: EnduserFormComponent, canActivate: [AuthGuard] },
  { path: 'master/viewClient', component: ClientListComponent, canActivate: [AuthGuard] },
  { path: 'master/clientForm', component: ClientFormComponent, canActivate: [AuthGuard] },
  { path: 'master/viewStaffs', component: LocationListComponent, canActivate: [AuthGuard] },
  { path: 'master/locationForm', component: LocationFormComponent, canActivate: [AuthGuard] },
  { path: 'master/viewAssociate', component: AssociateListComponent, canActivate: [AuthGuard] },
  { path: 'master/associateForm', component: AssociateFormComponent, canActivate: [AuthGuard] },
  { path: 'master/viewScope', component: ScopeListComponent, canActivate: [AuthGuard] },
  { path: 'master/scopeForm', component: ScopeFormComponent, canActivate: [AuthGuard] },
  { path: 'master/viewFreelancer', component: FreelancerListComponent, canActivate: [AuthGuard] },
  { path: 'master/freelancerForm', component: FreelancerFormComponent, canActivate: [AuthGuard] },
  { path: 'master/viewCountry', component: CountryListComponent, canActivate: [AuthGuard] },
  { path: 'master/countryForm', component: CountryFormComponent, canActivate: [AuthGuard] },
  { path: 'master/viewCurrency', component: CurrencyListComponent, canActivate: [AuthGuard] },
  { path: 'master/currencyForm', component: CurrencyFormComponent, canActivate: [AuthGuard] },
  { path: 'master/viewInhouse', component: InhouseListComponent, canActivate: [AuthGuard] },
  { path: 'master/inhouseForm', component: InhouseFormComponent, canActivate: [AuthGuard] },
  { path: 'master/viewTemplate', component: TemplateListComponent, canActivate: [AuthGuard] },
  { path: 'master/templateForm', component: TemplateListComponent, canActivate: [AuthGuard] },

  { path: 'transaction/accounting', component: AccountingComponent, canActivate: [AuthGuard]},
  { path: 'transaction/viewWorkOrder', component: WorkOrderListComponent, canActivate: [AuthGuard] },
  { path: 'transaction/addWorkOrder', component: WorkOrderAddComponent, canActivate: [AuthGuard] },
  { path: 'transaction/viewDetailedWorkOrder', component: WorkOrderViewComponent, canActivate: [AuthGuard] },
  { path: 'transaction/workOrder/commentForm', component: JobCommentFormComponent, canActivate: [AuthGuard] },
  { path: 'transaction/addInvoice', component: AddJobInvoiceComponent, canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }), CommonModule],
  exports: [RouterModule],
  declarations: [],
  providers: [AuthService, AuthGuard]
})
export class AppRoutingModule { }
