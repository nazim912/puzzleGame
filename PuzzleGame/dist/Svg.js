export class SVGDisplay {
    constructor(svgId) {
        const element = document.getElementById(svgId);
        if (!(element instanceof SVGElement)) {
            throw new Error("SVG element not found");
        }
        this.svg = element;
    }
    drawGrid() {
    }
    drawWalls(walls) {
        walls.forEach((wall) => {
            const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttribute("x", String(wall.x * 40));
            rect.setAttribute("y", String(wall.y * 40));
            rect.setAttribute("width", "40");
            rect.setAttribute("height", "40");
            rect.setAttribute("fill", "#666");
            rect.setAttribute("stroke", "#444");
            rect.setAttribute("stroke-width", "4");
            this.svg.appendChild(rect);
        });
    }
    drawPlayers(players) {
        players.forEach((player, index) => {
            const existingCircle = document.getElementById(`player-${index}`);
            if (existingCircle) {
                existingCircle.setAttribute("cx", String(player.x * 40 + 20.5));
                existingCircle.setAttribute("cy", String(player.y * 40 + 20.5));
            }
            else {
                const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                circle.setAttribute("id", `player-${index}`);
                circle.setAttribute("cx", String(player.x * 40 + 20.5));
                circle.setAttribute("cy", String(player.y * 40 + 20.5));
                circle.setAttribute("r", "15");
                circle.setAttribute("fill", player === players[0] ? "#4a90e2" : "#e24a4a");
                circle.setAttribute("stroke", player === players[0] ? "#2171c7" : "#c72121");
                circle.setAttribute("stroke-width", "5");
                this.svg.appendChild(circle);
            }
        });
    }
    drawGoal(goal) {
        const existingCircle = document.getElementById("goal");
        if (existingCircle) {
            existingCircle.setAttribute("cx", String(goal.x * 40 + 20.5));
            existingCircle.setAttribute("cy", String(goal.y * 40 + 20.5));
        }
        else {
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("id", "goal");
            circle.setAttribute("cx", String(goal.x * 40 + 20.5));
            circle.setAttribute("cy", String(goal.y * 40 + 20.5));
            circle.setAttribute("r", "15");
            circle.setAttribute("fill", "#ffd700");
            circle.setAttribute("stroke", "#b59b00");
            circle.setAttribute("stroke-width", "5");
            this.svg.appendChild(circle);
        }
    }
}
