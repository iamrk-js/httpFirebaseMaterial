import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { PostDashboardComponent } from './shared/components/post-dashboard/post-dashboard.component';
import { PostFormComponent } from './shared/components/post-form/post-form.component';
import { PostCardComponent } from './shared/components/post-card/post-card.component';
import { PostComponent } from './shared/components/post/post.component';
import { MatDalogComponent } from './shared/components/mat-dalog/mat-dalog.component';
import { LoaderInterceptorService } from './shared/services/loader.interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    PostDashboardComponent,
    PostFormComponent,
    PostCardComponent,
    PostComponent,
    MatDalogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass : LoaderInterceptorService,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
