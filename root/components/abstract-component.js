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
    _id = `${Component.generateHash()}_${Component.getTimeStamp()}}`;
    static generateHash() {
        return Math.random().toString(36).substr(2, 9);
    }
    static getTimeStamp() {
        return new Date().getTime();
    }
}
