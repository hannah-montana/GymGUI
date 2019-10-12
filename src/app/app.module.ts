import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
import { ExcerciseComponent } from './excercise/excercise.component';

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
    ExcerciseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
