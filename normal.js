const bar = document.getElementById('menu-bar')
const nav = document.getElementById('navbar')
const close = document.getElementById('close')
if (bar) {
  bar.addEventListener('click', () => {
    nav.classList.add('active2');
  })
}
if (close) {
  close.addEventListener('click', () => {
    nav.classList.remove('active2');
  })
}
window.onscroll = () => {
  nav.classList.remove('active2')
}
console.log("Welcome to Tic Tac Toe");
let music = new Audio("music.mp3");
let audioTurn = new Audio("ting.mp3");
let audioTurn0 = new Audio("music2.wav");
let gameover = new Audio("gameover.mp3");
let restAudio = new Audio("reset.wav")
let turn = "X";
let isgameover = false;

// Function to change the turn
const changeTurn = () => {
  return turn === "X" ? "O" : "X";
};

// Function to check for a win
const checkWin = () => {
  let boxtext = document.getElementsByClassName("boxtext");
  let wins = [
    [0, 1, 2, 5, 5, 0],
    [3, 4, 5, 5, 15, 0],
    [6, 7, 8, 5, 25, 0],
    [0, 3, 6, -5, 15, 90],
    [1, 4, 7, 5, 15, 90],
    [2, 5, 8, 15, 15, 90],
    [0, 4, 8, 5, 15, 45],
    [2, 4, 6, 5, 15, 135],
  ];
  let isWon = false;
  wins.forEach((e) => {
    if (
      boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[1]].innerText === boxtext[e[2]].innerText &&
      boxtext[e[0]].innerText !== ""
    ) {
      document.querySelector(".info").innerText =
        boxtext[e[0]].innerText + " Won";
      isgameover = true;
      document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width =
        "150px";
      isWon = true;
      music.play(); // Play the music

      // // Apply blinking effect to winning moves
      // [e[0], e[1], e[2]].forEach((index) => {
      //   boxtext[index].classList.add("blink");
      // });
      // Add the blinking class to the winning mark
      boxtext[e[0]].classList.add("blink");
      boxtext[e[1]].classList.add("blink");
      boxtext[e[2]].classList.add("blink");
    }
  });
  if (!isgameover && Array.from(boxtext).every((el) => el.innerText !== "")) {
    // If the game is not over and all moves have been made
    setTimeout(() => {
      location.reload(); // Reload the page after a delay
    }, 1500); // Delay in milliseconds (2 seconds)
  }

  if (!isWon && Array.from(boxtext).every((el) => el.innerText !== "")) {
    // If the game is not won and all moves have been made
    document.querySelector(".info").innerText = "Game Over";
    isgameover = true;
    gameover.play(); // Play the gameover music
  }
};

// Function to make the computer's move
const makeComputerMove = () => {
  let boxtexts = document.querySelectorAll(".boxtext");
  let emptyBoxes = [];
  Array.from(boxtexts).forEach((element, index) => {
    if (element.innerText === "") {
      emptyBoxes.push(index);
    }
  });

  // Check for winning opportunities
  let winningMove = getWinningMove(boxtexts, emptyBoxes, "O");
  if (winningMove !== null) {
    // Make the winning move
    boxtexts[winningMove].innerText = turn;
    boxtexts[winningMove].style.color = "violet";
    audioTurn0.play();
    turn = changeTurn();
    checkWin();
    if (!isgameover) {
      document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    }
    return; // Exit the function
  }

  // Check for blocking opportunities
  let blockingMove = getWinningMove(boxtexts, emptyBoxes, "X");
  if (blockingMove !== null) {
    // Make the blocking move
    boxtexts[blockingMove].innerText = turn;
    boxtexts[blockingMove].style.color = "violet";
    audioTurn0.play();
    turn = changeTurn();
    checkWin();
    if (!isgameover) {
      document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    }
    return; // Exit the function
  }

  if (emptyBoxes.length > 0) {
    // Randomly select an empty box
    let randomIndex = Math.floor(Math.random() * emptyBoxes.length);
    let selectedBox = emptyBoxes[randomIndex];

    // Make the computer's move
    boxtexts[selectedBox].innerText = turn;
    boxtexts[selectedBox].style.color = "violet";
    audioTurn0.play();
    turn = changeTurn();
    checkWin();

    if (!isgameover) {
      document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    }
  }
};

// Function to check for a winning move or blocking move
const getWinningMove = (boxtexts, emptyBoxes, player) => {
  let winningMove = null;
  let wins = [
    [0, 1], [3, 4], [7, 8],// Rows
    [0, 3], [1, 4, 7], [2, 8], // Columns
    [0, 4, 8], [4, 2], [1, 5],// Diagonals
  ];

  // Check for two consecutive marks in a row, column, or diagonal
  for (let win of wins) {
    let marks = win.map(index => boxtexts[index].innerText);
    let emptySpotIndex = win.find(index => boxtexts[index].innerText === "");
    if (marks.filter(mark => mark === player).length === 2 && emptySpotIndex !== undefined) {
      winningMove = emptySpotIndex;
      break;
    }
  }
  return winningMove;
};

// Game Logic
restAudio.play();
let boxes = document.getElementsByClassName("box");
let boxtexts = document.querySelectorAll(".boxtext");

Array.from(boxes).forEach((element) => {
  let boxtext = element.querySelector(".boxtext");
  element.addEventListener("click", () => {
    if (boxtext.innerText === "" && !isgameover) {
      boxtext.innerText = turn;
      if (turn === "X") {
        boxtext.style.color = "black";
        audioTurn.play();
      } else {
        boxtext.style.color = "violet";
        audioTurn0.play();
      }
      turn = changeTurn();
      checkWin();
      if (!isgameover) {
        document.querySelector(".info").innerText = "Turn for " + turn;
        if (turn === "O") {
          setTimeout(makeComputerMove, 800); // Delay computer's move by 0.8 seconds
        }
      }
    }
  });
});

reset.addEventListener("click", () => {
  let boxtexts = document.querySelectorAll(".boxtext");
  Array.from(boxtexts).forEach((element) => {

    element.innerText = "";
  });
  turn = "X";
  isgameover = false;
  document.querySelector(".line").style.width = "0vw";
  document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
  document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width = "0px";
  restAudio.play();
  music.pause();
  music.currentTime = 0;
});

// Reload the page after a delay if all moves have been made but no win
if (!isgameover && Array.from(boxes).every((element) => element.innerText !== "")) {
  setTimeout(() => {
    location.reload();
  }, 1500); // Delay in milliseconds (2 seconds)
}

