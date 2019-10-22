import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';
import { CoachComponent } from './coach/coach.component';
import { CustomerComponent } from './customer/customer.component';
import { GuestComponent } from './guest/guest.component';
import { ContactComponent} from './contact/contact.component';
import {GalleryComponent} from './gallery/gallery.component';

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
  { path : 'customer', component : CustomerComponent },
  { path : 'guest', component : GuestComponent }
];
