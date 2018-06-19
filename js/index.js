var players = {
  "player": "X",
  "bot": "O"
};
var scores = {
  "X": -1,
  "O": 1,
  " ": 0
};
var combinations = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

$(".square").click(function() {
  if ($(this).text() == " ") {
    $(this).text(players["player"]);
    setTimeout(play, 600);
  }
});

function play() {
  
 
  var positions = [];
  $.each(combinations, function(combination, array) {

    positions.push(
      scores[$(".square").eq(array[0]).text()] +
      scores[$(".square").eq(array[1]).text()] +
      scores[$(".square").eq(array[2]).text()]
    );
  });
  

  var squareToPlay = false;
  
  squareToPlay = strategy(positions, -3);
  if (squareToPlay) {
    
    gameOver("you won!"); return false;
  }
  
  squareToPlay = strategy(positions, 2);
  if (squareToPlay) {

    $(".square").eq(squareToPlay).text(players["bot"]);
    setTimeout(gameOver, 500); return false;
  }
  
  squareToPlay = strategy(positions, -2);
  if (squareToPlay) {
    
    $(".square").eq(squareToPlay).text(players["bot"]);
    return false;
  }
  
 
  if ($(".square:contains(' ')").length == 0) {
    gameOver("Game is a draw."); return false;
  }
  
 
  choose();
   
}
           
function strategy(positions, score) {
  if (positions.indexOf(score) > -1) {
    var squareToPlay = true;
    $.each(combinations[positions.indexOf(score)], function(index, value) {
      if ($(".square").eq(value).text() == " ") {
        squareToPlay = value;
      }
    });
    return squareToPlay;
  }
  return false;
}

function choose() {
  var choosing = true;
  while (choosing) {
    var random = Math.floor(Math.random() * 9) - 1;
    if ($(".square").eq(random).text() == " ") {
      $(".square").eq(random).text(players["bot"]);
      choosing = false;
    }
  }
  if ($(".square:contains(' ')").length == 0) {
   
    setTimeout(play, 600);
  }
}

function gameOver(message) {
  if (message) {
    alert(message);
  } else {
    alert("You lost!");
  }
  newGame();
}

function newGame() {
  $(".square").text(" ");
}


$(".symbol").click(function() {
  if ($(".square:contains(' ')").length == 9) {
    
    players["player"] = $(this).html();
    players["bot"] = ($(this).html() == "X") ? "O" : "X";
    
    scores[players["player"]] = -1;
    scores[players["bot"]] = 1;
  
    $(".btn-primary").removeClass("btn-primary");
    $(this).addClass("btn-primary");
  } else {
    alert("Round is in progress.");
  }
});

$("#restart").click(function() {
  newGame();
});