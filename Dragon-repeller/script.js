let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon =0;
let fighting;
let monsterHealht;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const weapons = [
  {
    name : "stick",
    power : 5
  },
  {
    name : "dagger",
    power : 30
  },
  {
    name : "claw hammer",
    power : 50
  },
  {
    name : "sword",
    power : 100
  }
];

const monsters =[
  {
    name : "slime",
    level : 2,
    health : 15
  },
  {
    name : "fanged beast",
    level : 8,
    health : 60
  },
  {
    name : "dragon",
    level : 20,
    health : 300
  },
];

const locations = [
  {
    name : "Town square",
    "button text":["Go to store","Go to cave","Fighting dragon."],
    "button function":[goStore,goCave,fightDragon],
    text : "You are in the town square. You see a sign that says \"store\"."
  },
  {
    name :"store",
    "button text":["Buy 10 health (10 gold)","Buy weapon (30 gold)","Go to town square"],
    "button function":[buyHealth,buyWeapon,goTown],
    text : "You enter the store"
  },
  {
    name : "cave",
    "button text":["fight slime","Fight fanged beast","Go to twon square"],
    "button function":[fightSlime,fightBeast,goTown],
    text : "You enter the cave. You see some monsters"
  },
  {
    name : "fight",
    "button text":["Attack","Dodge","Run"],
    "button function":[attack,dodge,goTown],
    text : "You are fighting a monster."
  },
  {
    name : "kill Monster",
    "button text":["Go to twon square","Go to twon square","Go to twon square"],
    "button function":[goTown,goTown,easterEgg],
    text : 'The monster scream "Arg!" as it dies. You gain experience points and find gold.'
  },
  {
    name : "lose",
    "button text":["REPLAY?","REPLAY?","REPLAY?"],
    "button function":[restart,restart,restart],
    text : "You die."
  },
  {
    name : "win",
    "button text":["REPLAY?","REPLAY?","REPLAY?"],
    "button function":[restart,restart,restart],
    text : "You defeat the dragron! You win the GAME!"
  },
  {
    name : "easterEgg",
    "button text":["2","8","Go to twon square"],
    "button function":[pickTwo,pickEight,goTown],
    text : "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches on eof the random numbers, you win!"
  },
]

// initialize buttons

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(locations){
  monsterStats.style.display = "none";
  button1.innerText = locations["button text"][0];
  button2.innerText = locations["button text"][1];
  button3.innerText = locations["button text"][2];
  button1.onclick = locations["button function"][0];
  button2.onclick = locations["button function"][1];
  button3.onclick = locations["button function"][2];
  text.innerText = locations["text"];
}
function goTown(){
  update(locations[0]);
}
function goStore(){
  update(locations[1]);
}

function goCave(){
  update(locations[2]);
}

function buyHealth(){
  if(gold >= 10){
    gold=gold-10;
    health=health+10
    goldText.innerText=gold;
    healthText.innerText=health;
  }
  else{
    text.innerText = "You do not have enough gold to buy health.";
  }
}

function buyWeapon(){
  if(currentWeapon < weapons.length - 1){
    if(gold >= 30){
      gold -= 30;
      currentWeapon += 1;
      goldText.innerText=gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a "+newWeapon+".";
      inventory.push(newWeapon);
      text.innerText = "In your inventory you have : " + inventory;
    }
    else{
      text.innerText = "You do not have enough gold to buy Weapon.";
    }
  }
  else{
    text.innerText = "You alredy have the most powerful weapon!"
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }

}

function sellWeapon(){
  if(inventory.length > 1){
    gold += 15;
    goldText.innerText=gold;
    let currentWeapon =inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText = "In your inventory you have : " + inventory;
  }
  else{
      text.innerText = "Do not sell your only Weapon!";
    }
}

function fightSlime(){
  fighting = 0;
  goFight();
}

function fightBeast(){
  fighting = 1;
  goFight();
}

function fightDragon(){
  fighting = 2;
  goFight();
}

function goFight(){
  update(locations[3]);
  monsterHealht = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterNameText.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealht;
}

function attack(){
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText = " You attack it with your " + weapons[currentWeapon].name + ".";

  if(isMonsterHits()){
    health -= getMonsterAttackValue(monsters[fighting].level);
  }
  else{
    text.innerText += "You miss.";
  }

  monsterHealht -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealht;

  if(health <= 0){
    lose();
  }

  else if(monsterHealht <= 0){
    if(fighting === 2){                 //  fighting === 2 ? winGame() : defeatMonster();
      winGame();
    }
    else{
      defeatMonster();
    }
  }

  if(Math.random() <= 0.1 && inventory.length !== 1){
    text.innerText += "Your" + inventory.pop() + "breaks.";
    currentWeapon --;
  }
}

function getMonsterAttackValue(level){
  let hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit;
}

function isMonsterHits(){
  return Math.random() > 0.2 || health < 20;  
}

function dodge(){
  text.innerText = " You dodge the attack from the " + monsters[fighting].name + ".";
}

function defeatMonster(){
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose(){
  update(locations[5]);
}

function winGame(){
  update(locations[6]);
}

function restart(){
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText=health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg(){
  update(locations[7]);
}

function pickTwo(){
  pick(2);
}

function pickEight(){
  pick(8);
}

function pick(guess){
  let numbers = [];
  while(numbers.lenght < 10){
    numbers.push(Math.floor(Math.random() * 11));
  }

  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";

  for(let i = 0; i < 10; i++ ){
    text.innerText += numbers[i] + "\n";
  }

  if(numbers.indexOf(guess) !== -1){
    text.innerText += "Right you win 20 gold!"
    gold += 20;
    goldText.innerText = gold;
  }
  else{
    text.innerText += "Wrong! you lost 10 health!"
    health -= 10;
    healthText.innerText=health;
    if (health <= 0){
      lose();
    }
  }
}