
const bar = document.getElementById('menu-bar')
const nav = document.getElementById('navbar')
const close= document.getElementById('close')
if (bar){
  bar.addEventListener('click',()=>{
      nav.classList.add('active2');
  })
}
if(close){
  close.addEventListener('click',()=>{
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
let restAudio = new Audio("reset.wav");
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

      // Add blinking effect to the winning moves
      boxtext[e[0]].classList.add("blink");
      boxtext[e[1]].classList.add("blink");
      boxtext[e[2]].classList.add("blink");
    }
  });

  if (!isgameover && Array.from(boxtext).every((el) => el.innerText !== "")) {
    gameover.play();
    // If game is not over and all moves have been made
    setTimeout(() => {
      location.reload(); // Reload the page after a delay
    }, 1500); // Delay in milliseconds (2 seconds)
  }

  if (!isWon && Array.from(boxtext).every((el) => el.innerText !== "")) {
    // If game is not won and all moves have been made
    document.querySelector(".info").innerText = "Game Over";
    isgameover = true;
    gameover.play(); // Play the gameover music
  }
};


// Game Logic
restAudio.play();
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let boxtext = element.querySelector(".boxtext");
  element.addEventListener("click", () => {
    if (boxtext.innerText === "") {
      boxtext.innerText = turn;
      if (turn === "X") {
        boxtext.style.color = "darkgray"; // Set color to red for X's turn
        audioTurn.play(); // Play audioTurn for X's turn
      } else
      {
        boxtext.style.color = "violet"; // Set color to blue for O's turn
        audioTurn0.play(); // Play audioTurn0 for O's turn
      }
      turn = changeTurn();
      checkWin();
      if (!isgameover) {
        document.getElementsByClassName("info")[0].innerText =
          "Turn for " + turn;
      }
    }
  });
});
// Reset the game
document.getElementById("reset").addEventListener("click", () => {
  location.reload(); // Reload the page to reset the game
});
