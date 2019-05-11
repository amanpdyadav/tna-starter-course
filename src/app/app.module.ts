import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule,
        MatButtonModule,
        MatInputModule,
        MatCardModule,
        MatIconModule,
        MatTabsModule,
        MatDialogModule } from '@angular/material';

import { AppComponent } from './app.component';
import { ActionButtonComponent } from './components/action-button/action-button.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { EventPageComponent } from './components/event-page/event-page.component';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { AccountPageComponent } from './components/account-page/account-page.component';

import { AuthService } from './services/auth.service';
import { LoginDialogService } from './services/login-dialog.service';


export const routes = [ 'home', 'account', 'events', 'contact' ];

const appRoutes: Routes = [
    { path: routes[ 0 ], component: HomePageComponent },
    { path: routes[ 1 ], component: AccountPageComponent },
    { path: routes[ 2 ], component: EventPageComponent, canActivate: [ AuthService ] },
    { path: routes[ 3 ], component: ContactPageComponent },
    { path: '**', redirectTo: 'home' }
];


@NgModule({
  imports:      [ 
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
        MatCheckboxModule,
        MatButtonModule,
        MatInputModule,
        MatCardModule,
        MatIconModule,
        MatTabsModule,
        MatDialogModule
  ],
  declarations: [ 
    AppComponent,
    ContactPageComponent,
    ActionButtonComponent,
    EventPageComponent,
    HomePageComponent,
    LoginDialogComponent,
    AccountPageComponent
  ],
  entryComponents: [
      LoginDialogComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap:    [ AppComponent ],
  providers: [AuthService, LoginDialogService]
})
export class AppModule { }
