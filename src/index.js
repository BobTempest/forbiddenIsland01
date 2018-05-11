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

 const treasures = [
     { id : 0 , name : "crystal" },
     { id : 1 , name : "cup" },
     { id : 2 , name : "sceptre"},
     { id : 3 , name : "statue"}
 ];

 const buttons = ["Next", "Cancel", "PickTwoCards 1st", "PickTwoCards 2nd", "Flood"];

 const playerSteps = [
     {id : 0, name : "action 1/3" },
     {id : 1, name : "action 2/3" },
     {id : 2, name : "action 3/3" },
     {id : 3, name : "draw player cards 1st" },
     {id : 4, name : "draw flood cards" }
 ];

 // And If
/*
 0 action 1/3
 100 action 2/3
 200 action 3/3
 300 pick one player card
    310 flood?
      311 case drawned?
      312 rescue players?
    320 rescue players?
    330 too much card in hand ?
 350 pick one player cards
   360 flood?
     361 case drawned?
     362 rescue players?
   380 too much card in hand ?
 400 draw flood cards
  */

 const playerDefaultActions = [
      {id : 0, name : "Move", text: "Move to an adjacent tile.", enabled : true, triggers : "Move" }, //has an adjacent tile around ?
      {id : 1, name : "Dry", text: "Dry an adjacent tile", enabled : true, triggers : "Dry"  }, //has an adjacent immersed tile around ?
      {id : 2, name : "Give", text: "Give a card on a character on the same tile", enabled : true, triggers : "Give" }, //has a player on his tile ?
      {id : 3, name : "Get a Treasure !", text: "Get the treasure in this temple.", enabled : true, triggers : "GetATreasure"  }, // has 4 cards and is on the right temple
      {id : 4, name : "Nothing", text: "Simply do nothing.", enabled : true, triggers : "DoNothing"  }, // -
      {id : 5, name : "Skip Turn", text: "Skip the player'sTurn.", enabled : true, triggers : "SkipTurn"  } // -
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
  let squareStyle; // sets the backGround
  let squareClass; // sets the Class

  // sets the backGround
  if (props.tile.isImmersed){
      squareStyle = ({background: '#01A9DB' });
  }else if (props.tile.isDrawned) {
      squareStyle = ({background: '#FFF' });
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
    var playerCardsDiscard = [];
    var floodCardsLeap = generateFloodCardsLeap();
    var floodCardsDiscard = [];
    var floodMeter = new FloodMeter(1);
    let mainUserMessage = new UserMessage("Welcome new Player. Choose a first action for the first character.", false, []);

    // generer les joueurs
    var players = generatePlayers();
    // distribuer les cartes aux joueurs
    players.forEach(giveTwoInitialCards);
    // assigner les positions de depart
    players.forEach(getInitialPlayerPosition);

    var possibleActions = this.getPossibleActions(players[0].role, false);

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
      posessedTreasures : [],
      turn : 1,
      hasPilotFlownThisTurn : false,
      currentPlayerPlaying : 0,
      possibleActions : possibleActions,
      currentStep : 0,
      whatIsExpectedNext : "CharacterActionButtonClick",
      expectedNextButSetAside : null,
      mainUserMessage : mainUserMessage,
      messageBoardState : "default",
      cardUser : null,
      cardFlyWith : []
    };

    this.doFloodSomeTiles(6);

    // Let's start
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
      /* helicopter card hack is off
        let card2 = { id : 19, name : "helicopter", type : 4, url : "img/helicopterCard.png"/*, klik : () => alert('Helico') };// works !
        player.cards.push(card);
        player.cards.push(card2);
        end of helicopter Hack */

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
      this.showActionButtons();
      if (input === "ActionIsDone"){
        let nextStep = this.state.currentStep + 1;
        if (nextStep === 3){
          // draw player cards 01
          let newMessage = new UserMessage("Let's' draw some Player Cards", false, [2]);
          this.setState({ currentStep : nextStep, possibleActions : [], mainUserMessage : newMessage});
        } else if (nextStep === 4){
          // flood some tiles.
          this.setState({ currentStep : nextStep });
          let howMuch = this.state.floodMeter.floodFactor;
          let newMessage = new UserMessage("Let's flood " + howMuch + " tiles", false, [4]);
          this.setState({ currentStep : nextStep, possibleActions : [], mainUserMessage : newMessage});
        }
        else if (nextStep === 5){
          // next Turn, new Player 0
          if (this.state.currentPlayerPlaying === this.state.players[this.state.players.length -1].id){
            let newMessage = new UserMessage("Next Turn ! Please " + this.state.players[0].playersName + ", Choose an action " , false, []);
            let nextTurn = this.state.turn + 1;
            let nextPlayer = this.state.players[0].id;
            let psblactn = this.getPossibleActions(this.state.players[0].role, false);
            this.setState({ currentStep : 0,
              turn : nextTurn,
              currentPlayerPlaying : nextPlayer,
              possibleActions : psblactn,
              hasPilotFlownThisTurn : false,
              whatIsExpectedNext : "CharacterActionButtonClick" ,
              mainUserMessage : newMessage });
          } else {
            // next Player
            let newMessage = new UserMessage("Next player ! Please Choose an action " , false, []);
            let nextPlayer = this.state.players[this.state.currentPlayerPlaying + 1].id;
            let psblactn = this.getPossibleActions(this.state.players[nextPlayer].role, false);
            this.setState({ currentStep : 0,
              currentPlayerPlaying : nextPlayer,
              possibleActions : psblactn,
              whatIsExpectedNext : "CharacterActionButtonClick",
              mainUserMessage : newMessage });
          }
        }
        else{
          // next action for the same player
          let newMessage = new UserMessage("Choose an action " , false, []);
          let psblactn = this.getPossibleActions(this.state.players[this.state.currentPlayerPlaying].role, this.state.hasPilotFlownThisTurn);
          this.setState({ currentStep : nextStep,
            possibleActions : psblactn,
            whatIsExpectedNext : "CharacterActionButtonClick" ,
            mainUserMessage : newMessage});
        }
      }
      // user has to pick two cards from the leap
      else if (input === "PickTwoCardsONE"){
          // let cards = this.doPickTwoPlayerCards();
          let tempState = this.state;
          tempState = this.doPickOnePlayerCard(1, tempState);
          this.setState(tempState);
          // alert ("Rhaaaa");
      } else if (input === "PickTwoCardsTWO"){
          // let cards = this.doPickTwoPlayerCards();
          let tempState = this.state;
          tempState = this.doPickOnePlayerCard(2, tempState);
          this.setState(tempState);
          // alert ("Rhaaaa");
      }
      else if (input === "PlayerFlood"){
        this.doFloodSomeTiles(this.state.floodMeter.howManyCards(this.state.floodMeter.level));
        let newMessage = new UserMessage("Brrrrr Sprouitch " , false, [0]);
        this.setState({ mainUserMessage : newMessage});
      }
  }

  doFloodSomeTiles(howMany){
    let newFloodCardsLeap = this.state.floodCardsLeap;
    let newTiles = this.state.tiles;
    let newFloodCardsDiscard = this.state.floodCardsDiscard;

    for ( let i = 0; i < howMany; i++){
        let tileHasDrawned = false;
        if (newFloodCardsLeap.length < 1){
          newFloodCardsLeap = shuffleArray(newFloodCardsDiscard);
          newFloodCardsDiscard = [];
        }

        let card = newFloodCardsLeap.pop();

        for (let j = 0; j < newTiles.length; j++){
          if (newTiles[j].name === card.name){
            console.log('****** TILE To flood IS ' + newTiles[j].name);
            if (newTiles[j].isImmersed){
              // Let's DRAWN this tile
              alert (newTiles[j].name + " at " + j + " is drawning !");
                newTiles[j].isImmersed = false;
                newTiles[j].isDrawned = true;
                tileHasDrawned = true;
                // rescue some players ?
                if (newTiles[j].playerOn.length > 0){
                    alert ("There is " + newTiles[j].playerOn.length + " explorer(s) on the drawning tile. Let's evacuate them.");
                    // TODO evacuate explorers from drawning island
                }
                // Check if all Temples of an undiscovered Treasure are drawned. If yes : end game
                if (newTiles[j].name === "helipad"){
                  alert("The helipad is drawned. GAMEOVER")
                }

                if (newTiles[j].templeFor != ""){
                    // it's a temple drawning
                    if (this.state.posessedTreasures.indexOf(newTiles[j].templeFor)<0){
                      // the treasure of this temple isn't discovered yet
                      for (let k = 0; k < 24; k++){
                        if (k !=j && newTiles[k].templeFor === newTiles[j].templeFor){
                          if (newTiles[k].isDrawned){
                            let treasureName = "Unknown Treasure";
                            for (let l = 0; l < treasures.length; l++){
                              if (treasures[l].id == newTiles[j].templeFor)// type mismatch
                              {
                                treasureName = treasures[l].name;
                                break;
                              }
                            }

                            alert("Oh my God ! all the temples for " + treasureName + " are drawned. You'll never get it. GAME OVER" );
                          }
                          break;
                        }
                      }
                    }
                }
            }
            else if(newTiles[j].isDrawned){
              alert (newTiles[j].name + " is already drawned. it shouldn't be in the Leap !");
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
      floodCardsLeap: newFloodCardsLeap,
      tiles: newTiles,
      floodCardsDiscard: newFloodCardsDiscard });

    return true;
  }

  doFloodSomeTilesWithState(howMany, floodCardsLeapInput, floodCardsDiscardInput, tilesInput){
    let newFloodCardsLeap = floodCardsLeapInput;
    let newFloodCardsDiscard = floodCardsDiscardInput;
    let newTiles = tilesInput;

    let tempState = {};
    tempState.floodCardsLeap = [];
    tempState.tiles = [];
    tempState.floodCardsDiscard = [];

    for ( let i = 0; i < howMany; i++){
        let tileHasDrawned = false;
        // no more cards when flooding : reset the leap
        if (newFloodCardsLeap.length < 1){
          newFloodCardsLeap = shuffleArray(newFloodCardsDiscard);
          newFloodCardsDiscard = [];
        }

        let card = newFloodCardsLeap.pop();

        console.log('****** TILE To flood IS (with State) ' + card.name);
        for (let j = 0; j < newTiles.length; j++){
          if (newTiles[j].name === card.name){
            if (newTiles[j].isImmersed){
              // Let's DRAWN this tile
              alert (newTiles[j].name + " at " + j + " is drawning !");
                newTiles[j].isImmersed = false;
                newTiles[j].isDrawned = true;
                tileHasDrawned = true;
                // rescue some players ?
                if (newTiles[j].playerOn.length > 0){
                    alert ("There is " + newTiles[j].playerOn.length + " explorer(s) on the drawning tile. Let's evacuate them.");
                    // TODO evacuate explorers from drawning island
                }
                // Check if all Temples of an undiscovered Treasure are drawned. If yes : end game
                if (newTiles[j].name === "helipad"){
                  alert("The helipad is drawned. GAMEOVER")
                }

                if (newTiles[j].templeFor != ""){
                    // it's a temple drawning
                    if (this.state.posessedTreasures.indexOf(newTiles[j].templeFor)<0){
                      // the treasure of this temple isn't discovered yet
                      for (let k = 0; k < 24; k++){
                        if (k !=j && newTiles[k].templeFor === newTiles[j].templeFor){
                          if (newTiles[k].isDrawned){
                            let treasureName = "Unknown Treasure";
                            for (let l = 0; l < treasures.length; l++){
                              if (treasures[l].id == newTiles[j].templeFor)// type mismatch
                              {
                                treasureName = treasures[l].name;
                                break;
                              }
                            }

                            alert("Oh my God ! all the temples for " + treasureName + " are drawned. You'll never get it. GAME OVER" );
                          }
                          break;
                        }
                      }
                    }
                }
            }
            else if(newTiles[j].isDrawned){
              alert (newTiles[j].name + " is already drawned. it shouldn't be in the Leap !");
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

    tempState.floodCardsLeap = newFloodCardsLeap;
    tempState.tiles = newTiles;
    tempState.floodCardsDiscard = newFloodCardsDiscard;

    return tempState;
  }

  doPickOnePlayerCard(cardNumber, tempState){
      let newPlayerCardsDiscard = tempState.playerCardsDiscard;
      let newPlayerCardsLeap = tempState.playerCardsLeap;
      let newPlayers = tempState.players;
      let newFloodCardsLeap = tempState.floodCardsLeap;
      let newFloodCardsDiscard = tempState.floodCardsDiscard;
      let newFloodMeter = tempState.floodMeter;
      let newTiles = tempState.tiles;

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

            alert("Flood Riiiiise ! New Flood level is " + newFloodMeter.level + "(pick " +  newFloodMeter.floodFactor + " at each flood)");
            if (newFloodMeter.level >= newFloodMeter.topLevel){
              alert (" Top level reached. The Island is submerged. Game Over");
            }

            // do the floodings
            console.log("doFloodSomeTiles for " + newFloodMeter.floodFactor);
            let ReturnFromFlood = this.doFloodSomeTilesWithState(newFloodMeter.floodFactor, newFloodCardsLeap, newFloodCardsDiscard, newTiles);
            newFloodCardsLeap = ReturnFromFlood.floodCardsLeap;
            newFloodCardsDiscard = ReturnFromFlood.floodCardsDiscard;
            newTiles = ReturnFromFlood.tiles;

            // put the flood card in the discards
            newPlayerCardsDiscard.push(card);
        }
        else{
          cardToPushToPlayer = card;
        }

      // has Player too much cards ?
      let nbrOfCardsInHand = newPlayers[this.state.currentPlayerPlaying].cards.length + 1;
      if (nbrOfCardsInHand > 5){
        alert ("Oh no ! Over 5 cards in Hand !");
      }

      if (cardToPushToPlayer != null){
              newPlayers[this.state.currentPlayerPlaying].cards.push(cardToPushToPlayer);
      }

      let newMessage = "";
      if (cardNumber == 1){
            newMessage = new UserMessage("Oh ! Look at this first card : " + card.name + ".", false, [3]);
      }else{
            newMessage = new UserMessage("Oh ! Look at this second card : " + card.name + ".", false, [0]);
      }

      tempState.mainUserMessage = newMessage;
      tempState.playerCardsLeap = newPlayerCardsLeap;
      tempState.players = newPlayers;
      tempState.playerCardsDiscard = newPlayerCardsDiscard;
      tempState.floodCardsLeap = newFloodCardsLeap;
      tempState.floodCardsDiscard = newFloodCardsDiscard;
      tempState.floodMeter = newFloodMeter;
      tempState.tiles = newTiles;

      return tempState;
  }

  clickedOnHelicopterCard(playerId) {
    alert ( " Clicked on Helicopter. Where do you want to go number " + playerId + "?")
    let expectedNextButSetAside = this.state.whatIsExpectedNext;
    let tilesToLight = this.whereCanHeFly(this.state.players[playerId].position);
    this.state.players[playerId].whereCanHeFly = tilesToLight;
    let nada = this.lightTheTiles(tilesToLight, this.state.players[playerId].color);
    let newMessage = new UserMessage("Now choose a landing destination", false, [1]);
    this.setState({ whatIsExpectedNext: "TileButtonClickForFlyWithACard" , mainUserMessage: newMessage, expectedNextButSetAside : expectedNextButSetAside, cardUser : playerId });
    // TODO carry people ? if yes, who ?

    return null;
  }

  clickedOnSandBagCard(playerId) {
    // TODO if no tile to dry : alert and exit
    alert ( " Clicked on SandBag. Which tile do you want to dry ? player number " + playerId + "?")
    let expectedNextButSetAside = this.state.whatIsExpectedNext;
    let tilesToLight = this.getImmersedTiles();
    this.state.players[playerId].whereCanHeDry = tilesToLight;
    let nada = this.lightTheTiles(tilesToLight, this.state.players[playerId].color);
    let newMessage = new UserMessage("Now choose a tile to dry", false, [1]);
    this.setState({ whatIsExpectedNext: "TileButtonClickForDryWithACard" , mainUserMessage: newMessage, expectedNextButSetAside : expectedNextButSetAside, cardUser : playerId });
    return null;
  }

  getPossibleActions(role, hasPilotFlownThisTurn) {
      let actions = [];
      for (let i = 0; i < playerDefaultActions.length; i++){
          let action = playerDefaultActions[i];
          for (let j = 0; j < playerSpecialActions.length; j++ )
          {
            if (playerSpecialActions[j].forRole === role && playerSpecialActions[j].replacesAction === i.toString()){
              action = playerSpecialActions[j];
            }
          }
          // TODO : is action possible ? Check the validity of an action and remove it
          actions.push(action);
      }

      if (role === "Pilot"){
        // remove the first action which is fly
        let nada = actions.shift();
        let pilotActions = [];
        pilotActions.push(playerDefaultActions[0]); // move
        if (hasPilotFlownThisTurn === false){
            pilotActions.push(playerSpecialActions[5]); // fly
        }
        return pilotActions.concat(actions);
      }

      if (role === "Navigator"){
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
        let afterSwimPositions = [];
        moves = orthogonalPaths[position];
        for (let j = 0 ; j < moves.length; j++){
          if (this.state.tiles[moves[j]].isDrawned || this.state.tiles[moves[j]].isImmersed)
          {
              //  isDrawned
              afterSwimPositions = afterSwimPositions.concat(orthogonalPaths[moves[j]]);
          }
        }
        moves = moves.concat(afterSwimPositions);
    }
    else {
        moves = orthogonalPaths[position];
    }

    // virer les cases isDrawned et origin
    let output = moves;
    if (moves.length > 0) {
      for (let k = 0; k < moves.length; k++)
      {
        if ( k >= 0 && k < 24){
          if (this.state.tiles[moves[k]].isDrawned || moves[k] === position)
          {
            output.splice(output.indexOf(moves[k]), 1);
          }
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
    let output = moves;
    if (moves.length > 0) {
      for (let k = 0; k < moves.length; k++)
      {
        if ( k >= 0 && k < 24){
          if (this.state.tiles[moves[k]].isDrawned || moves[k] === position)
          {
            output.splice(output.indexOf(moves[k]), 1);
          }
        }
      }
    }
    return output;
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

 handleActionClick(action, param1) {
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
      } else if (action === "SendACard" || action === "Give") {
              let playersAround = this.getPlayersOnTheSameTileExceptMe();
              if (this.state.players[id].cards.length < 1 ){
                alert("The messenger has no cards to send. Try something else.");
                this.showActionButtons();
              } else if ( action === "Give" && playersAround.length < 1) {
                  alert("No other player on your tile. Try something else.");
                  this.showActionButtons();
              } else {
                this.setState({ whatIsExpectedNext: "ResolveUserDialogSequence" , messageBoardState: "giveACardSequence"});
              }
      } else if (action === "DoNothing"){
              let newMessage = new UserMessage("Doing nothing ZZZZZZZ ", false, [0]);
              this.setState({ mainUserMessage: newMessage});
      }else if (action === "SkipTurn"){
             let newMessage = new UserMessage("Skip turn ", false, [0]);
             this.setState({ mainUserMessage: newMessage, currentStep: 4});
      } else if (action === "helicopterCard") { // from player !
          // TODO : mettre ca dans un handleCardClick
            this.clickedOnHelicopterCard(param1) // param1 = id here is player
      } else if (action === "sandBagCard") { // from player !
            this.clickedOnSandBagCard(param1) // param1 = id here is player
      }
    }
    else{
      alert ("UnexpectedClickOnActionButton");
    }
    return null;
}

  handleTileClick(i) {

    this.showActionButtons();

    if (this.state.whatIsExpectedNext === "TileButtonClickForMove") {
        let player = this.state.players[this.state.currentPlayerPlaying];
        if (player.whereCanHeMove.indexOf(i) >= 0){
            // Move
            let returnPack = this.moveAPlayer(player, i, this.state.players, this.state.tiles);
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
                let returnPack = this.moveAPlayer(player, i, this.state.players, this.state.tiles);
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
        let NewPlayers = this.state.players;
        let NewPlayerCardsDiscard = this.state.playerCardsDiscard;
        let expectedNextButSetAside = this.state.expectedNextButSetAside;

        if (player.whereCanHeFly.indexOf(i) >= 0){
            // index of the card to remove
            for (let i = 0; i < player.cards.length; i++){
              if (player.cards[i].name === "helicopter"){
                NewPlayerCardsDiscard.push(player.cards[i]);
                player.cards.splice(i, 1);
                break;
              }
            }

            player.whereCanHeFly = [];
            NewPlayers[player.id] = player;
            // Move
            let returnPack = this.moveAPlayer(player, i, NewPlayers, this.state.tiles);
            //
            this.setState({ whatIsExpectedNext: expectedNextButSetAside,
                            cardUser: -1,
                            players: returnPack.players,
                            tiles: returnPack.tiles,
                            playerCardsDiscard: NewPlayerCardsDiscard,
                            expectedNextButSetAside: null });
            let nada = this.unlightTheTiles();
        } else {
          alert("He can't fly there with his card");
        }
      }
      else if (this.state.whatIsExpectedNext === "TileButtonClickForDryWithACard") {
        let player = this.state.players[this.state.cardUser];
        let NewPlayers = this.state.players;
        let NewPlayerCardsDiscard = this.state.playerCardsDiscard;
        let expectedNextButSetAside = this.state.expectedNextButSetAside;

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
          this.setState({ whatIsExpectedNext: expectedNextButSetAside,
                          cardUser: -1,
                          players: NewPlayers,
                          playerCardsDiscard: NewPlayerCardsDiscard,
                          expectedNextButSetAside: null });
          let nada = this.unlightTheTiles();
        }
        else {
          alert("He can't DRY there with his card");
        }
      } else {
            alert ("Unexpected Clic On a Tile");
      }
    }

  moveAPlayer(player, destination, players, tiles){
    let pack = null;
    let NewTiles = this.state.tiles;
    // remove player from current Tile
    let index = NewTiles[player.position].playerOn.indexOf(player.id);
    NewTiles[player.position].playerOn.splice(index, 1);
    // adding player to new tile
    NewTiles[destination].playerOn.push(player.id);

    let Newplayers = this.state.players;
    Newplayers[player.id].position = destination;
    Newplayers[player.id].whereCanHeMove = null;
    Newplayers[player.id].whereCanHeFly = null;

    // this.setState({ players: Newplayers , tiles: NewTiles});
    return pack = { players: Newplayers, tiles: NewTiles};
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
      mainUserMessage : newMessage});
  }

  doGiveACard(giver, card, receiver){
    // alert("GIVE A CARD : " + giver + " will give the " + card + " to " + receiver);
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
          this.givenCard = n_players[giver].cards[i];
          index = i;
        }
        break;
      }
      n_players[giver].cards.splice(index, 1);

      // give to
      n_players[receiver].cards.push(this.givenCard);

      this.setState({whatIsExpectedNext: "" ,
                    messageBoardState : "default", 
                    players : n_players});
      this.controller("ActionIsDone");
    }
  }

  getPlayersOnTheSameTileExceptMe(){
    let playersOnTheSameTileExceptMe = [];
    let currentlyPlaying = this.state.currentPlayerPlaying;
    let currentpostion = this.state.players[currentlyPlaying].position;

    for (let i = 0 ; i < this.state.players.length; i++){
      if (this.state.players[i].position === currentpostion && this.state.players[i].id !== currentlyPlaying){
        playersOnTheSameTileExceptMe.push(this.state.players[i].id);
      }
    }
    return playersOnTheSameTileExceptMe;
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
      <DrawEmptySquare/>
    );
  }

  renderPlayerBoard(i) { // passing a player index
    this.state.players[i].printIntroduction; // TO REMOVE
    let isPlaying = this.state.currentPlayerPlaying === i;
    let boardClass = isPlaying?  ('playerBoard playerBoardPlaying') : ('playerBoard ');

    return (
      <div className={boardClass}>
        <span className="inBoardName">{this.state.players[i].playersName}</span>&nbsp;the&nbsp;
        <span className="inBoardRole" style={{color: this.state.players[i].color}}>{this.state.players[i].role}</span>
        <br/>
        <div className="inBoardCards">
          {
            this.state.players[i].cards.map((card) => {
              if (card){
                return card.name === "helicopter" ?
                  <span key={card.id} className="boardPlayerCards"><img src={card.url} width="45px" height="70px" onClick={() => this.handleActionClick("helicopterCard", this.state.players[i].id)} /></span>
                  : card.name === "sandBag" ?
                      <span key={card.id} className="boardPlayerCards"><img src={card.url} width="45px" height="70px" onClick={() => this.handleActionClick("sandBagCard", this.state.players[i].id)}/></span>
                      :
                      <span key={card.id} className="boardPlayerCards"><img src={card.url} width="45px" height="70px" /></span>
              }
            })
          }
        </div>
      </div>
    )
  }

  renderPlayerMessagePanel() {
    return (
      <span>
        <div className="messagePanel">
          <div className="panelTitle"> FORBIDDEN<br/>::ReactJS::<br/>ISLAND</div>
          <div className="panelInfo"> Turn : {this.state.turn} </div>
          <div className="panelInfo"> FloodLevel {this.state.floodMeter.level} <span className="littlePanelInfo"> ({this.state.floodMeter.floodFactor} cards per flood)</span></div>
          <div className="panelInfo"> {this.state.players[this.state.currentPlayerPlaying].playersName} the <span style={{color: this.state.players[this.state.currentPlayerPlaying].color}}>{this.state.players[this.state.currentPlayerPlaying].role}</span> is Playing. </div>
          <div className="panelInfo"> Step : {playerSteps[this.state.currentStep].name} </div>
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
      let chosenCard = null;
      let receiver = null;

      return (
          <div>
            Which card do you want to give ?<br/>
            {
              this.state.players[giverId].cards.map((card, index) =>
              <span key={index}><input type="radio" name="chosenCard" key={index} value={card.id} onChange={() => chosenCard = card.id} />{card.name}<br/></span>
            )
            }
            To whom do you want to give it ?<br/>
            {
              this.state.players[giverId].role === "Messenger" ?
                (this.state.players.map((player, index) => {
                  return (player.id != giverId) ?
                    (<span key={index}><input type="radio" name="receiver" key={index} value={player.id} onChange={() => receiver = player.id}/>{player.playersName}<br/></span>)
                    :
                    (<span key={index}></span>)
                  }))
              :
              (playersOnTheSameTileExceptMe.map((player, index) => {
                    return <span key={index}><input type="radio" name="receiver" key={index} value={this.state.players[player].id} onChange={() => receiver = this.state.players[player].id}/>{this.state.players[player].playersName}<br/></span>
                  }))
            }
            <button className="actionButton" value="Give" onClick={() => this.doGiveACard(giverId, chosenCard, receiver)}>{this.state.players[giverId].role === "Messenger" ? "Send" : "Give" } </button>
          </div>
      )
    } else {
      // cklassic message  with one button

      let showNextBtnStyle = (this.state.mainUserMessage.buttons.indexOf(0) >= 0)?({display: 'block'}):({display: 'none'});
      let showCancelBtnStyle = (this.state.mainUserMessage.buttons.indexOf(1) >= 0)?({display: 'block'}):({display: 'none'});
      let showPick2CardsBtnStyle01 = (this.state.mainUserMessage.buttons.indexOf(2) >= 0)?({display: 'block'}):({display: 'none'});
      let showPick2CardsBtnStyle02 = (this.state.mainUserMessage.buttons.indexOf(3) >= 0)?({display: 'block'}):({display: 'none'});
      let showFloodBtnStyle = (this.state.mainUserMessage.buttons.indexOf(4) >= 0)?({display: 'block'}):({display: 'none'});

      return(
          <div>
          {this.state.mainUserMessage.message}
          <button style={showNextBtnStyle} onClick ={() => this.controller("ActionIsDone")}>Next</button>
          <button style={showCancelBtnStyle} onClick ={() => this.cancelAnAction()}>Cancel</button>
          <button style={showPick2CardsBtnStyle01} onClick ={() => this.controller("PickTwoCardsONE")}>Pick two cards 1st</button>
          <button style={showPick2CardsBtnStyle02} onClick ={() => this.controller("PickTwoCardsTWO")}>Pick two cards 2nd</button>
          <button style={showFloodBtnStyle} onClick ={() => this.controller("PlayerFlood")}>Flood !</button>
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
        document.getElementById("square" + i).style.border = "1px solid #222"; //"1px solid #222"
      } else {
        document.getElementById("square" + i).style.border = "1px solid #fff";
      }

    }
    return true;
  }

  unlightATile(i) {
      document.getElementById("square" + i).style.border = "1px solid #222"; //"1px solid #222"
  }

  hideActionButtons() {
      document.getElementById("UserActions").style.display = "none";
  }

  showActionButtons() {
      document.getElementById("UserActions").style.display = "block";
  }

  render() {

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
}

class FloodMeter {
  constructor(startLevel) {
    this.level = startLevel;
    this.topLevel = 10;
    this.floodFactor = this.howManyCards(startLevel);
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
  constructor(message, isImportant, buttons) {
    this.message = message;
    this.isImportant = isImportant;
    this.buttons = buttons;
  }
}

function riseTheIsland(){
    var tile01 = new Tile("helipad", 0, false, false, 5, "", [], "#A9D0F5", "", "HELIPORT");
    var tile02 = new Tile("doorBlack", 0, false, false, 3, "", [], "#6E6E6E", "", "");
    var tile03 = new Tile("doorRed", 0, false, false, 0, "", [], "#F78181", "", "");
    var tile04 = new Tile("doorGreen", 0, false, false, 4, "", [], "#9FF781", "", "");
    var tile05 = new Tile("doorWhite", 0, false, false, 2, "", [], "#F2F2F2", "", "");
    var tile06 = new Tile("doorYellow", 0, false, false, 1, "", [], "#F2F5A9", "", "");
    var tile07 = new Tile("temple0001", 0, false, false, "", "0", [], "#bdc3c7", "", "TEMPLE CRYSTAL");
    var tile08 = new Tile("temple0002", 0, false, false, "", "0", [], "#bdc3c7", "", "TEMPLE CRYSTAL");
    var tile09 = new Tile("temple0101", 0, false, false, "", "1", [], "#bdc3c7", "", "TEMPLE CUP");
    var tile10 = new Tile("temple0102", 0, false, false, "", "1", [], "#bdc3c7", "", "TEMPLE CUP");
    var tile11 = new Tile("temple0201", 0, false, false, "", "2", [], "#bdc3c7", "", "TEMPLE SCEPTRE");
    var tile12 = new Tile("temple0202", 0, false, false, "", "2", [], "#bdc3c7", "", "TEMPLE SCEPTRE");
    var tile13 = new Tile("temple0301", 0, false, false, "", "3", [], "#bdc3c7", "", "TEMPLE STATUE");
    var tile14 = new Tile("temple0302", 0, false, false, "", "3", [], "#bdc3c7", "", "TEMPLE STATUE");
    var tile15 = new Tile("coast01", 0, false, false, "", "", [], "#825a2c", "", "");
    var tile16 = new Tile("coast02", 0, false, false, "", "", [], "#825a2c", "", "");
    var tile17 = new Tile("coast03", 0, false, false, "", "", [], "#825a2c", "", "");
    var tile18 = new Tile("desert01", 0, false, false, "", "", [], "#ffd480", "", "");
    var tile19 = new Tile("desert02", 0, false, false, "", "", [], "#ffd480", "", "");
    var tile20 = new Tile("desert03", 0, false, false, "", "", [], "#ffd480", "", "");
    var tile21 = new Tile("swamp01", 0, false, false, "", "", [], "#bcf0d2", "", "");
    var tile22 = new Tile("swamp02", 0, false, false, "", "", [], "#bcf0d2", "", "");
    var tile23 = new Tile("swamp03", 0, false, false, "", "", [], "#bcf0d2", "", "");
    var tile24 = new Tile("swamp04", 0, false, false, "", "", [], "#bcf0d2", "", "");
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
    // engineer hack on
    // let roles = [0,1,2,3,4,5];
    // roles = shuffleArray(roles);
    let roles = [2,5,1,3,4,0];
    let players = [];
    for (let i = 0; i < 4; i++){
      let type = roles[i];
      let player = new Player(
          i, type, playerTypes[type].role, playerTypes[type].color, playerTypes[type].name, 0, [], true, false
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
