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
    role : "Messenger", // can give one card for one action to anyone
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

 const gameSteps = ["init", "startTurn", "playerActionOne", "playerActionTwo", "playerActionThree", "playerPickACard", "floodRise", "endTurn", "final"];

 const trasures = [
     { id : 0 , name : "crystal" },
     { id : 1 , name : "cup" },
     { id : 2 , name : "sceptre"},
     { id : 3 , name : "statue"}
 ];

 const playerSteps = [
     {id : 0, name : "action 1/3" },
     {id : 1, name : "action 2/3" },
     {id : 2, name : "action 3/3" },
     {id : 3, name : "draw player cards" },
     {id : 4, name : "draw flood cards" }
 ];

 const playerDefaultActions = [
      {id : 0, name : "Move", text: "Move to an adjacent tile.", enabled : true, triggers : "Move" },
      {id : 1, name : "Dry", text: "Dry an adjacent tile", enabled : true, triggers : "Dry"  },
      {id : 2, name : "Give", text: "Give a card on a character on the same tile", enabled : true, triggers : "Give" },
      {id : 3, name : "Get a Treasure !", text: "Get the treasure in this temple.", enabled : true, triggers : "GetATreasure"  },
      {id : 4, name : "Nothing", text: "Simply do nothing.", enabled : true, triggers : "DoNothing"  }
 ];

 const playerSpecialActions = [
   // Special actions
   {id : 0, name : "Send a card", forRole: "Messenger", replacesAction: "2", text: "Send a card to any character.", enabled : true, triggers : "SendACard"  },
   {id : 1, name : "Move someone", forRole: "Navigator", replacesAction: "-", text: "Move any character from one or two tiles.", enabled : true, triggers : "MoveSomeone"  },
   {id : 2, name : "Dry two tiles", forRole: "Engineer", replacesAction: "1", text: "Dry two adjacent tiles.", enabled : true, triggers : "DryTwoTiles"  },
   {id : 3, name : "Move around", forRole: "Explorer", replacesAction: "0", text: "Move to any tile around.", enabled : true, triggers : "MoveAround"  },
   {id : 4, name : "Dry around", forRole: "Explorer", replacesAction: "1", text: "Dry any tile around." , enabled : true, triggers : "DryAround" },
   {id : 5, name : "Fly", forRole: "Pilot", replacesAction: "0", text: "Fly to any tile.", enabled : true, triggers : "Fly"  },
   {id : 6, name : "Dive", forRole: "Diver", replacesAction: "0", text: "Dive through any adjacent tile.", enabled : true, triggers : "Dive"  },
 ];



 // QUESTIONS : How many times per round can one use its power ? PIlot ONCE
 //              Can pilot move someone else with him ?  -> NO
//               Navigator move : can he move himself  -> NO ? same player for two tiles ? YES

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
  let squareStyle;
  if (props.tile.isImmersed){
      squareStyle = ({background: '#01A9DB' });
  }else if (props.tile.imgpath.length > 0 && props.tile.name === "helipad") {
      squareStyle = ({background: 'url(' + props.tile.imgpath + ')' });
  } else {
      squareStyle = ({background: props.tile.backgroundColor});
  }

  let squareClass = props.tile.isDrawned? ('isDrawnedSquare') : ('square');
  let squareId =  "square" + props.index;

  return (
    <div className={squareClass} style={squareStyle} id={squareId} onClick={props.onClick} >
      <span className="inSquarePosition">{props.tile.position}</span><br/>
      <span className="inSquareText">{props.tile.TextToDisplay}</span><br/>
      <span className="inSquareLittleText">{props.tile.LittleTextToDisplay}</span>
      <DrawPlayerPawn pawns={props.tile.playerOn} players={props.players}/>
    </div>
  );
}

function DrawPlayerBoard(props) {
  props.player.printIntroduction; // TO REMOVE
  let boardClass = props.isPlaying?  ('playerBoard playerBoardPlaying') : ('playerBoard ');

  return (
    <div className={boardClass}>
      <span className="inBoardName">{props.player.playersName}</span>&nbsp;the&nbsp;
      <span className="inBoardRole" style={{color: props.player.color}}>{props.player.role}</span>
      <br/>
      <div className="inBoardCards">
          <DrawPlayerCards cards={props.player.cards}/>
      </div>
    </div>
  )
}

