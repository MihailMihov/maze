import { solveMaze } from "./modules/bfs.mjs";

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    firebase.database().ref("users/" + firebase.auth().currentUser.uid + "/mazes/").on("value", function(snapshot) {
      const mazeNames = Object.keys(snapshot.val());
      const mazes = document.getElementById("mazes");
      while(mazes.firstChild) {
        mazes.removeChild(mazes.firstChild);
      }
      mazeNames.forEach(name => {
        const option = document.createElement("option");
        option.innerHTML = name;
        mazes.appendChild(option);
      });
    });
  } else {
    window.location.href = window.location.origin + "/sign-in.html";
  }
});

document.getElementById("sign-out").onclick = function() {
  firebase.auth().signOut();
};

document.getElementById("solve").onclick = function() {
  if(maze.start.row == null) {
    alert("You must set a start.");
  }
  if(maze.end.row == null) {
    alert("You must set an end.");
  }
  drawExit(solveMaze(maze));
};

document.getElementById("upload").onclick = function() {
  const user = firebase.auth().currentUser;
  const mazeName = document.getElementById("maze-name").value;

  if(mazeName === "") {
    alert("You must specify a name for the maze.");
    return;
  }

  firebase.database().ref("users/" + user.uid + "/mazes/" + mazeName).set({
    maze: maze.maze,
    start: maze.start,
    end: maze.end,
    rows: maze.rows,
    columns: maze.columns
  }, function(error) {
    if (error) {
      console.error("Error writing document: " + error);
    } else {
      console.log("Maze \"" + mazeName + "\" succesfully uploaded to Firebase database!");
    }
  });
};

document.getElementById("load-maze").onclick = function() {
  const user = firebase.auth().currentUser;
  firebase.database().ref("/users/" + user.uid + "/mazes/" + document.getElementById("mazes").value).once("value").then(function(snapshot) {
    maze = snapshot.val();
    drawMaze(maze);
  });
};

document.getElementById("delete-maze").onclick = function() {
  firebase.database().ref("users/" + firebase.auth().currentUser.uid + "/mazes/" + document.getElementById("mazes").value).remove();
};

drawMaze(maze);