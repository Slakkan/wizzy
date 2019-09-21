import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged } from 'rxjs/operators'

import { match } from '../types/text'

@Component({
  selector: 'choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss']
})
export class ChoiceComponent implements OnInit {
  preview: match[];

  constructor() { }

  title: string
  story$ = new Subject<string>()

  ngOnInit() {
    this.story$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    )

    this.story$.subscribe({
      next: (sub: string) => {
        this.storyConverter(sub)
      }
    })
  }

  updateStory(text: string) {
    this.story$.next(text)
  }

  findPattern(regExp: RegExp, text: string, type: string, symbol: string): match[] {
    const matches = text.match(regExp)
    if (!matches) { return [] }
    let lastIndex = 0
    const indexes = matches.map(match => {
      lastIndex = text.indexOf(match, lastIndex + 1)
      return lastIndex
    })
    return indexes.map((index, arrayIndex) => {
      return {
        index,
        length: matches[arrayIndex].length,
        content: symbol ? matches[arrayIndex].replace(RegExp(`\\${symbol}`, 'g'), '').trim() : null,
        type,
        symbol
      }
    })
  }

  storyConverter(text: string | null): void {
    // FINDS SPECIAL PATTERNS AND RETURNS THEIR RESPECTIVE MATCH[]
    const actions = this.findPattern(/\*[A-Za-z A-ü]+\*/g, text, 'action', '*')
    const dialogs = this.findPattern(/\-[A-Za-z A-ü]+\-/g, text, 'dialog', '-')
    const lineBrakes = this.findPattern(/[\n\r]/g, text, 'linebrake', '')

    // CREATE DESCRIPTIONS MATCH[]
    const others = actions.concat(dialogs).concat(lineBrakes).sort((a, b) => a.index - b.index)

    let startIndex = 0
    const descriptions = others.map(item => {
      const index = startIndex
      const endIndex = item.index - item.symbol.length > 0 ? item.index - item.symbol.length : 0
      const content = text.slice(startIndex, endIndex)
      startIndex = item.index + item.length
      return {
        index,
        length: content.length,
        content,
        type: 'description',
        symbol: ''
      }
    })

    const lastIndex = others.length > 0 ? others[others.length - 1].index + others[others.length - 1].length + others[others.length - 1].symbol.length : 0
    const lastContent = text.slice(lastIndex)
    const lastDescription = {
      index: lastIndex,
      length: lastContent.length,
      content: lastContent,
      type: 'description',
      symbol: ''
    }
    descriptions.push(lastDescription)


    // CHANGES THE PREVIEW WICH IS OF TYPE MATCH[]
    this.preview = others.concat(descriptions).sort((a, b) => a.index - b.index)
  }
}
