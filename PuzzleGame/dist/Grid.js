import { Point } from "./Point.js";
import { Door } from "./Door.js";
import { Plate } from "./Plate.js";
export class Grid {
    constructor(width, height) {
        this.walls = [];
        this.doors = [];
        this.plates = [];
        this.goals = [];
        this.width = width;
        this.height = height;
    }
    clear() {
        this.walls = [];
        this.doors = [];
        this.plates = [];
        this.goals = [];
    }
    addWall(x, y) {
        this.walls.push(new Point(x, y));
    }
    addDoor(x, y, color, linkedPlate) {
        this.doors.push(new Door(x, y, color, linkedPlate));
    }
    addPlate(x, y, color) {
        this.plates.push(new Plate(x, y, color));
    }
    addGoal(x, y) {
        this.goals.push(new Point(x, y));
    }
    updateDoors(playersPositions) {
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
    isPlate(position) {
        for (let i = 0; i < this.plates.length; i++) {
            if (this.plates[i].isOn(position)) {
                return this.plates[i];
            }
        }
        return undefined;
    }
    isWall(position) {
        for (let i = 0; i < this.walls.length; i++) {
            if (this.walls[i].isOn(position)) {
                return true;
            }
        }
        return false;
    }
    isInGrid(position) {
        return position.x >= 0 && position.x < this.width && position.y >= 0 && position.y < this.height;
    }
    getDoorPos(position) {
        for (let i = 0; i < this.doors.length; i++) {
            if (this.doors[i].isOn(position)) {
                return this.doors[i];
            }
        }
    }
    getDoors() {
        return this.doors;
    }
    getPlates() {
        return this.plates;
    }
    getWalls() {
        return this.walls;
    }
    getGoals() {
        return this.goals;
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
}
