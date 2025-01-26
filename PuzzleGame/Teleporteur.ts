import { Point } from "./Point.js";

export class Teleporteur {

    public entry: Point;
    public exit: Point;

    constructor(entryX: number, entryY: number, exitX: number, exitY: number) {
        this.entry = new Point(entryX, entryY);
        this.exit = new Point(exitX, exitY);
    }

    public getEntry(): Point {
        return this.entry;
    }

    public getExit(): Point {
        return this.exit;
    }

    public isOnEntry(position: Point): boolean {
        return this.entry.isOn(position);
    }
}