function DrawPlayerCards(props){
  let output = props.cards.map((card) =>
    <span key={card.id} className="boardPlayerCards"><img src={card.url} width="45px" height="70px" /></span>
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
      <div className="playerPawn twoPP"><span style={{color: props.players[props.pawns[0]].color}}>P</span>&nbsp;<span style={{color: props.players[props.pawns[1]].color}}>P</span></div>
    );
  }
  else if(props.pawns && props.pawns.length === 3){
    return (
      <div className="playerPawn multilinePP"><span style={{color: props.players[props.pawns[0]].color}}>P</span>&nbsp;<span style={{color: props.players[props.pawns[1]].color}}>P</span><br/>
      <span style={{color: props.players[props.pawns[2]].color}}>P</span></div>
    );
  }
  else if(props.pawns && props.pawns.length === 4){
    return (
      <div className="playerPawn multilinePP"><span style={{color: props.players[props.pawns[0]].color}}>P</span>&nbsp;<span style={{color: props.players[props.pawns[1]].color}}>P</span><br/>
      <span style={{color: props.players[props.pawns[2]].color}}>P</span>&nbsp;<span style={{color: props.players[props.pawns[3]].color}}>P</span></div>
    );
  }
  return null;
}

class Board extends React.Component {
  constructor(props) {
    super(props);

    var tiles = riseTheIsland();
    var playerCardsLeap = generatePlayerCardsLeap();
    var playerCardsDiscard = new Array();
    var floodCardsLeap = generateFloodCardsLeap();
    var floodCardsDiscard = new Array();
    var floodMeter = new FloodMeter(1);
    let mainUserMessage = new UserMessage("Welcome new Player. Choose a first action for the first character.", false, false, false);
    // mainUserMessage.setMessage("Welcome new Player. Choose a first action for the first character.", false, false, false);

    // generer les joueurs
    var players = generatePlayers();

    // distribuer les cartes aux joueurs
    players.forEach(giveTwoInitialCards);

    // assigner les positions de depart
    players.forEach(getInitialPlayerPosition);

    // this.DoFloodSomeTiles(6);
    // innonder 6 tilesCards
    /*
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
    */

    var possibleActions = this.getPossibleActions(players[0].role);

    // var whatIsExpectedNext = "CharacterActionButtonClick";

    // tests
    // console.log('********WhereCanHeMove : ' + whereCanHeMove(16, "Diver") );
    this.state = {
      tiles: tiles,
      playerCardsLeap: playerCardsLeap,
      playerCardsDiscard: playerCardsDiscard,
      floodCardsLeap: floodCardsLeap,
      floodCardsDiscard: floodCardsDiscard,
      players: players,
      floodMeter: floodMeter,
      gameIsOver: false,
      nbrOfPlayers : players.length,
      nbrOfPosessedTreasures : 0,
      turn : 1,
      currentPlayerPlaying : 0,
      possibleActions : possibleActions,
      currentStep : 0,
      whatIsExpectedNext : "CharacterActionButtonClick",
      mainUserMessage : mainUserMessage
    };

    this.doFloodSomeTiles(6);

    // Let's start
    function waitForPlayerInput(expectFor){
    }
      /*
      ================================================================
Wait For PlayerInput ( action || ExtraCardAction || Tile || Card in His hand || Card in SomeOneElse's hand )
type : What's expected
A user message says What's expected

On TileClick || On Card Click || On Anything click
check for What's expected
solve the action
Go Next Step in the Turn
    }
    */

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
  } // end of Board constructor

///////////////////////////////////////////////////////////////////////////////////
//        OUt Of Board constructor
////////////////////////////////////////////////////////////////////////////////////


