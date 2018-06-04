import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const playerTypes = [
  {
    id : 0,
    role : "Engineer", // dry two tiles for one action
    color : "#CC0000", // red
    ability : "Can dry two tiles in one action.",
    name : "Natacha"
  },
  {
    id : 1,
    role : "Navigator", // move another player from one or two tiles (straight ?) for one action
    color : "#FFF200", //yellow
    ability : "Can move another player up to two tiles for one action.",
    name : "Boris"
  },
  {
    id : 2,
    role : "Messenger", // can give one card for one action to anyone
    color : "#FFFFFF", //white
    ability : "Can send a card to another player for one action.",
    name : "Francois"
  },
  {
    id : 3,
    role : "Diver", // can move one wet case and one other case
    color : "#000000", // black
    ability : "Can move throught immersed and drawned tiles.",
    name : "Gina"
  },
  {
    id : 4,
    role : "Explorer", // can move and dry orth and diagonaly
    color : "#0AB300", //green
    ability : "Can move and dry orthogonaly and diagonaly.",
    name : "Brian"
  },
  {
    id : 5,
    role : "Pilot", // once per turn, fly where you want for 1 action
    color : "#0064b3", //blue
    ability : "Can fly on any tile once per turn.",
    name : "Bob"
  },
];

const orthogonalPaths =  {0 : [1,3], 1 : [0,4], 2 : [3,7], 3 : [0,2,4,8], 4 : [1,3,5,9], 5 : [4,10],
  6 : [7,12], 7 : [2,6,8,13], 8 : [3,7,9,14], 9 : [4,8,10,15], 10 : [5,9,11,16], 11 : [10,17], 12 : [6,13], 13 : [7,12,14,18],
  14 : [8,13,15,19], 15 : [9,14,16,20], 16 : [10,15,17,21], 17 : [11,16], 18 : [13,19], 19 : [14,18,20,22], 20 : [15,19,21,23],
  21 : [16,20], 22 : [19,23], 23 : [20,22]};
const diagonalPaths = {0 : [2, 4], 1 : [3, 5], 2 : [0, 6, 8], 3 : [1,7,9], 4 : [0,8,10], 5 : [1,9,11], 6 : [2,13], 7 : [3,12,14],
   8 : [2,4,13,15], 9 : [3,5,14,16], 10 : [4,15,17], 11 : [5,16], 12 : [7,18], 13 : [6,8,19],
   14 : [7,9,18,20], 15 : [8,10,19,21], 16 : [9,11,20], 17 : [10,21], 18 : [12,14,22], 19 : [13,15,23], 20 : [14,16,22],
   21 : [15,17,23], 22 : [18,20], 23 : [19,21]};

 const gameSteps = ["init", "startTurn", "playerActionOne", "playerActionTwo", "playerActionThree", "playerPickACard", "floodRise", "endTurn", "final"];

 const treasures = [
     { id : "CR" , name : "crystal", trophyImg : "img/wonCrystal.png" },
     { id : "CU" , name : "cup", trophyImg : "img/wonCup.png" },
     { id : "SC" , name : "sceptre", trophyImg : "img/wonSceptre.png"},
     { id : "ST" , name : "statue", trophyImg : "img/wonStatue.png"}
 ];

 const buttons = ["Next", "Cancel", "PickTwoCards 1st", "PickTwoCards 2nd", "Flood"];

 const playerSteps = [
     {id : 0, name : "action 1/3" },
     {id : 1, name : "action 2/3" },
     {id : 2, name : "action 3/3" },
     {id : 3, name : "draw player cards" },
     {id : 4, name : "draw flood cards" }
 ];

 const playerDefaultActions = [
      {id : 0, name : "Move", text: "Move to an adjacent tile.", enabled : true, triggers : "Move" }, //has an adjacent tile around ?
      {id : 1, name : "Dry", text: "Dry an adjacent tile", enabled : true, triggers : "Dry"  }, //has an adjacent immersed tile around ?
      {id : 2, name : "Give", text: "Give a card on a character on the same tile", enabled : true, triggers : "Give" }, //has a player on his tile ?
      {id : 3, name : "Get a Treasure !", text: "Get the treasure in this temple.", enabled : true, triggers : "GetATreasure"  }, // has 4 cards and is on the right temple
      /*{id : 4, name : "DoNothing", text: "Simply do nothing.", enabled : true, triggers : "DoNothing"  }, // -
      /* {id : 5, name : "Skip Turn", text: "Skip the player'sTurn.", enabled : true, triggers : "SkipTurn"  } // -*/
      {id : 6, name : "Sleep", text: "Skip the player's Actions.", enabled : true, triggers : "DoSleep"  }
 ];

 const playerSpecialActions = [
   // Special actions
   {id : 0, name : "Send a card", forRole: "Messenger", replacesAction: "2", text: "Send a card to any character.", enabled : true, triggers : "SendACard"  }, // has a treasure card
   {id : 1, name : "Move someone", forRole: "Navigator", replacesAction: "-", text: "Move any character from one or two tiles.", enabled : true, triggers : "MoveSomeone"  }, // there's another player in game
   {id : 2, name : "Dry two tiles", forRole: "Engineer", replacesAction: "1", text: "Dry two adjacent tiles.", enabled : true, triggers : "DryTwoTiles"  }, // has two immersed adjacent tiles around
   {id : 3, name : "Move around", forRole: "Explorer", replacesAction: "0", text: "Move to any tile around.", enabled : true, triggers : "MoveAround"  },//has an tile around ?
   {id : 4, name : "Dry around", forRole: "Explorer", replacesAction: "1", text: "Dry any tile around." , enabled : true, triggers : "DryAround" },// has an immersed tile around
   {id : 5, name : "Fly", forRole: "Pilot", replacesAction: "-", text: "Fly to any tile.", enabled : true, triggers : "Fly"  },// any other non dranwned tile
   {id : 6, name : "Move/Dive", forRole: "Diver", replacesAction: "0", text: "Dive through any adjacent tile.", enabled : true, triggers : "Dive"  }, // a tile to dive to
 ];

 // QUESTIONS :
 //

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

 class UserMessage {
   constructor(message, isImportant, buttons, databag) {
     this.message = message;
     this.isImportant = isImportant;
     this.buttons = buttons;
     this.databag = databag;
   }
 }

