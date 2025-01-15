import { Point } from "./Point.js";

export class Plate extends Point {
    public color: string;
    private active: boolean;

    constructor(x: number, y: number, color: string) {
        super(x, y);
        this.color = color;
        this.active = false;
    }
    public activate(): void {
        this.active = true;
    }

    public deactivate(): void {
        this.active = false;
    }

    public isActive(): boolean {
        return this.active;
    }

    public getColor(): string {
        return this.color;
    }

}
