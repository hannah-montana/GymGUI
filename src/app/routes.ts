import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';
import { CoachComponent } from './coach/coach.component';
import { CustomerComponent } from './customer/customer.component';
import { GuestComponent } from './guest/guest.component';
import { ContactComponent} from './contact/contact.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { TestComponent } from './test/test.component';
import { Test2Component } from './test2/test2.component';

export const appRoutes: Routes = [
  { path : 'home', component : HomeComponent },
  {
    path : 'login', component : UserComponent,
    children : [{ path : '', component: SignInComponent}]
  },
  {
    path : 'signup', component : UserComponent,
    children : [{ path : '', component: SignUpComponent}]
  },
  { path : '', redirectTo: '/login', pathMatch : 'full'},
  { path : 'coach/:id', component : CoachComponent },

  //{ path : 'customer', component : CustomerComponent },
  {
    path : 'customer', component : CustomerDashboardComponent,
    children : [{ path : '', component: CustomerComponent}]
  },
  {
      path : 'test2', component : CustomerDashboardComponent,
      children : [{ path : '', component: Test2Component}]
    },
  { path : 'customer-dashboard', redirectTo: '/customer', pathMatch : 'full'},

  { path : 'user-profile', component : UserProfileComponent },
  { path : 'guest', component : GuestComponent }
];
