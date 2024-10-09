export default abstract class Component {
  public get id(): string {
    return this._id;
  }
  public abstract render(): void;
  public update(): void {
    this.render();
  }

  constructor(protected htmlElement: HTMLElement) {}

  // Generate a random id
  private _id: string = `${this.constructor.name}-${Component.generateHash()}`;
  private static generateHash(): string {
    return Math.random().toString(36).substring(2, 9);
  }
}
