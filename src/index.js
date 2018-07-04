import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import './strings.js';
import {stringsCatalog} from './strings.js';

const playerTypes = [
  {
    id : 0,
    role : "Engineer", // dry two tiles for one action
    color : "#CC0000", // red
    ability : "ab_Engineer",
    name : "Natacha",
    roleAttachedToName: "ro_Engineer",
    roleQualifier: "qualificatif_N"
  },
  {
    id : 1,
    role : "Navigator", // move another player from one or two tiles (straight ?) for one action
    color : "#FFF200", //yellow
    ability : "ab_Navigator",
    name : "Boris",
    roleAttachedToName: "ro_Navigator",
    roleQualifier: "qualificatif_M"
  },
  {
    id : 2,
    role : "Messenger", // can give one card for one action to anyone
    color : "#FFFFFF", //white
    ability : "ab_Messenger",
    name : "Francois",
    roleAttachedToName: "ro_Messenger",
    roleQualifier: "qualificatif_M"
  },
  {
    id : 3,
    role : "Diver", // can move one wet case and one other case
    color : "#000000", // black
    ability : "ab_Diver",
    name : "Gina",
    roleAttachedToName: "ro_Diver",
    roleQualifier: "qualificatif_F"
  },
  {
    id : 4,
    role : "Explorer", // can move and dry orth and diagonaly
    color : "#0AB300", //green
    ability : "ab_Explorer",
    name : "Brian",
    roleAttachedToName: "ro_Explorer",
    roleQualifier: "qualificatif_N"
  },
  {
    id : 5,
    role : "Pilot", // once per turn, fly where you want for 1 action
    color : "#0064b3", //blue
    ability : "ab_Pilot",
    name : "Bob",
    roleAttachedToName: "ro_Pilot",
    roleQualifier: "qualificatif_M"
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
     { id : "CR" , name : "crystal", loc_key : "tr_crystal", trophyImg : "img/wonCrystal.png" },
     { id : "CU" , name : "cup", loc_key : "tr_cup", trophyImg : "img/wonCup.png" },
     { id : "SC" , name : "sceptre", loc_key : "tr_sceptre", trophyImg : "img/wonSceptre.png"},
     { id : "ST" , name : "statue", loc_key : "tr_statue", trophyImg : "img/wonStatue.png"}
 ];

 const buttons = ["Next", "Cancel", "PickTwoCards 1st", "PickTwoCards 2nd", "Flood"];

 const playerSteps = [
     {id : 0, name : "step_act1outOf3" },
     {id : 1, name : "step_act2outOf3" },
     {id : 2, name : "step_act3outOf3" },
     {id : 3, name : "step_DrawPlayerCards" },
     {id : 4, name : "step_DrawFloodCards" }
 ];

 const endings = [
    {id : 0, name : "gameNotFinished", loc_key : "" },
    {id : 1, name : "aventurerIsDrawned", loc_key : "end_aventurerIsDrawned" },
    {id : 2, name : "islandSunk", loc_key : "end_islandSunk" },
    {id : 3, name : "templeDisapeared", loc_key : "end_templeDisapeared" },
    {id : 4, name : "heliportDisapeared", loc_key : "end_heliportDisapeared" },
    {id : 9, name : "victory", loc_key : "end_victory" }
 ];

  const levels = [
    {id : 0, loc_key : "novice" },
    {id : 1, loc_key : "normal" },
    {id : 2, loc_key : "elite" },
    {id : 3, loc_key : "legendary" },
  ];

 const playerDefaultActions = [
      {id : 0, name : "Move", locName: "ac_move", locHelp: "ah_move", enabled : true, triggers : "Move" }, //has an adjacent tile around ?
      {id : 1, name : "Dry", locName: "ac_dry", locHelp: "ah_dry", enabled : true, triggers : "Dry"  }, //has an adjacent immersed tile around ?
      {id : 2, name : "Give", locName: "ac_give", locHelp: "ah_give", enabled : true, triggers : "Give" }, //has a player on his tile ?
      {id : 3, name : "Get a Treasure !", locName: "ac_getATreasure", locHelp: "ah_getATreasure", enabled : true, triggers : "GetATreasure"  }, // has 4 cards and is on the right temple
      /*{id : 4, name : "DoNothing", text: "Simply do nothing.", enabled : true, triggers : "DoNothing"  }, // -
      /* {id : 5, name : "Skip Turn", text: "Skip the player'sTurn.", enabled : true, triggers : "SkipTurn"  } // -*/
      {id : 6, name : "Sleep", locName: "ac_sleep", locHelp: "ah_sleep", enabled : true, triggers : "DoSleep"  }
 ];

 const playerSpecialActions = [
   // Special actions
   {id : 0, name : "Send a card", locName: "ac_sendACard", forRole: "Messenger", replacesAction: "2", locHelp: "ah_sendACard", enabled : true, triggers : "SendACard"  }, // has a treasure card
   {id : 1, name : "Move someone", locName: "ac_moveSomeone", forRole: "Navigator", replacesAction: "-", locHelp: "ah_moveSomeone", enabled : true, triggers : "MoveSomeone"  }, // there's another player in game
   {id : 2, name : "Dry two tiles", locName: "ac_dry2Tiles", forRole: "Engineer", replacesAction: "1", locHelp: "ah_dry2Tiles", enabled : true, triggers : "DryTwoTiles"  }, // has two immersed adjacent tiles around
   {id : 3, name : "Move around", locName: "ac_moveAround", forRole: "Explorer", replacesAction: "0", locHelp: "ah_moveAround", enabled : true, triggers : "MoveAround"  },//has an tile around ?
   {id : 4, name : "Dry around", locName: "ac_dryAround", forRole: "Explorer", replacesAction: "1", locHelp: "ah_dryAround" , enabled : true, triggers : "DryAround" },// has an immersed tile around
   {id : 5, name : "Fly", locName: "ac_fly", forRole: "Pilot", replacesAction: "-", locHelp: "ah_fly", enabled : true, triggers : "Fly"  },// any other non dranwned tile
   {id : 6, name : "Move/Dive", locName: "ac_MoveDive", forRole: "Diver", replacesAction: "0", locHelp: "ah_MoveDive", enabled : true, triggers : "Dive"  }, // a tile to dive to
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
   constructor(message, complexMessage, isImportant, buttons, databag) {
     this.message = message;
     this.complexMessage = complexMessage;
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
    <button className="emptySquare" onClick={props.onClick}></button>
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

    var nbrOfPlayers = props.nbrOfPlayers;

    var difficultyLevel = props.difficultyLevel;
    //var difficultyLevelString =

    var tiles = riseTheIsland();
    var playerCardsLeap = generatePlayerCardsLeap();
    var playerCardsDiscard = [];
    var floodCardsLeap = generateFloodCardsLeap();
    var floodCardsDiscard = [];
    var floodMeter = new FloodMeter(props.difficultyLevel);
    // let mainUserMessage = new UserMessage("Welcome new Player. Choose a first action for the first character.", false, []);
    let mainUserMessage = new UserMessage("... INITIALIZATION... ", null, false, []);

    // generer les joueurs
    var players = generatePlayers(nbrOfPlayers);
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
      //
      players: players,
      nbrOfPlayers : players.length,
      floodMeter: floodMeter,
      difficultyLevel: difficultyLevel,
      //
      pastState: [],
      //
      gameIsLost: false,
      gameIsWon: false,
      gameIsOver: false,
      endMessage: "nada",
      //
      languageDistributor: props.language === "FR" ? stringsCatalog.fr : stringsCatalog.en,
      selectedLanguage: props.language === "FR" ? "FR" : "EN",
      //
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
      inAGetRidOfACardContext : false,
      guysToEvacuate : null,
      floodingSequence : null
    };

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
       //for (let i = 0; i < 5; i++){ // HACK OF 5 Cards in the beg
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
  componentDidMount() {
      // Perform the initial Flooding of 6 tiles
      let n_FloodCardsLeap = this.state.floodCardsLeap;
      let n_Tiles = this.state.tiles;
      let n_FloodCardsDiscard = this.state.floodCardsDiscard;
      let lng = this.state.languageDistributor;

      for ( let i = 0; i < 6; i++){
          let card = n_FloodCardsLeap.pop();

          for (let j = 0; j < n_Tiles.length; j++){
            if (n_Tiles[j].name === card.name){
                  n_Tiles[j].isImmersed = true;
                  break;
              }
          }
          n_FloodCardsDiscard.push(card);
      }

      // And add a localised welcome message
      let n_userMessage = new UserMessage('welcome_msg', null, false, []);

      let difficultyLevelString = "";
      switch (this.state.difficultyLevel) {
       case 1:
            difficultyLevelString = lng.novice;
            break;
       case 2:
           difficultyLevelString = lng.normal;
           break;
       case 3:
           difficultyLevelString = lng.elite;
           break;
       case 4:
           difficultyLevelString = lng.legendary;
           break;
       default:
        console.log("CONCEPTUAL ERROR : Wrong Difficulty level input");
      }

      // save the state before an action
      let stateCopy = this.state;
          // reproduce what will be setted in the next setState
          stateCopy.floodCardsLeap = n_FloodCardsLeap;
          stateCopy.floodCardsDiscard = n_FloodCardsDiscard;
          stateCopy.tiles = n_Tiles;
          stateCopy.difficultyLevelString = difficultyLevelString;
      let n_pastState = [stateCopy];

      this.setState({
        floodCardsLeap: n_FloodCardsLeap,
        floodCardsDiscard: n_FloodCardsDiscard,
        tiles: n_Tiles,
        mainUserMessage: n_userMessage,
        difficultyLevelString: difficultyLevelString,
        pastState: n_pastState});
  }

  controller(input, data){
      console.log("InController turn :" + this.state.currentStep);
      let lng = this.state.languageDistributor;
      this.checkCardState();
      this.showActionButtons();
      this.unblinkTheTiles();
      if (input === "ActionIsDone"){
        let nextStep = this.state.currentStep + 1;
        if (nextStep === 3){
          // draw player cards 01
          let newMessage = new UserMessage('letsDrawSomePlayerCards_msg', null, false, [2]);
          this.setState({ currentStep : nextStep, possibleActions : [], mainUserMessage : newMessage});
        } else if (nextStep === 4){
          // flood some tiles.
          this.setState({ currentStep : nextStep });
          let howMuch = this.state.floodMeter.floodFactor;
          let newMessage = new UserMessage(null, lng.letsFloodSomeTiles_msg.format(howMuch) , false, [4]);
          this.setState({ currentStep : nextStep, possibleActions : [], mainUserMessage : newMessage});
        }
        else if (nextStep === 5){
          // next Turn, new Player 0
          /* CODE MORT DE GESTION DU BLINK ?
          let n_tiles = this.state.tiles;
          for (let i = 0; i< n_tiles.length; i++){
              n_tiles[i].blink = false;
          }*/

          if (this.state.currentPlayerPlaying === this.state.players[this.state.players.length -1].id){
            // let newMessage = new UserMessage("Next Turn ! Please " + this.state.players[0].name + ", Choose an action " , false, []);
            let newMessage = new UserMessage(null, lng.nextTurn_msg.format(this.state.players[0].name) , false, []);
            let nextTurn = this.state.turn + 1;
            let nextPlayer = this.state.players[0].id;
            let psblactn = this.getPossibleActions(this.state.players[0], false, false);
            // save the state before an action
            let stateCopy = this.state;
                // reproduce what will be setted in the next setState
                stateCopy.currentStep = 0;
                stateCopy.turn = nextTurn;
                stateCopy.currentPlayerPlaying = nextPlayer;
                stateCopy.possibleActions = psblactn;
                stateCopy.hasPilotFlownThisTurn = false;
                stateCopy.whatIsExpectedNext = "CharacterActionButtonClick";
                stateCopy.mainUserMessage = newMessage;
            let n_pastState = this.state.pastState;
            n_pastState.push(stateCopy);

            this.setState({
              // Would you add something here, add it above
              currentStep : 0,
              turn : nextTurn,
              currentPlayerPlaying : nextPlayer,
              possibleActions : psblactn,
              hasPilotFlownThisTurn : false,
              whatIsExpectedNext : "CharacterActionButtonClick" ,
              mainUserMessage : newMessage,
              pastState : n_pastState
              });
              // tiles: n_tiles });
          } else {
            // next Player
            let newMessage = new UserMessage('nextPlayer_msg', null, false, []);
            let nextPlayer = this.state.players[this.state.currentPlayerPlaying + 1].id;
            let psblactn = this.getPossibleActions(this.state.players[nextPlayer], false, false);

            // save the state before an action
            let stateCopy = this.state;
                // reproduce what will be setted in the next setState
                stateCopy.currentStep = 0;
                stateCopy.currentPlayerPlaying = nextPlayer;
                stateCopy.possibleActions = psblactn;
                stateCopy.whatIsExpectedNext = "CharacterActionButtonClick";
                stateCopy.mainUserMessage = newMessage;
            let n_pastState = [stateCopy];
            // n_pastState.push(stateCopy);

            this.setState({
            // Would you add something here, add it above
              currentStep : 0,
              currentPlayerPlaying : nextPlayer,
              possibleActions : psblactn,
              whatIsExpectedNext : "CharacterActionButtonClick",
              mainUserMessage : newMessage,
              pastState : n_pastState
            });
              // tiles: n_tiles
          }
        } else{
          // next action for the same player
          let newMessage = new UserMessage('chooseAnAction_msg', null, false, []);
          let psblactn = this.getPossibleActions(this.state.players[this.state.currentPlayerPlaying], this.state.hasPilotFlownThisTurn, false);
          // save the state before an action
          let stateCopy = this.state;
              // reproduce what will be setted in the next setState
              stateCopy.currentStep = nextStep;
              stateCopy.possibleActions = psblactn;
              stateCopy.whatIsExpectedNext = "CharacterActionButtonClick";
              stateCopy.mainUserMessage = newMessage;
          let n_pastState = this.state.pastState;
          n_pastState.push(stateCopy);
          //
          this.setState({
            // Would you add something here, add it above
            currentStep : nextStep,
            possibleActions : psblactn,
            pastState: n_pastState,
            whatIsExpectedNext : "CharacterActionButtonClick" ,
            mainUserMessage : newMessage});
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
  // end of Controller

  doFloodATile(number, outOf){
    this.unblinkTheTiles();
    let lng = this.state.languageDistributor;

    let n_Tiles = this.state.tiles;
    let n_FloodCardsLeap = this.state.floodCardsLeap;
    let n_FloodCardsDiscard = this.state.floodCardsDiscard;
    let n_FloodCardsOutOfGame = this.state.floodCardsOutOfGame;
    let floodedTileId = "";

    //let message = "<div>immersion " + number + " out of " + outOf + ".<br/>";
    let message = lng.immersionXoutofY.format(number, outOf);

    let tileHasDrawned = false;
    let guysToEvacuate = [];

    if (n_FloodCardsLeap.length < 1){
      n_FloodCardsLeap = shuffleArray(n_FloodCardsDiscard);
      n_FloodCardsDiscard = [];
    }

    let card = n_FloodCardsLeap.pop();

    let gameOver = false;
    let gameOverMsg = "";
    let gameOverCode = 0;


    for (let j = 0; j < n_Tiles.length; j++){
      if (n_Tiles[j].name === card.name){
        console.log('****** TILE To flood IS ' + n_Tiles[j].name);
        floodedTileId = j;
        if (n_Tiles[j].isImmersed){
          // Let's DRAWN this tile
          // alert (n_Tiles[j].name + " at " + j + " is drawning !");
            // message = message + "<span style=\"color: #DC143C\">" + n_Tiles[j].name + " at " + j + " is drawning ! </span>";
            message = message + lng.tileDrawning.format(n_Tiles[j].name, j);
            n_Tiles[j].isImmersed = false;
            n_Tiles[j].isDrawned = true;
            n_Tiles[j].blink = true;
            this.graphicallyDoDrawnATile(j);
            tileHasDrawned = true;
            if (n_Tiles[j].name === "helipad"){
              message = message + '<br/>' +lng.explorersCantLeaveTheIsland;
              // gameOver = true;
              // alert("The helipad is drawned. GAMEOVER")
              gameOver = true;
              gameOverMsg = lng.explorersCantLeaveTheIsland;
              gameOverCode = 4; // helipad disapeared

              // this.launchGameOver(false, true, lng.explorersCantLeaveTheIsland);
            }
            // rescue some players ?
            guysToEvacuate = n_Tiles[j].playerOn;
            if (n_Tiles[j].playerOn.length > 0 && !gameOver){
                // message = message + "<br/> There are " + n_Tiles[j].playerOn.length + " explorer(s) on it. Let's evacuate them.";
                message = message + lng.thereAreXexplorersOnIt.format(n_Tiles[j].playerOn.length);
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
                        //message = message + "<br/>Oh my God ! all the temples for " + this.getTreasureNameById(n_Tiles[j].templeFor) + " are drawned. You'll never get it. GAME OVER";
                        message = message + lng.allTheTemplesAreDrawned.format(this.getTreasureNameById(n_Tiles[j].templeFor));
                        // gameOver = true;
                         console.log("Oh my God ! all the temples for " + this.getTreasureNameById(n_Tiles[j].templeFor) + " are drawned. You'll never get it. GAME OVER" );
                         gameOver = true;
                         gameOverMsg = lng.allTheTemplesAreDrawned.format(this.getTreasureNameById(n_Tiles[j].templeFor));
                         gameOverCode = 3; // all the temples for one undiscovered treasure disapeared
                        // this.launchGameOver(false, true, lng.allTheTemplesAreDrawned.format(this.getTreasureNameById(n_Tiles[j].templeFor)));
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
            //message = message + n_Tiles[j].name + " at " + j + " is flooded ! ";
            message = message + lng.tileIsFlooded.format(n_Tiles[j].name, j);
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
        //message = message + "<br/>!!! WE NEED TO EVACUATE THE TILE !!!</div>";
        message = message + lng.weNeedToEvacuateTheTile;
        n_userMessage = new UserMessage(null, message , false, [8]);
    }
    else if (number === outOf){
      // floodings are finished
      //message = message + "<br/> Floodings are over.... for now.</div>";
      message = message + lng.floodingsAreOver;
      n_userMessage = new UserMessage(null, message , false, [0]);
    }
    else {
      // next flooding
      let databag = {nextFloodingNumber: number + 1, outOf: outOf};
      message = message + "</div>";
      n_userMessage = new UserMessage(null, message , false, [5], databag);
    }


    if (gameOver === true){
      this.setState({
          mainUserMessage: n_userMessage,
          gameIsOver: true,
          gameIsLost: true,
          endMessage: gameOverMsg});
    }
    else{
      this.setState({
        mainUserMessage: n_userMessage,
        floodCardsLeap: n_FloodCardsLeap,
        floodCardsOutOfGame: n_FloodCardsOutOfGame,
        floodCardsDiscard: n_FloodCardsDiscard,
        gameIsLost: gameOver,
        tiles: n_Tiles,
        guysToEvacuate: guysToEvacuate,
        floodingSequence: floodingSequence});
    }
  }

  doEvacuate(){
      let lng = this.state.languageDistributor;
      let n_players = this.state.players;
      let drawningGuy = n_players[this.state.guysToEvacuate[0]];
      let drawningGuyId = drawningGuy.id;
      let tilesToLight = [];
      let gameIsLost = false;
      let gameOverMsg = "";
      let gameOverCode = 0;

      if (drawningGuy.role === "Pilot"){
        tilesToLight = this.whereCanHeFly(drawningGuy.position);
        n_players[drawningGuyId].whereCanHeFly = tilesToLight;
      } else {
        tilesToLight = this.whereCanHeMove(drawningGuy.position, drawningGuy.role)
        n_players[drawningGuyId].whereCanHeMove = tilesToLight;
      }

      let newMessage = "";
      if (tilesToLight.length === 0){
        // let newMessage = new UserMessage("Oh my God. There's nowhere he can go. " + drawningGuy.name+ " is drawning. Noooooooo. GAME OVER.", false, []);
        newMessage = new UserMessage(null, lng.nowhereHeCanGo.format(drawningGuy.name), false, []);

        gameIsLost = true;
        gameOverMsg = lng.nowhereHeCanGo.format(drawningGuy.name);
        gameOverCode = 1; // guy drawned

        // this.launchGameOver(false, true, lng.nowhereHeCanGo.format(drawningGuy.name));
        // gameIsLost = true;
      } else {
        this.lightTheTiles(tilesToLight, drawningGuy.color);
        newMessage = new UserMessage('chooseADestinationToEvacuate', null, false, []);
      }

      if (gameIsLost === true){
          this.setState({
            mainUserMessage: newMessage,
            gameIsOver: true,
            gameIsLost: true,
            endMessage: gameOverMsg});
      }
      else{
        this.setState({ whatIsExpectedNext: "TileButtonClickForEvacuate" ,
                        players : n_players,
                        gameIsLost : gameIsLost,
                        mainUserMessage: newMessage });
      }
  }

  doMoveFloodOmeterCursor(){
    let newValue = document.getElementById('floodOmeterCursor').style.left;
    newValue = parseInt(newValue.slice(0, newValue.indexOf('px')), 10) + 33;
    document.getElementById("floodOmeterCursor").style.left = newValue + "px";
  }

  doPickOnePlayerCard(cardNumber, tempState){
      let lng = this.state.languageDistributor;
      let newPlayerCardsDiscard = tempState.playerCardsDiscard;
      let newPlayerCardsLeap = tempState.playerCardsLeap;
      let newPlayers = tempState.players;
      let newFloodCardsLeap = tempState.floodCardsLeap;
      let newFloodCardsDiscard = tempState.floodCardsDiscard;
      let newFloodCardsOutOfGame = tempState.floodCardsOutOfGame;
      let newFloodMeter = tempState.floodMeter;

      let gameIsLost = false;
      let gameOverMsg = "";
      let gameOverCode = 0; // guy drawned

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
            // alert (" Top level reached. The Island is submerged. Game Over");
            // alert (lng.topLevelReached);

            // this.launchGameOver(false, true, lng.topLevelReached);

            gameIsLost = true;
            gameOverMsg = lng.topLevelReached;
            gameOverCode = 2; // guy drawned
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
            newMessage = new UserMessage(null, lng.firstCard_msg.format(this.getStringInTheCatalog(lng, card.loc_key)) + '. <br/><img src='  + card.url + ' width="30px" height="46px"/>', false, [3]);
      }else{
            let databag = {userId : this.state.currentPlayerPlaying}
            newMessage = new UserMessage(null, lng.secondCard_msg.format(this.getStringInTheCatalog(lng, card.loc_key)) + '. <br/><img src=' + card.url  + ' width="30px" height="46px"/>', false, [9], databag);
      }

      tempState.mainUserMessage = newMessage;
      tempState.playerCardsLeap = newPlayerCardsLeap;
      tempState.players = newPlayers;
      tempState.playerCardsDiscard = newPlayerCardsDiscard;
      tempState.floodCardsLeap = newFloodCardsLeap;
      tempState.floodCardsDiscard = newFloodCardsDiscard;
      tempState.floodCardsOutOfGame = newFloodCardsOutOfGame;
      tempState.floodMeter = newFloodMeter;

      tempState.gameIsLost = gameIsLost;
      tempState.endMessage = gameOverMsg;
      tempState.gameOverCode = gameOverCode;

      return tempState;
  }

  // MUST BE DONE AT THE END OF AN ACTION -> embraye sur un ActionIsDone
  doCheckIfMoreThan5CardsInHand(passages, userId) {
    let cardsInHand = this.state.players[userId].cards;
    if (cardsInHand.length > 5){
      // alert ("Oh no ! Over 5 cards in Hand ! : " + cardsInHand.length);

      let n_whatIsExpectedNext_toRestore = this.state.whatIsExpectedNext;
      let n_messageBoardState_toRestore = this.state.messageBoardState;

      if (passages === 0){
        this.setState({ whatIsExpectedNext_toRestore : n_whatIsExpectedNext_toRestore,
                        whatIsExpectedNext: "ResolveOver5Cards" ,
                        mainUserMessage_toRestore: this.state.mainUserMessage,
                        messageBoardState_toRestore: n_messageBoardState_toRestore,
                        messageBoardState: "SolveOver5Cards",
                        cardUser : userId });
      } else {
        this.setState({
                        whatIsExpectedNext: "ResolveOver5Cards" ,
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
      let lng = this.state.languageDistributor;
      let n_message = new UserMessage('okWhatsNext', null, false, [10]);
      // ici set un state to recover à 'Voilà, on a utilisé une carte -> next doCheckIfMoreThan5CardsInHand'
      this.setState({mainUserMessage: n_message, messageBoardState: "default"}, () => {
        if (type === "H"){
            this.clickedOnHelicopterCard(userId, true);
        } else if (type === "SB"){
            this.clickedOnSandBagCard(userId, true);
        } else {
          alert("CONCEPTUAL ERROR : WRONG CARD TYPE");
        }
      });
  }

  clickedOnHelicopterCard(playerId, inAGetRidOfACardContext) {
    let lng = this.state.languageDistributor;
    let whatIsExpectedNext_toRestore = this.state.whatIsExpectedNext;
    let n_Message = new UserMessage('chooseALandingDestination', null, false, [7]);
    let n_messageBoardState_toRestore = this.state.messageBoardState;

    // displays the board of co travellers choice
    this.setState({ whatIsExpectedNext_toRestore : whatIsExpectedNext_toRestore,
                    whatIsExpectedNext: "ResolveLeftPaneThing" ,
                    mainUserMessage_toRestore: this.state.mainUserMessage,
                    mainUserMessage: n_Message,
                    messageBoardState_toRestore: n_messageBoardState_toRestore,
                    messageBoardState: "ChooseCoTravellers",
                    inAGetRidOfACardContext: inAGetRidOfACardContext,
                    cardUser : playerId });
  }

  helicopterCardEnRoute(playerId, travellers){
    let lng = this.state.languageDistributor;
    let victory = false;
    // Check if the game is won :
    // on the helipad, 4 treasures found, all players on the tile
    if (this.state.posessedTreasures.length === 4 &&
        this.state.tiles[this.state.players[playerId].position].name === "helipad" &&
        //this.state.tiles[this.state.players[playerId].position].playerOn.length === this.state.nbrOfPlayers ) {
        travellers.length === this.state.nbrOfPlayers /* - 1  */) {
          // YOU WON // VICTORY
          // alert(lng.youWonMsg.format(this.state.nbrOfPlayers));
          victory = true;
        }
    // displays the possible destinations
    let tilesToLight = this.whereCanHeFly(this.state.players[playerId].position);
    this.state.players[playerId].whereCanHeFly = tilesToLight;
    let nada = this.lightTheTiles(tilesToLight, this.state.players[playerId].color);
    // set state
    let n_messageBoardState = "default";

    if (victory === true){
        this.setState({
            mainUserMessage: lng.youWonMsg.format(this.state.nbrOfPlayers),
            gameIsOver: true,
            gameIsWon: true,
            endMessage: lng.youWonMsg.format(this.state.nbrOfPlayers)});
    }
    else{
      this.setState({ whatIsExpectedNext: "TileButtonClickForFlyWithACard",
                      coTravellers: travellers,
                      messageBoardState: n_messageBoardState });
    }
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
                    inAGetRidOfACardContext: false,
                    // cardUser : null,
                    coTravellers : null });
  }

  clickedOnSandBagCard(playerId, inAGetRidOfACardContext) {
    let lng = this.state.languageDistributor;
    let tilesToLight = this.getImmersedTiles();
    if (tilesToLight.length === 0){
      alert(lng.noTileToDry);
      return null;
    }

    this.state.players[playerId].whereCanHeDry = tilesToLight;
    this.lightTheTiles(tilesToLight, this.state.players[playerId].color);
    let newMessage = new UserMessage('chooseATileToDry', null, false, [6]);
    this.setState({ whatIsExpectedNext_toRestore : this.state.whatIsExpectedNext,
                    whatIsExpectedNext: "TileButtonClickForDryWithACard" ,
                    mainUserMessage_toRestore: this.state.mainUserMessage,
                    mainUserMessage: newMessage,
                    messageBoardState_toRestore: this.state.messageBoardState,
                    inAGetRidOfACardContext: inAGetRidOfACardContext,
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
                    inAGetRidOfACardContext: false,
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
        // remove the first action which is move (if it is)
        if (actions[0].name === "Move"){
                  let nada = actions.shift();
        }
        let pilotActions = [];
        pilotActions.push(playerDefaultActions[0]); // move
        if (hasPilotFlownThisTurn === false){
            pilotActions.push(playerSpecialActions[5]); // fly
        }
        return pilotActions.concat(actions);
      }

      if (player.role === "Navigator"){
        // remove the first action which is move (if it is)
        if (actions[0].name === "Move"){
                  let nada = actions.shift();
        }
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
    let lng = this.state.languageDistributor;
    this.hideActionButtons();
    console.log("clicked on " + action);
    if (this.state.whatIsExpectedNext === "CharacterActionButtonClick") {
      let id = this.state.players[this.state.currentPlayerPlaying].id;
      if (action === "Move" || action === "Dive" || action === "MoveAround"){
            let tilesToLight = this.whereCanHeMove(this.state.players[id].position, this.state.players[id].role);
            if (tilesToLight.length === 0 ){
              alert (lng.nowhereToGo);
              this.showActionButtons();
            } else  {
              this.state.players[id].whereCanHeMove = tilesToLight;
              let nada = this.lightTheTiles(tilesToLight, this.state.players[id].color);
              // set a new Expected PlayerInput
              let newMessage = new UserMessage('chooseADestination', null, false, [1]);
              this.setState({ whatIsExpectedNext: "TileButtonClickForMove" ,
                              mainUserMessage: newMessage });
            }
      } if (action === "Fly"){
          let tilesToLight = this.whereCanHeFly(this.state.players[id].position);
          this.state.players[id].whereCanHeFly = tilesToLight;
          let nada = this.lightTheTiles(tilesToLight, this.state.players[id].color);
          let newMessage = new UserMessage('chooseALandingDestination', null, false, [1]);
          this.setState({ whatIsExpectedNext: "TileButtonClickForFly" , mainUserMessage: newMessage });
      } else if (action === "Dry" || action === "DryAround"){
            let tilesToLight = this.whereCanHeDry(this.state.players[id].position, this.state.players[id].role);
            if (tilesToLight.length === 0 ){
              alert (lng.noTilesToDry);
              this.showActionButtons();
            } else {
              this.state.players[id].whereCanHeDry = tilesToLight;
              let nada = this.lightTheTiles(tilesToLight, this.state.players[id].color);
              let newMessage = new UserMessage('nowChooseATileToDry', null, false, [1]);
              this.setState({ whatIsExpectedNext: "TileButtonClickForDry",
                              mainUserMessage: newMessage});
            }
      } else if (action === "DryTwoTiles"){
            let tilesToLight = this.whereCanHeDry(this.state.players[id].position, this.state.players[id].role);
            if (tilesToLight.length === 0 ){
              alert (lng.noTilesToDry);
              this.showActionButtons();
            } else if (tilesToLight.length === 1 ){
              this.state.players[id].whereCanHeDry = tilesToLight;
              let nada = this.lightTheTiles(tilesToLight, this.state.players[id].color);
              let newMessage = new UserMessage('onlyOneTileToDry', null, false, [1]);
              this.setState({ whatIsExpectedNext: "TileButtonClickForDry" ,
                              mainUserMessage: newMessage});
            } else {
              this.state.players[id].whereCanHeDry = tilesToLight;
              let nada = this.lightTheTiles(tilesToLight, this.state.players[id].color);
              let newMessage = new UserMessage('nowChooseTwoTilesToDry', null, false, [1]);
              this.setState({ whatIsExpectedNext: "TileButtonClickForDryTwoTimes" ,
                              mainUserMessage: newMessage});
            }
      } else if (action === "Give") {
              let playersAround = this.getPlayersOnTheSameTileExceptMe();
              if (this.state.players[id].cards.length < 1 ){
                alert(lng.noCardToGive);
                this.showActionButtons();
              } else if ( action === "Give" && playersAround.length < 1) {
                  alert(lng.noOtherPlayerOnYourTile);
                  this.showActionButtons();
              } else {
                this.setState({ whatIsExpectedNext: "ResolveUserDialogSequence" ,
                                messageBoardState: "giveACardSequence"});
              }
      } else if (action === "SendACard") {
            if (this.state.players[id].cards.length < 1 ){
              alert(lng.noCardToSend);
              this.showActionButtons();
            } else {
              this.setState({ whatIsExpectedNext: "ResolveUserDialogSequence" ,
                              messageBoardState: "sendACardSequence"});
            }
      } else if (action === "GetATreasure") {
              let treasureId = this.state.tiles[this.state.players[id].position].templeFor;
              if (treasureId === ""){
                alert(lng.thisTileIsNotATemple);
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
                    alert(lng.thisTreasureHasBeenFoundAlready);
                    this.showActionButtons();
                  }
                  else if (cardsIndexes.length < 4){
                    // alert("You do not have enough " + this.getTreasureNameById(treasureId) + " cards to get the treasure... you need 4 , you have " + cardsIndexes.length);
                    alert(lng.notEnoughCards4Treasure.format(this.getTreasureNameById(treasureId), cardsIndexes.length));
                    this.showActionButtons();
                  } else {
                      if (this.state.posessedTreasures.length === 3 ){
                        //alert("You found the 4th treasure ! Now, go to the heliport and leave the Island with an Helicopter card !");
                        alert(lng.youFoundThe4th);
                      } else if (this.state.posessedTreasures.length === 1) {
                        alert(lng.youFoundThe2nd);
                      } else if (this.state.posessedTreasures.length === 2) {
                        alert(lng.youFoundThe3rd);
                      }else {
                        alert(lng.youFoundThe1st);
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

                      let newMessage = new UserMessage(null, lng.youFoundTheTreasureX.format(this.getTreasureNameById(treasureId)), false, [0]);
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
              let newMessage = new UserMessage('doingNothing', null, false, [0]);
              this.setState({ mainUserMessage: newMessage});
      } else if (action === "SkipTurn"){ // skip the whole player turn, goes to next player
             let newMessage = new UserMessage('skipTurn', null, false, [0]);
             this.setState({ mainUserMessage: newMessage,
                              currentStep: 4});
      } else if (action === "DoSleep"){ // finish the actions, go to card picking
             let newMessage = new UserMessage('sleep', null, false, [0]);
             this.setState({ mainUserMessage: newMessage,
                              currentStep: 2});
      }
    }
    else{
      alert (lng.unexpectedClickOnActionButton);
    }
    return null;
}

handleCardClick(card, playerId, toThrowIt){
  let lng = this.state.languageDistributor;
  if (this.state.whatIsExpectedNext !== "TileButtonClickForMove")
  {
    this.hideActionButtons();
    if (card === "helicopterCard" && toThrowIt === false) {
          this.clickedOnHelicopterCard(playerId)
    } else if (card === "sandBagCard" && toThrowIt === false) {
          this.clickedOnSandBagCard(playerId)
    }
  } else {
    alert(lng.pleaseFinishYourActionFirst);
  }
}

// Handles a click on a tile
handleTileClick(i) {
    let lng = this.state.languageDistributor;
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
          alert (lng.heCantMoveThere);
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
            alert (lng.heCantMoveThere);
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
          alert (lng.heCantMoveThere);
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
          alert (lng.heCantDryThere);
        }
      } else if (this.state.whatIsExpectedNext === "TileButtonClickForDryTwoTimes") {
        let newplayers = this.state.players;
        let newplayer = this.state.players[this.state.currentPlayerPlaying];
        if (newplayer.whereCanHeDry.indexOf(i) >= 0){
            // Dry
            this.dryATile(i);
            this.unlightATile(i);
            let newMessage = new UserMessage('nowChooseASecondOneToDry', null, false, []);
            this.hideActionButtons();
            this.setState({ whatIsExpectedNext: "TileButtonClickForDry" ,
                            mainUserMessage: newMessage});
        }
        else {
          alert (lng.heCantDryThere);
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

            // If the currently active is the flyer or if the current player is on the reception ISLAND
            // and destination tile has a guy on it and he's not the messanger,
            // recalculate the current active player possible actions to include the 'give' action unless he is the messenger

            let n_possibleActions = this.state.possibleActions;
            if ((this.state.currentPlayerPlaying === this.state.cardUser
                || this.state.tiles[i].playerOn.indexOf(this.state.currentPlayerPlaying) >= 0)
                && this.state.tiles[i].playerOn.length > 0
                && this.state.currentStep <= 2)
              {
                if (!this.actionIsInThePosibleActionsListAlready("Give")){
                  let y = n_possibleActions.length - 1;
                  n_possibleActions.splice(y, 0, playerDefaultActions[2]);
                }
              }
              else {
                //
              }

              // Same. if after a fly, one lands on a flooded or surrounded by flooded tiles and is currently playing,
              // Check if it's not in possibleActions already and let's add the DRY action
              if (this.state.currentPlayerPlaying === this.state.cardUser
                  && this.state.currentStep <= 2)
              {
                  let dryableTiles = this.whereCanHeDry(i, this.state.players[this.state.cardUser].role);
                  if (dryableTiles.length > 0
                  && !this.actionIsInThePosibleActionsListAlready("Dry") && !this.actionIsInThePosibleActionsListAlready("Dry two tiles")
                  ){
                        n_possibleActions.splice(1, 0, playerDefaultActions[1]);
                  }
                  // n_possibleActions.splice(y, 0, playerDefaultActions[2]);
              }
              else {
                //
              }

              // Same. if after a fly, one lands on a temple and is currently playing,
              // Check if it's not in possibleActions already and let's add the Get A Treasure action
              if (this.state.currentPlayerPlaying === this.state.cardUser
                  && this.state.currentStep <= 2)
              {
                  if (this.state.tiles[i].templeFor.length > 0
                    && !this.actionIsInThePosibleActionsListAlready("Get a Treasure !")){
                    let y = n_possibleActions.length - 1;
                    n_possibleActions.splice(y, 0, playerDefaultActions[3]);
                  }
              } else {
              //
              }

            // Move
            let returnPack = this.moveAGroupOfPlayers(player.id, this.state.coTravellers, i, n_Players, this.state.tiles);
            //

            if (this.state.inAGetRidOfACardContext){
                // hide the actionbuttons
                this.hideActionButtons();
            }

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
                            whatIsExpectedNext_toRestore: null,
                            inAGetRidOfACardContext: false });
            let nada = this.unlightTheTiles();
        } else {
          alert(lng.cantFlyThereWithHisHCard);
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

          if (this.state.inAGetRidOfACardContext){
              this.hideActionButtons();
          }

          this.setState({ whatIsExpectedNext: this.state.whatIsExpectedNext_toRestore,
                          messageBoardState: this.state.messageBoardState_toRestore,
                          mainUserMessage: this.state.mainUserMessage_toRestore,
                          // cardUser: -1,
                          players: NewPlayers,
                          playerCardsDiscard: NewPlayerCardsDiscard,
                          messageBoardState_toRestore: null,
                          whatIsExpectedNext_toRestore: null,
                          mainUserMessage_toRestore: null,
                          inAGetRidOfACardContext: false });
          let nada = this.unlightTheTiles();
        }
        else {
          alert(lng.cantDryThereWithHisCard);
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
                message = message + lng.thereAreXpeopleToEvacuate.format(n_guysToEvacuate.length);
                n_userMessage = new UserMessage(null, message , false, [8]);
            }
            else if (floodNumber === floodTotal){
              // floodings are finished
              floodingSequence = null;
              message = message + lng.floodingsAreOverForNow;
              n_userMessage = new UserMessage(null, message , false, [0]);
            }
            else {
              // next flooding
              let databag = {nextFloodingNumber: floodNumber + 1, outOf: floodTotal};
              message = message + lng.floodingsGoesOn;
              n_userMessage = new UserMessage(null, message , false, [5], databag);
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
          alert (lng.heCantMoveThere);
        }
      } else {
        alert (lng.unexpectedClickOnATile);
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
    let lng = this.state.languageDistributor;
    let nada = this.unlightTheTiles();
    let newMessage = new UserMessage('chooseAnAction_msg', null , false, []);

    if (!this.state.inAGetRidOfACardContext && this.state.currentStep < 3){
      this.showActionButtons();
    }
    this.setState({
      whatIsExpectedNext: "CharacterActionButtonClick" ,
      messageBoardState: "default",
      mainUserMessage : newMessage});
  }

  doMoveSomeOne(puppet) {
    let lng = this.state.languageDistributor;
    let whereCanHeMove = this.whereNavigatorCanMoveHim(this.state.players[puppet].position);
    this.state.players[puppet].whereCanHeMove = whereCanHeMove;
    let n_players = this.state.players;
    n_players[puppet].isPuppet = true;
    this.lightTheTiles(whereCanHeMove, this.state.players[puppet].color);
    let newMessage = new UserMessage('chooseADestination', null, false, []); // TODO : SET a cancel
    this.setState({ whatIsExpectedNext: "TileButtonClickForMoveSomeone" ,
                    mainUserMessage: newMessage,
                    messageBoardState : "default",
                    players : n_players });
  }

  doGiveACard(giver, card, receiver){
    let lng = this.state.languageDistributor;
    // alert("GIVE A CARD : " + giver + " will give the " + card + " to " + receiver);
    console.log("PRE  Given : " + card + " to " + receiver);
    if (card == null){
      alert(lng.pleaseSelectACardToGive);
    } else if (receiver == null){
      alert(lng.pleaseSelectARecipientForTheCard);
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
      <DrawEmptySquare  onClick={() => this.launchGameOver(false, true, "Yolo")} />
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
    let isPlaying = this.state.currentPlayerPlaying === i; // bool
    let boardClass = isPlaying?  ('playerBoard playerBoardPlaying') : ('playerBoard ');
    let player = this.state.players[i];
    let str_roleQualifier = this.getStringInTheCatalog(this.state.languageDistributor, player.roleQualifier);
    let str_roleAttachedToName = this.getStringInTheCatalog(this.state.languageDistributor, player.roleAttachedToName);
    let str_abilityHelp = this.getStringInTheCatalog(this.state.languageDistributor, player.playersAbility);


    return (
      <div className={boardClass}>
        <span className="inBoardName">{player.name}</span>&nbsp;{str_roleQualifier}&nbsp;
        <span className="inBoardRole" style={{color: player.color}}>{str_roleAttachedToName}</span>
        <a className="tooltips helpCharacterIcon" id={'tooltip' + i} href="#">?<span className="inToolTipsText">{str_abilityHelp}</span></a>
        <br/>
        <div className="inBoardCards">
          {
            this.state.players[i].cards.map((card, index) => {
              if (card){
                return card.name === "helicopter" ?
                    <span key={index} className="activableBoardPlayerCards">
                      <img src={card.url} width="45px" height="70px" onClick={() => this.handleCardClick("helicopterCard", this.state.players[i].id, false)}/>
                      <span className="spanOverHand"><img id={"actionCard:" + index + "::" + i} className="overHand doRotate" src="img/hand.png"/></span>
                    </span>
                  : card.name === "sandBag" ?
                      <span key={index} className="activableBoardPlayerCards">
                        <img src={card.url} width="45px" height="70px" onClick={() => this.handleCardClick("sandBagCard", this.state.players[i].id, false)}/>
                        <span className="spanOverHand"><img id={"actionCard:" + index + "::" + i} className="overHand doRotate" src="img/hand.png"/></span>
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
    let lng = this.state.languageDistributor;
    let currentPlayer = this.state.players[this.state.currentPlayerPlaying];
    let str_roleQualifier = this.getStringInTheCatalog(lng, currentPlayer.roleQualifier);
    let str_roleAttachedToName = this.getStringInTheCatalog(lng, currentPlayer.roleAttachedToName);
    let str_currentStep = this.getStringInTheCatalog(lng, playerSteps[this.state.currentStep].name);
    let langToggleImg = this.state.selectedLanguage === "FR" ? "img/toggle_right.png" : "img/toggle_left.png";

    // TODO order the inputs

    return (
      <span>
        <div className="messagePanel">
          <div className="panelTitle"> {lng.mainTitle01}<br/>::ReactJS::<br/>{lng.mainTitle02} <span className="littlePanelInfo">v.0.5.1</span></div>
          <div className="littlePanelInfo">English <img id="langToggle" src={langToggleImg} onClick={() => this.doChangeLang()} /> Français</div>
          <div className="littlePanelInfo">{lng.turn} {this.state.turn} | {lng.level} {this.state.difficultyLevelString}</div>
          <div className="littlePanelInfo">{lng.treasuresFound} : {foundTreasures}/4 </div>
          <div className="littlePanelInfo"> {lng.floodLevel} {this.state.floodMeter.level} {lng.xCardsPerFlood.format(this.state.floodMeter.floodFactor)}</div>
          <div className="panelInfo"> {currentPlayer.name}&nbsp;{str_roleQualifier}&nbsp;<span style={{color: currentPlayer.color}}>{str_roleAttachedToName}</span>&nbsp;{lng.isPlaying}
          <br/><span className="littlePanelInfo"> {str_currentStep} </span></div>
        </div>
        <div className="actionPanel">
          <div className="panelInfo" id="UserActions">
            <ul>
              {this.state.possibleActions.map((action, index) =>
                <li key={action.name}>
                    <button className="actionButton" onClick={() => this.handleActionClick(action.triggers)} >
                      {this.getStringInTheCatalog(lng, action.locName)}
                    </button>
                    <a className="actionTooltips helpCharacterIcon" id={'tooltipAction' + index} href="#">?<span className="inToolTipsText">{this.getStringInTheCatalog(lng, action.locHelp)}</span></a>
                  </li>
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
    let lng = this.state.languageDistributor;
    if (this.state.messageBoardState === "giveACardSequence"){
      let giverId = this.state.players[this.state.currentPlayerPlaying].id;
      let playersOnTheSameTileExceptMe = this.getPlayersOnTheSameTileExceptMe();
      console.log('playersOnTheSameTileExceptMe = ' + playersOnTheSameTileExceptMe);// seems Ok
      let chosenCard = this.state.players[giverId].cards.length === 1 ? this.state.players[giverId].cards[0].id : null;
      let receiver = playersOnTheSameTileExceptMe.length === 1 ? playersOnTheSameTileExceptMe[0] : null;

      return (
          <div>
            {lng.whichCardDoYouWantToGive}
                { playersOnTheSameTileExceptMe.length === 1 ?
                  (<span> {lng.to} <span style={{color: this.state.players[playersOnTheSameTileExceptMe[0]].color}}>{ this.state.players[playersOnTheSameTileExceptMe[0]].name} </span></span> )
                  : <span></span>
                }
            ? <br/>
            <table className="throwTable">
              <tbody>
            {
              this.state.players[giverId].cards.length === 1 ?
              <tr>
                <td><span key="card0" /><input type="radio" name="chosenCard" key="0" checked="checked" value={this.state.players[giverId].cards[0].id} onChange={() => chosenCard = this.state.players[giverId].cards[0].id} /></td>
                <td>{ this.getStringInTheCatalog(lng, this.state.players[giverId].cards[0].loc_key)} </td>
                <td><img src= {this.state.players[giverId].cards[0].url}  width="20px" height="32px"/></td>
              </tr>
              :
              this.state.players[giverId].cards.map((card, index) =>
              <tr>
                <td><span key={'card'+index}/><input type="radio" name="chosenCard" key={index} value={card.id} onChange={() => chosenCard = card.id} /></td>
                <td><img src= {card.url}  width="20px" height="32px"/></td>
                <td>{this.getStringInTheCatalog(lng, card.loc_key)}</td>
              </tr>
              )
            }
              </tbody>
            </table>
            {
              playersOnTheSameTileExceptMe.length > 1 ?
              <span>{lng.toWhomDoYouWantToGiveIt}<br/></span>
              :
              <span></span>
            }
            {
              playersOnTheSameTileExceptMe.length > 1 ?
                playersOnTheSameTileExceptMe.map((player, index) => {
                    return <span key={'char'+index}><input type="radio" name="receiver" key={index} value={this.state.players[player].id} onChange={() => receiver = this.state.players[player].id}/><span style={{color: this.state.players[player].color}}>{this.state.players[player].name}</span><br/></span>
                  })
                :
                <span></span>
            }
            <button className="actionButton" value="Give" onClick={() => this.doGiveACard(giverId, chosenCard, receiver)}> {lng.btn_give} </button>
            <button className="actionButton" value="Cancel" onClick={() => this.cancelAnAction()}>{lng.btn_cancel}</button>
          </div>
      )
    } else if (this.state.messageBoardState === "sendACardSequence") {
      let giverId = this.state.players[this.state.currentPlayerPlaying].id;
      let otherPlayers = this.getPlayersIdsExceptMe(giverId);
      let chosenCard = this.state.players[giverId].cards.length === 1 ? this.state.players[giverId].cards[0].id : null;
      let receiver = otherPlayers.length === 1 ? otherPlayers[0] : null;

      return (
          <div>
            {lng.whichCardDoYouWantToSend}
                    { otherPlayers.length === 1 ?
                      (<span> {lng.to} <span style={{color: this.state.players[otherPlayers[0]].color}}> {this.state.players[otherPlayers[0]].name} </span></span> )
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
                <td>{ this.getStringInTheCatalog(lng, this.state.players[giverId].cards[0].loc_key) } </td>
              </tr>
              :
              this.state.players[giverId].cards.map((card, index) =>
              <tr>
                <td><span key={'card'+index}/><input type="radio" name="chosenCard" key={index} value={card.id} onChange={() => chosenCard = card.id} /></td>
                <td><img src= {card.url}  width="20px" height="32px"/></td>
                <td>{ this.getStringInTheCatalog(lng, card.loc_key)}</td>
              </tr>
              )
            }
              </tbody>
            </table>
            {
              otherPlayers.length > 1  ?
              <span>{lng.toWhomDoYouWantToSendIt}<br/></span>
              :
              <span></span>
            }
            {
              otherPlayers.length > 1 ?
                 this.state.players.map((player, index) => {
                  return (player.id != giverId) ?
                    (<span key={'char'+index}><input type="radio" name="receiver" key={index} value={player.id} onChange={() => receiver = player.id}/><span style={{color: player.color}}>{player.name}</span><br/></span>)
                    :
                    (<span key={'char'+index}></span>)
                  })
                :
                <span></span>
            }
            <button className="actionButton" value="Give" onClick={() => this.doGiveACard(giverId, chosenCard, receiver)}> {lng.btn_send} </button>
            <button className="actionButton" value="Cancel" onClick={() => this.cancelAnAction()}>{lng.btn_cancel}</button>
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
                     (<div> <span style={{color: this.state.players[flyerId].color}}>{this.state.players[flyerId].name}</span>{lng.playerChooseALandingDestination}</div>)
                    : playersOnTheSameTileExceptMe.length === 1 ? // Ok
                       (<div> <span style={{color: this.state.players[flyerId].color}}>{this.state.players[flyerId].name}</span>{lng.doYouWantToTake}<span style={{color: this.state.players[playersOnTheSameTileExceptMe[0]].color}}>{this.state.players[playersOnTheSameTileExceptMe[0]].name}</span>{lng.withYou} <br/>
                         <input type="radio" name="coTraveller" key="yes" value="yes" onChange={() => travellers = [flyerId, playersOnTheSameTileExceptMe[0]]}/> {lng.btn_yes}<br/>
                         <input type="radio" name="coTraveller" key="no" value="no" onChange={() => travellers = [flyerId]}/>{lng.btn_no}<br/>
                       </div>)
                      :
                        (<div><span style={{color: this.state.players[flyerId].color}}>{this.state.players[flyerId].name}</span>{lng.selectTheGuys}<br/>
                        {
                          playersOnTheSameTileExceptMe.map((playerId, index) => {
                             return <span key={index}><input type="checkBox" name="traveller" id={"checkBoxAmadeusFor"+playerId} key={index} value={playerId} onChange={() => Amadeus(playerId, "checkBoxAmadeusFor"+playerId)} /><span style={{color: this.state.players[playerId].color}}>{this.state.players[playerId].name}</span><br/></span>
                          })
                        }
                        </div>)
            }
            <button className="actionButton" onClick={() => this.helicopterCardEnRoute(flyerId, travellers)}>{lng.hopIn}</button>
          </div>
        )
    } else if (this.state.messageBoardState === "moveSomeOneSequence") {
      let puppet = null;
          return (
            <div>
              {lng.whoDoYouWantToMove} <br/>
              {
              (this.state.players.map((player, index) => {
                return (player.role != "Navigator") ?
                  (<span key={index}><input type="radio" name="puppet" key={index} value={player.id} onChange={() => puppet = player.id}/><span style={{color: player.color}}>{player.name}</span><br/></span>)
                  :
                  (<span key={index}></span>)
                }))
              }
              <button className="actionButton" value="Give" onClick={() => this.doMoveSomeOne(puppet)}>{lng.moveThisCharacter} </button>
            </div>
          )
    } else if (this.state.messageBoardState === "SolveOver5Cards") {

      // TODO set a RED border
      let userId = this.state.cardUser;
      let color = this.state.players[userId].color;
      let name = this.state.players[userId].name;
      let cardsInHand = this.state.players[userId].cards;
      // console.log("user is : " + user + ". His cards : " + cardsInHand);

      return(
        <div>
          <span  style={{color: color}}>{name}</span> {lng.hasMoreThan5Card}<br/>
          {lng.letsGetRidOvIt} <br/>
          <table className="throwTable">
            <tbody>
          {
            (this.state.players[userId].cards.map((card, index) => {
              return (card.type === "H" || card.type === "SB") ?
                  (<tr>
                    <td><span key={index}/>{card.name}</td>
                    <td> <img src= {card.url}  width="20px" height="32px"/></td>
                    <td><button onClick={() => this.throwCard(card.type, index, userId)}>{lng.btn_throw}</button></td>
                    <td><button onClick={() => this.useACardToGetRidOfIt(card.type, index, userId)}>{lng.btn_use}</button></td>
                  </tr>)
                  :
                  (<tr>
                    <td><span key={index}/>{card.name}</td>
                    <td> <img src= {card.url}  width="20px" height="32px"/></td>
                    <td><button onClick={() => this.throwCard(card.type, index, userId)}>{lng.btn_throw}</button></td>
                    <td>&nbsp;</td>
                  </tr>)
            }))
          }
            </tbody>
          </table>
        </div>
      )
    } else if (this.state.messageBoardState === "empty"){
          <div>++ empty ++</div>
    } else {
      let lng = this.state.languageDistributor;
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

      //complexMessages Are already translated.
      let msgEts = this.state.mainUserMessage.complexMessage;

      let translatedString = "";
      if (this.state.mainUserMessage.complexMessage && this.state.mainUserMessage.complexMessage.length > 0){
        translatedString = this.state.mainUserMessage.complexMessage;
      }
      else {
        translatedString = this.getStringInTheCatalog(lng, this.state.mainUserMessage.message);
      }

      return(
          <div><span id="mainMessage" dangerouslySetInnerHTML={{__html: translatedString}} />

          {
            !gameIsOver ?
              (<div>
                <button style={showNextBtnStyle} onClick ={() => this.controller("ActionIsDone")}>{lng.btn_next}</button>
                <button style={showCancelBtnStyle} onClick ={() => this.cancelAnAction()}>{lng.btn_cancel}</button>
                <button style={showPick2CardsBtnStyle01} onClick ={() => this.controller("PickTwoCardsONE")}>{lng.btn_pickTwoCardsFirst}</button>
                <button style={showPick2CardsBtnStyle02} onClick ={() => this.controller("PickTwoCardsTWO")}>{lng.btn_pickTwocardsSec}</button>
                <button style={showFloodBtnStyle} onClick ={() => this.controller("PlayerFlood")}>{lng.btn_flood}</button>
                <button style={showNextFloodingBtnStyle} onClick ={() => this.doFloodATile(databag.nextFloodingNumber, databag.outOf)}>{lng.btn_nextFlooding}</button>
                <button style={showCancelSandBagCardStyle} onClick ={() => this.cancelSandBagCardPick()}>{lng.btn_cancel}</button>
                <button style={showCancelHelicopterCardStyle} onClick ={() => this.cancelHelicopterCardPick()}>{lng.btn_cancelTheFlight}</button>
                <button style={showEvacuateStyle} onClick ={() => this.doEvacuate()}>{lng.btn_evacuate}</button>
                <button style={showCheckIfMoreThan5Style} onClick ={() => this.doCheckIfMoreThan5CardsInHand(0, databag.userId)}>{lng.btn_next}</button>
                <button style={showCheckIfMoreThan5SecondTimeStyle} onClick ={() => this.doCheckIfMoreThan5CardsInHand(1, this.state.cardUser)}>{lng.btn_next}</button>
              </div>)
              :
              (<div><button onClick ={() => this.retry()}>{lng.btn_retry}</button></div>)
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

  graphicallyDoDrawnATile(i){
    document.getElementById("square" + i).style.border = "1px solid #FFF0";
  }

  retry(){
    window.location.reload();
  }

  getTreasureNameById(id){
    console.log("In getTreasureById with : " + id);
    for (let i = 0; i < treasures.length; i ++){
      if (treasures[i].id === id){
        return this.getStringInTheCatalog(this.state.languageDistributor, treasures[i].loc_key);
      }
    }
    return "** Unknown Treasure was " + id + "**";
  }

  actionIsInThePosibleActionsListAlready(actionName){
    for(let i = 0 ; i < this.state.possibleActions.length; i++){
      if (this.state.possibleActions[i].name === actionName){
        return true;
      }
    }
    return false;
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

  doChangeLang(){
    if (this.state.languageDistributor.currentLanguage === "FR"){
        document.getElementById("langToggle").src = "img/toggle_left.png";
        this.setState({languageDistributor: stringsCatalog.en});
        // TODO : reload the MainMessage
    } else {
        document.getElementById("langToggle").src = "img/toggle_right.png";
        this.setState({languageDistributor: stringsCatalog.fr});
        // TODO : reload the MainMessage
    }
  }

  doSetLang(lang){
    if (lang === "FR" && !this.state.languageDistributor.currentLanguage === "FR"){
        this.setState({languageDistributor: stringsCatalog.fr});
    } else if (lang === "EN" && !this.state.languageDistributor.currentLanguage === "EN"){
        this.setState({languageDistributor: stringsCatalog.en});
    }
  }

  getStringInTheCatalog(distributor, input){
      var catalog = Object.entries(distributor);
      var stringInput = input.toString();
      for (let i = 0 ; i < catalog.length; i++){
          if (catalog[i][0] == stringInput){
            return catalog[i][1];
          }
      }
      return "YYYYY FIX ME YYYYY";
  }

  launchGameOver(gameIsWon, gameIsLost, msg){
    alert ("Mow SHOULDN't BE USED ANY MORE");
    this.setState({
      gameIsOver: true,
      gameIsLost: gameIsLost,
      gameIsWon: gameIsWon,
      endMessage: msg,
    });
  }

  renderGameOverPanel(msg) {
    let lng = this.state.languageDistributor;
    return (
        <span>
          <div className="game-over-title">[ Gamovah' ]</div>
          <div className="game-over-msg">{msg}</div>
          <div className="game-over-btn"><button onClick ={() => this.retry()}>{lng.btn_retry}</button></div>
        </span>
    );
  }

  renderVictoryPanel(i) {

    let lng = this.state.languageDistributor;
    let msg = lng.youWonMsg.format(this.state.nbrOfPlayers);
    // alert("pow");
    return (
        <span>
          <div className="game-over-title">[ congratulations ]</div>
          <div className="game-over-msg">{msg}</div>
          <div className="game-over-btn"><button onClick ={() => this.retry()}>{lng.btn_retry}</button></div>
        </span>
    );
  }

  // rendering de Board
  render() {
      // Flood-O-meter values for the needle
      let position_value = "relative";
      let left_value = 5 + ((this.state.floodMeter.level - 1) * 33);
      let top_value = -70;
      let lng = this.state.languageDistributor;

    return (
      <div>
      <div class="littleCopyrightLine">{lng.copyright}</div>
      <div>
        {this.state.gameIsLost ?
          <div id="game-over-panel" className="game-lost-panel">
            {this.renderGameOverPanel(this.state.endMessage)}
          </div> : <div></div>
        }
        {this.state.gameIsWon ?
          <div id="game-over-panel" className="game-won-panel">
            {this.renderGameOverPanel(this.state.endMessage)}
          </div> : <div></div>
        }
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
            <tr><th colSpan="2" width="173px">{this.state.languageDistributor.playerCards}</th><th colSpan="2" width="150px">{this.state.languageDistributor.floodCards}</th></tr>
            <tr style={{height: '18px'}}>
              <td width="60px">{this.state.languageDistributor.leap}</td><td width="113px"><table className="invisiTable"><tbody><tr className="invisiTable"><td className="jaugePlayer invisiTable" style={{width: this.state.playerCardsLeap.length *2}}></td><td className="superSmall invisiTable">{this.state.playerCardsLeap.length}</td></tr></tbody></table></td>
              <td width="60px">{this.state.languageDistributor.leap}</td><td width="113px"><table className="invisiTable"><tbody><tr className="invisiTable"><td className="jaugeFlood invisiTable" style={{width: this.state.floodCardsLeap.length *2}}></td><td className="superSmall invisiTable">{this.state.floodCardsLeap.length}</td></tr></tbody></table></td>
            </tr>
            <tr>
              <td width="60px">{this.state.languageDistributor.discard}</td><td width="113px"><table className="invisiTable"><tbody><tr className="invisiTable"><td className="jaugePlayer invisiTable" style={{width: this.state.playerCardsDiscard.length *2}}></td><td className="superSmall invisiTable">{this.state.playerCardsDiscard.length}</td></tr></tbody></table></td>
              <td width="60px">{this.state.languageDistributor.discard}</td><td width="113px"><table className="invisiTable"><tbody><tr className="invisiTable"><td className="jaugeFlood invisiTable" style={{width: this.state.floodCardsDiscard.length *2}}></td><td className="superSmall invisiTable">{this.state.floodCardsDiscard.length}</td></tr></tbody></table></td>
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
   constructor(props) {
    super(props);

    this.state = {
      showStartPanel: true,
      showBoardPanel: true,
      showGameOverPanel: false,
      languageDistributor: stringsCatalog.fr,
      difficultyLevel: 4, // INIT
      language: "FR",
      nbrOfPlayers: 4 // INIT
    };
   }

    doChangeLangSelector(){
       if (this.state.language === "FR"){
           document.getElementById("homeLangToggle").src = "img/toggle_left.png";
           this.setState({language: "EN",
                          languageDistributor: stringsCatalog.en });
       } else {
           document.getElementById("homeLangToggle").src = "img/toggle_right.png";
           this.setState({language: "FR",
                          languageDistributor: stringsCatalog.fr});
           // TODO : reload the Panel with proper language
       }
     }

     doChangeNbrOfPlayers(x){
       this.setState({ nbrOfPlayers: x});
     }

     doChangeDifficulty(x){
       this.setState({ difficultyLevel: x});
     }

     launchBoard(){
        this.setState(
          { difficultyLevel: this.state.difficultyLevel,
            nbrOfPlayers: this.state.nbrOfPlayers,
            showStartPanel: false,
            showBoardPanel: true });

          ReactDOM.render(
            <Board nbrOfPlayers={this.state.nbrOfPlayers} difficultyLevel={this.state.difficultyLevel} language={this.state.language}/>,
            document.getElementById('game-board'));
     }

  render() {
    //
/*
    let difficultyLevel = 0;
    let language = "FR";
    let nbrOfPlayers = 4;
    */
    let lng = this.state.languageDistributor;


    const showHideStartPanel = {
      'display': this.state.showStartPanel ? 'block' : 'none'
    };

    const showHideGameOverPanel = {
      'display': this.state.showGameOverPanel ? 'block' : 'none'
    };

    const showHideBoardPanel = {
      'display': this.state.showBoardPanel ? 'block' : 'none'
    };
    //

    let radioHowMany2 = this.state.nbrOfPlayers === 2 ? "checked" : "";
    let radioHowMany3 = this.state.nbrOfPlayers === 3 ? "checked" : "";
    let radioHowMany4 = this.state.nbrOfPlayers === 4 ? "checked" : "";

    let radioDifficulty1 = this.state.difficultyLevel === 1 ? "checked" : "";
    let radioDifficulty2 = this.state.difficultyLevel === 2 ? "checked" : "";
    let radioDifficulty3 = this.state.difficultyLevel === 3 ? "checked" : "";
    let radioDifficulty4 = this.state.difficultyLevel === 4 ? "checked" : "";

    return (
      <div className="game">
        <div className="game-board" id="game-board" style={showHideBoardPanel}></div>
        <div id="start-panel" className="game-start-panel" style={showHideStartPanel}>
          <div></div>
          <div className="panelTitle"> {lng.mainTitle01}<br/>::ReactJS::<br/>{lng.mainTitle02} <span className="littlePanelInfo">v.0.5.1</span></div>
          <div className="introChoices">
            <div>{lng.welcomeIntro}</div>
            <div>{lng.howManyAdventurers}
                  | 2 <input type="radio" name="howManyAdventurers" key="howManyAdventurers2" checked={radioHowMany2} value='2' onChange={() => this.doChangeNbrOfPlayers(2)}/> |
                    3 <input type="radio" name="howManyAdventurers" key="howManyAdventurers3" checked={radioHowMany3} value='3' onChange={() => this.doChangeNbrOfPlayers(3)}/> |
                    4 <input type="radio" name="howManyAdventurers" key="howManyAdventurers4" checked={radioHowMany4} value='4' onChange={() => this.doChangeNbrOfPlayers(4)}/> |
            </div>
            <div>{lng.howDifficult}
                    | {lng.novice} <input type="radio" name="WhichDifficulty" key="WhichDifficulty1" checked={radioDifficulty1} value='1' onChange={() => this.doChangeDifficulty(1)}/> |
                    {lng.normal} <input type="radio" name="WhichDifficulty" key="WhichDifficulty2" checked={radioDifficulty2} value='2' onChange={() => this.doChangeDifficulty(2)}/> |
                    {lng.elite} <input type="radio" name="WhichDifficulty" key="WhichDifficulty3" checked={radioDifficulty3} value='3' onChange={() => this.doChangeDifficulty(3)}/> |
                    {lng.legendary} <input type="radio" name="WhichDifficulty" key="WhichDifficulty4" checked={radioDifficulty4} value='4' onChange={() => this.doChangeDifficulty(4)}/> |
              </div>
            <div>{lng.language} English <img id="homeLangToggle" src="img/toggle_right.png" onClick={() => this.doChangeLangSelector()} /> Français</div>
            <div><button onClick={() => this.launchBoard()}>{lng.letsGo}</button></div>
          </div>
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
  constructor(id, type, role, color, name, roleAttachedToName, roleQualifier, ability, position, cards, isInGame, leftTheIsland) {
    this.id = id; // int
    this.type = type; // int
    this.role = role // string
    this.color = color; // string in hexa
    this.name = name; // string
    this.roleAttachedToName = roleAttachedToName;
    this.roleQualifier = roleQualifier;
    this.playersAbility = ability; // string
    this.position = position; // int
    this.cards = cards; // string[]
    this.isInGame = isInGame; // bool
    this.leftTheIsland = leftTheIsland; // bool
    this.whereCanHeMove = null;
    this.whereCanHeDry = null;
    this.imgpath = "/images/char" + role + ".png"; // string

    printIntroduction: {
        console.log(`My name is ${this.name}. Im an ${this.role} and my color is ${this.color}`);
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
    // fix flood scale :  |12|345|67|89|
    //                    |2 |3  |4 |5 |
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

// WORKS ! un custom string.format
String.prototype.format = function() {
  var args = arguments;
  return this.replace(/{(\d+)}/g, function(match, number) {
    return typeof args[number] != 'undefined'
      ? args[number]
      : match
    ;
  });
};

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
        let card = { id : i, name : "crystal", loc_key: "ca_crytal", type : "CR", url : "img/crystalCard.png"};
        cards.push(card);
    }
    for (let i = 0; i < 5; i++){
        let card = { id : i + 5, name : "cup", loc_key: "ca_cup", type : "CU", url : "img/cupCard.png"};
        cards.push(card);
    }
    for (let i = 0; i < 5; i++){
        let card = { id : i + 10, name : "sceptre", loc_key: "ca_sceptre", type : "SC", url : "img/sceptreCard.png"};
        cards.push(card);
    }
    for (let i = 0; i < 5; i++){
        let card = {id : i + 15, name : "statue", loc_key: "ca_statue", type : "ST", url : "img/statueCard.png"};
        cards.push(card);
    }
    for (let i = 0; i < 3; i++){
        let card = { id : i + 20, name : "helicopter", loc_key: "ca_helicopter", type : "H", url : "img/helicopterCard.png"};
        cards.push(card);
    }
    for (let i = 0; i < 2; i++){ // 2 cards
        let card = { id : i + 23, name : "sandBag", loc_key: "ca_sandBag", type : "SB", url : "img/sandBagCard.png"};
        cards.push(card);
    }
    for (let i = 0; i < 3; i++){ // 3 cards
        let card = { id : i + 25, name : "floodRise", loc_key: "ca_floodRise", type : 5, url : "img/floodRise.png"};
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
          i, type, playerTypes[type].role, playerTypes[type].color, playerTypes[type].name, playerTypes[type].roleAttachedToName, playerTypes[type].roleQualifier, playerTypes[type].ability, 0, [], true, false
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
