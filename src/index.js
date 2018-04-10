import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const playerTypes = [
  {
    id : 0,
    role : "Engineer", // dry two tiles for one action
    color : "#CC0000", // red
    name : "Natacha"
  },
  {
    id : 1,
    role : "Navigator", // move another player from one or two tiles (straight ?) for one action
    color : "#FFF200", //yellow
    name : "Boris"
  },
  {
    id : 2,
    role : "Messanger", // can give one card for one action to anyone
    color : "#FFFFFF", //white
    name : "Francois"
  },
  {
    id : 3,
    role : "Diver", // can move one wet case and one other case
    color : "#000000", // black
    name : "Gina"
  },
  {
    id : 4,
    role : "Explorer", // can move and dry orth and diagonaly
    color : "#0AB300", //green
    name : "Brian"
  },
  {
    id : 5,
    role : "Pilot", // once per turn, fly where you want for 1 action
    color : "#0064b3", //blue
    name : "Bob"
  },
];

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

 const trasures = [
     { id : 0 , name : "crystal" },
     { id : 1 , name : "cup" },
     { id : 2 , name : "sceptre"},
     { id : 3 , name : "statue"}
 ];

/*
 const playerCards = [
 "crystal","crystal","crystal","crystal","crystal",
 "cup","cup","cup","cup","cup",
 "statue","statue","statue","statue","statue",
 "sceptre","sceptre","sceptre","sceptre","sceptre",
 "helicopter","helicopter","helicopter",
 "sandBag","sandBag",
 "floodRise","floodRise","floodRise"];
 */

 const floodCards = [
 { name : "helipad" },
 { name : "doorBlack" }, { name : "doorYellow" }, { name : "doorGreen" }, { name : "doorRed" }, { name : "doorWhite" },
 { name : "temple0101" }, { name : "temple0102" }, { name : "temple0201" }, { name : "temple0202" },
 { name : "temple0301" }, { name : "temple0302" }, { name : "temple0001" }, { name : "temple0002" },
 { name : "desert01" }, { name : "desert02" }, { name : "desert03" }, { name : "coast01" }, { name : "coast02" },
 { name : "coast03" }, { name : "swamp01" }, { name : "swamp02" }, { name : "swamp03" }, { name : "swamp04" }];

function DrawSquare(props) {
  let squareStyle = props.tile.isImmersed? ({background: '#01A9DB'}) : ({background: props.tile.backgroundColor});
  squareStyle = props.tile.isDrawned?({background: '#FFF'}) : (squareStyle);

  let squareClass = props.tile.isDrawned? ('isDrawnedSquare') : ('square');

  return (
    <div className={squareClass} style={squareStyle} id={props.index} onClick={props.onClick}>
      <span className="inSquarePosition">{props.tile.position}</span><br/>
      <span className="inSquareText">{props.tile.TextToDisplay}</span><br/>
      <span className="inSquareLittleText">{props.tile.LittleTextToDisplay}</span>
      <DrawPlayerPawn pawns={props.tile.playerOn} players={props.players}/>
    </div>
  );
}

function DrawPlayerBoard(props) {
  props.player.printIntroduction; // TO REMOVE
  return (
    <div className="playerBoard" style={{color: props.player.color}}>
      <span className="inBoardRole" style={{color: props.player.color}}>{props.player.role}</span>&nbsp;&nbsp;
      <span className="inBoardName">{props.player.playersName}</span>
      <br/>
      <div className="inBoardCards">
          <DrawPlayerCards cards={props.player.cards}/>
      </div>
    </div>
  )
}

function DrawPlayerCards(props){
  let output = props.cards.map((card) =>
    <span key={card.id} className="boardPlayerCards"><img src={card.url} width="45
      px" height="70px" /></span>
  );
  return output;
}

function DrawEmptySquare() {
  return (
    <button className="emptySquare"></button>
  );
}

function DrawPlayerPawn(props){
  if (props.pawns && props.pawns.length === 1){
    return (
      <div className="playerPawn singlePP" style={{color: props.players[props.pawns[0]].color}}>P</div>
    );
  }
  else if(props.pawns && props.pawns.length === 2){
    return (
      <div className="playerPawn twoPP"><span style={{color: playerTypes[props.pawns[0]].color}}>P</span>&nbsp;<span style={{color: playerTypes[props.pawns[1]].color}}>P</span></div>
    );
  }
  else if(props.pawns && props.pawns.length === 3){
    return (
      <div className="playerPawn multilinePP"><span style={{color: playerTypes[props.pawns[0]].color}}>P</span>&nbsp;<span style={{color: playerTypes[props.pawns[1]].color}}>P</span><br/>
      <span style={{color: playerTypes[props.pawns[2]].color}}>P</span></div>
    );
  }
  else if(props.pawns && props.pawns.length === 4){
    return (
      <div className="playerPawn multilinePP"><span style={{color: playerTypes[props.pawns[0]].color}}>P</span>&nbsp;<span style={{color: playerTypes[props.pawns[1]].color}}>P</span><br/>
      <span style={{color: playerTypes[props.pawns[2]].color}}>P</span>&nbsp;<span style={{color: playerTypes[props.pawns[3]].color}}>P</span></div>
    );
  }
  return null
}

