import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './signin/signin.component';
import { appRoutes } from './routes';
import { SignUpComponent } from './signup/signup.component';
import { AuthenticationService } from './authentication.service';
import { CustomerComponent } from './customer-dashboard/customer/customer.component';
import { CoachComponent } from './coach/coach.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { MapComponent } from './customer-dashboard/map/map.component';
import { ProfileComponent } from './customer-dashboard/profile/profile.component';
import { NotifyComponent } from './customer-dashboard/notify/notify.component';
import { UserProgramComponent } from './customer-dashboard/user-program/user-program.component';
import { UserFooterComponent } from './customer-dashboard/user-footer/user-footer.component';
import { UserNavComponent } from './customer-dashboard/user-nav/user-nav.component';
import { UserSidebarComponent } from './customer-dashboard/user-sidebar/user-sidebar.component';
import { CoachSidebarComponent } from './coach/coach-sidebar/coach-sidebar.component';
import { CoachDashboardComponent } from './coach/coach-dashboard/coach-dashboard.component';
import { CoachSessionComponent } from './coach/coach-session/coach-session.component';
import { CoachProgramComponent } from './coach/coach-program/coach-program.component';
import { CoachExerciseComponent } from './coach/coach-exercise/coach-exercise.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { CoachCustomerComponent } from './coach/coach-customer/coach-customer.component';
import { CoachNavComponent } from './coach/coach-nav/coach-nav.component';
import { CoachProfileComponent } from './coach/coach-profile/coach-profile.component';
import { CoachNotifyComponent } from './coach/coach-notify/coach-notify.component';

import { StorageServiceModule } from 'angular-webstorage-service';
import { OopsComponent } from './oops/oops.component';
import { CoachMapComponent } from './coach/coach-map/coach-map.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignInComponent,
    SignUpComponent,
    CustomerComponent,
    CoachComponent,
    CustomerDashboardComponent,
    MapComponent,
    ProfileComponent,
    NotifyComponent,
    UserProgramComponent,
    UserFooterComponent,
    UserNavComponent,
    UserSidebarComponent,
    CoachSidebarComponent,
    CoachDashboardComponent,
    CoachSessionComponent,
    CoachProgramComponent,
    CoachExerciseComponent,
    CoachCustomerComponent,
    CoachNavComponent,
    CoachProfileComponent,
    CoachNotifyComponent,
    OopsComponent,
    CoachMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {
      onSameUrlNavigation: 'reload'
    }),
    ReactiveFormsModule,
    FormsModule,
    ScrollDispatchModule,
    StorageServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
