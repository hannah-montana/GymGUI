import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';
import { CoachComponent } from './coach/coach.component';
import { CustomerComponent } from './customer-dashboard/customer/customer.component';
import { GuestComponent } from './guest/guest.component';
import { ContactComponent} from './contact/contact.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { MapComponent } from './customer-dashboard/map/map.component';
import { ProfileComponent } from './customer-dashboard/profile/profile.component';
import { UserProgramComponent } from './customer-dashboard/user-program/user-program.component';
import { NotifyComponent } from './customer-dashboard/notify/notify.component';

export const appRoutes: Routes = [
  { path : 'home', component : HomeComponent },
  /*{
    path : 'login', component : UserComponent,
    children : [{ path : '', component: SignInComponent}]
  },
  {
    path : 'signup', component : UserComponent,
    children : [{ path : '', component: SignUpComponent}]
  },
  { path : '', redirectTo: '/login', pathMatch : 'full'},*/
  { path : 'coach/:id', component : CoachComponent },
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

  { path : 'guest', component : GuestComponent }
];
