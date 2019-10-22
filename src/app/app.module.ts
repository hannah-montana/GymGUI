import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FirstComponent } from './first/first.component';
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
import { CustomerComponent } from './customer/customer.component';
import { CoachComponent } from './coach/coach.component';
import { GuestComponent } from './guest/guest.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { TestComponent } from './test/test.component';
import { Test2Component } from './test2/test2.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    FirstComponent,
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
    UserProfileComponent,
    CustomerDashboardComponent,
    TestComponent,
    Test2Component
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
