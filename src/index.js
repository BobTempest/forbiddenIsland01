import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import {stringsCatalog} from './strings.js';

const logHost = "https://www.boulezrepublic.com/lileinterdite/logs/receiver.php";

const playerTypes = [
  {
    id : 0,
    role : "Engineer", // dry two tiles for one actions
    shortRole : "Engr",
    color : "#CC0000", // red
    ability : "ab_Engineer",
    name : "Natacha",
    roleAttachedToName: "ro_Engineer",
    roleQualifier: "qualificatif_N"
  },
  {
    id : 1,
    role : "Navigator", // move another player from one or two tiles (straight ?) for one action
    shortRole : "Nav",
    color : "#FFF200", //yellow
    ability : "ab_Navigator",
    name : "Boris",
    roleAttachedToName: "ro_Navigator",
    roleQualifier: "qualificatif_M"
  },
  {
    id : 2,
    role : "Messenger", // can give one card for one action to anyone
    shortRole : "Msgr",
    color : "#FFFFFF", //white
    ability : "ab_Messenger",
    name : "Francois",
    roleAttachedToName: "ro_Messenger",
    roleQualifier: "qualificatif_M"
  },
  {
    id : 3,
    role : "Diver", // can move one wet case and one other case
    shortRole : "Divr",
    color : "#000000", // black
    ability : "ab_Diver",
    name : "Gina",
    roleAttachedToName: "ro_Diver",
    roleQualifier: "qualificatif_F"
  },
  {
    id : 4,
    role : "Explorer", // can move and dry orth and diagonaly
    shortRole : "Expl",
    color : "#0AB300", //green
    ability : "ab_Explorer",
    name : "Brian",
    roleAttachedToName: "ro_Explorer",
    roleQualifier: "qualificatif_N"
  },
  {
    id : 5,
    role : "Pilot", // once per turn, fly where you want for 1 action
    shortRole : "Pilot",
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

 // const gameSteps = ["init", "startTurn", "playerActionOne", "playerActionTwo", "playerActionThree", "playerPickACard", "floodRise", "endTurn", "final"];

 const treasures = [
     { id : "CR" , name : "crystal", loc_key : "tr_crystal", trophyImg : "img/wonCrystal.png", litTempleImg : "img/tower_crystal.png", loc_found_msg_key : "found_crystal" },
     { id : "CU" , name : "cup", loc_key : "tr_cup", trophyImg : "img/wonCup.png", litTempleImg : "img/tower_cup.png", loc_found_msg_key : "found_cup"  },
     { id : "SC" , name : "sceptre", loc_key : "tr_sceptre", trophyImg : "img/wonSceptre.png", litTempleImg : "img/tower_sceptre.png", loc_found_msg_key : "found_sceptre" },
     { id : "ST" , name : "statue", loc_key : "tr_statue", trophyImg : "img/wonStatue.png", litTempleImg : "img/tower_statue.png", loc_found_msg_key : "found_statue" }
 ];

 const playerSteps = [
     {id : 0, name : "act1outOf3", wording : "step_act1outOf3" },
     {id : 1, name : "act2outOf3", wording : "step_act2outOf3" },
     {id : 2, name : "act3outOf3", wording : "step_act3outOf3" },
     {id : 3, name : "DrawPlayerCards01", wording : "step_DrawPlayerCards" },
     {id : 4, name : "DrawPlayerCards02", wording : "step_DrawPlayerCards" },
     {id : 5, name : "DrawFloodCards", wording : "step_DrawFloodCards" }
 ];

/*
 const endings = [
    {id : 0, name : "gameNotFinished", loc_key : "" },
    {id : 1, name : "aventurerIsDrawned", loc_key : "end_aventurerIsDrawned" },
    {id : 2, name : "islandSunk", loc_key : "end_islandSunk" },
    {id : 3, name : "templeDisapeared", loc_key : "end_templeDisapeared" },
    {id : 4, name : "heliportDisapeared", loc_key : "end_heliportDisapeared" },
    {id : 9, name : "victory", loc_key : "end_victory" }
 ];
 */

/*
  const levels = [
    {id : 0, loc_key : "novice" },
    {id : 1, loc_key : "normal" },
    {id : 2, loc_key : "elite" },
    {id : 3, loc_key : "legendary" },
  ];
  */

 const playerDefaultActions = [
      {id : 0, name : "Move", locName: "ac_move", locHelp: "ah_move", enabled : true, triggers : "Move" }, //has an adjacent tile around ?
      {id : 1, name : "Dry", locName: "ac_dry", locHelp: "ah_dry", enabled : true, triggers : "Dry"  }, //has an adjacent immersed tile around ?
      {id : 2, name : "Give", locName: "ac_give", locHelp: "ah_give", enabled : true, triggers : "Give" }, //has a player on his tile ?
      {id : 3, name : "Get a Treasure !", locName: "ac_getATreasure", locHelp: "ah_getATreasure", enabled : true, triggers : "GetATreasure"  }, // has 4 cards and is on the right temple
      /* {id : 4, name : "DoNothing", text: "Simply do nothing.", enabled : true, triggers : "DoNothing"  }, // -
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
   {id : 5, name : "Fly", locName: "ac_fly", forRole: "Pilot", replacesAction: "-", locHelp: "ah_fly", enabled : true, triggers : "Fly"  },// any other non drawned tile
   {id : 6, name : "Move/Dive", locName: "ac_MoveDive", forRole: "Diver", replacesAction: "0", locHelp: "ah_MoveDive", enabled : true, triggers : "Dive"  }, // a tile to dive to
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
  } else if (props.tile.isDrawned) {
      squareStyle = ({background: 'transparent' });
  } else if (props.tile.isDrawning) {
        squareStyle = ({background: 'url(img/drawning03.png)', border: 'none' });
  } else if (props.tile.imgpath.length > 0 && props.tile.name === "helipad") {
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
  }
  else {
    squareClass = 'square';
  }

  if (props.doBlink){
    squareClass = squareClass + ' blink';
  }

  if (props.tile.isDrawning){
    squareClass = 'drawningSquare selfRotate';
  }

  let squareId =  "square" + props.index;

  return (
    <div className={squareClass} style={squareStyle} id={squareId} onClick={props.onClick} >
      <span className="inSquarePosition">{props.tile.position}</span><br/>
      <span className="inSquareLittleText">{props.tile.LittleTextToDisplay}</span>
      {
        props.tile.playerOn.length > 0 ?
        <DrawPlayerPawns pawns={props.tile.playerOn} players={props.players} blinkPlayer={props.blinkPlayer}/>
        :
        null
      }
    </div>
  );
}

function DrawEmptySquare(props) {
  return (
    <div className="emptySquare" onClick={props.onClick}></div>
  );
}

function DrawEmptySquareWithTreasure(props) {
  return (
      <div className="emptySquare treasureTooltips" id={'tooltipTreasure' + props.id} >
          <span className="inToolTipsText">{props.text}</span>
          <img className="trophyImage" src={props.imagePath} />
      </div>
  );
}

function DrawPlayerPawns(props){
  if (props.pawns && props.pawns.length === 1){
    return (
      <div className="playerPawn singlePP">
      {
        <DrawOnePlayerPawn className={props.players[props.pawns[0]].id === props.blinkPlayer ? "blink2" : ""} color={props.players[props.pawns[0]].color} />
      }
      </div>
    );
  }
  else if(props.pawns && props.pawns.length === 2){
    return (
      <div className="playerPawn twoPP">
      {
        <DrawOnePlayerPawn className={props.players[props.pawns[0]].id === props.blinkPlayer ? "blink2" : ""} color={props.players[props.pawns[0]].color} />
      }
      &nbsp;
      {
        <DrawOnePlayerPawn className={props.players[props.pawns[1]].id === props.blinkPlayer ? "blink2" : ""} color={props.players[props.pawns[1]].color} />
      }
      </div>
    );
  }
  else if(props.pawns && props.pawns.length === 3){
    return (
      <div className="playerPawn multilinePP">
      {
        <DrawOnePlayerPawn className={props.players[props.pawns[0]].id === props.blinkPlayer ? "blink2" : ""} color={props.players[props.pawns[0]].color} />
      }
      &nbsp;
      {
        <DrawOnePlayerPawn className={props.players[props.pawns[1]].id === props.blinkPlayer ? "blink2" : ""} color={props.players[props.pawns[1]].color} />
      }
      <br/>
      {
        <DrawOnePlayerPawn className={props.players[props.pawns[2]].id === props.blinkPlayer ? "blink2" : ""} color={props.players[props.pawns[2]].color} />
      }
      </div>
    );
  }
  else if(props.pawns && props.pawns.length === 4){
    return (
      <div className="playerPawn multilinePP">
      {
        <DrawOnePlayerPawn className={props.players[props.pawns[0]].id === props.blinkPlayer ? "blink2" : ""} color={props.players[props.pawns[0]].color} />
      }
      &nbsp;
      {
        <DrawOnePlayerPawn className={props.players[props.pawns[1]].id === props.blinkPlayer ? "blink2" : ""} color={props.players[props.pawns[1]].color} />
      }
      <br/>
      {
        <DrawOnePlayerPawn className={props.players[props.pawns[2]].id === props.blinkPlayer ? "blink2" : ""} color={props.players[props.pawns[2]].color} />
      }
      &nbsp;
      {
        <DrawOnePlayerPawn className={props.players[props.pawns[3]].id === props.blinkPlayer ? "blink2" : ""} color={props.players[props.pawns[3]].color} />
      }
      </div>
    );
  }
  return null;
}

function DrawOnePlayerPawn(props)
{
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="22" viewBox="0 0 384 512">
      <path d="M120 72c0-39.765 32.235-72 72-72s72 32.235 72 72c0 39.764-32.235 72-72 72s-72-32.236-72-72zm254.627 1.373c-12.496-12.497-32.758-12.497-45.254 0L242.745 160H141.254L54.627 73.373c-12.496-12.497-32.758-12.497-45.254 0-12.497 12.497-12.497 32.758 0 45.255L104 213.254V480c0 17.673 14.327 32 32 32h16c17.673 0 32-14.327 32-32V368h16v112c0 17.673 14.327 32 32 32h16c17.673 0 32-14.327 32-32V213.254l94.627-94.627c12.497-12.497 12.497-32.757 0-45.254z"
      style={{stroke: '#000000', strokeWidth: '2px', fill: props.color}}
      className={props.className}/>
    </svg>
  );
}

function DrawLittleTemple(props){
  if (props.temple.length > 0){
    let litTempleImgPath = "";
    for (let i = 0 ; i < treasures.length; i++){
      if (treasures[i].id === props.temple)
      {
        litTempleImgPath = treasures[i].litTempleImg;
        break;
      }
    }
    return (<span><img className="littleTemple" src={litTempleImgPath} /></span>)
  }
  return null;
}

class Board extends React.Component {
  constructor(props) {
    super(props);

    var nbrOfPlayers = props.nbrOfPlayers;
    var difficultyLevel = props.difficultyLevel;
    var versionNumber = props.versionNumber;

    var tiles = riseTheIsland();
    var playerCardsLeap = generatePlayerCardsLeap();
    var playerCardsDiscard = [];
    var floodCardsLeap = generateFloodCardsLeap();
    var floodCardsDiscard = [];
    var floodMeter = new FloodMeter(props.difficultyLevel);

    let mainUserMessage = new UserMessage('initialisation', null, false, []);

    // generer les joueurs
    var players = generatePlayers(nbrOfPlayers);
    // distribuer les cartes aux joueurs
    players.forEach(giveTwoInitialCards);
    // assigner les positions de depart
    players.forEach(getInitialPlayerPosition);

    var possibleActions = this.getPossibleActions(players[0], false, true);

    var gameID = generateGUID();

    this.state = {
      // IF ADDING ANYTHING, PLEASE FIX doStatePermutation
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
      difficultyLevelString: "",
      versionNumber: versionNumber,
      //
      pastStates: [],
      //
      gameIsLost: false,
      gameIsWon: false,
      gameIsOver: false,
      endMessage: "",
      gameID: gameID,
      //
      languageDistributor: props.language === "FR" ? stringsCatalog.fr : stringsCatalog.en,
      selectedLanguage: props.language === "FR" ? "FR" : "EN",
      //       // IF ADDING ANYTHING, PLEASE FIX doStatePermutation
      posessedTreasures : [],
      turn : 1,
      hasPilotFlownThisTurn : false,
      currentPlayerPlaying : 0,
      blinkPlayer : 0,
      blinkingTile : -1,
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
      floodingSequence : null,
      showActionableCards : true,
      showRollBackButton : true // TODO report
      // IF ADDING ANYTHING, PLEASE FIX doStatePermutation
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
        let card = { id : 20, name : "helicopter", type : "H", loc_key: "ca_helicopter", url : "img/helicopterCard.png", howMany : 0};
        let card2 = { id : 19, name : "helicopter", type : "H", loc_key: "ca_helicopter", url : "img/helicopterCard.png", howMany : 0};

        player.cards.push(card);
        player.cards.push(card2);
        */
        //end of helicopter Hack

        for (let i = 0; i < 2; i++){ // must be 2
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
      let initialFlood = 6;
      let n_FloodCardsLeap = this.state.floodCardsLeap;
      let n_Tiles = this.state.tiles;
      let n_FloodCardsDiscard = this.state.floodCardsDiscard;
      let lng = this.state.languageDistributor;

      for ( let i = 0; i < initialFlood; i++){
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

      // this.blinkAPlayer(this.state.currentPlayerPlaying);

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

      // save the state before the first action
      var stateCopy = JSON.parse(JSON.stringify(this.state)); // ?????? stringify puis parse ?
      // let stateCopy = this.state;
          // reproduce what will be setted in the next setState
          stateCopy.floodCardsLeap = n_FloodCardsLeap;
          stateCopy.floodCardsDiscard = n_FloodCardsDiscard;
          stateCopy.tiles = n_Tiles;
          stateCopy.difficultyLevelString = difficultyLevelString;
          stateCopy.mainUserMessage = n_userMessage;

      let n_pastState = JSON.stringify(stateCopy);
      // console.log('****** state copy Size at init ' + n_pastState.length);
      this.setState({
        floodCardsLeap: n_FloodCardsLeap,
        floodCardsDiscard: n_FloodCardsDiscard,
        tiles: n_Tiles,
        mainUserMessage: n_userMessage,
        difficultyLevelString: difficultyLevelString,
        pastStates: [n_pastState]}, () => {
            doLog("START", "","", this.state);
        });
  }

  controller(input, data){
      console.log("InController turn :" + this.state.currentStep);
      let lng = this.state.languageDistributor;
      this.checkCardState();
      this.showActionButtons();
      this.unblinkTheTiles();

      // set Drawning Tiles to Drawned if any
      let n_tiles = this.state.tiles;
      for (let k = 0; k < n_tiles.length; k++){
        if (n_tiles[k].isDrawning){
          n_tiles[k].isDrawning = false;
          n_tiles[k].isDrawned = true;
        }
      }

      if (input === "ActionIsDone"){
        let nextStep = this.state.currentStep + 1;
        //
        if (nextStep === 3 /*|| nextStep === 4 Ne devrais pas être necessaire */){
          // draw player cards 01
          let newMessage = new UserMessage('letsDrawSomePlayerCards_msg', null, false, [2]);
          this.setState({ currentStep : nextStep,
                          possibleActions : [],
                          blinkPlayer : 99,
                          mainUserMessage : newMessage,
                          showActionableCards : true,
                          showRollBackButton : true});
        } else if (nextStep === 5){
          // flood some tiles.
          this.setState({ currentStep : nextStep });
          let howMuch = this.state.floodMeter.floodFactor;
          let newMessage = new UserMessage(null, lng.letsFloodSomeTiles_msg.format(howMuch) , false, [4]);
          this.setState({ currentStep : nextStep,
                          possibleActions : [],
                          mainUserMessage : newMessage,
                          showActionableCards : true,
                          showRollBackButton : true});
        }
        else if (nextStep === 6){
          // next Turn, new Player 0
          if (this.state.currentPlayerPlaying === this.state.players[this.state.players.length -1].id){
            // let newMessage = new UserMessage("Next Turn ! Please " + this.state.players[0].name + ", Choose an action " , false, []);
            let newMessage = new UserMessage(null, lng.nextTurn_msg.format(this.state.players[0].name) , false, []);
            let nextTurn = this.state.turn + 1;
            let nextPlayer = this.state.players[0].id;
            let psblactn = this.getPossibleActions(this.state.players[0], false, false);
            // save the state before an action
            var stateCopy = JSON.parse(JSON.stringify(this.state));
            // let stateCopy = this.state;
                // reproduce what will be setted in the next setState
                stateCopy.currentStep = 0;
                stateCopy.turn = nextTurn;
                stateCopy.currentPlayerPlaying = nextPlayer;
                stateCopy.possibleActions = psblactn;
                stateCopy.blinkPlayer = nextPlayer;
                stateCopy.blinkingTile = -1;
                stateCopy.hasPilotFlownThisTurn = false;
                stateCopy.whatIsExpectedNext = "CharacterActionButtonClick";
                stateCopy.mainUserMessage = newMessage;
                stateCopy.showActionableCards = true;
                stateCopy.showRollBackButton = false;
                stateCopy.tiles = n_tiles;
            let backup = JSON.stringify(stateCopy);
            console.log('****** state copy Size at Next Turn ' + backup.length);
            let n_pastState = [backup];

            this.setState({
              // Would you add something here, add it above
              currentStep : 0,
              turn : nextTurn,
              currentPlayerPlaying : nextPlayer,
              blinkPlayer : nextPlayer,
              blinkingTile : -1,
              possibleActions : psblactn,
              hasPilotFlownThisTurn : false,
              whatIsExpectedNext : "CharacterActionButtonClick" ,
              mainUserMessage : newMessage,
              pastStates : n_pastState,
              showActionableCards : true,
              showRollBackButton : false,
              tiles : n_tiles
              });

          } else {
            // next Player
            let newMessage = new UserMessage('nextPlayer_msg', null, false, []);
            let nextPlayer = this.state.players[this.state.currentPlayerPlaying + 1].id;
            let psblactn = this.getPossibleActions(this.state.players[nextPlayer], false, false);

            // save the state before an action
            var stateCopy = JSON.parse(JSON.stringify(this.state));
            // let stateCopy = this.state;
                // reproduce what will be setted in the next setState
                stateCopy.currentStep = 0;
                stateCopy.currentPlayerPlaying = nextPlayer;
                stateCopy.blinkPlayer = nextPlayer;
                stateCopy.blinkingTile = -1;
                stateCopy.possibleActions = psblactn;
                stateCopy.whatIsExpectedNext = "CharacterActionButtonClick";
                stateCopy.mainUserMessage = newMessage;
                stateCopy.showActionableCards = true;
                stateCopy.showRollBackButton = false;
                stateCopy.tiles = n_tiles;
            let backup = JSON.stringify(stateCopy);
            console.log('****** state copy Size at Next player' + backup.length);
            let n_pastState = [backup];

            this.setState({
            // Would you add something here, add it above
              currentStep : 0,
              currentPlayerPlaying : nextPlayer,
              blinkPlayer : nextPlayer,
              blinkingTile : -1,
              possibleActions : psblactn,
              whatIsExpectedNext : "CharacterActionButtonClick",
              mainUserMessage : newMessage,
              pastStates : n_pastState,
              showActionableCards : true,
              showRollBackButton : false,
              tiles : n_tiles
            });

          }
        } else{
          // next action for the same player
          let newMessage = new UserMessage('chooseAnAction_msg', null, false, []);
          let psblactn = this.getPossibleActions(this.state.players[this.state.currentPlayerPlaying], this.state.hasPilotFlownThisTurn, false);
          // save the state before an action
          var stateCopy = JSON.parse(JSON.stringify(this.state));
          // let stateCopy = this.state;
              // reproduce what will be setted in the next setState
              stateCopy.currentStep = nextStep;
              stateCopy.possibleActions = psblactn;
              stateCopy.whatIsExpectedNext = "CharacterActionButtonClick";
              stateCopy.mainUserMessage = newMessage;
              stateCopy.showActionableCards = true;
              stateCopy.showRollBackButton = true;
              stateCopy.tiles = n_tiles;
          let backup = JSON.stringify(stateCopy);
          let n_pastState = this.state.pastStates;
          let zarma = n_pastState.push(backup);
          console.log('****** state copy Size at Next action ' + backup.length);
          this.setState({
            // Would you add something here, add it above
            currentStep : nextStep,
            possibleActions : psblactn,
            pastStates: n_pastState,
            whatIsExpectedNext : "CharacterActionButtonClick" ,
            mainUserMessage : newMessage,
            showActionableCards : true,
            showRollBackButton : true,
            tiles : n_tiles});
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
        this.doFloodATile(1, this.howManyCards(this.state.floodMeter.level));
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
    let blinkingTile = -1;

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

    // set Drawning Tiles to Drawned if any
    for (let k = 0; k < n_Tiles.length; k++){
      if (n_Tiles[k].isDrawning){
        n_Tiles[k].isDrawning = false;
        n_Tiles[k].isDrawned = true;
      }
    }

    for (let j = 0; j < n_Tiles.length; j++){
      if (n_Tiles[j].name === card.name){
        console.log('****** TILE To flood IS ' + n_Tiles[j].name);
        floodedTileId = j;
        if (n_Tiles[j].isImmersed){
          // Let's DRAWN this tile
            message = message + lng.tileDrawning.format(n_Tiles[j].name, j);
            n_Tiles[j].isImmersed = false;
            n_Tiles[j].isDrawning = true;
            n_Tiles[j].isDrawned = false;
            blinkingTile = j;

            tileHasDrawned = true;
            if (n_Tiles[j].name === "helipad"){
              // alert("The helipad is drawned. GAMEOVER")
              message = message + '<br/>' +lng.explorersCantLeaveTheIsland;
              gameOver = true;
              gameOverMsg = lng.explorersCantLeaveTheIsland;
              gameOverCode = 4; // helipad disapeared
              doLog("GAME_LOST", "helipadIsDrawned", "", this.state);
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
                        doLog("GAME_LOST", "twoTemplesAreDrawned", "", this.state);
                      }
                      break;
                    }
                  }
                }
            }
        }
        else if(n_Tiles[j].isDrawned){
          this.customAlert("CONCEPTUAL ERROR : " + n_Tiles[j].name + " is already drawned. it shouldn't be in the Leap !");
        }
        else{
            message = message + lng.tileIsFlooded.format(n_Tiles[j].name, j);
            n_Tiles[j].isImmersed = true;
            blinkingTile = j;
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

    let showActionableCards = true;

    // BRANCHING : Soit on evacue des gars, soit on refais un flood, soit c'est fini
    if (gameOver === true){
        n_userMessage = new UserMessage(null, message , false, [11]);
    }
    else if (guysToEvacuate.length > 0){
        //message = message + "<br/>!!! WE NEED TO EVACUATE THE TILE !!!</div>";
        message = message + lng.weNeedToEvacuateTheTile;
        n_userMessage = new UserMessage(null, message , false, [8]);
        showActionableCards = false;
    }
    else if (number === outOf){
      // floodings are finished
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
    else {
      this.setState({
        mainUserMessage: n_userMessage,
        floodCardsLeap: n_FloodCardsLeap,
        floodCardsOutOfGame: n_FloodCardsOutOfGame,
        floodCardsDiscard: n_FloodCardsDiscard,
        gameIsLost: gameOver,
        tiles: n_Tiles,
        blinkingTile: blinkingTile,
        guysToEvacuate: guysToEvacuate,
        floodingSequence: floodingSequence,
        showActionableCards: showActionableCards});
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
      if (tilesToLight.length === 0)
      {
        // let newMessage = new UserMessage("Oh my God. There's nowhere he can go. " + drawningGuy.name+ " is drawning. Noooooooo. GAME OVER.", false, []);
        newMessage = new UserMessage(null, lng.nowhereHeCanGo.format(drawningGuy.name), false, [11]);
        gameIsLost = true;
        gameOverMsg = lng.nowhereHeCanGo.format(drawningGuy.name);
        gameOverCode = 1; // guy drawned
        doLog("GAME_LOST", "guyIsDrawned", "", this.state);
      } else {
        this.lightTheTiles(tilesToLight, drawningGuy.color);
        newMessage = new UserMessage('chooseADestinationToEvacuate', null, false, []);
      }

      if (gameIsLost === true)
      {
          this.setState({
            mainUserMessage: newMessage,
            gameIsOver: true,
            gameIsLost: true,
            endMessage: gameOverMsg});
      }
      else
      {
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
      let newCurrentStep = tempState.currentStep;

      let gameIsLost = false;
      let gameOverMsg = "";
      let gameOverCode = 0;

      let card = [];
      if (newPlayerCardsLeap.length < 1){
        // shuffle and rebuild the leap from the Discard
          newPlayerCardsLeap = shuffleArray(newPlayerCardsDiscard);
          newPlayerCardsDiscard = [];
      }
      card = newPlayerCardsLeap.pop();

      let cardToPushToPlayer = null;

      if (card.name === "floodRise")
      {
          // bring Discarded flood cards on the top of the flood Leap
          if (newFloodCardsDiscard.length > 0)
          {
              newFloodCardsDiscard = shuffleArray(newFloodCardsDiscard);
              newFloodCardsLeap = newFloodCardsLeap.concat(newFloodCardsDiscard);
              newFloodCardsDiscard = [];
          }

          // upgrade the Flood Level
          newFloodMeter.level = newFloodMeter.level + 1;
          newFloodMeter.floodFactor = this.howManyCards(newFloodMeter.level);

          this.doMoveFloodOmeterCursor();

          // alert("Flood Riiiiise ! New Flood level is " + newFloodMeter.level + "(pick " +  newFloodMeter.floodFactor + " at each flood)");
          if (newFloodMeter.level >= newFloodMeter.topLevel)
          {
            // alert (" Top level reached. The Island is submerged. Game Over");
            gameIsLost = true;
            gameOverMsg = lng.topLevelReached;
            gameOverCode = 2; // Top level reached. The Island is submerged.
            doLog("GAME_LOST", "islandIsDrawned", "", this.state);
          }

          // put the flood card in the discards
          newPlayerCardsDiscard.push(card);
      }
      else 
      {
        cardToPushToPlayer = card;
      }

      // has Player too much cards ?
      let nbrOfCardsInHand = newPlayers[this.state.currentPlayerPlaying].cards.length + 1;

      if (cardToPushToPlayer != null)
      {
              newPlayers[this.state.currentPlayerPlaying].cards.push(cardToPushToPlayer);
      }

      let newMessage = "";
      if (gameIsLost){
            newMessage = new UserMessage(null, lng.topLevelReached , false, [11]);
      }
      else if (cardNumber == 1)
      {
            newMessage = new UserMessage(null, lng.firstCard_msg.format(this.getStringInTheCatalog(lng, card.loc_key)) + '. <br/><img src='  + card.url + ' width="30px" height="46px"/>', false, [3]);
            newCurrentStep = 4;
      }
      else
      {
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
      tempState.currentStep = newCurrentStep;

      tempState.gameIsLost = gameIsLost;
      tempState.endMessage = gameOverMsg;
      tempState.gameOverCode = gameOverCode;
      if (gameIsLost)
      {
        tempState.showActionableCards = false;
      }

      tempState.pastStates = [];

      return tempState;
  }

  doShowGameIsLost()
  {
    this.setState({
      showGameIsLost: true
    });
  }

  // MUST BE DONE AT THE END OF AN ACTION -> embraye sur un ActionIsDone
  doCheckIfMoreThan5CardsInHand(passages, userId)
  {
    let cardsInHand = this.state.players[userId].cards;
    if (cardsInHand.length > 5)
    {
      // alert ("Oh no ! Over 5 cards in Hand ! : " + cardsInHand.length);

      let n_whatIsExpectedNext_toRestore = this.state.whatIsExpectedNext;
      let n_messageBoardState_toRestore = this.state.messageBoardState;

      if (passages === 0)
      {
        this.setState({ whatIsExpectedNext_toRestore : n_whatIsExpectedNext_toRestore,
                        whatIsExpectedNext: "ResolveOver5Cards" ,
                        mainUserMessage_toRestore: this.state.mainUserMessage,
                        showActionableCards: false,
                        messageBoardState_toRestore: n_messageBoardState_toRestore,
                        messageBoardState: "SolveOver5Cards",
                        cardUser : userId });
      } else {
        this.setState({
                        whatIsExpectedNext: "ResolveOver5Cards" ,
                        messageBoardState: "SolveOver5Cards",
                        showActionableCards: false,
                        cardUser : userId });
      }
      return null;
    }
    else
    {
      //TODO does not work in case of a 'give' or a 'send-a-card' -> à voir
      if (passages > 0)
      {
        // passages > 0 means a throw or two have been made, let's restore the states
        this.setState({ whatIsExpectedNext: this.state.whatIsExpectedNext_toRestore,
                        whatIsExpectedNext_toRestore: null,
                        mainUserMessage: this.state.mainUserMessage_toRestore,
                        mainUserMessage_toRestore: null,
                        showActionableCards: true,
                        messageBoardState: "default"});
      }

      this.controller("ActionIsDone");
    }
  }

  throwCard(cardtype, index, userId)
  {
      // index is wrong. Please trust cardType
      let n_players = this.state.players;
      let n_playerCardsDiscard = this.state.playerCardsDiscard;

      var trueIndex = -1;
      for (var i = n_players[userId].cards.length -1; i >= 0; i--){
        if (n_players[userId].cards[i].type == cardtype){
          trueIndex = i;
          break;
        }
      }
      // alert ("true index is : " + trueIndex + " , was looking for " + cardtype );
      if (trueIndex >= 0){
        n_playerCardsDiscard.push(n_players[userId].cards[trueIndex]);
        n_players[userId].cards.splice(trueIndex, 1);
      }

      this.setState({ players: n_players });
      this.doCheckIfMoreThan5CardsInHand(1, userId); // 1 means : we've been there already, we may want to close the check if more than five cards process.
  }

  useACardToGetRidOfIt(type, index, userId){
      let lng = this.state.languageDistributor;
      let n_message = new UserMessage('okWhatsNext', null, false, [10]);
      // ici set un state to recover à 'Voilà, on a utilisé une carte -> next doCheckIfMoreThan5CardsInHand'
      this.setState({mainUserMessage: n_message,
                    messageBoardState: "default",
                    showActionableCards: false }, () => {
                    if (type === "H"){
                        this.clickedOnHelicopterCard(userId, true);
                    } else if (type === "SB"){
                        this.clickedOnSandBagCard(userId, true);
                    } else {
                      this.customAlert("CONCEPTUAL ERROR : WRONG CARD TYPE");
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
                    cardUser : playerId,
                    showActionableCards : false });
  }

  helicopterCardEnRoute(travellers){
    let lng = this.state.languageDistributor;
    let victory = false;
    // Check if there are travellers
    if (travellers.length < 1 )
    {
      this.customAlert(lng.thereIsNoOneInThisHelicopter);
      return null;
    }
    // Check if travellers are on the same tile
    if (travellers.length > 1 )
    {
      var startingTile = this.state.players[travellers[0]].position;
      for (let i = 1; i < travellers.length; i++)
      {
        if (this.state.players[travellers[i]].position != startingTile){
          this.customAlert(lng.helicopterRideShouldStartFromTheSameTile);
          return null;
        }
      }
    }
    // Check if the game is won :
    // on the helipad, 4 treasures found, all players on the tile
    if (this.state.posessedTreasures.length === 4 &&
        this.state.tiles[this.state.players[travellers[0]].position].name === "helipad" &&
        travellers.length === this.state.nbrOfPlayers ) {
          // YOU WON // VICTORY
          victory = true;
        }
    // displays the possible destinations
    let tilesToLight = this.whereCanHeFly(this.state.players[travellers[0]].position);
    this.state.players[travellers[0]].whereCanHeFly = tilesToLight;
    this.state.showActionableCards = false;
    let nada = this.lightTheTiles(tilesToLight, this.state.players[travellers[0]].color);

    let n_messageBoardState = "default";

    if (victory === true){
        doLog("GAME_WON","","", this.state);
        this.setState({
            mainUserMessage: new UserMessage(null, lng.youWonMsg.format(this.state.nbrOfPlayers), false, []),
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

  cancelHelicopterCardPick() {
    this.unlightTheTiles();
    this.showActionButtons();
    this.setState({ whatIsExpectedNext: this.state.whatIsExpectedNext_toRestore,
                    whatIsExpectedNext_toRestore : null,
                    mainUserMessage: this.state.mainUserMessage_toRestore,
                    mainUserMessage_toRestore: null,
                    messageBoardState: this.state.messageBoardState_toRestore,
                    messageBoardState_toRestore: null,
                    inAGetRidOfACardContext: false,
                    coTravellers : null,
                    showActionableCards: true });
  }

  clickedOnSandBagCard(playerId, inAGetRidOfACardContext)
  {
    let lng = this.state.languageDistributor;
    let tilesToLight = this.getImmersedTiles();
    if (tilesToLight.length === 0)
    {
      this.customAlert(lng.noTileToDry);
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
                    cardUser : playerId,
                    showActionableCards: false });
    return null;
  }

  cancelSandBagCardPick()
  {
    this.unlightTheTiles();
    this.showActionButtons();
    this.setState({ whatIsExpectedNext: this.state.whatIsExpectedNext_toRestore,
                    whatIsExpectedNext_toRestore : null,
                    mainUserMessage: this.state.mainUserMessage_toRestore,
                    mainUserMessage_toRestore: null,
                    messageBoardState: this.state.messageBoardState_toRestore,
                    messageBoardState_toRestore: null,
                    inAGetRidOfACardContext: false,
                    showActionableCards: true
                   });
  }

  howManyCards(level){
    // flood scale :  |12|345|67|89|
    //                |2 |3  |4 |5 |
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

  checkCardState(){
    // flood Cards
    let nbrOfFloodCardsInDiscard = this.state.floodCardsDiscard.length;
    let nbrOfFloodCardsInLeap = this.state.floodCardsLeap.length;
    let nbrOfFloodCardsOutOfGame = this.state.floodCardsOutOfGame.length;
    let nbrOfFloodCards = nbrOfFloodCardsInDiscard + nbrOfFloodCardsInLeap + nbrOfFloodCardsOutOfGame;

    console.log("FLOOD CARDS : total = " + nbrOfFloodCards+ " (24 expected), out of game = " + nbrOfFloodCardsOutOfGame + ", in Discard = " + nbrOfFloodCardsInDiscard + ", in Leap = " + nbrOfFloodCardsInLeap);

    if (nbrOfFloodCards != 24){
      this.customAlert("ALERT : We loose some Flood cards in the process.");
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
      this.customAlert("ALERT : We loose some Player cards in the process.");
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
              this.customAlert(lng.nowhereToGo);
              this.showActionButtons();
            } else  {
              this.state.players[id].whereCanHeMove = tilesToLight;
              let nada = this.lightTheTiles(tilesToLight, this.state.players[id].color);
              // set a new Expected PlayerInput
              let newMessage = new UserMessage('chooseADestination', null, false, [1]);
              this.setState({ whatIsExpectedNext : "TileButtonClickForMove" ,
                              mainUserMessage : newMessage,
                              showActionableCards : false,
                              showRollBackButton : false});
            }
      } if (action === "Fly"){
          let tilesToLight = this.whereCanHeFly(this.state.players[id].position);
          this.state.players[id].whereCanHeFly = tilesToLight;
          let nada = this.lightTheTiles(tilesToLight, this.state.players[id].color);
          let newMessage = new UserMessage('chooseALandingDestination', null, false, [1]);
          this.setState({ whatIsExpectedNext: "TileButtonClickForFly" ,
                          mainUserMessage: newMessage ,
                          showActionableCards : false,
                          showRollBackButton : false });
      } else if (action === "Dry" || action === "DryAround"){
            let tilesToLight = this.whereCanHeDry(this.state.players[id].position, this.state.players[id].role);
            if (tilesToLight.length === 0 ){
              this.customAlert(lng.noTilesToDry);
              this.showActionButtons();
            } else {
              this.state.players[id].whereCanHeDry = tilesToLight;
              let nada = this.lightTheTiles(tilesToLight, this.state.players[id].color);
              let newMessage = new UserMessage('nowChooseATileToDry', null, false, [1]);
              this.setState({ whatIsExpectedNext: "TileButtonClickForDry",
                              mainUserMessage: newMessage,
                              showActionableCards : false,
                              showRollBackButton : false });
            }
      } else if (action === "DryTwoTiles"){
            let tilesToLight = this.whereCanHeDry(this.state.players[id].position, this.state.players[id].role);
            if (tilesToLight.length === 0 ){
              this.customAlert(lng.noTilesToDry);
              this.showActionButtons();
            } else if (tilesToLight.length === 1 ){
              this.state.players[id].whereCanHeDry = tilesToLight;
              let nada = this.lightTheTiles(tilesToLight, this.state.players[id].color);
              let newMessage = new UserMessage('onlyOneTileToDry', null, false, [1]);
              this.setState({ whatIsExpectedNext: "TileButtonClickForDry" ,
                              mainUserMessage: newMessage,
                              showActionableCards : false,
                              showRollBackButton : false });
            } else {
              this.state.players[id].whereCanHeDry = tilesToLight;
              let nada = this.lightTheTiles(tilesToLight, this.state.players[id].color);
              let newMessage = new UserMessage('nowChooseTwoTilesToDry', null, false, [1]);
              this.setState({ whatIsExpectedNext: "TileButtonClickForDryTwoTimes" ,
                              mainUserMessage: newMessage,
                              showActionableCards : false,
                              showRollBackButton : false });
            }
      } else if (action === "Give") {
              let playersAround = this.getPlayersOnTheSameTileExceptMe();
              if (this.state.players[id].cards.length < 1 ){
                this.customAlert(lng.noCardToGive);
                this.showActionButtons();
              } else if ( action === "Give" && playersAround.length < 1) {
                  this.customAlert(lng.noOtherPlayerOnYourTile);
                  this.showActionButtons();
              } else {
                this.setState({ whatIsExpectedNext: "ResolveUserDialogSequence" ,
                                messageBoardState: "giveACardSequence",
                                showActionableCards : false,
                                showRollBackButton : false });
              }
      } else if (action === "SendACard") {
            if (this.state.players[id].cards.length < 1 ){
              this.customAlert(lng.noCardToSend);
              this.showActionButtons();
            } else {
              this.setState({ whatIsExpectedNext: "ResolveUserDialogSequence" ,
                              messageBoardState: "sendACardSequence",
                              showActionableCards : false,
                              showRollBackButton : false });
            }
      } else if (action === "GetATreasure") {
              let treasureId = this.state.tiles[this.state.players[id].position].templeFor;
              if (treasureId === ""){
                this.customAlert(lng.thisTileIsNotATemple);
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
                    this.customAlert(lng.thisTreasureHasBeenFoundAlready);
                    this.showActionButtons();
                  }
                  else if (cardsIndexes.length < 4){
                    // alert("You do not have enough " + this.getTreasureNameById(treasureId) + " cards to get the treasure... you need 4 , you have " + cardsIndexes.length);
                    this.customAlert(lng.notEnoughCards4Treasure.format(this.getTreasureNameById(treasureId), cardsIndexes.length));
                    this.showActionButtons();
                  } else {
                      if (this.state.posessedTreasures.length === 3 ){
                        //alert("You found the 4th treasure ! Now, go to the heliport and leave the Island with an Helicopter card !");
                        this.customAlert(lng.youFoundThe4th);
                      } else if (this.state.posessedTreasures.length === 1) {
                        this.customAlert(lng.youFoundThe2nd);
                      } else if (this.state.posessedTreasures.length === 2) {
                        this.customAlert(lng.youFoundThe3rd);
                      }else {
                        this.customAlert(lng.youFoundThe1st);
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
                                      playerCardsDiscard: n_playerCardsDiscard,
                                      showActionableCards : false,
                                      showRollBackButton : false
                                    });
              }
          }
      } else if (action === "MoveSomeone") {
              this.setState({ whatIsExpectedNext: "ResolveUserDialogSequence" ,
                              messageBoardState: "moveSomeOneSequence",
                              showActionableCards : false,
                              showRollBackButton : false });
      } else if (action === "DoNothing"){ // skip one action
              let newMessage = new UserMessage('doingNothing', null, false, [0]);
              this.setState({ mainUserMessage: newMessage,
                              showRollBackButton : false});
      } else if (action === "SkipTurn"){ // skip the whole player turn, goes to next player
             let newMessage = new UserMessage('skipTurn', null, false, [0]);
             this.setState({ mainUserMessage: newMessage,
                              currentStep: 5});
      } else if (action === "DoSleep"){ // finish the actions, go to card picking
             let newMessage = new UserMessage('sleep', null, false, [0]);
             this.setState({ mainUserMessage: newMessage,
                              currentStep: 2});
      }
    }
    else{
      this.customAlert(lng.unexpectedClickOnActionButton);
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
    this.customAlert(lng.pleaseFinishYourActionFirst);
  }
}

// Handles a click on a tile
handleTileClick(i) {
    let lng = this.state.languageDistributor;
    // this.showActionButtons(); Done : dispatched on each succeeded actions
    if (this.state.whatIsExpectedNext === "TileButtonClickForMove") {
        let player = this.state.players[this.state.currentPlayerPlaying];
        if (player.whereCanHeMove.indexOf(i) >= 0){
            // Move
            this.showActionButtons();
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
          this.customAlert(lng.heCantMoveThere);
        }
      }
      else if (this.state.whatIsExpectedNext === "TileButtonClickForFly") {
          let player = this.state.players[this.state.currentPlayerPlaying];
          if (player.whereCanHeFly.indexOf(i) >= 0){
              // Move
              this.showActionButtons();
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
            this.customAlert(lng.heCantMoveThere);
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
          this.customAlert("CONCEPTUAL ERROR : CAN't FIND PUPPET !");
        }

        if (this.puppet.whereCanHeMove.indexOf(i) >= 0){
              this.showActionButtons();
              // Move
              let returnPack = this.moveAPlayer(this.puppet, i, this.state.players);
              // virer le puppet flag
              for (let j = 0; j < returnPack.players.length; j++){
                returnPack.players[j].isPuppet = false;
              }
              this.setState({ whatIsExpectedNext: "" ,
                              messageBoardState : "default",
                              tiles: returnPack.tiles,
                              players: returnPack.players}, () => {
                                this.unlightTheTiles();
                                this.controller("ActionIsDone");
              });
        }
        else{
          this.customAlert(lng.heCantMoveThere);
        }
      } else if (this.state.whatIsExpectedNext === "TileButtonClickForDry"){
        let newplayers = this.state.players;
        let newplayer = this.state.players[this.state.currentPlayerPlaying];
        if (newplayer.whereCanHeDry.indexOf(i) >= 0){
            // Dry
            this.showActionButtons();
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
          this.customAlert(lng.heCantDryThere);
        }
      } else if (this.state.whatIsExpectedNext === "TileButtonClickForDryTwoTimes") {
        let newplayers = this.state.players;
        let newplayer = this.state.players[this.state.currentPlayerPlaying];
        if (newplayer.whereCanHeDry.indexOf(i) >= 0){
            // Dry
            this.showActionButtons();
            this.dryATile(i);
            this.unlightATile(i);
            let newMessage = new UserMessage('nowChooseASecondOneToDry', null, false, []);
            this.hideActionButtons();
            this.setState({ whatIsExpectedNext: "TileButtonClickForDry" ,
                            mainUserMessage: newMessage});
        }
        else {
          this.customAlert(lng.heCantDryThere);
        }
      } else if (this.state.whatIsExpectedNext === "TileButtonClickForFlyWithACard") {
        // let player = this.state.players[this.state.cardUser];
        let cardUser = this.state.players[this.state.cardUser];
        let travellers = this.state.coTravellers;
        let n_Players = this.state.players;
        let n_PlayerCardsDiscard = this.state.playerCardsDiscard;
        let whatIsExpectedNext_toRestore = this.state.whatIsExpectedNext_toRestore;

        //if (travellers[0].whereCanHeFly.indexOf(i) >= 0){
            // index of the card to remove
            for (let i = 0; i < cardUser.cards.length; i++){
              if (cardUser.cards[i].name === "helicopter"){
                n_PlayerCardsDiscard.push(cardUser.cards[i]);
                cardUser.cards.splice(i, 1);
                break;
              }
            }

            cardUser.whereCanHeFly = [];
            n_Players[cardUser.id] = cardUser;

            // If the currently active is the flyer or in the flight or if the current player is on the reception ISLAND
            // and destination tile has a guy on it and he's not the messanger,
            // recalculate the current active player possible actions to include the 'give' action unless he is the messenger
            let n_possibleActions = this.state.possibleActions;
            if ((this.state.currentPlayerPlaying === this.state.cardUser
                || this.state.tiles[i].playerOn.indexOf(this.state.currentPlayerPlaying) >= 0
                || this.state.coTravellers.indexOf(this.state.currentPlayerPlaying) >= 0)
                && this.state.tiles[i].playerOn.length > 0
                && this.state.currentStep <= 2)
              {
                if (!this.actionIsInThePossibleActionsListAlready("Give")){
                  let y = n_possibleActions.length - 1;
                  n_possibleActions.splice(y, 0, playerDefaultActions[2]);
                }
              }
              else {
                //
              }

              // Same. if after a fly, one lands on a flooded or surrounded by flooded tiles and is currently playing,
              // Check if it's not in possibleActions already and let's add the DRY action
              if (this.state.currentStep <= 2)
              {
                  let dryableTiles = this.whereCanHeDry(i, this.state.players[this.state.cardUser].role);
                  if (dryableTiles.length > 0
                  && !this.actionIsInThePossibleActionsListAlready("Dry") && !this.actionIsInThePossibleActionsListAlready("Dry two tiles")
                  ){
                        n_possibleActions.splice(1, 0, playerDefaultActions[1]);
                  }
              }
              else {
                //
              }

              // Same. if after a fly, one lands on a temple and is currently playing,
              // Check if it's not in possibleActions already and let's add the Get A Treasure action
              if (this.state.tiles[i].templeFor.length > 0 && this.state.currentStep <= 2)
              {
                  if (!this.actionIsInThePossibleActionsListAlready("Get a Treasure !")){
                    let y = n_possibleActions.length - 1;
                    n_possibleActions.splice(y, 0, playerDefaultActions[3]);
                  }
              } else {
              //
              }

            // Move
            let returnPack = this.moveAGroupOfPlayers(this.state.coTravellers, i, n_Players, this.state.tiles);
            //
/*
            if (this.state.inAGetRidOfACardContext){
                // hide the actionbuttons
                this.hideActionButtons();
            } else {
                this.showActionButtons();
            }
*/
            this.state.inAGetRidOfACardContext?this.hideActionButtons():this.showActionButtons();

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
                            inAGetRidOfACardContext: false,
                            showActionableCards: true });
            let nada = this.unlightTheTiles();
        //} else {
        //  this.customAlert(lng.cantFlyThereWithHisHCard);
        //}
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

          /*
                      if (this.state.inAGetRidOfACardContext){
                          // hide the actionbuttons
                          this.hideActionButtons();
                      } else {
                          this.showActionButtons();
                      }
          */
          this.state.inAGetRidOfACardContext?this.hideActionButtons():this.showActionButtons();

          this.setState({ whatIsExpectedNext: this.state.whatIsExpectedNext_toRestore,
                          messageBoardState: this.state.messageBoardState_toRestore,
                          mainUserMessage: this.state.mainUserMessage_toRestore,
                          // cardUser: -1,
                          players: NewPlayers,
                          playerCardsDiscard: NewPlayerCardsDiscard,
                          messageBoardState_toRestore: null,
                          whatIsExpectedNext_toRestore: null,
                          mainUserMessage_toRestore: null,
                          inAGetRidOfACardContext: false,
                          showActionableCards: true });
          let nada = this.unlightTheTiles();
        }
        else {
          this.customAlert(lng.cantDryThereWithHisCard);
        }
      }
      else if (this.state.whatIsExpectedNext === "TileButtonClickForEvacuate") {
        // get player : first of To Evacuate
        this.showActionButtons(); // not sure about this one
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
          this.customAlert(lng.heCantMoveThere);
        }
      } else {
        this.customAlert(lng.unexpectedClickOnATile);
        // alert (lng.unexpectedClickOnATile);
      }
    }

  handleRollBack(curstep){
    // TODO refactor avoiding the pop and push
    if (this.state.pastStates.length >= 1 ){
      let pastStates = this.state.pastStates;
      let stateToThrow = null;
      let strStateToRestore = null;
      if (curstep == 3 && pastStates.length === 3){
        strStateToRestore = pastStates.pop();
        pastStates.push(strStateToRestore);
      } else if (curstep == 3 && pastStates.length != 3) {
        // case of sleep , it should be the same behaviour
        strStateToRestore = pastStates.pop();
        pastStates.push(strStateToRestore);
      } else if (curstep == 2){
        if (pastStates.length != 3){
          this.customAlert("CONCEPTUAL ERROR, on step 2 , pastStates should be 3 long");
        }
        stateToThrow = pastStates.pop();
        strStateToRestore = pastStates.pop();
        pastStates.push(strStateToRestore);
      } else if (curstep == 1) {
        if (pastStates.length != 2){
          this.customAlert("CONCEPTUAL ERROR, on step 1 , pastStates should be 2 long");
        }
        stateToThrow = pastStates.pop();
        strStateToRestore = pastStates.pop();
        pastStates.push(strStateToRestore);
      }

      let objStateToRestore = JSON.parse(strStateToRestore);
      objStateToRestore.pastStates = pastStates;

      return this.doStatePermutation(objStateToRestore);
    } else {
      this.customAlert("CONCEPTUAL ERROR : No state to restore");
      // alert("CONCEPTUAL ERROR : No state to restore");
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

  moveAGroupOfPlayers(travellersIds, destination, players, tiles){
    let n_Tiles = this.state.tiles;
    let startingFrom = this.state.players[travellersIds[0]].position;
    let n_Players = this.state.players;

    for (let i=0; i < travellersIds.length; i++){
          // remove travellers from the current Tile
          let index = n_Tiles[startingFrom].playerOn.indexOf(travellersIds[i]);
          n_Tiles[startingFrom].playerOn.splice(index, 1);

          // adding travellers to new tile
          n_Tiles[destination].playerOn.push(travellersIds[i]);
          n_Players[travellersIds[i]].position = destination;
          n_Players[travellersIds[i]].whereCanHeMove = null;
          n_Players[travellersIds[i]].whereCanHeFly = null;
    }

    return { players: n_Players, tiles: n_Tiles};
  }

  dryATile(tile){
        let NewTiles = this.state.tiles;
        if (NewTiles[tile].isDrawned){
          this.customAlert("CONCEPTUAL ERROR : can't dry a drawned tile");
          // alert("CONCEPTUAL ERROR : can't dry a drawned tile");
        }
        NewTiles[tile].isImmersed = false;
        this.setState({ tiles: NewTiles});
  }

  cancelAnAction(){
    let lng = this.state.languageDistributor;
    this.unlightTheTiles();
    let newMessage = new UserMessage('chooseAnAction_msg', null , false, []);

    if (!this.state.inAGetRidOfACardContext && this.state.currentStep < 3){
      this.showActionButtons();
    }
    this.setState({
      // TODO show back handsOver Actionable cards
      showActionableCards : true,
      whatIsExpectedNext: "CharacterActionButtonClick" ,
      messageBoardState: "default",
      mainUserMessage : newMessage});
  }

  doMoveSomeOne(puppet) {
    let lng = this.state.languageDistributor;
    if (isNaN(puppet) || puppet == null) {
        // alert(lng.chooseAnExplorerToMove);
        this.customAlert(lng.chooseAnExplorerToMove);
        return null;
    }
    let whereCanHeMove = this.whereNavigatorCanMoveHim(this.state.players[puppet].position);
    this.state.players[puppet].whereCanHeMove = whereCanHeMove;
    let n_players = this.state.players;
    for (let i = 0; i < n_players.length; i++){
      if (i == puppet){
        n_players[i].isPuppet = true;
      }
      else {
        n_players[i].isPuppet = false;
      }
    }

    this.unlightTheTiles();
    this.lightTheTiles(whereCanHeMove, this.state.players[puppet].color);
    let newMessage = new UserMessage('chooseADestination', null, false, []); // TODO : SET a cancel
    this.setState({ whatIsExpectedNext: "TileButtonClickForMoveSomeone" ,
                    mainUserMessage: newMessage,
                    messageBoardState : "moveSomeOneSequence",
                    players : n_players });
  }

  doGiveACard(giver, card, receiver){
    let lng = this.state.languageDistributor;
    // alert("GIVE A CARD : " + giver + " will give the " + card + " to " + receiver);
    console.log("PRE  Given : " + card + " to " + receiver);
    if (card == null){
      this.customAlert(lng.pleaseSelectACardToGive);
      // alert(lng.pleaseSelectACardToGive);
    } else if (receiver == null){
      this.customAlert(lng.pleaseSelectARecipientForTheCard);
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
        this.customAlert("CONCEPTUAL ERROR: Couldn't find the card");
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
    // alert("players on the same tile than me : Iam " +  id + " and I'm with" + playersOnTheSameTileExceptMe);
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

  doStatePermutation(newState){
      this.setState({
        tiles: newState.tiles,
        playerCardsLeap: newState.playerCardsLeap,
        playerCardsDiscard: newState.playerCardsDiscard,
        floodCardsLeap: newState.floodCardsLeap,
        floodCardsDiscard: newState.floodCardsDiscard,
        floodCardsOutOfGame: newState.floodCardsOutOfGame,
        //
        players: newState.players,
        nbrOfPlayers : newState.nbrOfPlayers,
        floodMeter: newState.floodMeter,
        difficultyLevel: newState.difficultyLevel,
        difficultyLevelString: newState.difficultyLevelString,
        versionNumber: newState.versionNumber,
        //
        pastStates: newState.pastStates,
        //
        gameIsLost: newState.gameIsLost,
        gameIsWon: newState.gameIsWon,
        gameIsOver: newState.gameIsOver,
        endMessage: newState.endMessage,
        gameID: newState.gameID,
        //
        languageDistributor: newState.languageDistributor,
        selectedLanguage: newState.selectedLanguage,
        //
        posessedTreasures : newState.posessedTreasures,
        turn : newState.turn,
        hasPilotFlownThisTurn : newState.hasPilotFlownThisTurn,
        currentPlayerPlaying : newState.currentPlayerPlaying,
        blinkPlayer : newState.blinkPlayer,
        blinkingTile : newState.blinkingTile,
        possibleActions : newState.possibleActions,
        currentStep : newState.currentStep,
        whatIsExpectedNext : newState.whatIsExpectedNext,
        whatIsExpectedNext_toRestore : newState.whatIsExpectedNext_toRestore,
        mainUserMessage : newState.mainUserMessage,
        mainUserMessage_toRestore: newState.mainUserMessage_toRestore,
        messageBoardState : newState.messageBoardState,
        messageBoardState_toRestore : newState.messageBoardState_toRestore,
        cardUser : newState.cardUser,
        coTravellers : newState.coTravellers,
        cardFlyWith : newState.cardFlyWith,
        inAGetRidOfACardContext : newState.inAGetRidOfACardContext,
        guysToEvacuate : newState.guysToEvacuate,
        floodingSequence : newState.floodingSequence,
        showActionableCards : newState.showActionableCards,
        showRollBackButton : newState.showRollBackButton
      });
  }

  renderSquare(i) {
    return(
      <span>
        <DrawSquare tile={this.state.tiles[i]} players={this.state.players} index={i} blinkPlayer={this.state.blinkPlayer} doBlink={this.state.blinkingTile == i} onClick={() => this.handleTileClick(i)}/>
      </span>
    );
  }

  renderEmptySquare() {
    return (
      <DrawEmptySquare /*HACK onClick={() => this.launchGameOver(false, true, "Yolo")} *//>
    );
  }

  renderTreasureSquare(treasureId) {
    // if le tresor a été trouvé draw it else Draw empty square
    let lng = this.state.languageDistributor;
    let trophyPath = "";
    let msg = "";

    if (this.state.posessedTreasures.indexOf(treasureId) >= 0){
      for (let i = 0 ; i < treasures.length; i++){
        if (treasures[i].id === treasureId)
        {
          trophyPath = treasures[i].trophyImg;
          msg = this.getStringInTheCatalog(lng, treasures[i].loc_found_msg_key);
          break;
        }
      }
    }

    return (
      <span>
      {
        trophyPath.length > 0 ?
          <DrawEmptySquareWithTreasure imagePath={trophyPath} text={msg} id={treasureId} />
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
                return card.name === "helicopter" && this.state.showActionableCards ?
                    <span key={index} className="activableBoardPlayerCards">
                      <img src={card.url} width="45px" height="70px" onClick={() => this.handleCardClick("helicopterCard", this.state.players[i].id, false)}/>
                      <span className="spanOverHand"><img id={"actionCard:" + index + "::" + i} className="overHand doRotate" src="img/hand.png"/></span>
                    </span>
                  : card.name === "sandBag" && this.state.showActionableCards ?
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
    let str_currentStep = this.getStringInTheCatalog(lng, playerSteps[this.state.currentStep].wording);
    let langToggleImg = this.state.selectedLanguage === "FR" ? "img/toggle_right.png" : "img/toggle_left.png";

    // Either we're in action or before picking the first player card :
    let showBackButton = this.state.showRollBackButton && ((this.state.currentStep > 0 && this.state.currentStep < 3) || ( this.state.mainUserMessage.buttons.indexOf(2) >= 0));

    return (
      <span>
        <div className="messagePanel">
          <div className="panelTitle"> {lng.mainTitle01}<br/>{lng.mainTitle02}</div>
          <div className="panelSubTitle"><b>{this.state.versionNumber}</b></div>
          <div className="littlePanelInfo">English <img id="langToggle" src={langToggleImg} onClick={() => this.doChangeLang()} /> Français</div>
          <div className="littlePanelInfo">{lng.turn} {this.state.turn} | {lng.level} {this.state.difficultyLevelString}</div>
          <div className="littlePanelInfo">{lng.treasuresFound} : {foundTreasures}/4 </div>
          <div className="littlePanelInfo"> {lng.floodLevel} {this.state.floodMeter.level} {lng.xCardsPerFlood.format(this.state.floodMeter.floodFactor)}</div>
        </div>
        <div className="messagePanel02">
          <div className="panelInfo"> {currentPlayer.name}&nbsp;{str_roleQualifier}&nbsp;<span style={{color: currentPlayer.color}}>{str_roleAttachedToName}</span>&nbsp;{lng.isPlaying}
            <br/>
            <span className="superLittlePanelInfo"> {str_currentStep} </span>
            <br/>
            {this.renderTurnStepsBoard()}
          </div>
        </div>
        <div className="actionPanel">
          { showBackButton ?
              <span className="rollBackButton">
                <a className="actionTooltips" href="#">
                  <img className="rollBackButtonImg" src="img/backButton.png" width="15" height="15" onClick= {() => this.handleRollBack(this.state.currentStep)}/>
                  <span className="actionTooltipsForRollback inToolTipsText">{this.getStringInTheCatalog(lng, 'ah_rollback')}</span>
                </a>
              </span>
              : <span></span>
          }
          {this.renderMessageBoard()}
          <div className="panelInfo" id="UserActions">
            
              {this.state.possibleActions.map((action, index) =>
                <>
                    <button className="actionButton fullButton" onClick={() => this.handleActionClick(action.triggers)} >
                      {this.getStringInTheCatalog(lng, action.locName)}
                    </button>
                    <a className="actionTooltips helpCharacterIcon" id={'tooltipAction' + index} href="#">?<span className="inToolTipsText">{this.getStringInTheCatalog(lng, action.locHelp)}</span></a>
                 </>
              )}
            
          </div>
        </div>
        <div className="mailMessage">
          {lng.mailMessage} <a href={lng.mailAdress} className="write2me">{lng.mailLink}</a>
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
      //alert("receiver = " + receiver + " giverId = " + giverId + " chosencard = " + chosenCard );
      return (
          <div className="panelInfo" id="UserDialog">
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
              // dedoublonner
              this.doDedoubleCards(this.state.players[giverId].cards).map((card, index) =>
              <tr>
                <td><span key={'card'+index}/><input type="radio" name="chosenCard" key={index} value={card.id} onChange={() => chosenCard = card.id} /></td>
                <td><img src= {card.url}  width="20px" height="32px"/></td>
                <td>{this.getStringInTheCatalog(lng, card.loc_key)} <span className="superSmall">x{card.howMany}</span></td>
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
          <div className="panelInfo" id="UserDialog">
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
              this.doDedoubleCards(this.state.players[giverId].cards).map((card, index) =>
              <tr>
                <td><span key={'card'+index}/><input type="radio" name="chosenCard" key={index} value={card.id} onChange={() => chosenCard = card.id} /></td>
                <td><img src= {card.url}  width="20px" height="32px"/></td>
                <td>{ this.getStringInTheCatalog(lng, card.loc_key)} <span className="superSmall">x{card.howMany}</span></td>
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
        //let flyerId = this.state.cardUser;
        //let playersOnTheSameTileExceptMe = this.getPlayersOnTheSameTileExceptMe(flyerId);

        let travellers = [];
        let whereAndWho = [[]];

        /*
        for (let i = 0 ; i < this.state.tiles.length; i++){
          if (this.state.tiles[i].playerOn && this.state.tiles[i].playerOn.length > 0)
          {
            whereAndWho[i] = [];
            whereAndWho[i] = this.state.tiles[i].playerOn;
          }
        }
        */

        this.state.players.map(p => {
          whereAndWho[p.position] = this.state.tiles[p.position].playerOn; // may be redundant but.... who cares. Max of 4 iterations
        });

        console.log(JSON.stringify(whereAndWho));

        function Amadeus(id, element){
          if (document.getElementById(element).checked)
          {
              // add to travellers
              travellers.push(id);
          } else {
              // remove from travellers
              travellers.splice(travellers.indexOf(id), 1);
          }
        }

        return (
          <div className="panelInfo" id="UserDialog">
          {lng.selectTheGuys}
            {
                (whereAndWho.map((playersOnT, indexTile) => {
                  return (
                    playersOnT.length > 0 ?
                     (<div className="lilGreyFrame">
                     {
                        playersOnT.map((playerId, indexPlayer) => {
                          return <span key={playerId}>
                                  <input type="checkBox" name="traveller" id={"checkBoxAmadeusFor"+playerId} key={playerId} value={playerId} onChange={() => Amadeus(playerId, "checkBoxAmadeusFor"+playerId)} /><span style={{color: this.state.players[playerId].color}}>{this.state.players[playerId].name}</span><br/></span>
                        })
                      }
                      </div>)
                      :
                      <></>
                    )
                  }))
            }
            <br />
            <button className="actionButton" onClick={() => this.helicopterCardEnRoute(travellers)}>{lng.hopIn}</button>
          </div>
        )
    } else if (this.state.messageBoardState === "moveSomeOneSequence") {
      let puppet = null;
          return (
            <div className="panelInfo" id="UserDialog">
              {lng.whoDoYouWantToMove} <br/>
              {
              (this.state.players.map((player, index) => {
                return (player.role != "Navigator") ?
                  (<span key={index}><input type="radio" name="puppet" key={index} value={player.id} onChange={() => this.doMoveSomeOne(player.id)}/><span style={{color: player.color}}>{player.name}</span><br/></span>)
                  :
                  (<span key={index}></span>)
                }))
              }
              <div>{lng.andMoveHimUpToTwoTiles}</div>
            </div>
          )
    } else if (this.state.messageBoardState === "SolveOver5Cards") {

      // TODO set a RED border
      let userId = this.state.cardUser;
      let color = this.state.players[userId].color;
      let name = this.state.players[userId].name;
      // let cardsInHand = this.state.players[userId].cards;
      // console.log("user is : " + user + ". His cards : " + cardsInHand);

      return(
        <div className="panelInfo" id="UserDialog">
          <span  style={{color: color}}>{name}</span> {lng.hasMoreThan5Card}<br/>
          {lng.letsGetRidOvIt} <br/>
          <table className="throwTable">
            <tbody>
          {
            (this.doDedoubleCards(this.state.players[userId].cards).map((card, index) => {
              return (card.type === "H" || card.type === "SB") ?
                  (<tr>
                    <td><span key={index}/>{card.name} <span className="superSmall">x{card.howMany}</span></td>
                    <td> <img src= {card.url}  width="20px" height="32px"/></td>
                    <td><button onClick={() => this.throwCard(card.type, index, userId)}>{lng.btn_throw}</button></td>
                    <td><button onClick={() => this.useACardToGetRidOfIt(card.type, index, userId)}>{lng.btn_use}</button></td>
                  </tr>)
                  :
                  (<tr>
                    <td><span key={index}/>{card.name} <span className="superSmall">x{card.howMany}</span></td>
                    <td> <img src= {card.url}  width="20px" height="32px"/></td>
                    <td><button onClick={() => this.throwCard(card.type, index, userId)}>{lng.btn_throw}</button></td>
                    <td></td>
                  </tr>)
            }))
          }
            </tbody>
          </table>
        </div>
      )
    } else if (this.state.messageBoardState === "empty"){
          return (
            // shouldn't happened.
            <div>++ empty ++</div>
          )
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
      let showThisIsTheEndMyFriend = (buttons.indexOf(11) >= 0)?({display: 'block'}):({display: 'none'});

      // complexMessages Are already translated.
      // let msgEts = this.state.mainUserMessage.complexMessage;

      let translatedString = "";
      if (this.state.mainUserMessage.complexMessage && this.state.mainUserMessage.complexMessage.length > 0){
        translatedString = this.state.mainUserMessage.complexMessage;
      }
      else {
        translatedString = this.getStringInTheCatalog(lng, this.state.mainUserMessage.message);
      }

      return(
          <div className="panelInfo" id="UserDialog">
          <span id="mainMessage" dangerouslySetInnerHTML={{__html: translatedString}} />
          {
            //!gameIsOver ?
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
                <button style={showThisIsTheEndMyFriend} onClick ={() => this.doShowGameIsLost()}>{lng.btn_fate}</button>
              </div>)
            //  :
            //  (<div>
            //    <button style={showThisIsTheEndMyFriend} onClick ={() => this.doShowGameIsLost()}>{lng.btn_fate}</button>
            //  </div>)
        }
      </div>
      )
    }
  }

  renderTurnStepsBoard(){
    let curColor = this.state.players[this.state.currentPlayerPlaying].color;
    if (this.state.players[this.state.currentPlayerPlaying].role === "Messenger"){
      curColor = "#CCCCCC";
    }

    let step = this.state.currentStep;

    return(
      <div>
        <span className="lilsqr" style={step == 0 ? {color: curColor, borderColor: curColor} :  {color: curColor, borderColor: curColor, backgroundColor: curColor}}>
        </span>
        &nbsp;
        <span className="lilsqr" style={step < 2 ? {color: curColor, borderColor: curColor} :  {color: curColor, borderColor: curColor, backgroundColor: curColor}}>
        </span>
        &nbsp;
        <span className="lilsqr" style={step < 3 ? {color: curColor, borderColor: curColor} :  {color: curColor, borderColor: curColor, backgroundColor: curColor}}>
        </span>
        &nbsp;
        <span className="lilcard">
          <span className="inlilcard">1</span>
          {
            step >= 4 ?
              (
                <span className ="checkmark">
                  <div className ="checkmark_stem"></div>
                  <div className ="checkmark_kick"></div>
                </span>
            ):<span></span>
          }
        </span>
        &nbsp;
        <span className="lilcard">
          <span className="inlilcard">2</span>
          {
            step >= 5 ?
              (
                <span className ="checkmark">
                  <div className ="checkmark_stem"></div>
                  <div className ="checkmark_kick"></div>
                </span>
            ):<span></span>
          }
        </span>
        &nbsp;
        {
          step >= 5 ?
          <span className ="floodIndicatorOn blink2">Flood</span>
          :
          <span className ="floodIndicatorOff">Flood</span>
        }
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
      if (this.state.tiles[i].isDrawned === false && this.state.tiles[i].isDrawning === false ){
        document.getElementById("square" + i).style.border = "1px solid #222";
      } else {
        document.getElementById("square" + i).style.border = "1px solid transparent";// transparent
      }
    }
    return true;
  }

  blinkATile(tileId) {// never called
      this.customAlert("blikATile is Called for tile " + tileId);
      document.getElementById("square" + tileId).classList.add('blink');
  }

  unblinkTheTiles() {
      for (let i = 0; i < 24; i++){
        if ( document.getElementById("square" + i).classList.contains('blink') ){
          document.getElementById("square" + i).className =
              document.getElementById("square" + i).className.replace( /(?:^|\s)blink(?!\S)/g , '' )
        }
      }
  }

  blinkAPlayer(playerId) {
      document.getElementById("player" + playerId).classList.add('blink');
  }

  unblinkAPlayer(playerId) {
      if ( document.getElementById("player" + playerId).classList.contains('blink') ){
          document.getElementById("player" + playerId).className.replace( /(?:^|\s)blink(?!\S)/g , '' )
       }
  }

  retry(){
    // window.location.reload();
    if (!window.location.hash)
    {
        window.location.search = "?lang=" + this.state.selectedLanguage + "&difficulty=" + this.state.difficultyLevel + "&nbrOfPlayers=" + this.state.nbrOfPlayers;
    }
  }

  getTreasureNameById(id){
    console.log("In getTreasureById with : " + id);
    /*
    for (let i = 0; i < treasures.length; i ++){
      if (treasures[i].id === id){
        return this.getStringInTheCatalog(this.state.languageDistributor, treasures[i].loc_key);
      }
    }
    return "** Unknown Treasure was " + id + "**";
    */

    let t = treasures.filter( treasure => {
        return treasure.id === id;
    })

    return this.getStringInTheCatalog(this.state.languageDistributor, t[0].loc_key);
  }

  actionIsInThePossibleActionsListAlready(actionName){
    /*
    for(let i = 0 ; i < this.state.possibleActions.length; i++){
      if (this.state.possibleActions[i].name === actionName){
        return true;
      }
    }
    return false;
    */

    let a = this.state.possibleActions.filter( possibleAction => {
      return possibleAction.name === actionName ;
    });

    return a.length > 0;
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

  customAlert(msg) {
    document.getElementById("blockAll").classList.add('blockAll');
    document.getElementById('alertText').innerHTML = msg;
    document.getElementById("customAlert").style.display = "block";
  }

  clearCustomAlert(){
    document.getElementById("blockAll").classList.remove('blockAll');
    document.getElementById("customAlert").style.display = "none";
  }

  doDedoubleCards(arrayOfCards) {
      let output = [];
      let alreadyIn = [];
      if (arrayOfCards.length > 0) {
        // 1st card
          alreadyIn.push(arrayOfCards[0].type);
          output.push(arrayOfCards[0]);
          output[0].howMany = 1;
          // next cards
          if (arrayOfCards.length > 1){
            for (let i = 1; i < arrayOfCards.length; i ++){
              if (!alreadyIn.includes(arrayOfCards[i].type)) {
                arrayOfCards[i].howMany = 1;
                output.push(arrayOfCards[i]);
                alreadyIn.push(arrayOfCards[i].type);
              }
              else {
                /*
                for (let k = 0; k < output.length; k ++){
                  if (output[k].type === arrayOfCards[i].type){
                    output[k].howMany ++;
                    break;
                  }
                }
                */

                output.map((o => {
                  if (o.type === arrayOfCards[i].type){
                    o.howMany ++;
                  }
                }));
              }
            }
          }
      }
      return output;
  }

  doChangeLang(){
    if (this.state.languageDistributor.currentLanguage === "FR"){
        document.getElementById("langToggle").src = "img/toggle_left.png";
        this.setState({languageDistributor: stringsCatalog.en});
    } else {
        document.getElementById("langToggle").src = "img/toggle_right.png";
        this.setState({languageDistributor: stringsCatalog.fr});
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

      let catalog = Object.entries(distributor); // TODO : Object is created everytime
      let stringInput = input.toString();
      // alert ("stringInput is : " + stringInput);
      let s = catalog.filter( couple => {
          return couple[0] === stringInput;
      });
      //alert (typeof s);
      // alert ("asked for " + stringInput + " creates " + s /*+ " and gives " + s[0][1]*/);
      return s[0][1];
      
      /*
     for (let i = 0 ; i < catalog.length; i++){
        if (catalog[i][0] == stringInput){
          return catalog[i][1];
        }
      }
      */

      //return "YYYYY FIX ME YYYYY";
  }

  launchGameOver(gameIsWon, gameIsLost, msg){
    this.customAlert("Mow SHOULDN't BE USED ANY MORE");
    this.setState({
      gameIsOver: true,
      gameIsLost: gameIsLost,
      gameIsWon: gameIsWon,
      endMessage: msg,
    });
  }

  renderGameOverPanel(msg) {
    document.getElementById("blockAll").classList.add('blockAll');
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
    document.getElementById("blockAll").classList.add('blockAll');
    let lng = this.state.languageDistributor;
    let msg = lng.youWonMsg.format(this.state.nbrOfPlayers);

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
      let fOm_position_value = "relative";
      let fOm_left_value = 5 + ((this.state.floodMeter.level - 1) * 33);
      let fOm_top_value = -70;
      // calculate length of the jauges in px
      
      let nbrOfPlayerCards = 28;
      let nbrOfFloodCards = 24;
      //117 is cellJauge px in css
      let cellJaugepx = 117;
      let floodCardsJaugeWidth = (this.state.floodCardsLeap.length * (cellJaugepx - 10)) / nbrOfFloodCards;
      let playerCardsJaugeWidth = (this.state.playerCardsLeap.length * (cellJaugepx - 10)) / nbrOfPlayerCards;

      let floodCardsDiscardJaugeWidth = (this.state.floodCardsDiscard.length * (cellJaugepx - 10)) / nbrOfFloodCards;
      let playerCardsDiscardJaugeWidth = (this.state.playerCardsDiscard.length * (cellJaugepx - 10)) / nbrOfPlayerCards;
      let lng = this.state.languageDistributor;

    return (
      <div  className="littleCopyrightLine">
        <div id="customAlert" className="custom-alert-panel">
              <div id="alertText" className="alertText">Ce message ne devrais jamais s'afficher.</div>
              <div id="alertCloseButton" className="alertCloseButton" onClick={() => this.clearCustomAlert()}>{lng.btn_understood}</div>
        </div>

        <div className="littleCopyrightLine">{lng.copyright}</div>
        <div>
          {this.state.showGameIsLost ?
            <div id="game-over-panel" className="game-lost-panel">
              {this.renderGameOverPanel(this.state.endMessage)}
            </div> : <div></div>
          }
          {this.state.gameIsWon ?
            <div id="game-over-panel" className="game-won-panel">
              {this.renderGameOverPanel(this.state.endMessage)}
            </div> : <div></div>
          }
          <div id="blockAll">
          <div className="messageBoard-column">
            {this.renderPlayerMessagePanel()}
          </div>
          <div className="board-column">
            <div className="islandBoard" style={{ backgroundImage: "url('img/sea05.png')"}}>
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
                <span className="floodOmeterCursor" id="floodOmeterCursor" style={{position: fOm_position_value, left: fOm_left_value+'px', top: fOm_top_value+'px'}}><img src="img/FloodOmeterCursor.png"/></span>
            </div>
            <table className="cardsPilesTable">
              <tbody>
              <tr><th colSpan="2">{this.state.languageDistributor.playerCards}</th><th colSpan="2">{this.state.languageDistributor.floodCards}</th></tr>
              <tr style={{height: '18px'}}>
                <td className="cellTitle" >{this.state.languageDistributor.leap}</td><td className="cellJauge" ><table className="invisiTable"><tbody><tr className="invisiTable"><td className="jaugePlayer invisiTable" style={{width: playerCardsJaugeWidth}}></td><td className="superSmall invisiTable">{this.state.playerCardsLeap.length}</td></tr></tbody></table></td>
                <td className="cellTitle">{this.state.languageDistributor.leap}</td><td className="cellJauge"><table className="invisiTable"><tbody><tr className="invisiTable"><td className="jaugeFlood invisiTable" style={{width: floodCardsJaugeWidth}}></td><td className="superSmall invisiTable">{this.state.floodCardsLeap.length}</td></tr></tbody></table></td>
              </tr>
              <tr>
                <td className="cellTitle">{this.state.languageDistributor.discard}</td><td className="cellJauge"><table className="invisiTable"><tbody><tr className="invisiTable"><td className="jaugePlayer invisiTable" style={{width: playerCardsDiscardJaugeWidth}}></td><td className="superSmall invisiTable">{this.state.playerCardsDiscard.length}</td></tr></tbody></table></td>
                <td className="cellTitle">{this.state.languageDistributor.discard}</td><td className="cellJauge"><table className="invisiTable"><tbody><tr className="invisiTable"><td className="jaugeFlood invisiTable" style={{width: floodCardsDiscardJaugeWidth}}></td><td className="superSmall invisiTable">{this.state.floodCardsDiscard.length}</td></tr></tbody></table></td>
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
</span>
*/
////// END OF Board Class

class Game extends React.Component {
   constructor(props) {
    super(props);

    // DEFAULT ENTRIES :::INIT
    let difficulty = 2;
    let language = "EN";
    let nbrOfPlayers = 4;
    let versionNumber = "v0.8.6 BETA";

    // lets' try to get params from GET
    let propagatedDifficulty = null;
    let propagatedLanguage = null;
    let propagatedNbrOfPlayers = null;

    let current_url = window.location.href;
    let splittedUrl = current_url.split('?');

    let params = new URLSearchParams(splittedUrl[1]);

    if (params){
      if (params.has('difficulty')){
        propagatedDifficulty = parseInt(params.get('difficulty'));
        if (!propagatedDifficulty.isNan && propagatedDifficulty < 5 && propagatedDifficulty > 0){
          difficulty = propagatedDifficulty;
        }
      }

      if (params.has('nbrOfPlayers')){
        propagatedNbrOfPlayers = parseInt(params.get('nbrOfPlayers'));
        if (!propagatedNbrOfPlayers.isNan && propagatedNbrOfPlayers > 0 && propagatedNbrOfPlayers < 5){
          nbrOfPlayers = propagatedNbrOfPlayers;
        }
      }

      if (params.has('lang')){
        propagatedLanguage = params.get('lang');
        if (propagatedLanguage === 'FR' || propagatedLanguage === 'EN'){
          language = propagatedLanguage;
        }
      }
    }

    let stringcat = language === "EN" ? stringsCatalog.en : stringsCatalog.fr;

    this.state = {
      showStartPanel: true,
      showBoardPanel: true,
      showGameOverPanel: false,
      languageDistributor: stringcat,
      difficultyLevel: difficulty,
      // HACK
      // difficultyLevel: 9,
      language: language,
      nbrOfPlayers: nbrOfPlayers,
      versionNumber: versionNumber
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
            versionNumber: this.state.versionNumber,
            nbrOfPlayers: this.state.nbrOfPlayers,
            showStartPanel: false,
            showBoardPanel: true });

          ReactDOM.render(
            <Board nbrOfPlayers={this.state.nbrOfPlayers} difficultyLevel={this.state.difficultyLevel} language={this.state.language} versionNumber={this.state.versionNumber}/>,
            document.getElementById('game-board'));
     }

  render() {
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
          <div className="panelTitle"> {lng.mainTitle01}<br/>::ReactJS::<br/>{lng.mainTitle02}<br/><span className="littlePanelInfo">{this.state.versionNumber}</span></div>
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
              {this.state.language === "FR" ?
                <div>{lng.language} English <img id="homeLangToggle" src="img/toggle_right.png" onClick={() => this.doChangeLangSelector()} /> Français</div>
                :
                <div>{lng.language} English <img id="homeLangToggle" src="img/toggle_left.png" onClick={() => this.doChangeLangSelector()} /> Français</div>
              }

            <div><button onClick={() => this.launchBoard()}>{lng.letsGo}</button></div>
          </div>
        </div>
      </div>
    );
  }
}

class Tile {
  constructor(name, position, isImmersed, isDrawning, isDrawned, startBase, templeFor, playerOn, backgroundColor, littleTextToDisplay) {
    this.name = name; // string
    this.position = position; // int
    this.isImmersed = isImmersed; // bool
    this.isDrawning = isDrawning; // bool
    this.isDrawned = isDrawned; // bool
    this.startBase = startBase; // int [0-5]
    this.templeFor = templeFor; // string
    this.playerOn = playerOn; // int[]
    this.backgroundColor = backgroundColor; // string
    this.LittleTextToDisplay = littleTextToDisplay; // string
    this.imgpath = "./img/" + name + "Tile.png"; // string
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

    /*
    printIntroduction: {
        console.log(`My name is ${this.name}. Im an ${this.role} and my color is ${this.color}`);
    }
    */
  }
}

class FloodMeter {
  constructor(startLevel) {
    this.level = startLevel;
    this.topLevel = 10;
    this.floodFactor = this.internalHowManyCards(startLevel);
  }

  internalHowManyCards(level){
    // flood scale :  |12|345|67|89|
    //                |2 |3  |4 |5 |
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

// un custom string.format
String.prototype.format = function() {
  var args = arguments;
  return this.replace(/{(\d+)}/g, function(match, number) {
    return typeof args[number] != 'undefined'
      ? args[number]
      : match
    ;
  });
};

/*
// TOUT EST INNONDé
function riseTheIsland(){
    var tile01 = new Tile("helipad", 0, true, false, false, 5, "", [], "#A9D0F5", "HELIPORT");
    var tile02 = new Tile("doorBlack", 0, true, false, false, 3, "", [], "#6E6E6E", "");
    var tile03 = new Tile("doorRed", 0, true, false, false, 0, "", [], "#F78181", "");
    var tile04 = new Tile("doorGreen", 0, true, false, false, 4, "", [], "#9FF781", "");
    var tile05 = new Tile("doorWhite", 0, true, false, false, 2, "", [], "#D9D9D9", "");
    var tile06 = new Tile("doorYellow", 0, true, false, false, 1, "", [], "#F2F5A9", "");
    var tile07 = new Tile("temple0001", 0, true, false, false, "", "CR", [], "#bdc3c7", "TEMPLE CRYSTAL");
    var tile08 = new Tile("temple0002", 0, true, false, false, "", "CR", [], "#bdc3c7", "TEMPLE CRYSTAL");
    var tile09 = new Tile("temple0101", 0, true, false, false, "", "CU", [], "#bdc3c7", "TEMPLE CUP");
    var tile10 = new Tile("temple0102", 0, true, false, false, "", "CU", [], "#bdc3c7", "TEMPLE CUP");
    var tile11 = new Tile("temple0201", 0, true, false, false, "", "SC", [], "#bdc3c7", "TEMPLE SCEPTRE");
    var tile12 = new Tile("temple0202", 0, true, false, false, "", "SC", [], "#bdc3c7", "TEMPLE SCEPTRE");
    var tile13 = new Tile("temple0301", 0, true, false, false, "", "ST", [], "#bdc3c7", "TEMPLE STATUE");
    var tile14 = new Tile("temple0302", 0, true, false, false, "", "ST", [], "#bdc3c7", "TEMPLE STATUE");
    var tile15 = new Tile("coast01", 0, true, false, false, "", "", [], "#825a2c", "");
    var tile16 = new Tile("coast02", 0, true, false, false, "", "", [], "#825a2c", "");
    var tile17 = new Tile("coast03", 0, true, false, false, "", "", [], "#825a2c", "");
    var tile18 = new Tile("desert01", 0, true, false, false, "", "", [], "#ffd480", "");
    var tile19 = new Tile("desert02", 0, true, false, false, "", "", [], "#ffd480", "");
    var tile20 = new Tile("desert03", 0, true, false, false, "", "", [], "#ffd480", "");
    var tile21 = new Tile("swamp01", 0, true, false, false, "", "", [], "#bcf0d2", "");
    var tile22 = new Tile("swamp02", 0, true, false, false, "", "", [], "#bcf0d2", "");
    var tile23 = new Tile("swamp03", 0, true, false, false, "", "", [], "#bcf0d2", "");
    var tile24 = new Tile("swamp04", 0, true, false, false, "", "", [], "#bcf0d2", "");
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
}*/

function riseTheIsland(){
    var tile01 = new Tile("helipad", 0, false, false, false, 5, "", [], "#A9D0F5", "HELIPORT");
    var tile02 = new Tile("doorBlack", 0, false, false, false, 3, "", [], "#6E6E6E", "");
    var tile03 = new Tile("doorRed", 0, false, false, false, 0, "", [], "#F78181", "");
    var tile04 = new Tile("doorGreen", 0, false, false, false, 4, "", [], "#9FF781", "");
    var tile05 = new Tile("doorWhite", 0, false, false, false, 2, "", [], "#D9D9D9", "");
    var tile06 = new Tile("doorYellow", 0, false, false, false, 1, "", [], "#F2F5A9", "");
    var tile07 = new Tile("temple0001", 0, false, false, false, "", "CR", [], "#bdc3c7", "TEMPLE CRYSTAL");
    var tile08 = new Tile("temple0002", 0, false, false, false, "", "CR", [], "#bdc3c7", "TEMPLE CRYSTAL");
    var tile09 = new Tile("temple0101", 0, false, false, false, "", "CU", [], "#bdc3c7", "TEMPLE CUP");
    var tile10 = new Tile("temple0102", 0, false, false, false, "", "CU", [], "#bdc3c7", "TEMPLE CUP");
    var tile11 = new Tile("temple0201", 0, false, false, false, "", "SC", [], "#bdc3c7", "TEMPLE SCEPTRE");
    var tile12 = new Tile("temple0202", 0, false, false, false, "", "SC", [], "#bdc3c7", "TEMPLE SCEPTRE");
    var tile13 = new Tile("temple0301", 0, false, false, false, "", "ST", [], "#bdc3c7", "TEMPLE STATUE");
    var tile14 = new Tile("temple0302", 0, false, false, false, "", "ST", [], "#bdc3c7", "TEMPLE STATUE");
    var tile15 = new Tile("coast01", 0, false, false, false, "", "", [], "#825a2c", "");
    var tile16 = new Tile("coast02", 0, false, false, false, "", "", [], "#825a2c", "");
    var tile17 = new Tile("coast03", 0, false, false, false, "", "", [], "#825a2c", "");
    var tile18 = new Tile("desert01", 0, false, false, false, "", "", [], "#ffd480", "");
    var tile19 = new Tile("desert02", 0, false, false, false, "", "", [], "#ffd480", "");
    var tile20 = new Tile("desert03", 0, false, false, false, "", "", [], "#ffd480", "");
    var tile21 = new Tile("swamp01", 0, false, false, false, "", "", [], "#bcf0d2", "");
    var tile22 = new Tile("swamp02", 0, false, false, false, "", "", [], "#bcf0d2", "");
    var tile23 = new Tile("swamp03", 0, false, false, false, "", "", [], "#bcf0d2", "");
    var tile24 = new Tile("swamp04", 0, false, false, false, "", "", [], "#bcf0d2", "");
    // create a 24 array
    let tiles = [tile01,tile02,tile03,tile04,tile05,tile06,tile07,tile08,tile09,tile10,
      tile11,tile12,tile13,tile14,tile15,tile16,tile17,tile18,tile19,tile20,
      tile21,tile22,tile23,tile24];
    // shuffleIt
    tiles = shuffleArray(tiles);

    // foreach tile : make its index its position
    tiles.map((tile,index) => 
    {
      tile.position = index;
    });

    return tiles;
}

function generatePlayerCardsLeap(){
    let cards = [];
    for (let i = 0; i < 5; i++){ // 5 cards
        let card = { id : i, name : "crystal", loc_key: "ca_crytal", type : "CR", url : "img/crystalCard.png", howMany : 0};
        cards.push(card);
    }
    for (let i = 0; i < 5; i++){ // 5 cards
        let card = { id : i + 5, name : "cup", loc_key: "ca_cup", type : "CU", url : "img/cupCard.png", howMany : 0};
        cards.push(card);
    }
    for (let i = 0; i < 5; i++){ // 5 cards
        let card = { id : i + 10, name : "sceptre", loc_key: "ca_sceptre", type : "SC", url : "img/sceptreCard.png", howMany : 0};
        cards.push(card);
    }
    for (let i = 0; i < 5; i++){ // 5 cards
        let card = {id : i + 15, name : "statue", loc_key: "ca_statue", type : "ST", url : "img/statueCard.png", howMany : 0};
        cards.push(card);
    }
    for (let i = 0; i < 3; i++){ // 3 cards
        let card = { id : i + 20, name : "helicopter", loc_key: "ca_helicopter", type : "H", url : "img/helicopterCard.png", howMany : 0};
        cards.push(card);
    }
    for (let i = 0; i < 2; i++){ // 2 cards
        let card = { id : i + 23, name : "sandBag", loc_key: "ca_sandBag", type : "SB", url : "img/sandBagCard.png", howMany : 0};
        cards.push(card);
    }
    for (let i = 0; i < 3; i++){ // 3 cards
        let card = { id : i + 25, name : "floodRise", loc_key: "ca_floodRise", type : 5, url : "img/floodRise.png", howMany : 0};
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
      this.customAlert("CONCEPTUAL ERROR : Too many player requested");
    }
    let roles = [0,1,2,3,4,5];
    roles = shuffleArray(roles);
    // Diver hack off
    // let roles = [1,5,2,3,4,0];
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

function generateGUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
    });
}

function doLog(msg, msg2, msg3, state){
  var nbrOfDrawnTiles = 0;
  for(var i = 0; i < state.tiles.length; i++){
    if (state.tiles[i].isDrawned){
      nbrOfDrawnTiles++;
    }
  }

  var rolesString = "";
  for (var j = 0; j < state.players.length; j ++){
    var type = state.players[j].type;
    rolesString += playerTypes[type].shortRole;
    if (j < state.players.length - 1){
      rolesString += "+";
    }
  }

  var logString = Date.now() + "|";
  // game
  logString += state.gameID + "|";
  logString += msg + "|";
  logString += msg2 + "|";
  logString += msg3 + "|";
  logString += state.nbrOfPlayers + "|";
  logString += state.difficultyLevel + "|";
  logString += state.selectedLanguage + "|";
  logString += state.versionNumber + "|";
  // current state
  logString += state.turn + "|";
  logString += state.currentPlayerPlaying + "|";
  logString += state.posessedTreasures.length + "|";
  logString += state.floodMeter.level + "|";
  logString += nbrOfDrawnTiles + "|";
  logString += rolesString;

  console.log(logString);
  var logUrl = logHost + "?stf=" + logString;
  // if test local ou test de build, do not log
    if (document.URL.indexOf("localhost") < 0 && document.URL.indexOf("build") < 0 ){
          console.log("Logged");
          httpGetAsync(logUrl);
    }
}

function httpGetAsync(logUrl)
{
    var xmlHttp = new XMLHttpRequest();
    /*
    NOT USED
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    */
    xmlHttp.open("GET", logUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
