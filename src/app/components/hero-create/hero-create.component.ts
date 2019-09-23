import { Component, OnInit, OnDestroy, SimpleChange } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms'

import { HeroService } from '../../services/hero.service'
import { Hero } from 'src/app/types/hero';

@Component({
  selector: 'app-hero-create',
  templateUrl: './hero-create.component.html',
  styleUrls: ['./hero-create.component.scss']
})
export class HeroCreateComponent implements OnInit, OnDestroy {
  constructor(private HeroService: HeroService, private fb: FormBuilder) { }

  previousValues: Hero

  descriptions = {
    constitution: ['Weak', 'Healthy', 'Fit', 'Muscular'],
    agility: ['Clumsy', 'Able', 'Skilled', 'Talented'],
    wisdom: ['Careless', 'Awake', 'Clever', 'Wise'],
    intelligence: ['Dumb', 'Capable', 'Smart', 'Genious'],
    willpower: ['Slouch', 'Disciplined', 'Resolute', 'Fierce'],
    charisma: ['Ungraceful', 'Likeable', 'Appealing', 'Charming']
  }

  skills = ['athletics', 'climbing', 'grapple', 'acrobatics', 'stealth','misdeeds', 
  'perception', 'medicine', 'insight', 'concentration', 'knowledge','crafts',
  'rescilience', 'profession', 'resolve', 'persuasion', 'deceit', 'perform']

  heroForm = this.fb.group({
    name: ['', Validators.required],
    race: ['', Validators.required],
    stats: this.fb.group({
      points: 6,
      constitution: 4,
      agility: 4,
      wisdom: 4,
      intelligence: 4,
      willpower: 4,
      charisma: 4
    }),
    skills: this.fb.group({
      athletics: 0,
      climbing: 0,
      grapple: 0,
      acrobatics: 0,
      stealth: 0,
      misdeeds: 0,
      perception: 0,
      medicine: 0,
      insight: 0,
      concentration: 0,
      knowledge: 0,
      crafts: 0,
      rescilience: 0,
      profession: 0,
      resolve: 0,
      persuasion: 0,
      deceit: 0,
      perform: 0
    }),
  })

  ngOnInit() {
    this.getHero()
  }

  ngOnDestroy() {
    const hero: Hero = { ...this.heroForm.value }
    this.HeroService.saveHero(hero)
  }

  getHero(): void {
    this.HeroService.getHero().subscribe(hero => {
      this.heroForm.setValue(hero)
      this.previousValues = hero
    })
  }

  calculatePoints(stat: string, value: number) {
    const changes = {
      currentValue: value,
      previousValue: this.previousValues.stats[stat]
    }
    this.previousValues.stats[stat] = value
    const points = changes.currentValue > changes.previousValue ? this.onStatIncrease(stat, changes) : this.onStatDecrease(stat, changes)

    this.heroForm.patchValue({
      stats: {
        points: points
      }
    })
  }

  onStatIncrease(stat: string, changes: { previousValue: number, currentValue: number }): number {
    let points = this.heroForm.value.stats.points
    for (let i = changes.previousValue; i < changes.currentValue; i++) {
      points -= i - 4 > 0 ? i - 4 : 1
    }
    return points
  }

  onStatDecrease(stat: string, changes: { previousValue: number, currentValue: number }): number {
    let points = this.heroForm.value.stats.points
    for (let i = changes.previousValue; i > changes.currentValue; i--) {
      points += i - 5 > 0 ? i - 5 : 1
    }
    return points
  }
}
