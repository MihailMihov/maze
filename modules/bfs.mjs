'use strict';

const mazeBlocks = {
  EMPTY: "empty",
  WALL: "wall",
  START: "start",
  END: "end",
  TEMP: "temp"
};
let queue;
let exits;

export function solveMaze(maze) {
  exits = [];
  queue = [{row: maze.start.row, column: maze.start.column, path: []}];
  if(maze.maze[maze.start.row][maze.start.column] === mazeBlocks.WALL) return [];
  while(queue.length != 0) {
    let position = queue.shift();
    tryMovePosition({row: position.row + 1, column: position.column, path: position.path}, maze.end);
    tryMovePosition({row: position.row - 1, column: position.column, path: position.path}, maze.end);
    tryMovePosition({row: position.row, column: position.column + 1, path: position.path}, maze.end);
    tryMovePosition({row: position.row, column: position.column - 1, path: position.path}, maze.end);
  }
  resetMaze(maze.maze);
  return exits[0];
}

function tryMovePosition(position, end) {
  if(!isInsideMaze(position)) return;
  if(position.row == end.row && position.column == end.column) exits.push(position.path);
  else if(maze.maze[position.row][position.column] === mazeBlocks.EMPTY) {
    let newPath = position.path.slice();
    newPath.push({row: position.row, column: position.column});
    queue.push({row: position.row, column: position.column, path: newPath});
    maze.maze[position.row][position.column] = mazeBlocks.TEMP;
  }
}

function isInsideMaze(position) {
  if(position.row    >= 0 && position.row    < maze.maze.length &&
     position.column >= 0 && position.column < maze.maze[0].length)
    return true;
}

function resetMaze(maze) {
  for(let row = 0; row < maze.length; row++) {
    for (let column = 0; column < maze[0].length; column++) {
      if(maze[row][column] == mazeBlocks.TEMP) {
        maze[row][column] = mazeBlocks.EMPTY;
      }
    }
  }
}