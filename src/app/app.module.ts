import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ServicesComponent } from './services/services.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { AboutComponent } from './about/about.component';
import { CoachesComponent } from './coaches/coaches.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { GalleryComponent } from './gallery/gallery.component';
import { FooterComponent } from './footer/footer.component';
import { ProgramComponent } from './program/program.component';
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './signin/signin.component';
import { appRoutes } from './routes';
import { SignUpComponent } from './signup/signup.component';
import { AuthenticationService } from './authentication.service';
import { CustomerComponent } from './customer-dashboard/customer/customer.component';
import { CoachComponent } from './coach/coach.component';
import { GuestComponent } from './guest/guest.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { MapComponent } from './customer-dashboard/map/map.component';
import { ProfileComponent } from './customer-dashboard/profile/profile.component';
import { NotifyComponent } from './customer-dashboard/notify/notify.component';
import { UserProgramComponent } from './customer-dashboard/user-program/user-program.component';
import { UserFooterComponent } from './customer-dashboard/user-footer/user-footer.component';
import { UserNavComponent } from './customer-dashboard/user-nav/user-nav.component';
import { UserSidebarComponent } from './customer-dashboard/user-sidebar/user-sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    ServicesComponent,
    ScheduleComponent,
    AboutComponent,
    CoachesComponent,
    BlogComponent,
    ContactComponent,
    GalleryComponent,
    FooterComponent,
    ProgramComponent,
    UserComponent,
    SignInComponent,
    SignUpComponent,
    CustomerComponent,
    CoachComponent,
    GuestComponent,
    CustomerDashboardComponent,
    MapComponent,
    ProfileComponent,
    NotifyComponent,
    UserProgramComponent,
    UserFooterComponent,
    UserNavComponent,
    UserSidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
