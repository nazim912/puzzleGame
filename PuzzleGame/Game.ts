import { Player } from "./Player.js";
import { Grid } from "./Grid.js";
import { Direction } from "./Direction.js";
import { Point } from "./Point.js";
import { Plate } from "./Plate.js";
import { Display } from "./Display.js";

export class Game {
    private grid: Grid;
    private player1: Player;
    private player2: Player;
    private display: Display;

    constructor(width: number, height: number, display: Display) {
        this.grid = new Grid(width, height);
        this.player1 = new Player(1, 2, "blue");
        this.player2 = new Player(3, 3, "red");
        this.display = display;
    }

    public initialize(): void {
        this.grid.clear();
        this.player1.setPosition(5, 10);
        this.player2.setPosition(5, 30);
    
        // h/
        for (let i = 3; i < 33; i++) {
            // verifier limite zone 
            if ( i !== 5) {
                this.grid.addWall(i, 5);
            }
        }

        for (let i = 3; i < 33; i++) {
                this.grid.addWall(i, 33);
        }
    
        for (let i = 3; i < 7; i++) {
            this.grid.addWall(i, 20);
        }
        for (let i = 8; i < 33; i++) {
            this.grid.addWall(i, 20);
        }
    
        for (let i = 3; i < 33; i++) {
            if ( i !== 30) {
                this.grid.addWall(i, 15);
            }
        }
    
        //p2
        for (let i = 3; i < 25; i++) {
            this.grid.addWall(i, 25);
        }
        for (let i = 26; i < 33; i++) {
            this.grid.addWall(i, 25);
        }
        for (let i = 5; i < 34; i++) {
            this.grid.addWall(3, i);
            this.grid.addWall(33, i);
        }
    
        // m1
        
        for (let i = 7; i < 33; i++) {
            if (i !== 18 && i !== 22 && i !== 29) {
                this.grid.addWall(15,i);
            }
        }
    
        // p2 noir
        for (let i = 5; i < 21; i++) {
            if (i !== 9 && i !== 18) {
                this.grid.addWall(25,i);
            }
        }
        

        const redPlate1 = new Plate(5, 22, "red");
        const redPlate2 = new Plate(6, 6, "red");
        this.grid.addPlate(5, 6, "red");
        this.grid.addPlate(8, 22, "red");
        this.grid.addPlate(20, 18, "red");
        this.grid.addDoor(15, 29, "red", redPlate1);
        this.grid.addDoor(25, 25, "red", redPlate2);
        this.grid.addDoor(15, 18, "red", redPlate1);
        this.grid.addDoor(30, 15, "red", redPlate2);
    
        const bluePlate1 = new Plate(30, 22, "blue");
        const bluePlate2 = new Plate(32, 7, "blue");
        this.grid.addPlate(bluePlate1.x, bluePlate1.y, bluePlate1.getColor());
        this.grid.addPlate(bluePlate2.x, bluePlate2.y, bluePlate2.getColor());
        this.grid.addPlate(31, 18, "blue");
        this.grid.addPlate(6, 18, "blue");
        this.grid.addDoor(15, 6, "blue", bluePlate1);
        this.grid.addDoor(25, 9, "blue", bluePlate2);
        this.grid.addDoor(15, 22, "blue", bluePlate2);
        this.grid.addDoor(25, 18, "blue", bluePlate1);
        this.grid.addDoor(7, 20, "blue", bluePlate2);
    
        this.grid.addGoal(22, 17);
        this.grid.addGoal(18, 17);
    
        this.setupEventListeners();
    }

    public run(): void {
        this.initialize();
        this.display.draw(this);
    }

    private setupEventListeners(): void {
        document.addEventListener("keydown", (event) => {
            let player: Player | undefined;
            let direction: Direction | undefined;

            switch (event.key) {
                case "ArrowUp":
                    player = this.player1;
                    direction = Direction.UP;
                    break;
                case "ArrowDown":
                    player = this.player1;
                    direction = Direction.DOWN;
                    break;
                case "ArrowLeft":
                    player = this.player1;
                    direction = Direction.LEFT;
                    break;
                case "ArrowRight":
                    player = this.player1;
                    direction = Direction.RIGHT;
                    break;
                case "z":
                    player = this.player2;
                    direction = Direction.UP;
                    break;
                case "s":
                    player = this.player2;
                    direction = Direction.DOWN;
                    break;
                case "q":
                    player = this.player2;
                    direction = Direction.LEFT;
                    break;
                case "d":
                    player = this.player2;
                    direction = Direction.RIGHT;
                    break;
            }

            if (player && direction !== undefined) {
                const nextPosition = this.getNextPosition(player, direction);

                if (this.canMoveTo(player, nextPosition)) {
                    player.move(direction);
                    this.grid.updateDoors(this.playerPos());
                }

                this.display.draw(this);

                if (this.checkLevelCompletion()) {
                    this.nextLevel();
                }
            }
        });
    }

