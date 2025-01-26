import { Display } from "./Display.js";
import { Game } from "./Game.js";

const display = new Display(40, 40);

const game = new Game(40, 40, display);

game.run();