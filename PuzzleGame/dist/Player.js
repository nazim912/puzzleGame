import { Direction } from "./Direction.js";
export class Player {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    move(direction) {
        switch (direction) {
            case Direction.UP:
                this.y--;
                break;
            case Direction.DOWN:
                this.y++;
                break;
            case Direction.LEFT:
                this.x--;
                break;
            case Direction.RIGHT:
                this.x++;
                break;
        }
    }
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }
}
