const px = 50;
const columns = 15;
const rows = 10;
const mazeCanvas = document.getElementById("maze-canvas");
const blocksGroup = document.getElementById("maze-blocks");
const pathGroup = document.getElementById("maze-path");
const modes = {
  DRAW_WALLS: "drawWalls",
  ERASE_WALLS: "eraseWalls",
  SET_START: "setStart",
  SET_END: "setEnd"
};
const mazeBlocks = {
  EMPTY: "empty",
  WALL: "wall",
  START: "start",
  END: "end"
};
const colors = {
  "empty": "lightgray",
  "wall": "lightgreen",
  "start": "yellow",
  "end": "red"
};

let maze = {
  maze: [],
  start: {
    row: null,
    column: null
  },
  end: {
    row: null,
    column: null
  },
  rows: rows,
  columns: columns
};
maze.maze = new Array(rows).fill(mazeBlocks.EMPTY).map(
  () => new Array(columns).fill(mazeBlocks.EMPTY)
);

let currentMode = modes.DRAW_WALLS;
document.getElementById("draw-walls").onclick = function() {
  currentMode = modes.DRAW_WALLS;
};
document.getElementById("erase-walls").onclick = function() {
  currentMode = modes.ERASE_WALLS;
};
document.getElementById("set-start").onclick = function() {
  currentMode = modes.SET_START;
};
document.getElementById("set-end").onclick = function() {
  currentMode = modes.SET_END;
};

mazeCanvas.setAttribute("viewBox", "0" + " " + "0" + " " + columns * px + " " + rows * px);

function drawMaze(maze) {
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      let block = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      block.setAttribute("id", row + "_" + column)
      block.setAttribute("height", px);
      block.setAttribute("width", px);
      block.setAttribute("x", column * px);
      block.setAttribute("y", row * px);
      block.setAttribute("fill", colors[maze.maze[row][column]]);
      block.setAttribute("stroke", "gray");
      block.onclick = function() {
        const column = block.getAttribute("x") / px;
        const row = block.getAttribute("y") / px;
  
        switch(currentMode) {
          case modes.DRAW_WALLS:
            maze.maze[row][column] = mazeBlocks.WALL;
            block.setAttribute("fill", colors[maze.maze[row][column]]);
            break;
          case modes.ERASE_WALLS:
            maze.maze[row][column] = mazeBlocks.EMPTY;
            block.setAttribute("fill", colors[maze.maze[row][column]]);
            break;
          case modes.SET_START:
            maze.maze[row][column] = mazeBlocks.START;
            if(maze.start.column != null) {
              maze.maze[maze.start.row][maze.start.column] = mazeBlocks.EMPTY;
              document.getElementById(maze.start.row + "_" + maze.start.column).setAttribute("fill", colors[maze.maze[maze.start.row][maze.start.column]]);
            }
            maze.start = { row: row, column: column };
            block.setAttribute("fill", colors[maze.maze[row][column]]);
            break;
          case modes.SET_END:
            maze.maze[row][column] = mazeBlocks.END;
            if(maze.end.column != null) {
              maze.maze[maze.end.row][maze.end.column] = mazeBlocks.EMPTY;
              document.getElementById(maze.end.row + "_" + maze.end.column).setAttribute("fill", colors[maze.maze[maze.end.row][maze.end.column]]);
            }
            maze.end = { row: row, column: column };
            block.setAttribute("fill", colors[maze.maze[row][column]]);
            break;
        }
      }
      blocksGroup.appendChild(block);
    }
  }
}


function drawExit(exit) {
  while(pathGroup.firstChild) {
    pathGroup.firstChild.remove();
  }
  
  exit.forEach(point => {
    let emoji = document.createElementNS("http://www.w3.org/2000/svg", "use");
    emoji.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#emoji");
    emoji.setAttribute("x", point.column * px);
    emoji.setAttribute("y", point.row * px);
    pathGroup.appendChild(emoji);
  });
}