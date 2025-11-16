export type CellType = 'wall' | 'floor' | 'goal' | 'box' | 'player' | 'box-on-goal' | 'player-on-goal';

export interface Position {
  x: number;
  y: number;
}

export interface GameState {
  grid: CellType[][];
  playerPos: Position;
  moves: number;
  isComplete: boolean;
}

export interface Level {
  id: number;
  grid: string[];
  name: string;
}

export const LEVELS: Level[] = [
  {
    id: 1,
    name: "Getting Started",
    grid: [
      "########",
      "#      #",
      "#  $.  #",
      "#  @   #",
      "#      #",
      "########",
    ]
  },
  {
    id: 2,
    name: "Two Boxes",
    grid: [
      "  ######",
      "###    #",
      "#  $ . #",
      "# @$ . #",
      "###    #",
      "  ######",
    ]
  },
  {
    id: 3,
    name: "Corner Push",
    grid: [
      "########",
      "#   .  #",
      "# $@$  #",
      "#   . ##",
      "#     #",
      "#######",
    ]
  },
  {
    id: 4,
    name: "T Formation",
    grid: [
      "  #####",
      "  #   #",
      "###$. #",
      "#  $@##",
      "# #.$ #",
      "#     #",
      "#######",
    ]
  },
  {
    id: 5,
    name: "Four Corners",
    grid: [
      "########",
      "#.    .#",
      "#  $$  #",
      "#   @  #",
      "#  $$  #",
      "#.    .#",
      "########",
    ]
  },
  {
    id: 6,
    name: "Snake Path",
    grid: [
      "  #######",
      "###     #",
      "#   # $ #",
      "# $ # .##",
      "##$ # .#",
      " # @#$.#",
      " #    .#",
      " #######",
    ]
  },
  {
    id: 7,
    name: "Storage Room",
    grid: [
      "########",
      "#   .  #",
      "#  #.# #",
      "# $$$$ #",
      "# .#.  #",
      "#   @  #",
      "########",
    ]
  },
  {
    id: 8,
    name: "Tight Squeeze",
    grid: [
      " ########",
      "##  ... #",
      "#   #$# #",
      "#  $ $  #",
      "##$# @  #",
      " #   ####",
      " #####",
    ]
  },
  {
    id: 9,
    name: "The Maze",
    grid: [
      "  #######",
      " ##  .  #",
      "##  #.# #",
      "# $ $ $ #",
      "# #.#  ##",
      "#  .@ ##",
      "#######",
    ]
  },
  {
    id: 10,
    name: "Master Challenge",
    grid: [
      " ########",
      " #   .  #",
      "##$###. #",
      "#  $  #.#",
      "# $ #  .#",
      "##$  # ##",
      " # @   #",
      " #######",
    ]
  }
];

export function parseLevel(levelData: string[]): GameState {
  const grid: CellType[][] = [];
  let playerPos: Position = { x: 0, y: 0 };

  levelData.forEach((row, y) => {
    grid[y] = [];
    for (let x = 0; x < row.length; x++) {
      const char = row[x];
      switch (char) {
        case '#':
          grid[y][x] = 'wall';
          break;
        case ' ':
          grid[y][x] = 'floor';
          break;
        case '.':
          grid[y][x] = 'goal';
          break;
        case '$':
          grid[y][x] = 'box';
          break;
        case '@':
          grid[y][x] = 'player';
          playerPos = { x, y };
          break;
        case '*':
          grid[y][x] = 'box-on-goal';
          break;
        case '+':
          grid[y][x] = 'player-on-goal';
          playerPos = { x, y };
          break;
        default:
          grid[y][x] = 'floor';
      }
    }
  });

  return {
    grid,
    playerPos,
    moves: 0,
    isComplete: false,
  };
}

export function canMove(grid: CellType[][], from: Position, to: Position): boolean {
  if (to.y < 0 || to.y >= grid.length || to.x < 0 || to.x >= grid[0].length) {
    return false;
  }
  
  const targetCell = grid[to.y][to.x];
  return targetCell !== 'wall';
}

export function movePlayer(
  state: GameState,
  direction: { dx: number; dy: number }
): GameState {
  const newPlayerPos = {
    x: state.playerPos.x + direction.dx,
    y: state.playerPos.y + direction.dy,
  };

  if (!canMove(state.grid, state.playerPos, newPlayerPos)) {
    return state;
  }

  const targetCell = state.grid[newPlayerPos.y][newPlayerPos.x];
  const isBox = targetCell === 'box' || targetCell === 'box-on-goal';

  if (isBox) {
    const boxNewPos = {
      x: newPlayerPos.x + direction.dx,
      y: newPlayerPos.y + direction.dy,
    };

    if (!canMove(state.grid, newPlayerPos, boxNewPos)) {
      return state;
    }

    const boxTargetCell = state.grid[boxNewPos.y][boxNewPos.x];
    if (boxTargetCell === 'box' || boxTargetCell === 'box-on-goal') {
      return state;
    }
  }

  const newGrid = state.grid.map(row => [...row]);
  const currentCell = newGrid[state.playerPos.y][state.playerPos.x];
  newGrid[state.playerPos.y][state.playerPos.x] = 
    currentCell === 'player-on-goal' ? 'goal' : 'floor';

  if (isBox) {
    const boxNewPos = {
      x: newPlayerPos.x + direction.dx,
      y: newPlayerPos.y + direction.dy,
    };

    const boxTargetCell = newGrid[boxNewPos.y][boxNewPos.x];
    newGrid[boxNewPos.y][boxNewPos.x] = 
      boxTargetCell === 'goal' ? 'box-on-goal' : 'box';

    const playerTargetCell = newGrid[newPlayerPos.y][newPlayerPos.x];
    newGrid[newPlayerPos.y][newPlayerPos.x] = 
      playerTargetCell === 'box-on-goal' ? 'player-on-goal' : 'player';
  } else {
    newGrid[newPlayerPos.y][newPlayerPos.x] = 
      targetCell === 'goal' ? 'player-on-goal' : 'player';
  }

  const isComplete = checkWinCondition(newGrid);

  return {
    grid: newGrid,
    playerPos: newPlayerPos,
    moves: state.moves + 1,
    isComplete,
  };
}

export function checkWinCondition(grid: CellType[][]): boolean {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === 'box' || grid[y][x] === 'goal') {
        return false;
      }
    }
  }
  return true;
}
