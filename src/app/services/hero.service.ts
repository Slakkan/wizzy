import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Hero } from '../types/hero'

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  hero: Hero;
  defaultHero: Hero = {
    name: 'Name your hero...',
    race: 'race',
    stats: {
      points: 6,
      constitution: 4,
      agility: 4,
      wisdom: 4,
      intelligence: 4,
      willpower: 4,
      charisma: 4
    },
    skills: {
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
    }
  }
  constructor() { }

  getHero(): Observable<Hero> {
    const storedHero = this.hero ? this.hero : this.defaultHero
    return of(storedHero);
  }

  saveHero(hero: Hero): void {
    this.hero = hero
  }
}
