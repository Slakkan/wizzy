import { Component, OnInit, OnDestroy } from '@angular/core';

import { Hero } from '../class/hero'
import { HeroService } from '../hero.service'

@Component({
  selector: 'app-hero-create',
  templateUrl: './hero-create.component.html',
  styleUrls: ['./hero-create.component.scss']
})
export class HeroCreateComponent implements OnInit, OnDestroy {
  constructor(private HeroService: HeroService) { }
  hero: Hero
  prevVal: {
    str: number,
    dex: number,
    int: number
  }

  ngOnInit() {
    this.getHero()
  }

  ngOnDestroy() {
    this.HeroService.saveHero(this.hero)
  }

  getHero(): void {
    this.HeroService.getHero().subscribe(hero => {
      this.hero = hero
      this.prevVal = {...hero.stats}
    })
    
  }

  statIncrement(stat: string) {
    let cost = 0
    for (let i = 0; i < this.hero.stats[stat] - this.prevVal[stat]; i++) {
      cost += this.hero.stats[stat] - i - 5 > 0 ? this.hero.stats[stat] - i - 5 : 1
    }
    if (this.hero.stats.points >= cost) {
      this.hero.stats.points -= cost
      this.prevVal[stat] = this.hero.stats[stat]
    } else {
      this.hero.stats[stat] = this.prevVal[stat]
    }
  }

  statDecrement(stat: string) {
    let points = 0
    for (let i = 0; i < this.prevVal[stat] - this.hero.stats[stat]; i++) {
      points += this.prevVal[stat] - i - 5 > 0 ? this.prevVal[stat] - i - 5 : 1
    }
    this.prevVal[stat] = this.hero.stats[stat]
    this.hero.stats.points += points
  }

  calculatePoints(stat: string) {
    const didIncrement = this.hero.stats[stat] > this.prevVal[stat]
    didIncrement ? this.statIncrement(stat) : this.statDecrement(stat)
  }
}
