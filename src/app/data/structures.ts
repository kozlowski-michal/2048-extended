export enum GameState {
    beforeGame,
    gameRunning,
    animationRunning,
    gameOver,
}

export enum GameKeys {
    space = " ",
    left = "ArrowLeft",
    right = "ArrowRight",
    up = "ArrowUp",
    down = "ArrowDown",
}

export enum TileType {
    normal,
    jumper,
    heavy,
    immobile,
    destroyer,
    fleeting,
    valuable,
}

export interface Tile {
    //exist: boolean, // even if tile do not exist at given place, the is not null: it's object exist with value false, to have ability to use references.
    type: TileType,
    value: number,
    moved: boolean,
    bonus: number,
    turn: number,
}
