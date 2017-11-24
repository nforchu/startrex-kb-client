export class Video{

  constructor(
    public topicId?: number,
    public id?: number,
    public provider?: string,
    public weight?: number,
    public published?: string,
    public title?: string,
    public link?: string,
    public visibility?: string,
  ){}
}
