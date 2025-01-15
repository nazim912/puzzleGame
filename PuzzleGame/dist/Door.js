import { Point } from "./Point.js";
export class Door extends Point {
    constructor(x, y, color, plate) {
        super(x, y);
        this.color = color;
        this.open = false;
    }
    getColor() {
        return this.color;
    }
    isOpen() {
        return this.open;
    }
    setOpen(open) {
        this.open = open;
    }
}