class Board extends React.Component {
  constructor(props) {
    super(props);

    var tiles = riseTheIsland();
    var playerCardsLeap = generatePlayerCardsLeap();
    var playerCardsDiscard = new Array();
    var floodCardsLeap = generateFloodCardsLeap();
    var floodCardsDiscard = new Array();

    // generer les joueurs
    var players = generatePlayers();

    // distribuer les cartes aux joueurs
    players.forEach(giveTwoInitialCards);

    // assigner les positions de depart
    players.forEach(getInitialPlayerPosition);

    // innonder 6 tilesCards
    for ( let i = 0; i < 6; i++){
        let card = floodCardsLeap.pop();
        // console.log('*************** CARD IS ' + card.name + ' tiles.length = ' + tiles.length);
        for (let j = 0; j < tiles.length; j++){
          // console.log('****** TILE IS ' + tiles[j].name);
          if (tiles[j].name === card.name){
            tiles[j].isImmersed = true;
            break;
          }
        }
        floodCardsDiscard.push(card);
    }

    // tests
    console.log('********WhereCanHeMove : ' + whereCanHeMove(16, "Diver") );

    this.state = {
      tiles: tiles,
      playerCardsLeap: playerCardsLeap,
      playerCardsDiscard: playerCardsDiscard,
      floodCardsLeap: floodCardsLeap,
      floodCardsDiscard: floodCardsDiscard,
      players: players,
      gameIsOver: false
    };

    function getInitialPlayerPosition(player, y, z){
        for (let i = 0; i < tiles.length; i++){
          if (tiles[i].startBase === player.type){
            player.position = tiles[i].position;
            tiles[i].playerOn.push(player.id); // ok
            break;
          }
        }
    }

    function giveTwoInitialCards(player, y , z){
      for (let i = 0; i < 2; i++){
            let card = playerCardsLeap.pop();
            while (card.name === "floodRise"){
              playerCardsLeap.push(card);
              shuffleArray(playerCardsLeap);
              card = playerCardsLeap.pop();
            }
            player.cards.push(card);
      }
    }

    // returns an array of positions
    function whereCanHeMove(position, role){
      let moves = new Array();
      if (role === "Pilot"){
        for (let i = 0; i < 24; i ++){
          if (i != position){
            moves.push(i);
          }
        }
      }
      else if (role === "Explorer"){
          moves = orthogonalPaths[position];
          moves = moves.concat(diagonalPaths[position]);
      }
      else if (role === "Diver"){
          let afterSwimPositions = new Array();
          moves = orthogonalPaths[position];
          for (let j = 0 ; j < moves.length; j++){
            console.log('***** Check If tile : ' + moves[j] + ' is Drawned ');
            if (tiles[moves[j]].isDrawned || tiles[moves[j]].isImmersed)
            {
                console.log('***** isDrawned ');
                afterSwimPositions = afterSwimPositions.concat(orthogonalPaths[moves[j]]);
            }
          }
          moves = moves.concat(afterSwimPositions);
          console.log('***** moves.length : ' + moves.length + ' and contains : ' + moves + ' afterSwimPositions :' + afterSwimPositions);
      }
      else {
          moves = orthogonalPaths[position];
      }

      // virer les cases isDrawned et origin
      let output = moves;
      if (moves.length > 0) {
        // console.log('***** moves.length : ' + moves.length + ' and contains : ' + moves);
        for (let k = 0; k < moves.length; k++)
        {
          if ( k >= 0 && k < 24){
            if (/*tiles[moves[k]].isDrawned || */moves[k] == position)
            {
              let index = output.indexOf(moves[k]);
              // console.log('***** je splice pos : ' + moves[k] + ' at index :' + index);
              output.splice(output.indexOf(moves[k]), 1);
            }
          }
        }
      }

      return output;
    }

    // returns an array of positions
    function whereCanHeDry(position, role){
      let cases = new Array();
      if (role === "Bag"){
        for (let i = 0; i < 24; i ++){
          if (i != position && tiles[i].isImmersed){
            cases.push(i);
          }
        }
      }
      else if (role === "Explorer"){
        for (let j = 0 ; j < orthogonalPaths[j]; j++){
          if (orthogonalPaths[j] != position && tiles[orthogonalPaths[j]].isImmersed){
            cases.push(orthogonalPaths[j]);
          }
        }
        for (let k = 0 ; k < diagonalPaths[k]; k++){
          if (diagonalPaths[k] != position && tiles[diagonalPaths[k]].isImmersed){
            cases.push(diagonalPaths[k]);
          }
        }
      }
      else{
        for (let j = 0 ; j < orthogonalPaths[j]; j++){
          if (orthogonalPaths[j] != position && tiles[orthogonalPaths[j]].isImmersed){
            cases.push(orthogonalPaths[j]);
          }
        }
      }

      return cases;
    }
  }

