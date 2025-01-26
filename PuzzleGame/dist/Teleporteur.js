import { Point } from "./Point.js";
export class Teleporteur {
    constructor(entryX, entryY, exitX, exitY) {
        this.entry = new Point(entryX, entryY);
        this.exit = new Point(exitX, exitY);
    }
    getEntry() {
        return this.entry;
    }
    getExit() {
        return this.exit;
    }
    isOnEntry(position) {
        return this.entry.isOn(position);
    }
}
