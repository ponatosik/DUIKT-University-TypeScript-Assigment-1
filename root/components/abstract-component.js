export default class Component {
    htmlElement;
    get id() { return this._id; }
    ;
    update() {
        this.render();
    }
    ;
    constructor(htmlElement) {
        this.htmlElement = htmlElement;
    }
    // Generate a random id
    _id = `${this.constructor.name}-${Component.generateHash()}`;
    static generateHash() {
        return Math.random().toString(36).substring(2, 9);
    }
}
