// Learning:
// ---------
// - Singleton pattern
// - TypeScript static members

// compile and run from cli:
// tsc singleton.ts --lib dom,es6 && node singleton.js

interface Position2D {
    x: number
    y: number
}

interface PlayerParams {
    position: Position2D
    health: number
}

// modeling user character in game
class Player {
    static instance: Player;

    private static position: Position2D;
    private static health: number;

    get instance() {
        return Player.instance;
    }

    get position() {
        return Player.position;
    }
    set position(position: Position2D) {
        Player.position = position;
    }

    get health() {
        return Player.health;
    }
    set health(health: number) {
        Player.health = health;
    }

    initPlayer(position:Position2D) {
        Player.position = position;
    }

    constructor(state: PlayerParams | null = null) {
        if (state) {
            this.position = state.position;
            this.health = state.health;
            Player.instance = this;
        }
        return Player.instance;
    }
}

const playerInitialState = new Player({position: {x: 10, y: 20}, health: 100});
const playerFinalState = new Player({position: {x: 100, y: 200}, health: 50});
console.log("playerInitialState:", playerInitialState.position, playerInitialState.health);
console.log("playerFinalState:", playerFinalState.position, playerFinalState.health);