    private getNextPosition(player: Player, direction: Direction): Point {
        switch (direction) {
            case Direction.UP:
                return new Point(player.getX(), player.getY() - 1);
            case Direction.DOWN:
                return new Point(player.getX(), player.getY() + 1);
            case Direction.LEFT:
                return new Point(player.getX() - 1, player.getY());
            case Direction.RIGHT:
                return new Point(player.getX() + 1, player.getY());
        }
    }

    private canMoveTo(player: Player, nextPosition: Point): boolean {
        if (!this.grid.isInGrid(nextPosition) || this.grid.isWall(nextPosition)) {
            return false;
        }
    
        let otherPlayer = this.player1
        if (player === this.player1) {

            otherPlayer = this.player2;

            if (otherPlayer.x === nextPosition.x && otherPlayer.y === nextPosition.y) {
                return false;
            }
        }

        const door = this.grid.getDoorPos(nextPosition);
        if (door && !door.isOpen()) {
            return false;
        }
        return true;
    }

    private playerPos(): Point[] {

        return [
            new Point(this.player1.getX(), this.player1.getY()),
            new Point(this.player2.getX(), this.player2.getY()),

        ];
    }

    private checkLevelCompletion(): boolean {

        const goals = this.grid.getGoals();
    
        let player1Goal = false;
        let player2Goal = false;
        
        for (let i = 0; i < goals.length; i++) {
            const goal = goals[i];
    
            if (this.player1.x === goal.x && this.player1.y === goal.y) {
                player1Goal = true;
            }
    
            if (this.player2.x === goal.x && this.player2.y === goal.y) {
                player2Goal = true;
            }
        }
    
        return player1Goal && player2Goal;
    }

    private nextLevel(): void {
        
        this.grid.clear();

        this.player1.setPosition(5, 10);
        this.player2.setPosition(5, 30);

        for (let i = 3; i < 33; i++) {
            this.grid.addWall(i, 5);
            this.grid.addWall(i, 33);

        }
        for (let i = 5; i < 34; i++) {
            this.grid.addWall(3, i);
            this.grid.addWall(33, i);
        }

        for (let i = 5; i < 33; i++) {
            if (i !== 20) {
                this.grid.addWall(15, i);
            }
        }

    
        for (let i = 3; i < 33; i++) {
            if (i !== 10 && i !== 26) {
                this.grid.addWall(i, 15);
            }
        }
        for (let i = 3; i < 33; i++) {
            if (i !== 5 && i !== 20) {
                this.grid.addWall(i, 25);
            }
        }
        const redPlate1 = new Plate(6, 20, "red");
        const redPlate2 = new Plate(10, 30, "red");
        this.grid.addPlate(redPlate1.x, redPlate1.y, redPlate1.getColor());
        this.grid.addPlate(redPlate2.x, redPlate2.y, redPlate2.getColor());
        this.grid.addPlate(25, 30, "red")
        this.grid.addDoor(5, 25, "red", redPlate1);
        this.grid.addDoor(10, 15, "red", redPlate1);
        this.grid.addDoor(26, 15, "red", redPlate2);

    
        const bluePlate1 = new Plate(10, 20, "blue");
        const bluePlate2 = new Plate(20, 20, "blue");
        this.grid.addPlate(bluePlate1.x, bluePlate1.y, bluePlate1.getColor());
        this.grid.addPlate(bluePlate2.x, bluePlate2.y, bluePlate2.getColor());
        
        this.grid.addDoor(20, 25, "blue", bluePlate2);
        this.grid.addDoor(15, 20, "blue", bluePlate1);

    
        this.grid.addGoal(17, 14);
        this.grid.addGoal(17, 26);

    }
    
    public getGrid(): Grid {
        return this.grid;
    }

    public getPlayer1(): Player {
        return this.player1;
    }

    public getPlayer2(): Player {
        return this.player2;
    }
}
