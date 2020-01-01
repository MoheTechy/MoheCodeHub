import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppNavigationComponent } from './app-navigation/app-navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CordovaService } from './service/general/cordovaService/cordova.service';
import { PermissionFormComponent } from './admin/permission/permission-form/permission-form.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { LoginComponent } from './auth/login/login.component';
import { AppDashboardModule } from './app-dashboard/app-dashboard.module';
import { AdminModule } from './admin/admin.module';
import { SpinnerComponent } from './general/spinner/spinner.component';
import { MenuListItemComponent } from './menu-list-item/menu-list-item.component';
import { ConfirmDeleteComponent } from './general/confirm-delete/confirm-delete.component';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  MatFormFieldModule
} from '@angular/material';
import { ToastrModule } from 'ngx-toastr';
import { ClientFormComponent } from './master/client/client-form/client-form.component';
import { ClientListComponent } from './master/client/client-list/client-list.component';
import { EnduserFormComponent } from './master/enduser/enduser-form/enduser-form.component';
import { EnduserListComponent } from './master/enduser/enduser-list/enduser-list.component';
import { Globals } from './globals';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { HttpConfigInterceptor } from './interceptor/httpconfig.interceptor';
import { LocationFormComponent } from './master/location/location-form/location-form.component';
import { LocationListComponent } from './master/location/location-list/location-list.component';
import { AssociateFormComponent } from './master/associate/associate-form/associate-form.component';
import { AssociateListComponent } from './master/associate/associate-list/associate-list.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ScopeFormComponent } from './master/scope/scope-form/scope-form.component';
import { ScopeListComponent } from './master/scope/scope-list/scope-list.component';
import { FreelancerFormComponent } from './master/freelancer/freelancer-form/freelancer-form.component';
import { FreelancerListComponent } from './master/freelancer/freelancer-list/freelancer-list.component';
import { CountryFormComponent } from './master/country/country-form/country-form.component';
import { CountryListComponent } from './master/country/country-list/country-list.component';
import { CurrencyFormComponent } from './master/currency/currency-form/currency-form.component';
import { CurrencyListComponent } from './master/currency/currency-list/currency-list.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { FileSelectDirective } from 'ng2-file-upload';
import { WorkOrderListComponent } from './transaction/workOrder/work-order-list/work-order-list.component';
import { WorkOrderAddComponent } from './transaction/workOrder/work-order-add/work-order-add.component';
import { WorkOrderViewComponent } from './transaction/workOrder/work-order-view/work-order-view.component';
import { JobCommentFormComponent } from './transaction/jobComment/job-comment-form/job-comment-form.component';
import { InhouseFormComponent } from './master/inhouse/inhouse-form/inhouse-form.component';
import { InhouseListComponent } from './master/inhouse/inhouse-list/inhouse-list.component';
import { AddJobScheduleComponent } from './transaction/jobSchedule/add-job-schedule/add-job-schedule.component';
import { TemplateComponent } from './master/template/template/template.component';
import { JobResumeFormComponent } from './transaction/jobResume/job-resume-form/job-resume-form.component';
import { TemplateListComponent } from './master/template/template-list/template-list.component';
import { JobReportTemplateListComponent } from './transaction/jobReportTemplate/job-report-template-list/job-report-template-list.component';
import { AddJobInvoiceComponent } from './transaction/jobInvoice/add-job-invoice/add-job-invoice.component';
import { JobReportFormComponent } from './transaction/jobReport/job-report-form/job-report-form.component';
import { JobPaymentFormComponent } from './transaction/jobPayment/job-payment-form/job-payment-form.component';
import { AccountingComponent } from './master/accounting/accounting.component';
@NgModule({
  declarations: [
    AppComponent,
    AppNavigationComponent,
    LoginComponent,
    SpinnerComponent,
    MenuListItemComponent,
    ConfirmDeleteComponent,
    ClientFormComponent,
    ClientListComponent,
    EnduserFormComponent,
    EnduserListComponent,
    LocationFormComponent,
    LocationListComponent,
    AssociateFormComponent,
    AssociateListComponent,
    ScopeFormComponent,
    ScopeListComponent,
    FreelancerFormComponent,
    FreelancerListComponent,
    CountryFormComponent,
    CountryListComponent,
    CurrencyFormComponent,
    CurrencyListComponent,
    FileSelectDirective,
    WorkOrderListComponent,
    WorkOrderAddComponent,
    WorkOrderViewComponent,
    JobCommentFormComponent,
    InhouseFormComponent,
    InhouseListComponent,
    AddJobScheduleComponent,
    TemplateComponent,
    JobResumeFormComponent,
    TemplateListComponent,
    JobReportTemplateListComponent,
    AddJobInvoiceComponent,
    JobReportFormComponent,
    JobPaymentFormComponent,
    AccountingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MatButtonModule,
    MatCheckboxModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    AppRoutingModule,
    MatRadioModule,
    FlexLayoutModule,
    HttpClientModule,
    AuthModule,
    AppDashboardModule,
    AdminModule,
    ShowHidePasswordModule,
    AngularFontAwesomeModule,
    MaterialFileInputModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [CordovaService, Globals,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmDeleteComponent, PermissionFormComponent, AddJobInvoiceComponent, AddJobScheduleComponent, JobResumeFormComponent, TemplateComponent, JobReportTemplateListComponent, JobReportFormComponent, JobPaymentFormComponent]
})
export class AppModule { }
