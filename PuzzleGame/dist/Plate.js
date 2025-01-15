import { Point } from "./Point.js";
export class Plate extends Point {
    constructor(x, y, color) {
        super(x, y);
        this.color = color;
        this.active = false;
    }
    activate() {
        this.active = true;
    }
    deactivate() {
        this.active = false;
    }
    isActive() {
        return this.active;
    }
    getColor() {
        return this.color;
    }
}
