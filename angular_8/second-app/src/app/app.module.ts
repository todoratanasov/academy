import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  //всички компоненти се добавят тук
  declarations: [
    AppComponent
  ],
  //тук трябва да се добавят модули като фомрсмодул, за да се работи изобщо с форми примерно
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  //тук се добавят сървисите, с които примерно се контактваме към бекенда
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
