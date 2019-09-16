import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChoiceComponent } from './choice/choice.component'
import { HeroCreateComponent } from './hero-create/hero-create.component'
import { HeroViewComponent } from './hero-view/hero-view.component'

const routes: Routes = [
  { path: '', redirectTo: '/choice', pathMatch: 'full' },
  { path: 'choice', component: ChoiceComponent },
  { path: 'hero-create', component: HeroCreateComponent },
  { path: 'hero-view', component: HeroViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
