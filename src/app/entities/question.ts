export class Question{

  constructor(

    public topicId?: number,
    public id?: number,
    public difficulty?: string,
    public visibility?: string,
    public type?: string,
    public responseCount?: string,
    public totalScore?: number,
    public question?: string,
    public components?: [{}],
    public responses?: [{}],

  ){}
}
