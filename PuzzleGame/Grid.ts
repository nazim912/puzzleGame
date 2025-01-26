import { Point } from "./Point.js";
import { Door } from "./Door.js";
import { Plate } from "./Plate.js";
import { Teleporteur } from "./Teleporteur.js";

export class Grid {
    private walls: Point[] = [];
    private doors: Door[] = [];
    private plates: Plate[] = [];
    private goals: Point[] = [];
    private teleporters: Teleporteur[] = [];
    private width: number;
    private height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    public clear(): void {
        this.walls = [];
        this.doors = [];
        this.plates = [];
        this.goals = [];
        this.teleporters = [];

    }

    public addWall(x: number, y: number): void {
        this.walls.push(new Point(x, y));
    }

    public addDoor(x: number, y: number, color: string, linkedPlate: Plate): void {
        this.doors.push(new Door(x, y, color, linkedPlate));
    }

    public addPlate(x: number, y: number, color: string): void {
        this.plates.push(new Plate(x, y, color));
    }

    public addGoal(x: number, y: number): void {
        this.goals.push(new Point(x, y));
    }
    public addTeleporteur(entryX: number, entryY: number, exitX: number, exitY: number): void {
        this.teleporters.push(new Teleporteur(entryX, entryY, exitX, exitY));
    }

    public updateDoors(playersPositions: Point[]): void {
        for (let i = 0; i < this.plates.length; i++) {

            this.plates[i].deactivate();
        }

        for (let i = 0; i < playersPositions.length; i++) {
            const position = playersPositions[i];
            const plate = this.isPlate(position);

            if (plate != undefined) {
                plate.activate();
            }
        }

        for (let i = 0; i < this.doors.length; i++) {
            const door = this.doors[i];
            let isLinkedPlateActive = false;

            for (let j = 0; j < this.plates.length; j++) {
                const plate = this.plates[j];

                if (plate.getColor() === door.getColor() && plate.isActive()) {
                    isLinkedPlateActive = true;
                }
            }
            door.setOpen(isLinkedPlateActive);
        }
    }
    
    public isPlate(position: Point): Plate | undefined {
        for (let i = 0; i < this.plates.length; i++) {

            if (this.plates[i].isOn(position)) {
                return this.plates[i];
            }
        }
        return undefined;
    }

    public isWall(position: Point): boolean {
        for (let i = 0; i < this.walls.length; i++) {

            if (this.walls[i].isOn(position)) {
                return true;
            }
        }
        return false;
    }

    public isInGrid(position: Point): boolean {
        return position.x >= 0 && position.x < this.width && position.y >= 0 && position.y < this.height;

    }

    public getDoorPos(position: Point): Door | undefined {
        for (let i = 0; i < this.doors.length; i++) {

            if (this.doors[i].isOn(position)) {
                return this.doors[i];
            }
        }
    }

    public getTeleporteurEntre(position: Point): Teleporteur | undefined {
        for (let i = 0; i < this.teleporters.length; i++) {
            if (this.teleporters[i].isOnEntry(position)) {

                return this.teleporters[i];
            }
        }
        return undefined;
    }

    public getDoors(): Door[] {
        return this.doors;
    }

    public getPlates(): Plate[] {
        return this.plates;
    }

    public getWalls(): Point[] {
        return this.walls;
    }

    public getGoals(): Point[] {
        return this.goals;
    }

    public getTeleporteurs(): Teleporteur[] {
        return this.teleporters;
    }

    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }
} 