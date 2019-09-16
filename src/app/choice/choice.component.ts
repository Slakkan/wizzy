import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged } from 'rxjs/operators'

@Component({
  selector: 'choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss']
})
export class ChoiceComponent implements OnInit {
  preview: { type: string; content: string; }[];

  constructor() { }

  title: string
  story$ = new Subject<string>()

  ngOnInit() {
    this.story$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    )

    this.story$.subscribe({
      next: (sub) => {
        this.storyConverter(sub)
      }
    })
  }

  updateStory(text: string) {
    this.story$.next(text)
  }

  indexesOf(text: string, regExp: RegExp) {
    const array = text.split(regExp)
    const indexes: number[] = []
    let accumulatedLength = 0
    array.map((e) => {
      accumulatedLength += e.length + 1
      indexes.push(accumulatedLength)
    })
    return indexes
  }

  storyConverter(text: string | null): void {
    const actionMatches = text.match(/(?<=\*)[^*\s][a-z\s]*[^*\s](?=\*)/gi)
    const actions = actionMatches ? actionMatches : []
    let actionLastIndex = -1
    const actionIndexes = actions.map(action => {
      actionLastIndex = text.indexOf(action, actionLastIndex + 1)
      return actionLastIndex
    })
    const actionsObjects = actionIndexes.map((textIndex, index) => {
      return {
        textIndex,
        content: actions[index],
        type: 'action'
      }
    })

    const dialogMatches = text.match(/(?<=\-)[^-\s][a-z\s]*[^-\s](?=\-)/gi)
    const dialogs = dialogMatches ? dialogMatches : []
    let dialogLastIndex = -1
    const dialogsIndexes = dialogs.map(dialog => {
      dialogLastIndex = text.indexOf(dialog, dialogLastIndex + 1)
      return dialogLastIndex
    })
    const dialogsObjects = dialogsIndexes.map((textIndex, index) => {
      return {
        textIndex,
        content: dialogs[index],
        type: 'dialog'
      }
    })

    const descriptionMatches = text.match(/.?(?<=^|\s)[^\*\-]?[a-z]+[^\*\-]?(?=\s).?/gi)
    const descriptions = descriptionMatches ? descriptionMatches : []
    let descriptionLastIndex = -1
    const descriptionIndexes = descriptions.map(description => {
      descriptionLastIndex = text.indexOf(description, descriptionLastIndex + 1)
      return descriptionLastIndex
    })
    const descriptionsObjects = descriptionIndexes.map((textIndex, index) => {
      return {
        textIndex,
        content: descriptions[index],
        type: 'description'
      }
    })

    const newLinesIndexes = this.indexesOf(text, /[\n\r]/g)
    const newLinesObjects = newLinesIndexes.map((textIndex, index) => {
      return {
        textIndex,
        content: '',
        type: 'new-line'
      }
    })

    this.preview = newLinesObjects.concat(descriptionsObjects).concat(dialogsObjects).concat(actionsObjects).sort((a, b) => a.textIndex - b.textIndex)
  }
}
