export default abstract class Component {
  public get id(): string { return this._id };
  public abstract render(): void;
  public update(): void {
    this.render();
  };

  constructor(protected htmlElement: HTMLElement) { }

  // Generate a random id
  private _id: string = `${Component.generateHash()}_${Component.getTimeStamp()}}`;
  private static generateHash(): string {
    return Math.random().toString(36).substr(2, 9);
  }
  private static getTimeStamp(): number {
    return new Date().getTime();
  }
}
