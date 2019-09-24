export interface stats {
    points: number
    // BODY
    constitution: number
    agility: number
    // MIND
    wisdom: number
    intelligence: number
    //SOUL
    willpower: number
    charisma: number
}

export interface skills {
    //BODY SKILLS
    //--Constitution--
    constitutionPoints: number
    athletics: number //how long can you do physical activity: running, swimming
    climbing: number
    grapple: number
    //--Agility--
    agilityPoints: number
    acrobatics: number // dodge things, balace, avoid obstacles with parkour
    stealth: number
    misdeeds: number // open locks, sleight of hand, forge documents
    //MIND SKILLS
    //--wisdom--
    wisdomPoints: number
    perception: number // recongnize shapes, smells or sounds
    medicine: number
    insight: number // avert danger and deception. Gain intuitive understanding of things.
    //--intelligence--
    intelligencePoints: number
    concentration: number
    knowledge: number // knowledge of any type, politics, magic, deities.
    crafts: number // used to create any type of item, armor, weapon, etc.
    //SOUL SKILLS
    //--willpower--
    willpowerPoints: number
    rescilience: number // resist mind effects, get up from death's door
    profession: number // how many hours can you work without beeing mentally tired
    resolve: number // how well can you resist mental stress
    //--charisma--
    charismaPoints: number
    persuasion: number
    deceit:number
    perform: number // how well you can play an instrument and how well can you disguise yourself
}

export interface Hero {
    name: string
    race: string
    level: number
    stats: stats
    skills: skills
}