import { Direction } from "./Direction.js";

export class Player {
    public x: number;
    public y: number;
    public color: string;

    constructor( x: number, y: number, color: string,) {
        this.x = x;
        this.y = y;
        this.color = color;
    }
    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public move(direction: Direction): void {
    
        switch (direction) {
            case Direction.UP:
                this.y --;
                break;
            case Direction.DOWN:
                this.y ++;
                break;
            case Direction.LEFT:
                this.x --;
                break;
            case Direction.RIGHT:
                this.x ++;
                break;
        }
    }

    public setPosition(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

}