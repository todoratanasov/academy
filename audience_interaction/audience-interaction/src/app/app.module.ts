import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EventWindowComponent } from './event-window/event-window.component';
import { SidebarComponent } from './event-window/sidebar/sidebar.component';
import { MessageComponent } from './event-window/message/message.component';
import { EventComponent } from './event/event.component';
import { EventActiveComponent } from './event/event-active/event-active.component';
import { EventCreateComponent } from './event/event-create/event-create.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    EventWindowComponent,
    SidebarComponent,
    MessageComponent,
    EventComponent,
    EventActiveComponent,
    EventCreateComponent,
    PageNotFoundComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
