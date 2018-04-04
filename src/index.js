import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function EmptySquare() {
  return (
    <button className="emptySquare"></button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    const orthogonalPaths =  {0 : [1,3], 1 : [0,4], 2 : [3,7], 3 : [0,2,4,8], 4 : [1,3,5,9], 5 : [4,10],
      6 : [7,12], 7 : [2,6,8,13], 8 : [3,7,9,14], 9 : [4,8,10,15], 10 : [5,9,11,16], 11 : [10,17], 12 : [6,13], 13 : [7,12,14,18],
      14 : [8,13,15,19], 15 : [9,14,16,20], 16 : [10,15,17,21], 17 : [11,16], 18 : [13,19], 19 : [14,18,20,22], 20 : [15,19,21,23],
      21 : [16,20], 22 : [19,23], 23 : [20,22]};
    const diagonalPaths = {0 : [4], 1 : [3], 2 : [6,8], 3 : [1,7,9], 4 : [0,8,10], 5 : [1,9,11], 6 : [2,13], 7 : [3,12,14],
       8 : [2,4,13,15], 9 : [3,5,14,16], 10 : [4,15,17], 11 : [5,16], 12 : [7,18], 13 : [6,8,19],
       14 : [7,9,18,20], 15 : [8,10,19,21], 16 : [9,11,20], 17 : [10,21], 18 : [14,22], 19 : [13,15,23], 20 : [14,16,22],
       21 : [15,17,23], 22 : [18,20], 23 : [19,21]};
    const scubaDiversPaths = {0 : [8], 1 : [9], 2 : [4,13], 3 : [5,14], 4 : [2,15], 5 : [3,16], 6 : [8], 7 : [9,18], 8 : [0,6,11,19],
       9 : [1,7,11,20], 10 : [8,21], 11 : [9], 12 : [14], 13 : [2,15], 14 : [3,12,16,22], 15 : [4,13,17,23], 16 : [5,14], 17 : [15],
       18 : [7,20], 19 : [8,21], 20 : [9,18], 21 : [10,19], 22 : [14], 23 : [15]};

    const gameSteps = ["init", "startTurn", "playerActionOne", "playerActionTwo", "playerActionThree", "playerPickACard", "floodRise", "endTurn", "final"];

    var playerCardsLeap = [
    "crystal","crystal","crystal","crystal","crystal",
    "cup","cup","cup","cup","cup",
    "statue","statue","statue","statue","statue",
    "sceptre","sceptre","sceptre","sceptre","sceptre",
    "helicopter","helicopter","helicopter",
    "sandBag","sandBag",
    "floodRise","floodRise","floodRise"];

    var tilesCards = [
    "helipad",
    "doorBlack","doorYellow","doorGreen","doorRed","doorWhite",
    "temple0101","temple0102","temple0201","temple0202",
    "temple0301","templ0302","temple0401","temple0402",
    "desert01","desert02","desert03","coast01","coast02",
    "coast03","swamp01","swamp02","swamp03","swamp04"];

    var tiles = [];

    this.state = {
      squares: Array(9),
      tiles: Array(24),
      xIsNext: true,
      gameIsOver: false
    };
  }

  handleClick(i) {
    const squaresDup = this.state.squares.slice();
    if (squaresDup[i] == null && !this.state.gameIsOver){
      squaresDup[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        squares: squaresDup,
        xIsNext: !this.state.xIsNext
      });
    }
  }

  renderSquare(i) {
    return <Square value={i}
    onClick={() => this.handleClick(i)} />;
  }

  renderEmptySquare() {
    return <EmptySquare/>;
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'We have a winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderEmptySquare()}
          {this.renderEmptySquare()}
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderEmptySquare()}
          {this.renderEmptySquare()}
        </div>
        <div className="board-row">
          {this.renderEmptySquare()}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderEmptySquare()}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
          {this.renderSquare(9)}
          {this.renderSquare(10)}
          {this.renderSquare(11)}
        </div>
        <div className="board-row">
          {this.renderSquare(12)}
          {this.renderSquare(13)}
          {this.renderSquare(14)}
          {this.renderSquare(15)}
          {this.renderSquare(16)}
          {this.renderSquare(17)}
        </div>
        <div className="board-row">
          {this.renderEmptySquare()}
          {this.renderSquare(18)}
          {this.renderSquare(19)}
          {this.renderSquare(20)}
          {this.renderSquare(21)}
          {this.renderEmptySquare()}
        </div>
        <div className="board-row">
          {this.renderEmptySquare()}
          {this.renderEmptySquare()}
          {this.renderSquare(22)}
          {this.renderSquare(23)}
          {this.renderEmptySquare()}
          {this.renderEmptySquare()}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    riseTheIsland();
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

