export class Course{

  constructor(
    public courseCategoryId?: number,
    public domainId?: number,
    public id?: number,
    public title?: string,
    public weight?: string,
    public description?: string,
    public audience?: string,
    public prerequisite?: string,
    public hasVideo?: string,
    public hasQuiz?: string,
    public hasText?: string,
    public published?: string,
    public visibility?: string,

  ){}
}
