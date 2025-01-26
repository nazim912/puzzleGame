import { Drawer } from "./Drawer.js";
import { Game } from "./Game.js";

export class Display {
    private drawer: Drawer;

    constructor(width: number, height: number) {
        this.drawer = new Drawer(width, height);
    }
    public draw(game: Game): void {
        this.drawer.clear();

        const walls = game.getGrid().getWalls();
        for (const wall of walls) {
            this.drawer.drawRectangle(wall.getX(), wall.getY(), "black");
        }

        const plates = game.getGrid().getPlates();
        for (const plate of plates) {
            this.drawer.drawCircle(plate.getX(), plate.getY(), plate.getColor());
        }

        const doors = game.getGrid().getDoors();
        for (const Door of doors) {
            this.drawer.drawRectangle(Door.getX(), Door.getY(), Door.getColor());
        }

        const goals = game.getGrid().getGoals();
        for (const goal of goals) {
            this.drawer.drawDiamond(goal.getX(), goal.getY(), "green");
        }
        const teleporters = game.getGrid().getTeleporteurs();
        for (const teleporter of teleporters) {
            const entry = teleporter.getEntry();
            const exit = teleporter.getExit();

            this.drawer.drawRectangle(entry.getX(), entry.getY(), "purple");
            this.drawer.drawRectangle(exit.getX(), exit.getY(), "orange");
        }

        const player1 = game.getPlayer1();
        this.drawer.drawCircle(player1.getX(), player1.getY(), "black");

        const player2 = game.getPlayer2();
        this.drawer.drawCircle(player2.getX(), player2.getY(), "brown");
    }
}