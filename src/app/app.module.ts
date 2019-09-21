import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChoiceComponent } from './components/choice/choice.component';
import { HeroCreateComponent } from './components/hero-create/hero-create.component';
import { HeroViewComponent } from './components/hero-view/hero-view.component';

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
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
