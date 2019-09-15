import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Hero } from './class/hero'

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  hero: Hero;

  constructor() { }

  getHero(): Observable<Hero> {
    const defaultHero = new Hero('Name your hero...', 'race', { points: 2, str: 5, dex: 5, int: 5 })
    const storedHero = this.hero ? this.hero : defaultHero
    return of(storedHero);
  }

  saveHero(hero: Hero): void {
    this.hero = hero
  }
}
