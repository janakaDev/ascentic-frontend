import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { NgModule, Injectable, ErrorHandler } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { HeaderComponent } from './shared/common-components/header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StorageServiceModule } from 'angular-webstorage-service';
import { LocalStorage } from '../common/local-storage';
import { TokenService } from '../common/token.service';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { AuthService } from './core/Service/auth/auth.service';
import { DatePipe } from '@angular/common';
import { AuthInterceptorService } from './core/Service/auth/interceptors/auth-interceptor.service';
import { NotAllowedComponent } from './components/not-allowed/not-allowed.component';
import * as Sentry from '@sentry/browser';
import {ClothsResolver} from './core/DataSources/cloths.resolver';
import {ConfirmDialogComponent} from "./components/ConfirmDialogComponent";


const appRoutes: Routes = [];



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotAllowedComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MaterialModule,
    RouterModule.forRoot(appRoutes),
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    StorageServiceModule,
    LoadingBarHttpClientModule,
    MatDialogModule
  ],
  providers: [
    LocalStorage,
    TokenService,
    AuthService,
    ClothsResolver,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmDialogComponent]
})
export class AppModule {}