  controller(input){
      console.log("InController turn :" + this.state.currentStep);
      if (input === "ActionIsDone"){
        let nextStep = this.state.currentStep + 1;
        if (nextStep === 3){
          // draw player cards

          this.setState({ currentStep : nextStep });
          // alert ("Let's draw some cards");
          let newMessage = new UserMessage("Lets' draw some Player Cards", false, true, false);
          this.setState({ currentStep : nextStep , mainUserMessage : newMessage});
        }
        else if (nextStep === 4){
          // flood some tiles.

          this.setState({ currentStep : nextStep });
          let howMuch = this.state.floodMeter.howManyCards(this.state.floodMeter.level);
          // alert ("Let's flood some tiles for " + howMuch);
          let newMessage = new UserMessage("Let's flood " + howMuch + " tiles", false, true, false);
          this.setState({ currentStep : nextStep , mainUserMessage : newMessage});
          this.doFloodSomeTiles(howMuch);
        }
        else if (nextStep === 5){
          // next Player
          if (this.state.currentPlayerPlaying === this.state.players[this.state.players.length -1].id){
            let newMessage = new UserMessage("Next Turn ! Please " + this.state.players[0].playersName + ", Choose an action " , false, false, false);
            let nextTurn = this.state.turn + 1;
            let nextPlayer = this.state.players[0].id;
            let psblactn = this.getPossibleActions(this.state.players[0].role);
            this.setState({ currentStep: 0,
              turn : nextTurn,
              currentPlayerPlaying : nextPlayer,
              possibleActions : psblactn,
              whatIsExpectedNext: "CharacterActionButtonClick" ,
              mainUserMessage : newMessage });
          } else {
            let newMessage = new UserMessage("Next player ! Please Choose an action " , false, false, false);
            let nextPlayer = this.state.players[this.state.currentPlayerPlaying + 1].id;
            let psblactn = this.getPossibleActions(this.state.players[nextPlayer].role);
            this.setState({ currentStep: 0,
              currentPlayerPlaying : nextPlayer,
              possibleActions : psblactn,
              whatIsExpectedNext: "CharacterActionButtonClick",
              mainUserMessage : newMessage });
          }
        }
        else{
          // next action for thre same player
          let newMessage = new UserMessage("Choose an action " , false, false, false);
          let psblactn = this.getPossibleActions(this.state.players[this.state.currentPlayerPlaying].role);
          this.setState({ currentStep: nextStep,
            possibleActions : psblactn,
            whatIsExpectedNext: "CharacterActionButtonClick" ,
            mainUserMessage : newMessage});
        }
      }
  }

  doFloodSomeTiles(howMany){
    let newFloodCardLeap = this.state.floodCardsLeap;
    let newTiles = this.state.tiles;
    let newFloodCardsDiscard = this.state.floodCardsDiscard;

    for ( let i = 0; i < howMany; i++){
        let tileHasDrawned = false;
        let card = newFloodCardLeap.pop();
        // console.log('*************** CARD IS ' + card.name + ' tiles.length = ' + tiles.length);
        for (let j = 0; j < newTiles.length; j++){
          // console.log('****** TILE IS ' + tiles[j].name);
          if (newTiles[j].name === card.name){
            if (newTiles[j].isImmersed){
              // Let's DRAWN this tile
                newTiles[j].isDrawned = true;
                // TODO : rescue some players ?
                // TODO : Check if all Temples of an undiscovered Treasure are drawned
            }
            else{
                newTiles[j].isImmersed = true;
            }

            break;
          }
        }
        if (!tileHasDrawned){
            newFloodCardsDiscard.push(card);
        }
    }

    this.setState({
      floodCardsLeap: newFloodCardLeap,
      tiles : newTiles,
      floodCardsDiscard: newFloodCardsDiscard });
  }

  getPossibleActions(role) {
      let actions = new Array();
      for (let i = 0; i < playerDefaultActions.length; i++){
          let action = playerDefaultActions[i];
          for (let j = 0; j < playerSpecialActions.length; j++ )
          {
            if (playerSpecialActions[j].forRole === role && playerSpecialActions[j].replacesAction === i.toString()){
              action = playerSpecialActions[j];
            }
          }
          // TODO : hasPilotDidHisFlightThisRound ?
          // TODO : is action possible ? Check the validity of an action and remove it
          actions.push(action);
      }

      if (role === "Navigator"){
        // remove the first action which is move
        let nada = actions.shift();
        let navigatorActions = new Array();
        navigatorActions.push(playerDefaultActions[0]); // move
        navigatorActions.push(playerSpecialActions[1]); // move someone else
        return navigatorActions.concat(actions);
      }
      return actions;
    }

