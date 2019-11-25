import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';
import { CustomerComponent } from './customer-dashboard/customer/customer.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { MapComponent } from './customer-dashboard/map/map.component';
import { ProfileComponent } from './customer-dashboard/profile/profile.component';
import { UserProgramComponent } from './customer-dashboard/user-program/user-program.component';
import { NotifyComponent } from './customer-dashboard/notify/notify.component';
import { CoachComponent } from './coach/coach.component';
import { CoachDashboardComponent } from './coach/coach-dashboard/coach-dashboard.component';
import { CoachExerciseComponent } from './coach/coach-exercise/coach-exercise.component';
import { CoachSessionComponent } from './coach/coach-session/coach-session.component';
import { CoachProgramComponent } from './coach/coach-program/coach-program.component';
import { CoachCustomerComponent } from './coach/coach-customer/coach-customer.component';
import { CoachProfileComponent } from './coach/coach-profile/coach-profile.component';
import { CoachNotifyComponent } from './coach/coach-notify/coach-notify.component';
import { OopsComponent } from './oops/oops.component';

export const appRoutes: Routes = [
  { path : '', component : SignInComponent },
  { path : 'login', component : SignInComponent },
  { path : 'signup', component : SignUpComponent },
  {
    path : 'customer', component : CustomerDashboardComponent,
    children : [{ path : '', component: CustomerComponent}]
  },
  {
    path : 'profile', component : CustomerDashboardComponent,
    children : [{ path : '', component: ProfileComponent}]
  },
  {
    path : 'program', component : CustomerDashboardComponent,
    children : [{ path : '', component: UserProgramComponent}]
  },
  {
    path : 'notify', component : CustomerDashboardComponent,
    children : [{ path : '', component: NotifyComponent}]
  },
  {
    path : 'map', component : CustomerDashboardComponent,
    children : [{ path : '', component: MapComponent}]
  },
  { path : 'customer-dashboard', redirectTo: '/customer', pathMatch : 'full'},

  { path : 'coach', redirectTo: '/coach-dashboard', pathMatch : 'full'},
  {
    path : 'coach-dashboard', component : CoachComponent,
    children : [{ path : '', component: CoachDashboardComponent}]
  },
  {
    path : 'coach-exercise', component : CoachComponent,
    children : [{ path : '', component: CoachExerciseComponent}]
  },
  {
    path : 'coach-session', component : CoachComponent,
    children : [{ path : '', component: CoachSessionComponent}]
  },
  {
    path : 'coach-program', component : CoachComponent,
    children : [{ path : '', component: CoachProgramComponent}]
  },
  {
    path : 'coach-customer', component : CoachComponent,
    children : [{ path : '', component: CoachCustomerComponent}]
  },
  {
    path : 'coach-profile', component : CoachComponent,
    children : [{ path : '', component: CoachProfileComponent}]
  },
  {
    path : 'coach-notify', component : CoachComponent,
    children : [{ path : '', component: CoachNotifyComponent}]
  },
  { path : 'oops', component : OopsComponent }
];