  handleClick(i) {
    // alert("click");
    if (this.state.tiles[i].playerOn.length > 0){
      let id = this.state.tiles[i].playerOn[0];
      // alert("Clicked on tile " + i + " for player id " + id + ". Dessus, il y a le " + this.state.players[id].role + " et sa couleur est le " + this.state.players[id].color);
      //let tilesToLight = this.Board.whereCanHeMove(i, this.state.players[id].role);
      alert("tilesTo Light"  + tilesToLight);
    }


    /*
    const squaresDup = this.state.squares.slice();
    if (squaresDup[i] == null && !this.state.gameIsOver){
      squaresDup[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        squares: squaresDup,
        xIsNext: !this.state.xIsNext
      });
    }
    */
  }

  renderSquare(i) {
    return(
      <span>
        <DrawSquare tile={this.state.tiles[i]} players={this.state.players} index={i} onClick={() => this.handleClick(i)}/>
      </span>
    );
  }

  renderEmptySquare() {
    return (
      <DrawEmptySquare/>
    );
  }

  renderPlayerBoard(i) {
    return (
      <span>
        <DrawPlayerBoard player={this.state.players[i]} />
      </span>
    )
  }

  render() {
    /*
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'We have a winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    */

    return (

      <div>
        <div className="playerBoard-column">
          {this.renderPlayerBoard(0)}
          {this.renderPlayerBoard(1)}
          {this.renderPlayerBoard(2)}
          {this.renderPlayerBoard(3)}
        </div>
        <div className="board-column">
          <div className="status">Booyah</div>
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
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    //
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
  constructor(name, position, isImmersed, isDrawned, startBase, templeFor, playerOn, backgroundColor, TextToDisplay, LittleTextToDisplay) {
    this.name = name; // string
    this.position = position; // int
    this.isImmersed = isImmersed; // bool
    this.isDrawned = isDrawned; // bool
    this.startBase = startBase; // int [0-5]
    this.templeFor = templeFor; // string
    this.playerOn = playerOn; // int[]
    this.backgroundColor = backgroundColor; // string
    this.TextToDisplay = TextToDisplay; // string
    this.LittleTextToDisplay = LittleTextToDisplay; // string
    this.imgpath = "/images/" + name + ".png"; // string
  }
}

class Player {
  constructor(id, type, role, color, playersName, position, cards, isInGame, leftTheIsland, ) {
    this.id = id; // int
    this.type = type; // int
    this.role = role // string
    this.color = color; // string in hexa
    this.playersName = playersName; // string
    this.position = position; // int
    this.cards = cards; // string[]
    this.isInGame = isInGame; // bool
    this.leftTheIsland = leftTheIsland; // bool
    this.imgpath = "/images/char" + role + ".png"; // string

    printIntroduction: {
        console.log(`My name is ${this.playersName}. Im an ${this.role} and my color is ${this.color}`);
    }
  }
}

function riseTheIsland(){
    var tile01 = new Tile("helipad", 0, false, false, 5, "", new Array(), "#A9D0F5", "H", "HELIPORT");
    var tile02 = new Tile("doorBlack", 0, false, false, 3, "", new Array(), "#6E6E6E", "", "");
    var tile03 = new Tile("doorRed", 0, false, false, 0, "", new Array(), "#F78181", "", "");
    var tile04 = new Tile("doorGreen", 0, false, false, 4, "", new Array(), "#9FF781", "", "");
    var tile05 = new Tile("doorWhite", 0, false, false, 2, "", new Array(), "#F2F2F2", "", "");
    var tile06 = new Tile("doorYellow", 0, false, false, 1, "", new Array(), "#F2F5A9", "", "");
    var tile07 = new Tile("temple0001", 0, false, false, "", "0", new Array(), "#bdc3c7", "", "TEMPLE CRYSTAL");
    var tile08 = new Tile("temple0002", 0, false, false, "", "0", new Array(), "#bdc3c7", "", "TEMPLE CRYSTAL");
    var tile09 = new Tile("temple0101", 0, false, false, "", "1", new Array(), "#bdc3c7", "", "TEMPLE CUP");
    var tile10 = new Tile("temple0102", 0, false, false, "", "1", new Array(), "#bdc3c7", "", "TEMPLE CUP");
    var tile11 = new Tile("temple0201", 0, false, false, "", "2", new Array(), "#bdc3c7", "", "TEMPLE SCEPTRE");
    var tile12 = new Tile("temple0202", 0, false, false, "", "2", new Array(), "#bdc3c7", "", "TEMPLE SCEPTRE");
    var tile13 = new Tile("temple0301", 0, false, false, "", "3", new Array(), "#bdc3c7", "", "TEMPLE STATUE");
    var tile14 = new Tile("temple0302", 0, false, false, "", "3", new Array(), "#bdc3c7", "", "TEMPLE STATUE");
    var tile15 = new Tile("coast01", 0, false, false, "", "", new Array(), "#825a2c", "", "");
    var tile16 = new Tile("coast02", 0, false, false, "", "", new Array(), "#825a2c", "", "");
    var tile17 = new Tile("coast03", 0, false, false, "", "", new Array(), "#825a2c", "", "");
    var tile18 = new Tile("desert01", 0, false, false, "", "", new Array(), "#ffd480", "", "");
    var tile19 = new Tile("desert02", 0, false, false, "", "", new Array(), "#ffd480", "", "");
    var tile20 = new Tile("desert03", 0, false, false, "", "", new Array(), "#ffd480", "", "");
    var tile21 = new Tile("swamp01", 0, false, false, "", "", new Array(), "#bcf0d2", "", "");
    var tile22 = new Tile("swamp02", 0, false, false, "", "", new Array(), "#bcf0d2", "", "");
    var tile23 = new Tile("swamp03", 0, false, false, "", "", new Array(), "#bcf0d2", "", "");
    var tile24 = new Tile("swamp04", 0, false, false, "", "", new Array(), "#bcf0d2", "", "");
    // create a 24 array
    let tiles = new Array(tile01,tile02,tile03,tile04,tile05,tile06,tile07,tile08,tile09,tile10,
      tile11,tile12,tile13,tile14,tile15,tile16,tile17,tile18,tile19,tile20,
      tile21,tile22,tile23,tile24);
    // shuffleIt
    tiles = shuffleArray(tiles);
    // foreach tile : make its index position
    for(let i = 0; i<24; i++){
      let tile = tiles[i];
      tile.position = i;
      tiles[i] = tile;
    }

    return tiles;
}

function generatePlayerCardsLeap(){
    let cards = new Array();
    for (let i = 0; i < 5; i++){
        let card = { id : i, name : "crystal", type : 0, url : "img/crystalCard.png"};
        cards.push(card);
    }
    for (let i = 0; i < 5; i++){
        let card = { id : i + 5, name : "cup", type : 1, url : "img/cupCard.png"};
        cards.push(card);
    }
    for (let i = 0; i < 5; i++){
        let card = { id : i + 10, name : "sceptre", type : 2, url : "img/sceptreCard.png"};
        cards.push(card);
    }
    for (let i = 0; i < 5; i++){
        let card = {id : i + 15, name : "statue", type : 3, url : "img/statueCard.png"};
        cards.push(card);
    }
    for (let i = 0; i < 3; i++){
        let card = { id : i + 20, name : "helicopter", type : 4, url : "img/helicopterCard.png"};
        cards.push(card);
    }
    for (let i = 0; i < 2; i++){
        let card = { id : i + 23, name : "sandBag", type : 5, url : "img/sandBagCard.png"};
        cards.push(card);
    }
    for (let i = 0; i < 3; i++){
        let card = { id : i + 25, name : "floodRise", type : 5, url : "img/floodRiseCard.png"};
        cards.push(card);
    }
    cards = shuffleArray(cards);
    return cards;
}

function generateFloodCardsLeap(){
    let cards = floodCards;
    cards = shuffleArray(cards);
    return cards;
}

function generatePlayers(){
    let roles = new Array(0,1,2,3,4,5);
    roles = shuffleArray(roles);
    let players = new Array();
    for (let i = 0; i < 4; i++){
      let type = roles[i];
      let player = new Player(
          i, type, playerTypes[type].role, playerTypes[type].color, playerTypes[type].name, 0, new Array(), true, false
      )
      players.push(player);
    }
    return players;
}

/*

function setInitialFlood(){
  for ( let i = 0; i < 6; i++){
      let card = floodCardsLeap.pop();
      // card.name
      for (let j; j < this.tiles.length; j++){
        if (this.tiles[j].name === card.name){
          this.tiles[j].isImmersed = true;
          break;
        }
      }
      floodCardsDiscard.push(card);
  }
}
*/

//    var floodCardsLeap = generateFloodCardsLeap();
//    var floodCardsDiscard = new Array();
/*
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
}*/

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
