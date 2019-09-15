import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChoiceComponent } from './choice/choice.component';
import { HeroCreateComponent } from './hero-create/hero-create.component';
import { HeroViewComponent } from './hero-view/hero-view.component';

@NgModule({
  declarations: [
    AppComponent,
    ChoiceComponent,
    HeroCreateComponent,
    HeroViewComponent
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