function DrawSquare(props) {
  let squareStyle; // sets the backGround
  let squareClass; // sets the Class

  // sets the backGround
  if (props.tile.isImmersed){
      squareStyle = ({background: '#01A9DB' });
  }else if (props.tile.isDrawned) {
      squareStyle = ({background: '#FFF0' });
  }else if (props.tile.imgpath.length > 0 && props.tile.name === "helipad") {
      squareStyle = ({background: 'url(' + props.tile.imgpath + ')' });
  } else {
      squareStyle = ({background: props.tile.backgroundColor});
  }

  // sets the Class
  if (props.tile.isImmersed){
    squareClass = 'immersedSquare';
  }
  else if (props.tile.isDrawned){
    squareClass = 'drawnedSquare';
  } else {
    squareClass = 'square';
  }

  if (props.tile.blink){
    squareClass = squareClass + ' blink';
  }

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

function DrawEmptySquare(props) {
  return (
    <button className="emptySquare" /* for testing purposes onClick={props.onClick}*/></button>
  );
}

function DrawEmptySquareWithTreasure(props) {
  return (
    <button className="emptySquare">
        <img className="trophyImage" src={props.imagePath}/>
    </button>
  );
}

function DrawPlayerPawn(props){
  if (props.pawns && props.pawns.length === 1){
    return (
      <div className="playerPawn singlePP lilGuy" style={{color: props.players[props.pawns[0]].color}}>P</div>
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
    var playerCardsDiscard = [];
    var floodCardsLeap = generateFloodCardsLeap();
    var floodCardsDiscard = [];
    var floodMeter = new FloodMeter(1);
    let mainUserMessage = new UserMessage("Welcome new Player. Choose a first action for the first character.", false, []);

    // generer les joueurs
    var players = generatePlayers(4);
    // distribuer les cartes aux joueurs
    players.forEach(giveTwoInitialCards);
    // assigner les positions de depart
    players.forEach(getInitialPlayerPosition);

    var possibleActions = this.getPossibleActions(players[0], false, true);

    this.state = {
      tiles: tiles,
      playerCardsLeap: playerCardsLeap,
      playerCardsDiscard: playerCardsDiscard,
      floodCardsLeap: floodCardsLeap,
      floodCardsDiscard: floodCardsDiscard,
      floodCardsOutOfGame: [],
      players: players,
      floodMeter: floodMeter,
      gameIsOver: false,
      nbrOfPlayers : players.length,
      posessedTreasures : [],
      turn : 1,
      hasPilotFlownThisTurn : false,
      currentPlayerPlaying : 0,
      possibleActions : possibleActions,
      currentStep : 0,
      whatIsExpectedNext : "CharacterActionButtonClick",
      whatIsExpectedNext_toRestore : null,
      mainUserMessage : mainUserMessage,
      mainUserMessage_toRestore: null,
      messageBoardState : "default",
      messageBoardState_toRestore : null,
      cardUser : null,
      coTravellers : null,
      cardFlyWith : [],
      guysToEvacuate : null,
      floodingSequence : null
    };

    this.doFloodInitialTiles(6);

    // Let's start ... waiting for the first action click

    function getInitialPlayerPosition(player, y, z){
      //start hack
      // tiles[14].playerOn.push(player.id);

      for (let i = 0; i < tiles.length; i++){
        if (tiles[i].startBase === player.type){
          player.position = tiles[i].position;
          tiles[i].playerOn.push(player.id);
          break;
        }
      }
    }

    function giveTwoInitialCards(player, y , z){
       // helicopter card hack is off
       /*
        let card = { id : 20, name : "helicopter", type : "H", url : "img/helicopterCard.png"};
        let card2 = { id : 19, name : "helicopter", type : 4, url : "img/helicopterCard.png"};
        player.cards.push(card);
        player.cards.push(card2);
        */
        //end of helicopter Hack

      for (let i = 0; i < 2; i++){ // 2
      // for (let i = 0; i < 5; i++){ // HACK OF 5 Cards in the beg
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
//        Out Of Board constructor
////////////////////////////////////////////////////////////////////////////////////

  controller(input, data){
      console.log("InController turn :" + this.state.currentStep);
      this.checkCardState();
      this.showActionButtons();
      this.unblinkTheTiles();
      if (input === "ActionIsDone"){
        let nextStep = this.state.currentStep + 1;
        if (nextStep === 3){
          // draw player cards 01
          let newMessage = new UserMessage("Let's' draw some Player Cards", false, [2]);
          this.setState({ currentStep : nextStep, possibleActions : [], mainUserMessage : newMessage});
        } else if (nextStep === 4){
          // TODO Check if too muchCardsInHand
          // flood some tiles.
          this.setState({ currentStep : nextStep });
          let howMuch = this.state.floodMeter.floodFactor;
          let newMessage = new UserMessage("Let's flood " + howMuch + " tiles", false, [4]);
          this.setState({ currentStep : nextStep, possibleActions : [], mainUserMessage : newMessage});
        }
        else if (nextStep === 5){
          // next Turn, new Player 0
          let n_tiles = this.state.tiles;
          for (let i = 0; i< n_tiles.length; i++){
              n_tiles[i].blink = false;
          }

          if (this.state.currentPlayerPlaying === this.state.players[this.state.players.length -1].id){
            let newMessage = new UserMessage("Next Turn ! Please " + this.state.players[0].playersName + ", Choose an action " , false, []);
            let nextTurn = this.state.turn + 1;
            let nextPlayer = this.state.players[0].id;
            let psblactn = this.getPossibleActions(this.state.players[0], false, false);
            this.setState({ currentStep : 0,
              turn : nextTurn,
              currentPlayerPlaying : nextPlayer,
              possibleActions : psblactn,
              hasPilotFlownThisTurn : false,
              whatIsExpectedNext : "CharacterActionButtonClick" ,
              mainUserMessage : newMessage,
              tiles: n_tiles });
          } else {
            // next Player
            let newMessage = new UserMessage("Next player ! Please Choose an action " , false, []);
            let nextPlayer = this.state.players[this.state.currentPlayerPlaying + 1].id;
            let psblactn = this.getPossibleActions(this.state.players[nextPlayer], false, false);
            this.setState({ currentStep : 0,
              currentPlayerPlaying : nextPlayer,
              possibleActions : psblactn,
              whatIsExpectedNext : "CharacterActionButtonClick",
              mainUserMessage : newMessage,
              tiles: n_tiles });
          }
        }
        else{
          // next action for the same player
          let newMessage = new UserMessage("Choose an action " , false, []);
          let psblactn = this.getPossibleActions(this.state.players[this.state.currentPlayerPlaying], this.state.hasPilotFlownThisTurn, false);
          this.setState({ currentStep : nextStep,
            possibleActions : psblactn,
            whatIsExpectedNext : "CharacterActionButtonClick" ,
            mainUserMessage : newMessage});
          // TODO Check if too muchCardsInHand for any one
        }
      }
      // user has to pick two cards from the leap
      else if (input === "PickTwoCardsONE"){
          let tempState = this.state;
          tempState = this.doPickOnePlayerCard(1, tempState);
          this.setState(tempState);
      } else if (input === "PickTwoCardsTWO"){
          let tempState = this.state;
          tempState = this.doPickOnePlayerCard(2, tempState);
          this.setState(tempState);
      }
      else if (input === "PlayerFlood"){
        this.doFloodATile(1, this.state.floodMeter.howManyCards(this.state.floodMeter.level));
      }
  }

  doFloodInitialTiles(howMany){
    let n_FloodCardsLeap = this.state.floodCardsLeap;
    let n_Tiles = this.state.tiles;
    let n_FloodCardsDiscard = this.state.floodCardsDiscard;

    for ( let i = 0; i < howMany; i++){

        let card = n_FloodCardsLeap.pop();

        for (let j = 0; j < n_Tiles.length; j++){
          if (n_Tiles[j].name === card.name){
                n_Tiles[j].isImmersed = true;
                break;
            }
        }
        n_FloodCardsDiscard.push(card);
    }

    this.setState({
      floodCardsLeap: n_FloodCardsLeap,
      tiles: n_Tiles,
      floodCardsDiscard: n_FloodCardsDiscard });
    return true;
  }

  doFloodATile(number, outOf){
    this.unblinkTheTiles();
    let n_Tiles = this.state.tiles;
    let n_FloodCardsLeap = this.state.floodCardsLeap;
    let n_FloodCardsDiscard = this.state.floodCardsDiscard;
    let n_FloodCardsOutOfGame = this.state.floodCardsOutOfGame;
    let floodedTileId = "";

    let message = "<div>immersion " + number + " out of " + outOf + ".<br/>";

    let tileHasDrawned = false;
    let guysToEvacuate = [];

    if (n_FloodCardsLeap.length < 1){
      n_FloodCardsLeap = shuffleArray(n_FloodCardsDiscard);
      n_FloodCardsDiscard = [];
    }

    let card = n_FloodCardsLeap.pop();
    let gameOver = false;

    for (let j = 0; j < n_Tiles.length; j++){
      if (n_Tiles[j].name === card.name){
        console.log('****** TILE To flood IS ' + n_Tiles[j].name);
        floodedTileId = j;
        if (n_Tiles[j].isImmersed){
          // Let's DRAWN this tile
          // alert (n_Tiles[j].name + " at " + j + " is drawning !");
            message = message + "<span style=\"color: #DC143C\">" + n_Tiles[j].name + " at " + j + " is drawning ! </span>";
            n_Tiles[j].isImmersed = false;
            n_Tiles[j].isDrawned = true;
            n_Tiles[j].blink = true;
            this.graphicallyDrawnATile(j);
            tileHasDrawned = true;
            if (n_Tiles[j].name === "helipad"){
              message = message + "<br/> Explorers can't leave the Island any more ! Game Over !";
              gameOver = true;
              // alert("The helipad is drawned. GAMEOVER")
            }
            // rescue some players ?
            guysToEvacuate = n_Tiles[j].playerOn;
            if (n_Tiles[j].playerOn.length > 0){
                message = message + "<br/> There are " + n_Tiles[j].playerOn.length + " explorer(s) on it. Let's evacuate them.";
                // alert ("There is " + n_Tiles[j].playerOn.length + " explorer(s) on the drawning tile. Let's evacuate them.");
            }
            // Check if all Temples of an undiscovered Treasure are drawned. If yes : end game
            if (n_Tiles[j].templeFor !== ""){
                // it's a temple drawning
                if (this.state.posessedTreasures.indexOf(n_Tiles[j].templeFor) < 0){
                  // the treasure of this temple isn't discovered yet
                  for (let k = 0; k < 24; k++){
                    if (k != j && n_Tiles[k].templeFor === n_Tiles[j].templeFor){
                      if (n_Tiles[k].isDrawned){
                        message = message + "<br/>Oh my God ! all the temples for " + this.getTreasureNameById(n_Tiles[j].templeFor) + " are drawned. You'll never get it. GAME OVER";
                        gameOver = true;
                        // alert("Oh my God ! all the temples for " + this.getTreasureNameById(n_Tiles[j].templeFor) + " are drawned. You'll never get it. GAME OVER" );
                      }
                      break;
                    }
                  }
                }
            }
        }
        else if(n_Tiles[j].isDrawned){
          alert ("CONCEPTUAL ERROR : " + n_Tiles[j].name + " is already drawned. it shouldn't be in the Leap !");
        }
        else{
            message = message + n_Tiles[j].name + " at " + j + " is flooded ! ";
            n_Tiles[j].isImmersed = true;
            n_Tiles[j].blink = true;
        }

        break;
      }
    }
    if (!tileHasDrawned){
        n_FloodCardsDiscard.push(card);
    } else {
        n_FloodCardsOutOfGame.push(card);
    }

    let n_userMessage = null;
    let floodingSequence = [number, outOf];

    // BRANCHING : Soit on evacue des gars, soit on refais un flood, soit c'est fini
    if (guysToEvacuate.length > 0){
        message = message + "<br/>!!! WE NEED TO EVACUATE THE TILE !!!</div>";
        n_userMessage = new UserMessage(message , false, [8]);
    }
    else if (number === outOf){
      // floodings are finished
      message = message + "<br/> Floodings are over.... for now.</div>";
      n_userMessage = new UserMessage(message , false, [0]);
    }
    else {
      // next flooding
      let databag = {nextFloodingNumber: number + 1, outOf: outOf};
      message = message + "</div>";
      n_userMessage = new UserMessage(message , false, [5], databag);
    }

    this.setState({
      mainUserMessage: n_userMessage,
      floodCardsLeap: n_FloodCardsLeap,
      floodCardsOutOfGame: n_FloodCardsOutOfGame,
      floodCardsDiscard: n_FloodCardsDiscard,
      gameIsOver: gameOver,
      tiles: n_Tiles,
      guysToEvacuate: guysToEvacuate,
      floodingSequence: floodingSequence});
  }

  doEvacuate(){
      let n_players = this.state.players;
      let drawningGuy = n_players[this.state.guysToEvacuate[0]];
      let drawningGuyId = drawningGuy.id;
      let tilesToLight = [];
      let gameIsOver = false;

      if (drawningGuy.role === "Pilot"){
        tilesToLight = this.whereCanHeFly(drawningGuy.position);
        n_players[drawningGuyId].whereCanHeFly = tilesToLight;
      } else {
        tilesToLight = this.whereCanHeMove(drawningGuy.position, drawningGuy.role)
        n_players[drawningGuyId].whereCanHeMove = tilesToLight;
      }

      if (tilesToLight.length === 0){
        alert ("Oh my God. There's nowhere he can go. " + drawningGuy.playersName+ " is drawning. Noooooooo. GAME OVER.");
        gameIsOver = true;
      }

      this.lightTheTiles(tilesToLight, drawningGuy.color);

      let newMessage = new UserMessage("Now choose a destination to EVACUATE", false, []);
      this.setState({ whatIsExpectedNext: "TileButtonClickForEvacuate" ,
                      players : n_players,
                      gameIsOver : gameIsOver,
                      mainUserMessage: newMessage });
  }

  doMoveFloodOmeterCursor(){
    let newValue = document.getElementById('floodOmeterCursor').style.left;
    newValue = parseInt(newValue.slice(0, newValue.indexOf('px')), 10) + 33;
    document.getElementById("floodOmeterCursor").style.left = newValue + "px";
  }

  doPickOnePlayerCard(cardNumber, tempState){
      let newPlayerCardsDiscard = tempState.playerCardsDiscard;
      let newPlayerCardsLeap = tempState.playerCardsLeap;
      let newPlayers = tempState.players;
      let newFloodCardsLeap = tempState.floodCardsLeap;
      let newFloodCardsDiscard = tempState.floodCardsDiscard;
      let newFloodCardsOutOfGame = tempState.floodCardsOutOfGame;
      let newFloodMeter = tempState.floodMeter;

      let card = [];
      if (newPlayerCardsLeap.length < 1){
        // shuffle and rebuild the leap from the Discard
          newPlayerCardsLeap = shuffleArray(newPlayerCardsDiscard);
          newPlayerCardsDiscard = [];
      }
      card = newPlayerCardsLeap.pop();

      let cardToPushToPlayer = null;

      if (card.name === "floodRise"){
          // bring Discarded flood cards on the top of the flood Leap
          if (newFloodCardsDiscard.length > 0){
              newFloodCardsDiscard = shuffleArray(newFloodCardsDiscard);
              newFloodCardsLeap = newFloodCardsLeap.concat(newFloodCardsDiscard);
              newFloodCardsDiscard = [];
          }

          // upgrade the Flood Level
          newFloodMeter.level = newFloodMeter.level + 1;
          newFloodMeter.floodFactor = newFloodMeter.howManyCards(newFloodMeter.level);

          this.doMoveFloodOmeterCursor();

          // alert("Flood Riiiiise ! New Flood level is " + newFloodMeter.level + "(pick " +  newFloodMeter.floodFactor + " at each flood)");
          if (newFloodMeter.level >= newFloodMeter.topLevel){
            alert (" Top level reached. The Island is submerged. Game Over");
          }

          // put the flood card in the discards
          newPlayerCardsDiscard.push(card);
      }
      else{
        cardToPushToPlayer = card;
      }

      // has Player too much cards ?
      let nbrOfCardsInHand = newPlayers[this.state.currentPlayerPlaying].cards.length + 1;

      if (cardToPushToPlayer != null){
              newPlayers[this.state.currentPlayerPlaying].cards.push(cardToPushToPlayer);
      }

      let newMessage = "";
      if (cardNumber == 1){
            newMessage = new UserMessage('First card : ' + card.name + '. <br/><img src='  + card.url + ' width="30px" height="46px"/>', false, [3]);
      }else{
            let databag = {userId : this.state.currentPlayerPlaying}
            newMessage = new UserMessage('Second card : ' + card.name + '. <br/><img src=' + card.url  + ' width="30px" height="46px"/>', false, [9], databag);
      }

      tempState.mainUserMessage = newMessage;
      tempState.playerCardsLeap = newPlayerCardsLeap;
      tempState.players = newPlayers;
      tempState.playerCardsDiscard = newPlayerCardsDiscard;
      tempState.floodCardsLeap = newFloodCardsLeap;
      tempState.floodCardsDiscard = newFloodCardsDiscard;
      tempState.floodCardsOutOfGame = newFloodCardsOutOfGame;
      tempState.floodMeter = newFloodMeter;

      return tempState;
  }

  // MUST BE DONE AT THE END OF AN ACTION -> embraye sur un ActionIsDone
  doCheckIfMoreThan5CardsInHand(passages, userId) { // TODO : player Id has to be dynamic in cases of give or send!
    let cardsInHand = this.state.players[userId].cards;
    if (cardsInHand.length > 5){
      // alert ("Oh no ! Over 5 cards in Hand ! : " + cardsInHand.length);

      let n_whatIsExpectedNext_toRestore = this.state.whatIsExpectedNext;
      // let n_Message = new UserMessage("Let's get rid of " + cardsInHand.length - 5 +" card(s)", false, []);
      let n_messageBoardState_toRestore = this.state.messageBoardState;

      // displays the board of co travellers choice
      // this.setState({ mainUserMessage: n_Message });
      if (passages === 0){
        this.setState({ whatIsExpectedNext_toRestore : n_whatIsExpectedNext_toRestore,
                        whatIsExpectedNext: "ResolveOver5Cards" ,
                        mainUserMessage_toRestore: this.state.mainUserMessage,
                        // mainUserMessage: n_Message,
                        messageBoardState_toRestore: n_messageBoardState_toRestore,
                        messageBoardState: "SolveOver5Cards",
                        cardUser : userId });
      } else {
        this.setState({
                        whatIsExpectedNext: "ResolveOver5Cards" ,
                        // mainUserMessage_toRestore: this.state.mainUserMessage,
                        // mainUserMessage: n_Message,
                        messageBoardState: "SolveOver5Cards",
                        cardUser : userId });
      }
      return null;
    }
    else {
      //TODO does not work in case of a 'give' or a 'send-a-card' -> à voir
      if (passages > 0){
        // passages > 0 means a throw or two have been made, let's restore the states
        this.setState({ whatIsExpectedNext: this.state.whatIsExpectedNext_toRestore,
                        whatIsExpectedNext_toRestore: null,
                        mainUserMessage: this.state.mainUserMessage_toRestore,
                        mainUserMessage_toRestore: null,
                        messageBoardState: "default"}); // was Default ;)
      }

      this.controller("ActionIsDone");
    }
  }

  throwCard(cardtype, index, userId){
      let n_players = this.state.players;
      let n_playerCardsDiscard = this.state.playerCardsDiscard;

      n_playerCardsDiscard.push(n_players[userId].cards[index]);
      n_players[userId].cards.splice(index, 1);

      this.setState({ players: n_players });
      this.doCheckIfMoreThan5CardsInHand(1, userId); // 1 means : we've been there already, we may want to close the check if more than five cards process.
  }

  useACardToGetRidOfIt(type, index, userId){
      let n_message = new UserMessage("Ok. What's next ?" , false, [10]);
      // ici set un state to recover à 'Voilà, on a utilisé une carte -> next doCheckIfMoreThan5CardsInHand'
      this.setState({mainUserMessage: n_message, messageBoardState: "default",}, () => {
        if (type === "H"){
            this.clickedOnHelicopterCard(userId);
        } else if (type === "SB"){
            this.clickedOnSandBagCard(userId);
        } else {
          alert("CONCEPTUAL ERROR : WRONG CARD TYPE");
        }
      });
  }

  clickedOnHelicopterCard(playerId) {
    /*
    // Check if the game is won :
    // on the helipad, 4 treasures found, all players on the tile
    if (this.state.posessedTreasures.length === 4 &&
        this.state.tiles[this.state.players[playerId].position].name === "helipad" &&
        this.state.tiles[this.state.players[playerId].position].playerOn.length === this.state.nbrOfPlayers) {
          alert("The " + this.state.nbrOfPlayers + " valliant exppplorers leave the island with the 4 treasures. You WON !");
        }
        */
    let whatIsExpectedNext_toRestore = this.state.whatIsExpectedNext;
    let n_Message = new UserMessage("Now choose a landing destination", false, [7]);
    let n_messageBoardState_toRestore = this.state.messageBoardState;

    // displays the board of co travellers choice
    this.setState({ whatIsExpectedNext_toRestore : whatIsExpectedNext_toRestore,
                    whatIsExpectedNext: "ResolveLeftPaneThing" ,
                    mainUserMessage_toRestore: this.state.mainUserMessage,
                    mainUserMessage: n_Message,
                    messageBoardState_toRestore: n_messageBoardState_toRestore,
                    messageBoardState: "ChooseCoTravellers",
                    cardUser : playerId });
  }

  helicopterCardEnRoute(playerId, travellers){
    // Check if the game is won :
    // on the helipad, 4 treasures found, all players on the tile
    if (this.state.posessedTreasures.length === 4 &&
        this.state.tiles[this.state.players[playerId].position].name === "helipad" &&
        this.state.tiles[this.state.players[playerId].position].playerOn.length === this.state.nbrOfPlayers) {
          alert("The " + this.state.nbrOfPlayers + " valliant exppplorers leave the island with the 4 treasures. You WON !");
        }
    // displays the possible destinations
    let tilesToLight = this.whereCanHeFly(this.state.players[playerId].position);
    this.state.players[playerId].whereCanHeFly = tilesToLight;
    let nada = this.lightTheTiles(tilesToLight, this.state.players[playerId].color);
    // set state
    let n_messageBoardState = "default";
    this.setState({ whatIsExpectedNext: "TileButtonClickForFlyWithACard",
                    coTravellers: travellers,
                    messageBoardState: n_messageBoardState });
  };

  cancelHelicopterCardPick(){
    this.unlightTheTiles();
    this.showActionButtons();
    this.setState({ whatIsExpectedNext: this.state.whatIsExpectedNext_toRestore,
                    whatIsExpectedNext_toRestore : null,
                    mainUserMessage: this.state.mainUserMessage_toRestore,
                    mainUserMessage_toRestore: null,
                    messageBoardState: this.state.messageBoardState_toRestore,
                    messageBoardState_toRestore: null,
                    // cardUser : null,
                    coTravellers : null });
  }

  clickedOnSandBagCard(playerId) {
    let tilesToLight = this.getImmersedTiles();
    if (tilesToLight.length === 0){
      alert("No tile to dry. Keep your Sandbag.");
      return null;
    }

    this.state.players[playerId].whereCanHeDry = tilesToLight;
    this.lightTheTiles(tilesToLight, this.state.players[playerId].color);
    let newMessage = new UserMessage("Now choose any tile to dry", false, [6]);
    this.setState({ whatIsExpectedNext_toRestore : this.state.whatIsExpectedNext,
                    whatIsExpectedNext: "TileButtonClickForDryWithACard" ,
                    mainUserMessage_toRestore: this.state.mainUserMessage,
                    mainUserMessage: newMessage,
                    messageBoardState_toRestore: this.state.messageBoardState,
                    cardUser : playerId });
    return null;
  }

  cancelSandBagCardPick(){
    this.unlightTheTiles();
    this.showActionButtons();
    this.setState({ whatIsExpectedNext: this.state.whatIsExpectedNext_toRestore,
                    whatIsExpectedNext_toRestore : null,
                    mainUserMessage: this.state.mainUserMessage_toRestore,
                    mainUserMessage_toRestore: null,
                    messageBoardState: this.state.messageBoardState_toRestore,
                    messageBoardState_toRestore: null,
                    // cardUser : null
                   });
  }

  checkCardState(){
    // flood Cards
    let nbrOfFloodCardsInDiscard = this.state.floodCardsDiscard.length;
    let nbrOfFloodCardsInLeap = this.state.floodCardsLeap.length;
    let nbrOfFloodCardsOutOfGame = this.state.floodCardsOutOfGame.length;
    let nbrOfFloodCards = nbrOfFloodCardsInDiscard + nbrOfFloodCardsInLeap + nbrOfFloodCardsOutOfGame;

    console.log("FLOOD CARDS : total = " + nbrOfFloodCards+ " (24 expected), out of game = " + nbrOfFloodCardsOutOfGame + ", in Discard = " + nbrOfFloodCardsInDiscard + ", in Leap = " + nbrOfFloodCardsInLeap);

    if (nbrOfFloodCards != 24){
      alert("ALERT : We loose some Flood cards in the process.");
    }

    // playerCards
    let nbrOfPlayerCardsInPLayersHands = 0;
    let nbrOfPlayerCardsInDiscard = this.state.playerCardsDiscard.length;
    let nbrOfPlayerCardsInLeap = this.state.playerCardsLeap.length;
    for(let i = 0 ; i < this.state.players.length; i++){
      nbrOfPlayerCardsInPLayersHands = nbrOfPlayerCardsInPLayersHands + this.state.players[i].cards.length;
    }
    let nbrOfPlayerCards = nbrOfPlayerCardsInPLayersHands + nbrOfPlayerCardsInDiscard + nbrOfPlayerCardsInLeap;
    console.log("PLAYER CARDS : total = " + nbrOfPlayerCards+ " (28 expected), in players hands = " + nbrOfPlayerCardsInPLayersHands + ", in Discard = " + nbrOfPlayerCardsInDiscard + ", in Leap = " + nbrOfPlayerCardsInLeap);

    if (nbrOfPlayerCards != 28){
      alert("ALERT : We loose some Player cards in the process.");
    }
  }

  getPossibleActions(player, hasPilotFlownThisTurn, isInitial) {
      let actions = [];
      for (let i = 0; i < playerDefaultActions.length; i++){
          let action = playerDefaultActions[i];
          for (let j = 0; j < playerSpecialActions.length; j++ )
          {
            if (playerSpecialActions[j].forRole === player.role && playerSpecialActions[j].replacesAction === i.toString()){
              action = playerSpecialActions[j];
            }
          }
          // is action possible ? Check the validity of an action and remove it

          if (isInitial && (action.name === "Give" || action.name === "Get a Treasure !")){
            // nothing happens. You can never give or find a treasure on the first action of the game
          } else if (!isInitial && action.name === "Give"){
            if (this.state.tiles[player.position].playerOn.length > 1 ){
              actions.push(action);
            }
          } else if(!isInitial && action.name === "Get a Treasure !"){
            if (this.state.tiles[player.position].templeFor.length === 2){
              actions.push(action);
            }
          } else if (!isInitial && ( action.name === "Dry" || action.name === "Dry around")){
            let whereCanHeDry = this.whereCanHeDry(player.position, player.role);
            if (whereCanHeDry.length > 0){
              actions.push(action);
            }
          } else if (!isInitial && ( action.name === "Move" || action.name === "Move around")){
            let whereCanHeMove = this.whereCanHeMove(player.position, player.role);
            if (whereCanHeMove.length > 0){
              actions.push(action);
            }
          }
          else {
            actions.push(action);
          }
      }

      if (player.role === "Pilot"){
        // remove the first action which is fly
        let nada = actions.shift();
        let pilotActions = [];
        pilotActions.push(playerDefaultActions[0]); // move
        if (hasPilotFlownThisTurn === false){
            pilotActions.push(playerSpecialActions[5]); // fly
        }
        return pilotActions.concat(actions);
      }

      if (player.role === "Navigator"){
        // remove the first action which is move
        let nada = actions.shift();
        let navigatorActions = [];
        navigatorActions.push(playerDefaultActions[0]); // move
        navigatorActions.push(playerSpecialActions[1]); // move someone else
        return navigatorActions.concat(actions);
      }
      return actions;
    }

  // returns an array of positions
  whereCanHeMove(position, role){
    let moves = [];
    if (role === "Explorer"){
        moves = orthogonalPaths[position];
        moves = moves.concat(diagonalPaths[position]);
    }
    else if (role === "Diver"){
      let positionsToInvestigate = [];
      positionsToInvestigate = positionsToInvestigate.concat(orthogonalPaths[position]);
      let investigatedPositions = [position];
      let groundsHeCanGoTo = [];

      while (positionsToInvestigate.length > 0 ){
        let i = positionsToInvestigate.pop();
        investigatedPositions.push(i);

        if (this.state.tiles[i].isDrawned || this.state.tiles[i].isImmersed){

          if (this.state.tiles[i].isImmersed){
            groundsHeCanGoTo.push(i);
          }

          let candidates = orthogonalPaths[i];
          for(let z = 0; z < candidates.length; z++){
            if (!(investigatedPositions.indexOf(candidates[z]) >= 0)) {
              if (this.state.tiles[candidates[z]].isDrawned){
                positionsToInvestigate.push(candidates[z]);
              } else if (this.state.tiles[candidates[z]].isImmersed) {
                positionsToInvestigate.push(candidates[z]);
                groundsHeCanGoTo.push(candidates[z]);
              } else {
                groundsHeCanGoTo.push(candidates[z]);
              }
            }
          }
        } else {
          // it's dry
          groundsHeCanGoTo.push(i);
        }
      }

      moves =  groundsHeCanGoTo;

    }
    else {
      // regular orthogonal possibilities
        moves = orthogonalPaths[position];
    }

    // virer les cases isDrawned et origin
    return this.removeDrawnedAndOriginTiles(moves, position);
  }

  // remove Drawned And Origin Tiles from a where-can-he-go selection
  removeDrawnedAndOriginTiles(moves, position){
    // console.log("entering RD&O with " + moves + " from " + position);
    let output = [];
    if (moves.length > 0) {
      for (let k = 0; k < moves.length; k++)
      {
          if (!this.state.tiles[moves[k]].isDrawned && moves[k] !== position)
          {
            output.push(moves[k]);
          }
      }
  }
  return output;
}

  // returns an array of positions
  whereCanHeFly(position){
    let moves = [];
    for (let i = 0; i < 24; i ++){
      if (i !== position){
        moves.push(i);
      }
    }
    // virer les cases isDrawned et origin
    return this.removeDrawnedAndOriginTiles(moves, position);
  }

  whereNavigatorCanMoveHim(position){
      let moves = [];
      let secondMoves = [];
      moves = orthogonalPaths[position];

      for (let i = 0 ; i < moves.length; i++){
        if (!this.state.tiles[moves[i]].isDrawned){
          secondMoves = secondMoves.concat(orthogonalPaths[moves[i]]);
        }
      }
      moves = moves.concat(secondMoves);

      // virer les cases isDrawned et origin
      return this.removeDrawnedAndOriginTiles(moves, position);
  }

  // returns an array of positions
  whereCanHeDry(position, role){
    let cases = [];
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

  getImmersedTiles(){
    let cases = [];
    for (let i = 0; i < 24; i++){
      if (this.state.tiles[i].isImmersed){
        cases.push(i);
      }
    }

    return cases;
  }

// Handles a click on an action button in the left menu
 handleActionClick(action) {
    this.hideActionButtons();
    console.log("clicked on " + action);
    if (this.state.whatIsExpectedNext === "CharacterActionButtonClick") {
      let id = this.state.players[this.state.currentPlayerPlaying].id;
      if (action === "Move" || action === "Dive" || action === "MoveAround"){
            let tilesToLight = this.whereCanHeMove(this.state.players[id].position, this.state.players[id].role);
            if (tilesToLight.length === 0 ){
              alert ("Nowhere to go. Please choose another action");
              this.showActionButtons();
            } else  {
              this.state.players[id].whereCanHeMove = tilesToLight;
              let nada = this.lightTheTiles(tilesToLight, this.state.players[id].color);
              // set a new Expected PlayerInput
              let newMessage = new UserMessage("Now choose a destination", false, [1]);
              this.setState({ whatIsExpectedNext: "TileButtonClickForMove" , mainUserMessage: newMessage });
            }
      } if (action === "Fly"){
          let tilesToLight = this.whereCanHeFly(this.state.players[id].position);
          this.state.players[id].whereCanHeFly = tilesToLight;
          let nada = this.lightTheTiles(tilesToLight, this.state.players[id].color);
          let newMessage = new UserMessage("Now choose a landing destination", false, [1]);
          this.setState({ whatIsExpectedNext: "TileButtonClickForFly" , mainUserMessage: newMessage });
      } else if (action === "Dry" || action === "DryAround"){
            let tilesToLight = this.whereCanHeDry(this.state.players[id].position, this.state.players[id].role);
            if (tilesToLight.length === 0 ){
              alert ("No tiles to dry. Please choose another action");
              this.showActionButtons();
            } else {
              this.state.players[id].whereCanHeDry = tilesToLight;
              let nada = this.lightTheTiles(tilesToLight, this.state.players[id].color);
              let newMessage = new UserMessage("Now choose a tile to dry", false, [1]);
              this.setState({ whatIsExpectedNext: "TileButtonClickForDry" , mainUserMessage: newMessage});
            }
      } else if (action === "DryTwoTiles"){
            let tilesToLight = this.whereCanHeDry(this.state.players[id].position, this.state.players[id].role);
            if (tilesToLight.length === 0 ){
              alert ("No tiles to dry. Please choose another action");
              this.showActionButtons();
            } else if (tilesToLight.length === 1 ){
              this.state.players[id].whereCanHeDry = tilesToLight;
              let nada = this.lightTheTiles(tilesToLight, this.state.players[id].color);
              let newMessage = new UserMessage("THere's only one tile you can dry. Dry it.", false, [1]);
              this.setState({ whatIsExpectedNext: "TileButtonClickForDry" , mainUserMessage: newMessage});
            } else {
              this.state.players[id].whereCanHeDry = tilesToLight;
              let nada = this.lightTheTiles(tilesToLight, this.state.players[id].color);
              let newMessage = new UserMessage("Now choose two tiles to dry", false, [1]);
              this.setState({ whatIsExpectedNext: "TileButtonClickForDryTwoTimes" , mainUserMessage: newMessage});
            }
      } else if (action === "Give") {
              let playersAround = this.getPlayersOnTheSameTileExceptMe();
              if (this.state.players[id].cards.length < 1 ){
                alert("No cards to give. Try something else.");
                this.showActionButtons();
              } else if ( action === "Give" && playersAround.length < 1) {
                  alert("No other player on your tile. Try something else.");
                  this.showActionButtons();
              } else {
                this.setState({ whatIsExpectedNext: "ResolveUserDialogSequence" , messageBoardState: "giveACardSequence"});
              }
      } else if (action === "SendACard") {
            if (this.state.players[id].cards.length < 1 ){
              alert("No cards to send. Try something else.");
              this.showActionButtons();
            } else {
              this.setState({ whatIsExpectedNext: "ResolveUserDialogSequence" , messageBoardState: "sendACardSequence"});
            }
      } else if (action === "GetATreasure") {
              let treasureId = this.state.tiles[this.state.players[id].position].templeFor;
              if (treasureId === ""){
                alert("This tile is not a temple.");
                this.showActionButtons();
              }
              else {
                  let cardsIndexes = [];
                  for (let i = 0 ; i < this.state.players[id].cards.length; i++){
                    if (this.state.players[id].cards[i].type === treasureId){
                      cardsIndexes.push(i);
                    }
                  }

                  if (this.state.posessedTreasures.includes(treasureId)){
                    alert("This treasure has been found already.");
                  }
                  else if (cardsIndexes.length < 4){
                    alert("You do not have enough " + this.getTreasureNameById(treasureId) + " cards to get the treasure... you need 4 , you have " + cardsIndexes.length);
                    this.showActionButtons();
                  } else {
                      if (this.state.posessedTreasures.length === 3 ){
                        alert("You found the 4th treasure ! Now, go to the heliport and leave the Island !");
                      } else if (this.state.posessedTreasures.length === 0) {
                        alert("You found your first treasure ! Go on !");
                      } else {
                        alert(" You have another treasure ! Go ! Go ! Gotta catch them all");
                      }
                      // PICK A TREASURE
                      let n_playerCardsDiscard = this.state.playerCardsDiscard;
                      let n_players = this.state.players;
                      let n_posessedTreasures = this.state.posessedTreasures;
                      // drop 4 cards
                      let cardsLeftInHand = [];
                      let count = 0;
                      for (let j = 0; j < this.state.players[id].cards.length; j++){
                        if (this.state.players[id].cards[j].type === treasureId && count < 4){
                            n_playerCardsDiscard.push(this.state.players[id].cards[j]);
                            count = count + 1;
                        } else {
                            cardsLeftInHand.push(this.state.players[id].cards[j]);
                        }
                      }

                      n_players[id].cards = cardsLeftInHand;

                      //update posessedTreasures
                      n_posessedTreasures.push(treasureId);


                      let newMessage = new UserMessage("You found the treasure " + this.getTreasureNameById(treasureId) + " !!!", false, [0]);
                      this.setState({ mainUserMessage: newMessage,
                                      posessedTreasures: n_posessedTreasures,
                                      players: n_players,
                                      playerCardsDiscard: n_playerCardsDiscard
                                    });
              }
          }
      } else if (action === "MoveSomeone") {
              this.setState({ whatIsExpectedNext: "ResolveUserDialogSequence" , messageBoardState: "moveSomeOneSequence"});
      } else if (action === "DoNothing"){ // skip one action
              let newMessage = new UserMessage("Doing nothing ZZZZZZZ", false, [0]);
              this.setState({ mainUserMessage: newMessage});
      } else if (action === "SkipTurn"){ // skip the whole player turn, goes to next player
             let newMessage = new UserMessage("Skip turn ", false, [0]);
             this.setState({ mainUserMessage: newMessage,
                              currentStep: 4});
      } else if (action === "DoSleep"){ // finish the actions, go to card picking
             let newMessage = new UserMessage("Sleep ZZZZZZZ ", false, [0]);
             this.setState({ mainUserMessage: newMessage,
                              currentStep: 2});
      }
    }
    else{
      alert ("UnexpectedClickOnActionButton");
    }
    return null;
}

handleCardClick(card, playerId, toThrowIt){
  if (this.state.whatIsExpectedNext !== "TileButtonClickForMove")
  {
    this.hideActionButtons();
    if (card === "helicopterCard" && toThrowIt === false) {
          this.clickedOnHelicopterCard(playerId)
    } else if (card === "sandBagCard" && toThrowIt === false) {
          this.clickedOnSandBagCard(playerId)
    }
  } else {
    alert("Please finish your action first.");
  }
}

// Handles a click on a tile
handleTileClick(i) {
    this.showActionButtons();
    if (this.state.whatIsExpectedNext === "TileButtonClickForMove") {
        let player = this.state.players[this.state.currentPlayerPlaying];
        if (player.whereCanHeMove.indexOf(i) >= 0){
            // Move
            let returnPack = this.moveAPlayer(player, i, this.state.players);
            let nada = this.unlightTheTiles();
            if (nada){
              this.setState({ whatIsExpectedNext: "",
                              tiles: returnPack.tiles,
                              players: returnPack.players});
              this.controller("ActionIsDone");
            }
        }
        else{
          alert ("He can't move there !");
        }
      }
      else if (this.state.whatIsExpectedNext === "TileButtonClickForFly") {
          let player = this.state.players[this.state.currentPlayerPlaying];
          if (player.whereCanHeFly.indexOf(i) >= 0){
              // Move
                let returnPack = this.moveAPlayer(player, i, this.state.players);
                this.setState({ whatIsExpectedNext: "" ,
                                hasPilotFlownThisTurn: true,
                                tiles: returnPack.tiles,
                                players: returnPack.players}, () => {
                                  this.unlightTheTiles();
                                  this.controller("ActionIsDone");
                });
          }
          else{
            alert ("He can't move there !");
          }
      } else if (this.state.whatIsExpectedNext === "TileButtonClickForMoveSomeone") {

        let puppet = null;
        for (let i = 0; i < this.state.players.length; i++){
          if (this.state.players[i].isPuppet === true){
            this.puppet = this.state.players[i];
            break;
          }
        }

        if (this.puppet === null) {
          alert("CONCEPTUAL ERROR : CAN't FIND PUPPET !");
        }

        if (this.puppet.whereCanHeMove.indexOf(i) >= 0){
            // Move
              let returnPack = this.moveAPlayer(this.puppet, i, this.state.players);
              // virer le puppet flag
              for (let j = 0; j < returnPack.players.length; j++){
                returnPack.players[j].isPuppet = false;
              }
              this.setState({ whatIsExpectedNext: "" ,
                              tiles: returnPack.tiles,
                              players: returnPack.players}, () => {
                                this.unlightTheTiles();
                                this.controller("ActionIsDone");
              });
        }
        else{
          alert ("He can't move there !");
        }
      } else if (this.state.whatIsExpectedNext === "TileButtonClickForDry"){
        let newplayers = this.state.players;
        let newplayer = this.state.players[this.state.currentPlayerPlaying];
        if (newplayer.whereCanHeDry.indexOf(i) >= 0){
            // Move
            this.dryATile(i);
            let nada = this.unlightTheTiles();
            if (nada){
              // let newMessage = new UserMessage(player.name + "dried a tile", false, true, false);
              newplayers[this.state.currentPlayerPlaying].whereCanHeDry = null;
              this.setState({ whatIsExpectedNext: "" , playersnewplayers: newplayers });
              this.controller("ActionIsDone");
            }
        }
        else {
          alert ("He can't dry anything there !");
        }
      } else if (this.state.whatIsExpectedNext === "TileButtonClickForDryTwoTimes") {
        let newplayers = this.state.players;
        let newplayer = this.state.players[this.state.currentPlayerPlaying];
        if (newplayer.whereCanHeDry.indexOf(i) >= 0){
            // Dry
            this.dryATile(i);
            this.unlightATile(i);
            let newMessage = new UserMessage("Now choose a second one to dry", false, []);
            this.hideActionButtons();
            this.setState({ whatIsExpectedNext: "TileButtonClickForDry" , mainUserMessage: newMessage});
        }
        else {
          alert ("He can't dry anything there !");
        }
      } else if (this.state.whatIsExpectedNext === "TileButtonClickForFlyWithACard") {
        let player = this.state.players[this.state.cardUser];
        let n_Players = this.state.players;
        let n_PlayerCardsDiscard = this.state.playerCardsDiscard;
        let whatIsExpectedNext_toRestore = this.state.whatIsExpectedNext_toRestore;

        if (player.whereCanHeFly.indexOf(i) >= 0){
            // index of the card to remove
            for (let i = 0; i < player.cards.length; i++){
              if (player.cards[i].name === "helicopter"){
                n_PlayerCardsDiscard.push(player.cards[i]);
                player.cards.splice(i, 1);
                break;
              }
            }

            player.whereCanHeFly = [];
            n_Players[player.id] = player;


            // If the currently active player is among the travellers and destination tile has a guy on it,
            // recalculate the current active player possible actions to include the 'give' action unless he is the messenger
            let n_possibleActions = this.state.possibleActions;
            if (this.state.currentPlayerPlaying === this.state.cardUser
                && this.state.tiles[i].playerOn.length > 0
                && n_Players[this.state.cardUser].role != "Messenger")
              {
                  let y = n_possibleActions.length - 1;
                  n_possibleActions.splice(y, 0, playerDefaultActions[2]);
              }
              else {
                //
              }


            // Move
            let returnPack = this.moveAGroupOfPlayers(player.id, this.state.coTravellers, i, n_Players, this.state.tiles);
            //

            this.setState({ whatIsExpectedNext: this.state.whatIsExpectedNext_toRestore,
                            messageBoardState: this.state.messageBoardState_toRestore,
                            mainUserMessage: this.state.mainUserMessage_toRestore,
                            // cardUser: -1, because it's used by UseACard when getting rid of it
                            coTravellers: [],
                            players: returnPack.players,
                            tiles: returnPack.tiles,
                            possibleActions: n_possibleActions,
                            playerCardsDiscard: n_PlayerCardsDiscard,
                            messageBoardState_toRestore: null,
                            whatIsExpectedNext_toRestore: null });
            let nada = this.unlightTheTiles();
        } else {
          alert("He can't fly there with his H card");
        }
      }
      else if (this.state.whatIsExpectedNext === "TileButtonClickForDryWithACard") {
        let player = this.state.players[this.state.cardUser];
        let NewPlayers = this.state.players;
        let NewPlayerCardsDiscard = this.state.playerCardsDiscard;
        let whatIsExpectedNext_toRestore = this.state.whatIsExpectedNext_toRestore;

        if (player.whereCanHeDry.indexOf(i) >= 0){
          // index of the card to remove from the player's hand
          for (let i = 0; i < player.cards.length; i++){
            if (player.cards[i].name === "sandBag"){
              NewPlayerCardsDiscard.push(player.cards[i]);
              player.cards.splice(i, 1);
              break;
            }
          }

          player.whereCanHeDry = [];
          NewPlayers[player.id] = player;
          // Dry
          this.dryATile(i);
          this.setState({ whatIsExpectedNext: this.state.whatIsExpectedNext_toRestore,
                          messageBoardState: this.state.messageBoardState_toRestore,
                          mainUserMessage: this.state.mainUserMessage_toRestore,
                          // cardUser: -1,
                          players: NewPlayers,
                          playerCardsDiscard: NewPlayerCardsDiscard,
                          messageBoardState_toRestore: null,
                          whatIsExpectedNext_toRestore: null,
                          mainUserMessage_toRestore: null });
          let nada = this.unlightTheTiles();
        }
        else {
          alert("He can't DRY there with his card");
        }
      }
      else if (this.state.whatIsExpectedNext === "TileButtonClickForEvacuate") {
        // get player : first of To Evacuate
        let n_players = this.state.players;
        let n_guysToEvacuate = this.state.guysToEvacuate;

        let rescued = n_players[n_guysToEvacuate[0]];

        if ((rescued.role === "Pilot" && rescued.whereCanHeFly.indexOf(i) >= 0 ) || rescued.whereCanHeMove.indexOf(i) >= 0 ){

            // Move
            let bozo = n_guysToEvacuate.shift();

            let floodingSequence = this.state.floodingSequence;
            let floodNumber = floodingSequence[0];
            let floodTotal = floodingSequence[1];

            let message = "<div>";
            let n_userMessage = null;

            // Branching
            if (n_guysToEvacuate.length > 0){
                message = message + "!!! There ARE " + n_guysToEvacuate.length + "people left to evacuate !!!</div>";
                n_userMessage = new UserMessage(message , false, [8]);
            }
            else if (floodNumber === floodTotal){
              // floodings are finished
              floodingSequence = null;
              message = message + "<br/> Floodings are over.... for now.</div>";
              n_userMessage = new UserMessage(message , false, [0]);
            }
            else {
              // next flooding
              let databag = {nextFloodingNumber: floodNumber + 1, outOf: floodTotal};
              message = message + "Flooding Goes on </div>";
              n_userMessage = new UserMessage(message , false, [5], databag);
            }

            this.setState({
              whatIsExpectedNext: "",
              guysToEvacuate: n_guysToEvacuate,
              mainUserMessage: n_userMessage
            });

            let n_Tiles = this.state.tiles;

            // remove player from current Tile
            /* ON TENTE LE OSEF !
            index = n_Tiles[rescued.position].playerOn.indexOf(rescued.id);
            yoyoy = n_Tiles[rescued.position].playerOn.splice(index, 1);
            */

            // adding player to new tile
            n_Tiles[i].playerOn.push(rescued.id);
            n_players[rescued.id].position = i;
            n_players[rescued.id].whereCanHeMove = null;
            n_players[rescued.id].whereCanHeFly = null;

            this.setState({
              tiles: n_Tiles,
              players: n_players
            });

            this.unlightTheTiles();
        }
        else{
          alert ("He can't move there !");
        }
      } else {
        alert ("Unexpected Clic On a Tile");
      }
    }

  moveAPlayer(player, destination, players){
    let n_Tiles = this.state.tiles;
    // remove player from current Tile
    let tile = n_Tiles[player.position]
    let index = tile.playerOn.indexOf(player.id);
    // alert(index);
    n_Tiles[player.position].playerOn.splice(index, 1);
    // adding player to new tile
    n_Tiles[destination].playerOn.push(player.id);

    let n_players = this.state.players;
    n_players[player.id].position = destination;
    n_players[player.id].whereCanHeMove = null;
    n_players[player.id].whereCanHeFly = null;

    return { players: n_players, tiles: n_Tiles};
  }

  moveAGroupOfPlayers(leaderId, travellersIds, destination, players, tiles){
    let n_Tiles = this.state.tiles;
    let startingFrom = this.state.players[leaderId].position;
    let n_Players = this.state.players;

    for (let i=0; i < travellersIds.length; i++){
          // remove travellers from the current Tile
          let index = n_Tiles[startingFrom].playerOn.indexOf(travellersIds[i]);
          n_Tiles[startingFrom].playerOn.splice(index, 1);

          // adding travellers to new tile
          n_Tiles[destination].playerOn.push(travellersIds[i]);
          n_Players[travellersIds[i]].position = destination;
    }

    n_Players[leaderId].whereCanHeMove = null;
    n_Players[leaderId].whereCanHeFly = null;

    return { players: n_Players, tiles: n_Tiles};
  }

  dryATile(tile){
        let NewTiles = this.state.tiles;
        if (NewTiles[tile].isDrawned){
          alert("CONCEPTUAL ERROR : can't dry a drawned tile");
        }
        NewTiles[tile].isImmersed = false;
        this.setState({ tiles: NewTiles});
  }

  cancelAnAction(){
    let nada = this.unlightTheTiles();
    let newMessage = new UserMessage("Choose an action " , false, []);
    this.showActionButtons();
    this.setState({
      whatIsExpectedNext: "CharacterActionButtonClick" ,
      messageBoardState: "default",
      mainUserMessage : newMessage});
  }

  doMoveSomeOne(puppet) {
    let whereCanHeMove = this.whereNavigatorCanMoveHim(this.state.players[puppet].position);
    this.state.players[puppet].whereCanHeMove = whereCanHeMove;
    let n_players = this.state.players;
    n_players[puppet].isPuppet = true;
    this.lightTheTiles(whereCanHeMove, this.state.players[puppet].color);
    let newMessage = new UserMessage("Now choose a destination", false, []); // TODO : SET a cancel
    this.setState({ whatIsExpectedNext: "TileButtonClickForMoveSomeone" , mainUserMessage: newMessage, messageBoardState : "default", players : n_players });
  }

  doGiveACard(giver, card, receiver){
    // alert("GIVE A CARD : " + giver + " will give the " + card + " to " + receiver);
    console.log("PRE  Given : " + card + " to " + receiver);
    if (card == null){
      alert("Please select a card to give.");
    } else if (receiver == null){
      alert("Please select a recipient for the card.");
    } else {
      // remove from player
      let n_players = this.state.players;
      let givenCard = null;
      let index = null;
      for (let i = 0; i < n_players[giver].cards.length; i++){
        if (n_players[giver].cards[i].id === card){
          givenCard = n_players[giver].cards[i]; // this this. is strange
          index = i;
          break;
        }
      }

      if (index == null){
        alert("CONCEPTUAL ERROR: Couldn't find the card");
      }
      n_players[giver].cards.splice(index, 1);

      // give to
      n_players[receiver].cards.push(givenCard);
      console.log("POST Given : " + givenCard.id + " to " + receiver);
      // alert("GIVE A CARD : " + giver + " will give the " + card + " to " + receiver);
      this.setState({whatIsExpectedNext: "" ,
                    messageBoardState: "default",
                    players: n_players}, () => {
                            this.doCheckIfMoreThan5CardsInHand(0, receiver);
                    });
    }
  }

  getPlayersOnTheSameTileExceptMe(id){
    let playersOnTheSameTileExceptMe = [];
    if (id === null || id === undefined){
      id = this.state.currentPlayerPlaying;
    }
    // let id = this.state.currentPlayerPlaying;
    let currentpostion = this.state.players[id].position;

    for (let i = 0 ; i < this.state.players.length; i++){
      if (this.state.players[i].position === currentpostion && this.state.players[i].id !== id){
        playersOnTheSameTileExceptMe.push(this.state.players[i].id);
      }
    }
    return playersOnTheSameTileExceptMe;
  }

  getPlayersIdsExceptMe(id){
    let playersIdsExceptMe = [];
    if (id === null || id === undefined){
      id = this.state.currentPlayerPlaying;
    }

    for (let i = 0 ; i < this.state.players.length; i++){
      if ( this.state.players[i].id !== id){
        playersIdsExceptMe.push(this.state.players[i].id);
      }
    }
    return playersIdsExceptMe;
  }

  getPlayersOnATile(position){
    let playersOnTheTile = [];

    for (let i = 0 ; i < this.state.players.length; i++){
      if (this.state.players[i].position === position ){
        playersOnTheTile.push(this.state.players[i].id);
      }
    }
    return playersOnTheTile;
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
      <DrawEmptySquare /* for testing purposes onClick={() => this.doMoveCursor()} *//>
    );
  }

  renderTreasureSquare(treasureId) {
    // if le tresor a été trouvé draw it else Draw empty square
    let trophyPath = "";
    if (this.state.posessedTreasures.indexOf(treasureId) >= 0){

      for (let i = 0 ; i < treasures.length; i++){
        if (treasures[i].id === treasureId)
        {
          trophyPath = treasures[i].trophyImg;
          break;
        }
      }
    }

    return (
      <span>
      {
        trophyPath.length > 0 ?
          <DrawEmptySquareWithTreasure imagePath={trophyPath}/>
            :
          <DrawEmptySquare />
      }
      </span>)
  }


  renderPlayerBoard(i) { // passing a player index
    let isPlaying = this.state.currentPlayerPlaying === i;
    let boardClass = isPlaying?  ('playerBoard playerBoardPlaying') : ('playerBoard ');

    return (
      <div className={boardClass}>
        <span className="inBoardName">{this.state.players[i].playersName}</span>&nbsp;the&nbsp;
        <span className="inBoardRole" style={{color: this.state.players[i].color}}>{this.state.players[i].role}</span>
        <a className="tooltips helpCharacterIcon" id={'tooltip' + i} href="#">?<span class="inToolTipsText">{this.state.players[i].playersAbility}</span></a>
        <br/>
        <div className="inBoardCards">
          {
            this.state.players[i].cards.map((card, index) => {
              if (card){
                return card.name === "helicopter" ?
                    <span key={index} className="boardPlayerCards">
                      <img src={card.url} width="45px" height="70px" onClick={() => this.handleCardClick("helicopterCard", this.state.players[i].id, false)} />
                      <img className="overHand doRotate" src="img/hand.png" /*width="20px" height="24px" *//>
                    </span>
                  : card.name === "sandBag" ?
                      <span key={index} className="boardPlayerCards">
                        <img src={card.url} width="45px" height="70px" onClick={() => this.handleCardClick("sandBagCard", this.state.players[i].id, false)}/>
                        <img className="overHand doRotate" src="img/hand.png" /*width="20px" height="24px" *//>
                      </span>
                      :
                      <span key={index} className="boardPlayerCards">
                        <img src={card.url} width="45px" height="70px" />
                      </span>
              }
            })
          }
        </div>
      </div>
    )
  }

  renderPlayerMessagePanel() {
    let foundTreasures = this.state.posessedTreasures.length;
    let foundTreasuresNames = "";
    /*
    if (foundTreasures > 0){
      for (let i = 0; i < foundTreasures; i++){
        foundTreasuresNames = foundTreasuresNames + " " + this.getTreasureNameById(this.state.posessedTreasures[i]);
      }
      foundTreasuresNames = "(" + foundTreasuresNames + ")";
    }
    */

    return (
      <span>
        <div className="messagePanel">
          <div className="panelTitle"> FORBIDDEN<br/>::ReactJS::<br/>ISLAND <span className="littlePanelInfo">v.0.5.1</span></div>
          <div className="littlePanelInfo"> Turn : {this.state.turn} </div>
          <div className="littlePanelInfo">TreasureFound : {foundTreasures}/4 {foundTreasuresNames}</div>
          <div className="littlePanelInfo"> FloodLevel {this.state.floodMeter.level} ({this.state.floodMeter.floodFactor} cards per flood)</div>
          <div className="panelInfo"> {this.state.players[this.state.currentPlayerPlaying].playersName} the <span style={{color: this.state.players[this.state.currentPlayerPlaying].color}}>{this.state.players[this.state.currentPlayerPlaying].role}</span> is Playing.
          <br/><span className="littlePanelInfo"> {playerSteps[this.state.currentStep].name} </span></div>
          <div className="panelInfo" id="UserActions">
            <ul>
              {this.state.possibleActions.map((action) =>
                <li key={action.name}><button className="actionButton" onClick={() => this.handleActionClick(action.triggers)} >{action.name}</button></li>
              )}
            </ul>
          </div>
          <div className="panelInfo" id="UserDialog">
              {this.renderMessageBoard()}
          </div>
        </div>
      </span>
    )
  }

  renderMessageBoard() {
    if (this.state.messageBoardState === "giveACardSequence"){
      let giverId = this.state.players[this.state.currentPlayerPlaying].id;
      let playersOnTheSameTileExceptMe = this.getPlayersOnTheSameTileExceptMe();
      console.log('playersOnTheSameTileExceptMe = ' + playersOnTheSameTileExceptMe);// seems Ok
      let chosenCard = this.state.players[giverId].cards.length === 1 ? this.state.players[giverId].cards[0].id : null;
      let receiver = playersOnTheSameTileExceptMe.length === 1 ? playersOnTheSameTileExceptMe[0] : null;

      return (
          <div>
            Which card do you want to give
                { playersOnTheSameTileExceptMe.length === 1 ?
                  (<span> to <span style={{color: this.state.players[playersOnTheSameTileExceptMe[0]].color}}>{ this.state.players[playersOnTheSameTileExceptMe[0]].playersName} </span></span> )
                  : <span></span>
                }
            ? <br/>
            <table className="throwTable">
              <tbody>
            {
              this.state.players[giverId].cards.length === 1 ?
              <tr>
                <td><span key="card0" /><input type="radio" name="chosenCard" key="0" checked="checked" value={this.state.players[giverId].cards[0].id} onChange={() => chosenCard = this.state.players[giverId].cards[0].id} /></td>
                <td>{ this.state.players[giverId].cards[0].name} </td>
                <td><img src= {this.state.players[giverId].cards[0].url}  width="20px" height="32px"/></td>
              </tr>
              :
              this.state.players[giverId].cards.map((card, index) =>
              <tr>
                <td><span key={'card'+index}/><input type="radio" name="chosenCard" key={index} value={card.id} onChange={() => chosenCard = card.id} /></td>
                <td><img src= {card.url}  width="20px" height="32px"/></td>
                <td>{card.name}</td>
              </tr>
              )
            }
              </tbody>
            </table>
            {
              playersOnTheSameTileExceptMe.length > 1 ?
              <span>To whom do you want to give it ?<br/></span>
              :
              <span></span>
            }
            {
              playersOnTheSameTileExceptMe.length > 1 ?
                playersOnTheSameTileExceptMe.map((player, index) => {
                    return <span key={'char'+index}><input type="radio" name="receiver" key={index} value={this.state.players[player].id} onChange={() => receiver = this.state.players[player].id}/><span style={{color: this.state.players[player].color}}>{this.state.players[player].playersName}</span><br/></span>
                  })
                :
                <span></span>
            }
            <button className="actionButton" value="Give" onClick={() => this.doGiveACard(giverId, chosenCard, receiver)}> Give </button><br/>
            <button className="actionButton" value="Cancel" onClick={() => this.cancelAnAction()}>Cancel</button>
          </div>
      )
    } else if (this.state.messageBoardState === "sendACardSequence") {
      let giverId = this.state.players[this.state.currentPlayerPlaying].id;
      let otherPlayers = this.getPlayersIdsExceptMe(giverId);
      let chosenCard = this.state.players[giverId].cards.length === 1 ? this.state.players[giverId].cards[0].id : null;
      let receiver = otherPlayers.length === 1 ? otherPlayers[0] : null;

      return (
          <div>
            Which card do you want to send
                    { otherPlayers.length === 1 ?
                      (<span> to <span style={{color: this.state.players[otherPlayers[0]].color}}> {this.state.players[otherPlayers[0]].playersName} </span></span> )
                      : <span></span>
                    }
            ? <br/>
            <table className="throwTable">
              <tbody>
            {
              this.state.players[giverId].cards.length === 1 ?
              <tr>
                <td><span key="0"/><input type="radio" name="chosenCard" key="0" checked="checked" value={this.state.players[giverId].cards[0].id} onChange={() => chosenCard = this.state.players[giverId].cards[0].id} /></td>
                <td><img src= {this.state.players[giverId].cards[0].url}  width="20px" height="32px"/></td>
                <td>{ this.state.players[giverId].cards[0].name} </td>
              </tr>
              :
              this.state.players[giverId].cards.map((card, index) =>
              <tr>
                <td><span key={'card'+index}/><input type="radio" name="chosenCard" key={index} value={card.id} onChange={() => chosenCard = card.id} /></td>
                <td><img src= {card.url}  width="20px" height="32px"/></td>
                <td>{card.name}</td>
              </tr>
              )
            }
              </tbody>
            </table>
            {
              otherPlayers.length > 1  ?
              <span>To whom do you want to send it ?<br/></span>
              :
              <span></span>
            }
            {
              otherPlayers.length > 1 ?
                 this.state.players.map((player, index) => {
                  return (player.id != giverId) ?
                    (<span key={'char'+index}><input type="radio" name="receiver" key={index} value={player.id} onChange={() => receiver = player.id}/><span style={{color: player.color}}>{player.playersName}</span><br/></span>)
                    :
                    (<span key={'char'+index}></span>)
                  })
                :
                <span></span>
            }
            <button className="actionButton" value="Give" onClick={() => this.doGiveACard(giverId, chosenCard, receiver)}> Send </button><br/>
            <button className="actionButton" value="Cancel" onClick={() => this.cancelAnAction()}>Cancel</button>
          </div>
      )
    } else if (this.state.messageBoardState === "ChooseCoTravellers") {
        let flyerId = this.state.cardUser;
        let playersOnTheSameTileExceptMe = this.getPlayersOnTheSameTileExceptMe(flyerId);
        let travellers = [flyerId];

        function Amadeus(id, element){
          if (document.getElementById(element).checked)
          {
              travellers.push(id);
          } else {
              travellers.splice(travellers.indexOf(id), 1);
          }
        }

        return (
          <div>
            {
                  playersOnTheSameTileExceptMe.length === 0 ? // Ok
                     (<div> <span style={{color: this.state.players[flyerId].color}}>{this.state.players[flyerId].playersName}</span>, choose a landing destination.</div>)
                    : playersOnTheSameTileExceptMe.length === 1 ? // Ok
                       (<div> <span style={{color: this.state.players[flyerId].color}}>{this.state.players[flyerId].playersName}</span>, do you want to take <span style={{color: this.state.players[playersOnTheSameTileExceptMe[0]].color}}>{this.state.players[playersOnTheSameTileExceptMe[0]].playersName}</span> with you ? <br/>
                         <input type="radio" name="coTraveller" key="yes" value="yes" onChange={() => travellers = [flyerId, playersOnTheSameTileExceptMe[0]]}/>Yes<br/>
                         <input type="radio" name="coTraveller" key="no" value="no" onChange={() => travellers = [flyerId]}/>No<br/>
                       </div>)
                      :
                        (<div><span style={{color: this.state.players[flyerId].color}}>{this.state.players[flyerId].playersName}</span>, select the guys you want to take with you ? <br/>
                        {
                          playersOnTheSameTileExceptMe.map((playerId, index) => {
                             return <span key={index}><input type="checkBox" name="traveller" id={"checkBoxAmadeusFor"+playerId} key={index} value={playerId} onChange={() => Amadeus(playerId, "checkBoxAmadeusFor"+playerId)} /><span style={{color: this.state.players[playerId].color}}>{this.state.players[playerId].playersName}</span><br/></span>
                          })
                        }
                        </div>)
            }
            <button className="actionButton" onClick={() => this.helicopterCardEnRoute(flyerId, travellers)}>Hop in ! [rotor noise]</button>
          </div>
        )
    } else if (this.state.messageBoardState === "moveSomeOneSequence") {
      let puppet = null;
          return (
            <div>
              Who do you want to move ? <br/>
              {
              (this.state.players.map((player, index) => {
                return (player.role != "Navigator") ?
                  (<span key={index}><input type="radio" name="puppet" key={index} value={player.id} onChange={() => puppet = player.id}/><span style={{color: player.color}}>{player.playersName}</span><br/></span>)
                  :
                  (<span key={index}></span>)
                }))
              }
              <button className="actionButton" value="Give" onClick={() => this.doMoveSomeOne(puppet)}>{"Move this character"} </button>
            </div>
          )
    } else if (this.state.messageBoardState === "SolveOver5Cards") {
      let userId = this.state.cardUser;
      let color = this.state.players[userId].color;
      let name = this.state.players[userId].playersName;
      let cardsInHand = this.state.players[userId].cards;
      // console.log("user is : " + user + ". His cards : " + cardsInHand);

      return(
        <div>
          <span  style={{color: color}}>{name}</span> has more than 5 cards in Hand.<br/>
          Let's get rid Ov it : <br/>
          <table className="throwTable">
            <tbody>
          {
            (this.state.players[userId].cards.map((card, index) => {
              return (card.type === "H" || card.type === "SB") ?
                  (<tr>
                    <td><span key={index}/>{card.name}</td>
                    <td> <img src= {card.url}  width="20px" height="32px"/></td>
                    <td><button onClick={() => this.throwCard(card.type, index, userId)}>throw away</button></td>
                    <td><button onClick={() => this.useACardToGetRidOfIt(card.type, index, userId)}>use it now</button></td>
                  </tr>)
                  :
                  (<tr>
                    <td><span key={index}/>{card.name}</td>
                    <td> <img src= {card.url}  width="20px" height="32px"/></td>
                    <td><button onClick={() => this.throwCard(card.type, index, userId)}>throw away</button></td>
                    <td>&nbsp;</td>
                  </tr>)
            }))
          }
            </tbody>
          </table>
        </div>
      )
    } else if (this.state.messageBoardState === "empty"){
          <div>empty</div>
    } else {
      // classic message  with one button
      let buttons = this.state.mainUserMessage.buttons;
      let databag = this.state.mainUserMessage.databag;
      let gameIsOver = this.state.gameIsOver;

      let showNextBtnStyle = (buttons.indexOf(0) >= 0)?({display: 'block'}):({display: 'none'});
      let showCancelBtnStyle = (buttons.indexOf(1) >= 0)?({display: 'block'}):({display: 'none'});
      let showPick2CardsBtnStyle01 = (buttons.indexOf(2) >= 0)?({display: 'block'}):({display: 'none'});
      let showPick2CardsBtnStyle02 = (buttons.indexOf(3) >= 0)?({display: 'block'}):({display: 'none'});
      let showFloodBtnStyle = (buttons.indexOf(4) >= 0)?({display: 'block'}):({display: 'none'});
      let showNextFloodingBtnStyle = (buttons.indexOf(5) >= 0)?({display: 'block'}):({display: 'none'});
      let showCancelSandBagCardStyle = (buttons.indexOf(6) >= 0)?({display: 'block'}):({display: 'none'});
      let showCancelHelicopterCardStyle = (buttons.indexOf(7) >= 0)?({display: 'block'}):({display: 'none'});
      let showEvacuateStyle = (buttons.indexOf(8) >= 0)?({display: 'block'}):({display: 'none'});
      let showCheckIfMoreThan5Style = (buttons.indexOf(9) >= 0)?({display: 'block'}):({display: 'none'});
      let showCheckIfMoreThan5SecondTimeStyle = (buttons.indexOf(10) >= 0)?({display: 'block'}):({display: 'none'});

      return(
          <div><span dangerouslySetInnerHTML={{__html: this.state.mainUserMessage.message}} />
          {
            !gameIsOver ?
              (<div>
                <button style={showNextBtnStyle} onClick ={() => this.controller("ActionIsDone")}>Next</button>
                <button style={showCancelBtnStyle} onClick ={() => this.cancelAnAction()}>Cancel</button>
                <button style={showPick2CardsBtnStyle01} onClick ={() => this.controller("PickTwoCardsONE")}>Pick two cards 1st</button>
                <button style={showPick2CardsBtnStyle02} onClick ={() => this.controller("PickTwoCardsTWO")}>Pick two cards 2nd</button>
                <button style={showFloodBtnStyle} onClick ={() => this.controller("PlayerFlood")}>Flood !</button>
                <button style={showNextFloodingBtnStyle} onClick ={() => this.doFloodATile(databag.nextFloodingNumber, databag.outOf)}>Next Flooding.. Hold your breath</button>
                <button style={showCancelSandBagCardStyle} onClick ={() => this.cancelSandBagCardPick()}>Cancel</button>
                <button style={showCancelHelicopterCardStyle} onClick ={() => this.cancelHelicopterCardPick()}>Cancel the flight</button>
                <button style={showEvacuateStyle} onClick ={() => this.doEvacuate()}>Evacuate Explorer</button>
                <button style={showCheckIfMoreThan5Style} onClick ={() => this.doCheckIfMoreThan5CardsInHand(0, databag.userId)}>Next</button>
                <button style={showCheckIfMoreThan5SecondTimeStyle} onClick ={() => this.doCheckIfMoreThan5CardsInHand(1, this.state.cardUser)}>Next</button>
              </div>)
              :
              (<div><button onClick ={() => this.retry()}>Retry ?</button></div>)
        }
      </div>
      )
    }
  }

  lightTheTiles(t, color){
    for (let i = 0; i < t.length; i++){
      document.getElementById("square" + t[i]).style.border = "3px solid " + color;
    }
    return true;
  }

  unlightTheTiles() {
    for (let i = 0; i < 24; i++){
      if (this.state.tiles[i].isDrawned === false){
        document.getElementById("square" + i).style.border = "1px solid #222";
      } else {
        document.getElementById("square" + i).style.border = "1px solid #FFF0";
      }
    }
    return true;
  }

  unblinkTheTiles() {
        for (let i = 0; i < 24; i++){
          if ( document.getElementById("square" + i).classList.contains('blink') ){
            document.getElementById("square" + i).className =
               document.getElementById("square" + i).className.replace
                  ( /(?:^|\s)blink(?!\S)/g , '' )
          }
        }
  }

  graphicallyDrawnATile(i){
    document.getElementById("square" + i).style.border = "1px solid #FFF0";
  }

  retry(){
    this.location.reload();
  }

  getTreasureNameById(id){
    console.log("In getTreasureById with : " + id);
    for (let i = 0; i < treasures.length; i ++){
      if (treasures[i].id === id){
        return treasures[i].name;
      }
    }
    return "** Unknown Treasure was " + id + "**";
  }

  unlightATile(i) {
      document.getElementById("square" + i).style.border = "1px solid #222";
  }

  hideActionButtons() {
      document.getElementById("UserActions").style.display = "none";
  }

  showActionButtons() {
      document.getElementById("UserActions").style.display = "block";
  }

  render() {
      let position_value = "relative";
      let left_value = 5;
      let top_value = -70;

    return (

      <div>
        <div className="messageBoard-column">
          {this.renderPlayerMessagePanel()}
        </div>
        <div className="board-column">
          <div className="islandBoard">
            <div className="board-row">
              {this.renderTreasureSquare("ST")}
              {this.renderEmptySquare()}
              {this.renderSquare(0)}
              {this.renderSquare(1)}
              {this.renderEmptySquare()}
              {this.renderTreasureSquare("SC")}
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
              {this.renderTreasureSquare("CU")}
              {this.renderEmptySquare()}
              {this.renderSquare(22)}
              {this.renderSquare(23)}
              {this.renderEmptySquare()}
              {this.renderTreasureSquare("CR")}
            </div>
          </div>
          <div className="floodOmeter">
              <img src="img/FloodOmeter.png"/>
              <span className="floodOmeterCursor" id="floodOmeterCursor" style={{position: position_value, left: left_value+'px', top: top_value+'px'}}><img src="img/FloodOmeterCursor.png"/></span>
          </div>
          <table className="cardsPilesTable">
            <tbody>
            <tr><th colSpan="2" width="150px">Player Cards</th><th colSpan="2" width="150px">Flood Cards</th></tr>
            <tr style={{height: '18px'}}>
              <td width="60px">leap</td><td width="90px"><table className="invisiTable"><tbody><tr className="invisiTable"><td className="jaugePlayer invisiTable" style={{width: this.state.playerCardsLeap.length}}></td><td className="superSmall invisiTable">{this.state.playerCardsLeap.length}</td></tr></tbody></table></td>
              <td width="60px">leap</td><td width="90px"><table className="invisiTable"><tbody><tr className="invisiTable"><td className="jaugeFlood invisiTable" style={{width: this.state.floodCardsLeap.length}}></td><td className="superSmall invisiTable">{this.state.floodCardsLeap.length}</td></tr></tbody></table></td>
            </tr>
            <tr>
              <td width="60px">discard</td><td width="90px"><table className="invisiTable"><tbody><tr className="invisiTable"><td className="jaugePlayer invisiTable" style={{width: this.state.playerCardsDiscard.length}}></td><td className="superSmall invisiTable">{this.state.playerCardsDiscard.length}</td></tr></tbody></table></td>
              <td width="60px">discard</td><td width="90px"><table className="invisiTable"><tbody><tr className="invisiTable"><td className="jaugeFlood invisiTable" style={{width: this.state.floodCardsDiscard.length}}></td><td className="superSmall invisiTable">{this.state.floodCardsDiscard.length}</td></tr></tbody></table></td>
            </tr>
          </tbody>
          </table>
        </div>
        <div className="playerBoard-column">
          <div>

              {this.renderPlayerBoard(0)}
              {this.renderPlayerBoard(1)}
              {this.state.nbrOfPlayers > 2 ?
                this.renderPlayerBoard(2)
                :
                <span></span>
              }
              {this.state.nbrOfPlayers > 3 ?
                this.renderPlayerBoard(3)
                :
                <span></span>
              }
          </div>
        </div>
      </div>
    );
  }
}


/* VOIR DANS LA PLAYER LEAP / DISCARD
<div className="playerBoard-column">
  <table border="1">
      <tr><th>Leap</th><th>Discard</th></tr>
      <tr><td>{
        this.state.playerCardsLeap.map((card,index) =>
          <span id={index} class="superSmall">{card.name}<br/></span>
        )
      }</td>
      <td>{
        this.state.playerCardsDiscard.map((card,index) =>
          <span id={index} class="superSmall">{card.name}<br/></span>
        )
      }</td></tr>
  </table>
</div>
*/

/*
VOIR DANS LE Flood Leap
<div className="playerBoard-column">
  <table border="1">
      <tr><th>Leap</th><th>Discard</th></tr>
      <tr><td>{
        this.state.floodCardsLeap.map((card,index) =>
          <span id={index} class="superSmall">{card.name}<br/></span>
        )
      }</td>
      <td>
        {
        this.state.floodCardsDiscard.map((card,index) =>
          <span id={index} class="superSmall">{card.name}<br/></span>
        )
      }
    </td>
    <td>{
      this.state.floodCardsOutOfGame.map((card, index) =>
        <span id={index} class="superSmall">{card.name}<br/></span>)
      }
    </td></tr>
  </table>
</div>
*/
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
  constructor(name, position, isImmersed, isDrawned, blink, startBase, templeFor, playerOn, backgroundColor, TextToDisplay, LittleTextToDisplay) {
    this.name = name; // string
    this.position = position; // int
    this.isImmersed = isImmersed; // bool
    this.isDrawned = isDrawned; // bool
    this.blink = blink; // bool
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
  constructor(id, type, role, color, playersName, ability, position, cards, isInGame, leftTheIsland) {
    this.id = id; // int
    this.type = type; // int
    this.role = role // string
    this.color = color; // string in hexa
    this.playersName = playersName; // string
    this.playersAbility = ability; // string
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
}

class FloodMeter {
  constructor(startLevel) {
    this.level = startLevel;
    this.topLevel = 10;
    this.floodFactor = this.howManyCards(startLevel);
  }

  howManyCards(level){
    if (level < 4){
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

function riseTheIsland(){
    var tile01 = new Tile("helipad", 0, false, false, false, 5, "", [], "#A9D0F5", "", "HELIPORT");
    var tile02 = new Tile("doorBlack", 0, false, false, false, 3, "", [], "#6E6E6E", "", "");
    var tile03 = new Tile("doorRed", 0, false, false, false, 0, "", [], "#F78181", "", "");
    var tile04 = new Tile("doorGreen", 0, false, false, false, 4, "", [], "#9FF781", "", "");
    var tile05 = new Tile("doorWhite", 0, false, false, false, 2, "", [], "#F2F2F2", "", "");
    var tile06 = new Tile("doorYellow", 0, false, false, false, 1, "", [], "#F2F5A9", "", "");
    var tile07 = new Tile("temple0001", 0, false, false, false, "", "CR", [], "#bdc3c7", "", "TEMPLE CRYSTAL");
    var tile08 = new Tile("temple0002", 0, false, false, false, "", "CR", [], "#bdc3c7", "", "TEMPLE CRYSTAL");
    var tile09 = new Tile("temple0101", 0, false, false, false, "", "CU", [], "#bdc3c7", "", "TEMPLE CUP");
    var tile10 = new Tile("temple0102", 0, false, false, false, "", "CU", [], "#bdc3c7", "", "TEMPLE CUP");
    var tile11 = new Tile("temple0201", 0, false, false, false, "", "SC", [], "#bdc3c7", "", "TEMPLE SCEPTRE");
    var tile12 = new Tile("temple0202", 0, false, false, false, "", "SC", [], "#bdc3c7", "", "TEMPLE SCEPTRE");
    var tile13 = new Tile("temple0301", 0, false, false, false, "", "ST", [], "#bdc3c7", "", "TEMPLE STATUE");
    var tile14 = new Tile("temple0302", 0, false, false, false, "", "ST", [], "#bdc3c7", "", "TEMPLE STATUE");
    var tile15 = new Tile("coast01", 0, false, false, false, "", "", [], "#825a2c", "", "");
    var tile16 = new Tile("coast02", 0, false, false, false, "", "", [], "#825a2c", "", "");
    var tile17 = new Tile("coast03", 0, false, false, false, "", "", [], "#825a2c", "", "");
    var tile18 = new Tile("desert01", 0, false, false, false, "", "", [], "#ffd480", "", "");
    var tile19 = new Tile("desert02", 0, false, false, false, "", "", [], "#ffd480", "", "");
    var tile20 = new Tile("desert03", 0, false, false, false, "", "", [], "#ffd480", "", "");
    var tile21 = new Tile("swamp01", 0, false, false, false, "", "", [], "#bcf0d2", "", "");
    var tile22 = new Tile("swamp02", 0, false, false, false, "", "", [], "#bcf0d2", "", "");
    var tile23 = new Tile("swamp03", 0, false, false, false, "", "", [], "#bcf0d2", "", "");
    var tile24 = new Tile("swamp04", 0, false, false, false, "", "", [], "#bcf0d2", "", "");
    // create a 24 array
    let tiles = [tile01,tile02,tile03,tile04,tile05,tile06,tile07,tile08,tile09,tile10,
      tile11,tile12,tile13,tile14,tile15,tile16,tile17,tile18,tile19,tile20,
      tile21,tile22,tile23,tile24];
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
    let cards = [];
    for (let i = 0; i < 5; i++){
        let card = { id : i, name : "crystal", type : "CR", url : "img/crystalCard.png"};
        cards.push(card);
    }
    for (let i = 0; i < 5; i++){
        let card = { id : i + 5, name : "cup", type : "CU", url : "img/cupCard.png"};
        cards.push(card);
    }
    for (let i = 0; i < 5; i++){
        let card = { id : i + 10, name : "sceptre", type : "SC", url : "img/sceptreCard.png"};
        cards.push(card);
    }
    for (let i = 0; i < 5; i++){
        let card = {id : i + 15, name : "statue", type : "ST", url : "img/statueCard.png"};
        cards.push(card);
    }
    for (let i = 0; i < 3; i++){
        let card = { id : i + 20, name : "helicopter", type : "H", url : "img/helicopterCard.png"};
        cards.push(card);
    }
    for (let i = 0; i < 2; i++){ // 2 cards
        let card = { id : i + 23, name : "sandBag", type : "SB", url : "img/sandBagCard.png"};
        cards.push(card);
    }
    for (let i = 0; i < 3; i++){ // 3 cards
        let card = { id : i + 25, name : "floodRise", type : 5, url : "img/floodRise.png"};
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

function generatePlayers(howMany){
    if (howMany > 4 || howMany < 2){
      alert ("CONCEPTUAL ERROR : Too many player requested");
    }
    // Diver hack off
    let roles = [0,1,2,3,4,5];
    roles = shuffleArray(roles);
    // let roles = [3,5,2,1,4,0];
    let players = [];
    for (let i = 0; i < howMany; i++){
      let type = roles[i];
      let player = new Player(
          i, type, playerTypes[type].role, playerTypes[type].color, playerTypes[type].name, playerTypes[type].ability, 0, [], true, false
      )
      players.push(player);
    }
    return players;
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