class Tile {
  constructor(name, position, immersed, drawn, startBase, playerOn, templeFor, backgroundColor, TextToDisplay, LittleTextToDisplay) {
    this.name = name; // string
    this.position = position; // int
    this.immersed = immersed; // bool
    this.drawn = drawn; // bool
    this.startBase = startBase; // string
    this.playerOn = playerOn; // string[]
    this.templeFor = templeFor; // string
    this.backgroundColor = backgroundColor; // string
    this.TextToDisplay = TextToDisplay; // string
    this.LittleTextToDisplay = LittleTextToDisplay; // string
    this.imgpath = "/images/" + name + ".png"; // string
  }
}

function riseTheIsland(){
    var tile01 = new Tile("helipad", 0, false, false, "Blue", "", null, "#FFF", "HLPRT", "H");
    var tile02 = new Tile("doorBlack", 0, false, false, "Black", "", null, "#FFF", "DRBlack", "");
    var tile03 = new Tile("doorRed", 0, false, false, "Red", "", null, "#FFF", "DRRed", "");
    var tile04 = new Tile("doorGreen", 0, false, false, "Green", "", null, "#FFF", "DRGreen", "");
    var tile05 = new Tile("doorWhite", 0, false, false, "White", "", null, "#FFF", "DRWhite", "");
    var tile06 = new Tile("doorYellow", 0, false, false, "Yellow", "", null, "#FFF", "DRYellow", "");
    var tile07 = new Tile("temple0101", 0, false, false, "", "01", null, "#FFF", "TPL0101", "");
    var tile08 = new Tile("temple0102", 0, false, false, "", "01", null, "#FFF", "TPL0102", "");
    var tile09 = new Tile("temple0201", 0, false, false, "", "02", null, "#FFF", "TPL0201", "");
    var tile10 = new Tile("temple0202", 0, false, false, "", "02", null, "#FFF", "TPL0202", "");
    var tile11 = new Tile("temple0301", 0, false, false, "", "03", null, "#FFF", "TPL0301", "");
    var tile12 = new Tile("temple0302", 0, false, false, "", "03", null, "#FFF", "TPL0302", "");
    var tile13 = new Tile("temple0401", 0, false, false, "", "04", null, "#FFF", "TPL0401", "");
    var tile14 = new Tile("temple0402", 0, false, false, "", "04", null, "#FFF", "TPL0402", "");
    var tile15 = new Tile("coast01", 0, false, false, "", "", null, "#FFF", "", "");
    var tile16 = new Tile("coast02", 0, false, false, "", "", null, "#FFF", "", "");
    var tile17 = new Tile("coast03", 0, false, false, "", "", null, "#FFF", "", "");
    var tile18 = new Tile("desert01", 0, false, false, "", "", null, "#FFF", "", "");
    var tile19 = new Tile("desert02", 0, false, false, "", "", null, "#FFF", "", "");
    var tile20 = new Tile("desert03", 0, false, false, "", "", null, "#FFF", "", "");
    var tile21 = new Tile("swamp01", 0, false, false, "", "", null, "#FFF", "", "");
    var tile22 = new Tile("swamp02", 0, false, false, "", "", null, "#FFF", "", "");
    var tile23 = new Tile("swamp03", 0, false, false, "", "", null, "#FFF", "", "");
    var tile24 = new Tile("swamp04", 0, false, false, "", "", null, "#FFF", "", "");
    // create a 24 array
    var tiles = new Array[tile01,tile02,tile03,tile04,tile05,tile06,tile07,tile08,tile09,tile10,
      tile11,tile12,tile13,tile14,tile15,tile16,tile17,tile18,tile19,tile20,
      tile21,tile22,tile23,tile24];
    // shuffleIt
    tiles = shuffleArray(dice);
    // foreach tile :make its index position / Is It necessary ?
    // TODO make Init work
    //AssignEachTile to a Case
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function shuffleArray(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
