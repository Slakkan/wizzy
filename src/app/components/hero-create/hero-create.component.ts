import { Component, OnInit, OnDestroy } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms'

import { Hero } from '../../classes/hero'
import { HeroService } from '../../services/hero.service'

@Component({
  selector: 'app-hero-create',
  templateUrl: './hero-create.component.html',
  styleUrls: ['./hero-create.component.scss']
})
export class HeroCreateComponent implements OnInit, OnDestroy {
  constructor(private HeroService: HeroService, private fb: FormBuilder) { }

  heroForm = this.fb.group({
    name: ['', Validators.required],
    race: ['', Validators.required],
    stats: this.fb.group({
      str: 5,
      dex: 5,
      int:5
    })
  })

  ngOnInit() {
    this.getHero()
  }

  ngOnDestroy() {
    const form = this.heroForm.value
    const hero: Hero = {...form}
    this.HeroService.saveHero(hero)
  }

  getHero(): void {
    this.HeroService.getHero().subscribe(hero => {
      this.heroForm.setValue(hero)
    })
    
  }
}
