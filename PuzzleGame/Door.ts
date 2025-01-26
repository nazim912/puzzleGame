import { Plate } from "./Plate.js";
import { Point } from "./Point.js";

export class Door extends Point {
    private color: string;
    private open: boolean;

    constructor(x: number, y: number, color: string, plate: Plate) {
        super(x, y)
        this.color = color;
        this.open = false;
    }

    public getColor(): string {
        return this.color;
    }

    public isOpen(): boolean {
        return this.open;
    }

    public setOpen(open: boolean): void {
        this.open = open;
    }

}