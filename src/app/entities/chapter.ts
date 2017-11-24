export class Chapter{
  constructor(
    public courseId?: number,
    public id?: number,
    public title?: string,
    public weight?: number,
    public description?: string,
    public prerequisite?: string,
    public hasVideo?: string,
    public hasQuiz?: string,
    public hasText?: string,
    public published?: string,
    public visibility?: string,
  ){}
}
