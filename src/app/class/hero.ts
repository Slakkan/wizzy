interface stats {
    points: number,
    str: number,
    dex: number,
    int: number
}

export class Hero {
    name: string
    race: string
    stats: stats
    constructor(name: string, race: string, stats: stats) {
        this.name = name
        this.race = race
        this.stats = stats
    }
}