  // returns an array of positions
  whereCanHeMove(position, role){
    let moves = new Array();
    if (role === "Pilot"){
      for (let i = 0; i < 24; i ++){
        if (i !== position){
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
          // console.log('***** Check If tile : ' + moves[j] + ' is Drawned ');
          if (this.state.tiles[moves[j]].isDrawned || this.state.tiles[moves[j]].isImmersed)
          {
              //  isDrawned
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
          // TODO HERE :????
          if (this.state.tiles[moves[k]].isDrawned || moves[k] === position)
          {
            // let index = output.indexOf(moves[k]);
            // console.log('***** je splice pos : ' + moves[k] + ' at index :' + index);
            output.splice(output.indexOf(moves[k]), 1);
          }
        }
      }
    }

    return output;
  }

  // returns an array of positions
  whereCanHeDry(position, role){
    let cases = new Array();
    if (role === "Bag"){
      for (let i = 0; i < 24; i ++){
        if (this.state.tiles[i].isImmersed){
          cases.push(i);
        }
      }
    }
    else if (role === "Explorer"){
      for (let j = 0 ; j < orthogonalPaths[position].length; j++){
        if (this.state.tiles[orthogonalPaths[position][j]].isImmersed){
          cases.push(orthogonalPaths[position][j]);
        }
      }
      for (let k = 0 ; k < diagonalPaths[position].length; k++){
        if (this.state.tiles[diagonalPaths[position][k]].isImmersed){
          cases.push(diagonalPaths[position][k]);
        }
      }
      // adding the case he's on
      if (this.state.tiles[position].isImmersed)
      {
        cases.push(position);
      }
    }
    else{
      for (let j = 0 ; j < orthogonalPaths[position].length; j++){
        if (this.state.tiles[orthogonalPaths[position][j]].isImmersed){
          cases.push(orthogonalPaths[position][j]);
        }
      }
      // adding the case he's on
      if (this.state.tiles[position].isImmersed)
      {
        cases.push(position);
      }
    }

    return cases;
  }

 handleActionClick(action) {
    console.log("clicked on " + action);
    if (this.state.whatIsExpectedNext === "CharacterActionButtonClick") {
      let id = this.state.players[this.state.currentPlayerPlaying].id;
      if (action === "Move" || action === "Dive" || action === "MoveAround"  || action === "Fly"){
            let tilesToLight = this.whereCanHeMove(this.state.players[id].position, this.state.players[id].role);
            this.state.players[id].whereCanHeMove = tilesToLight;

            let nada = this.lightTheTiles(tilesToLight, this.state.players[id].color);
            // set a new Expected PlayerInput
            let newMessage = new UserMessage("Now choose a destination", false, false, true);
            this.setState({ whatIsExpectedNext: "TileButtonClickForMove" , mainUserMessage: newMessage });
      } else if (action === "Dry" || action === "DryAround"){
            let tilesToLight = this.whereCanHeDry(this.state.players[id].position, this.state.players[id].role);
            this.state.players[id].whereCanHeDry = tilesToLight;

            let nada = this.lightTheTiles(tilesToLight, this.state.players[id].color);
            let newMessage = new UserMessage("Now choose a destination", false, false, true);
            this.setState({ whatIsExpectedNext: "TileButtonClickForDry" , mainUserMessage: newMessage});
      } else if (action === "DoNothing"){
              let newMessage = new UserMessage("Doing nothing ZZZZZZZ ", false, true, false);
              this.setState({ mainUserMessage: newMessage});
      }
      return null;
    }
    else{
      alert ("UnexpectedClickOnActionButton");
    }

  }

  handleTileClick(i) {
    // alert("click");
    if (this.state.whatIsExpectedNext === "TileButtonClickForMove") {
        let player = this.state.players[this.state.currentPlayerPlaying];
        if (player.whereCanHeMove.indexOf(i) >= 0){
            // Move
            this.moveAPlayer(player, i);
            let nada = this.unlightTheTiles();
            if (nada){

              this.setState({ whatIsExpectedNext: ""});
              this.controller("ActionIsDone");
            }
        }
        else{
          alert ("He can't move there !");
        }
      } else if(this.state.whatIsExpectedNext === "TileButtonClickForDry"){
        let player = this.state.players[this.state.currentPlayerPlaying];
        if (player.whereCanHeDry.indexOf(i) >= 0){
            // Move
            this.dryATile(i);
            let nada = this.unlightTheTiles();
            if (nada){
              // let newMessage = new UserMessage(player.name + "dried a tile", false, true, false);
              this.setState({ whatIsExpectedNext: "" });
              this.controller("ActionIsDone");
            }
        }
        else{
          alert ("He can't dry anything there !");
        }
      }else{
            alert ("Unexpected Clic On a Tile");
      }
    }
    /*
    const squaresDup = this.state.squares.slice();
    if (squaresDup[i] === null && !this.state.gameIsOver){
      squaresDup[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        squares: squaresDup,
        xIsNext: !this.state.xIsNext
      });
    }
    */

      //  return null;
  //}

  moveAPlayer(player, destination){
    let NewTiles = this.state.tiles;
    // remove player from current Tile
    let index = NewTiles[player.position].playerOn.indexOf(player.id);
    NewTiles[player.position].playerOn.splice(index, 1);
    // adding player to new tile
    NewTiles[destination].playerOn.push(player.id);

    let Newplayers = this.state.players;
    Newplayers[player.id].position = destination;
    Newplayers[player.id].whereCanHeMove = null;

    this.setState({ players: Newplayers , tiles: NewTiles});
  }

  dryATile(tile){
        let NewTiles = this.state.tiles;
        NewTiles[tile].isImmersed = false;
        this.setState({ tiles: NewTiles});
  }

  renderSquare(i) {
    return(
      <span>
        <DrawSquare tile={this.state.tiles[i]} players={this.state.players} index={i} onClick={() => this.handleTileClick(i)}/>
      </span>
    );
  }

  renderEmptySquare() {
    return (
      <DrawEmptySquare/>
    );
  }

  renderPlayerBoard(i) {
    let isPlaying = this.state.currentPlayerPlaying === i;
    return (
      <span>
        <DrawPlayerBoard player={this.state.players[i]} isPlaying={isPlaying}/>
      </span>
    )
  }

  renderPlayerMessagePanel() {
    return (
      <span>
        <div className="messagePanel">
          <div className="panelTitle"> FORBIDDEN<br/>::ReactJS::<br/>ISLAND</div>
          <div className="panelInfo"> Turn : {this.state.turn} </div>
          <div className="panelInfo"> FloodLevel {this.state.floodMeter.level} <span className="littlePanelInfo"> ({this.state.floodMeter.howManyCards(this.state.floodMeter.level)} cards per flood)</span></div>
          <div className="panelInfo"> {this.state.players[this.state.currentPlayerPlaying].playersName} the <span style={{color: this.state.players[this.state.currentPlayerPlaying].color}}>{this.state.players[this.state.currentPlayerPlaying].role}</span> is Playing. </div>
          <div className="panelInfo"> Step : {playerSteps[this.state.currentStep].name} </div>
          <div className="panelInfo">
            <ul>
              {this.state.possibleActions.map((action) =>
                <li key={action.name}><button className="actionButton" onClick={() => this.handleActionClick(action.triggers)} >{action.name}</button></li>
              )}
            </ul>
          </div>
        </div>
      </span>
    )
  }

  renderMessageBoard() {
let showNextBtnStyle = this.state.mainUserMessage.showNextBtn?({display: 'block'}):({display: 'none'});
let showCancelBtnStyle = this.state.mainUserMessage.showCancelBtn?({display: 'block'}):({display: 'none'});

    return(
        <div>
          {this.state.mainUserMessage.message}
        <button style={showNextBtnStyle} onClick ={() => this.controller("ActionIsDone")}>Next</button>
        <button style={showCancelBtnStyle} onClick ={() => alert("Not Implemented :(")}>Cancel</button>
      </div>
    )
  }

  lightTheTiles(t, color){
    for (let i = 0; i < t.length; i++){
      document.getElementById("square" + t[i]).style.border = "3px solid " + color;
    }
    return true;
  }

  unlightTheTiles() {
    for (let i = 0; i < 24; i++){
      document.getElementById("square" + i).style.border = "1px solid #222";
    }
    return true;
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
          {this.renderPlayerMessagePanel()}
        </div>
        <div className="board-column">
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
        <div className="playerBoard-column">
          {this.renderPlayerBoard(0)}
          {this.renderPlayerBoard(1)}
          {this.renderPlayerBoard(2)}
          {this.renderPlayerBoard(3)}
        </div>
        <div className="messageBoard">
          {this.renderMessageBoard()}
        </div>
      </div>
    );
  }
}

