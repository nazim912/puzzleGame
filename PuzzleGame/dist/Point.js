export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    isOn(point) {
        return this.x === point.getX() && this.y === point.getY();
    }
}
