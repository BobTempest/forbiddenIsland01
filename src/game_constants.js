
export const logHost = "https://www.boulezrepublic.com/lileinterdite/logs/receiver.php";

export const playerTypes = [
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

export const orthogonalPaths =  {0 : [1,3], 1 : [0,4], 2 : [3,7], 3 : [0,2,4,8], 4 : [1,3,5,9], 5 : [4,10],
  6 : [7,12], 7 : [2,6,8,13], 8 : [3,7,9,14], 9 : [4,8,10,15], 10 : [5,9,11,16], 11 : [10,17], 12 : [6,13], 13 : [7,12,14,18],
  14 : [8,13,15,19], 15 : [9,14,16,20], 16 : [10,15,17,21], 17 : [11,16], 18 : [13,19], 19 : [14,18,20,22], 20 : [15,19,21,23],
  21 : [16,20], 22 : [19,23], 23 : [20,22]};
  
export const diagonalPaths = {0 : [2, 4], 1 : [3, 5], 2 : [0, 6, 8], 3 : [1,7,9], 4 : [0,8,10], 5 : [1,9,11], 6 : [2,13], 7 : [3,12,14],
   8 : [2,4,13,15], 9 : [3,5,14,16], 10 : [4,15,17], 11 : [5,16], 12 : [7,18], 13 : [6,8,19],
   14 : [7,9,18,20], 15 : [8,10,19,21], 16 : [9,11,20], 17 : [10,21], 18 : [12,14,22], 19 : [13,15,23], 20 : [14,16,22],
   21 : [15,17,23], 22 : [18,20], 23 : [19,21]};

 // const gameSteps = ["init", "startTurn", "playerActionOne", "playerActionTwo", "playerActionThree", "playerPickACard", "floodRise", "endTurn", "final"];

export const treasures = [
     { id : "CR" , name : "crystal", loc_key : "tr_crystal", trophyImg : "img/wonCrystal.png", litTempleImg : "img/tower_crystal.png", loc_found_msg_key : "found_crystal" },
     { id : "CU" , name : "cup", loc_key : "tr_cup", trophyImg : "img/wonCup.png", litTempleImg : "img/tower_cup.png", loc_found_msg_key : "found_cup"  },
     { id : "SC" , name : "sceptre", loc_key : "tr_sceptre", trophyImg : "img/wonSceptre.png", litTempleImg : "img/tower_sceptre.png", loc_found_msg_key : "found_sceptre" },
     { id : "ST" , name : "statue", loc_key : "tr_statue", trophyImg : "img/wonStatue.png", litTempleImg : "img/tower_statue.png", loc_found_msg_key : "found_statue" }
 ];

export const playerSteps = [
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

export const playerDefaultActions = [
      {id : 0, name : "Move", locName: "ac_move", locHelp: "ah_move", enabled : true, triggers : "Move" }, //has an adjacent tile around ?
      {id : 1, name : "Dry", locName: "ac_dry", locHelp: "ah_dry", enabled : true, triggers : "Dry"  }, //has an adjacent immersed tile around ?
      {id : 2, name : "Give", locName: "ac_give", locHelp: "ah_give", enabled : true, triggers : "Give" }, //has a player on his tile ?
      {id : 3, name : "Get a Treasure !", locName: "ac_getATreasure", locHelp: "ah_getATreasure", enabled : true, triggers : "GetATreasure"  }, // has 4 cards and is on the right temple
      /* {id : 4, name : "DoNothing", text: "Simply do nothing.", enabled : true, triggers : "DoNothing"  }, // -
      /* {id : 5, name : "Skip Turn", text: "Skip the player'sTurn.", enabled : true, triggers : "SkipTurn"  } // -*/
      {id : 6, name : "Sleep", locName: "ac_sleep", locHelp: "ah_sleep", enabled : true, triggers : "DoSleep"  }
 ];

export const playerSpecialActions = [
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

export const floodCards = [
 { name : "helipad" },
 { name : "doorBlack" }, { name : "doorYellow" }, { name : "doorGreen" }, { name : "doorRed" }, { name : "doorWhite" },
 { name : "temple0101" }, { name : "temple0102" }, { name : "temple0201" }, { name : "temple0202" },
 { name : "temple0301" }, { name : "temple0302" }, { name : "temple0001" }, { name : "temple0002" },
 { name : "desert01" }, { name : "desert02" }, { name : "desert03" }, { name : "coast01" }, { name : "coast02" },
 { name : "coast03" }, { name : "swamp01" }, { name : "swamp02" }, { name : "swamp03" }, { name : "swamp04" }];

 export class UserMessage {
   constructor(message, complexMessage, isImportant, buttons, databag) {
     this.message = message;
     this.complexMessage = complexMessage;
     this.isImportant = isImportant;
     this.buttons = buttons;
     this.databag = databag;
   }
 }

 export class Tile {
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
  
export class Player {
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
    }
  }