////// END OF Board Class

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
    this.imgpath = "/img/" + name + "Tile.png"; // string
  }
}

class Player {
  constructor(id, type, role, color, playersName, position, cards, isInGame, leftTheIsland) {
    this.id = id; // int
    this.type = type; // int
    this.role = role // string
    this.color = color; // string in hexa
    this.playersName = playersName; // string
    this.position = position; // int
    this.cards = cards; // string[]
    this.isInGame = isInGame; // bool
    this.leftTheIsland = leftTheIsland; // bool
    this.whereCanHeMove = null;
    this.whereCanHeDry = null;
    this.imgpath = "/images/char" + role + ".png"; // string

    printIntroduction: {
        console.log(`My name is ${this.playersName}. Im an ${this.role} and my color is ${this.color}`);
    }
  }
    /*
    function whereCanHeMove(i, this.role){
      SET MY FUNCTION HERE ?
    }
    */
}

class FloodMeter {
  constructor(startLevel) {
    this.level = startLevel;
    this.topLevel = 10;
  }

  howManyCards(level){
    if (level < 3){
        return 2;
    } else if (level < 6) {
        return 3;
    } else if (level < 8) {
        return 4;
    } else {
        return 5;
    }
  }
}

class UserMessage {
  constructor(message, isImportant, showNextBtn, showCancelBtn) {
    this.message = message;
    this.isImportant = isImportant;
    this.showNextBtn = showNextBtn;
    this.showCancelBtn = showCancelBtn;
  }
}



function riseTheIsland(){
    var tile01 = new Tile("helipad", 0, false, false, 5, "", new Array(), "#A9D0F5", "", "HELIPORT");
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
