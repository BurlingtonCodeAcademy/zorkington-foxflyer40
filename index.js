const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
};
/*********Setup code* class definitions / Player object / commands************************************* */

const player = {
  currentRoom: null,
  isHungry: true,
  inventory: [],


}

class Room {
  constructor(name, desc, inventory) {
    this.name = name
    this.desc = desc
    this.locked = false
    this.inventory = inventory || []
    // what you can do in a room goes here enter, exit etc..

    this.room = (locked) => {
      if (playerAction === unlock) {
        this.room.locked = false
      }
    }

  }
}

class Item {
  constructor(name, description, takeable) {
    this.name = name
    this.description = description
    this.takeable = takeable || false

    this.examineItem = (item) => {
      return (item.description),
        play()
    }
  }
}

// commands
const commands = {
  read: ['read', 'look', 'view', 'decipher', 'examine'],
  exit: ['leave', 'go', 'exit'],
  unlock: ['unlock', 'open'],
  take: ['pick', 'take', 'grab', 'steal', 'buy'],
  drop: ['drop', 'remove'],
  enter: ['enter', 'go', 'open'],
  consume: ['eat', 'drink',]
}

function capitalize(word) {
  let firstLetter = word[0];
  let restOfWord = word.slice(1);
  return firstLetter.toUpperCase() + restOfWord.toLowerCase();
}

/******************Objects*********************** */

//Items
const sevenDays = new Item('7 Days', 'It is a 7 Days newspaper, rumpled and torn, from August 2014', true);
const sign = new Item('sign', 'Welcome to Burlington Code Academy! Come on up to the third floor. If the door is locked, use the code 12345.')



//Rooms
const MainSt = new Room('MainSt', 'There is a door here. A keypad sits on the handle. On the door is a handwritten sign.', ['keypad', 'sign']);
MainSt.locked = true
const Foyer = new Room('Foyer', 'You are inside the building.  Ahead of you is a stairway. On a table to your right is a newspaper.', ['SevenDays']);
const Hallway = new Room('Hallway', 'You are in a hallway on the 3rd floor.  To your left is an alcove with a Kitchen. In front of you is a door with a window.  You can see tables and chairs through the window', []);
const Classroom = new Room('Classroom', 'Bob is in the classroom drinking tea and waiting to lecture.'['Bob', 'laptop']);
const Kitchen = new Room('Kitchen', 'Tea is brewing in the teapot,'['tea']);
const Muddies = new Room('Muddies', 'Would you like to buy some coffee and a snack? It will make you code faster and with more energy.', ['coffee', 'snacks']);
const MrMikes = new Room('MrMikes', 'Pizza on a Friday is great for networking,'['pizza']);






/****************State Machine */
let roomIn = {
  'MainSt': { canChangeTo: ['Foyer', 'MrMikes', 'Muddies'] },
  'Foyer': { canChangeTo: ['MainSt', 'Hallway',] },
  'Hallway': { canChangeTo: ['Foyer', 'Kitchen', 'Classroom'] },
  'Classroom': { canChangeto: ['Hallway'] },
  'Kitchen': { canChangeto: ['Hallway'] },
  'Muddies': { canChangeto: ['MainSt', 'MrMikes'] },
  'MrMikes': { canChangeto: ['Muddies', 'MainSt'] },
}
let roomLookup = {
  'MainSt': MainSt,
  'Foyer': Foyer,
  'Hallway': Hallway,
  'Classroom': Classroom,
  'Kitchen': Kitchen,
  'Muddies': Muddies,
  'MrMikes': MrMikes
}

let itemsLookup = {
  'sign': sign,
  'sevendays': sevenDays
}



/********************* Game process******************************** */

start();

async function start() {
  const instruction = `\nWelcome to a typical day at Burlington code Academy
  Please answer questions as asked.
  
  You may let me know what you want to do by entering:
  a verb and an item.
  (ex. enter room, or take pizza)
  
  Are you ready to play?\n(Yes / No)>_`

  const welcomeMessage = `You are at 182 Main St, 
standing between Church St. and South Winooski Ave.

There is a door here. A keypad sits on the handle.
On the door is a handwritten sign.
(press enter to continue)`;

  let response = await ask(instruction);
  if (response.toLowerCase().charAt(0) !== 'y') {
    console.log('Try again.  I do not understand ' + response + '.')
    start();
  } else {
    player.currentRoom = MainSt
    let answer = await ask(welcomeMessage);

    play()
    //process.exit();
  }
}

async function play() {
  let playerInput = await ask('What do you want to do?"\n>_')
  let cleanInput = playerInput.toLowerCase()
  let inputArray = cleanInput.split(' ');
  let playerAction = inputArray[0];
  let playerItem = inputArray[(inputArray.length - 1)]
  let playerFunction = (playerAction + capitalize(playerItem))

  console.log(playerAction)       // process check to be deleted when game works
  console.log(playerItem)         // process check to be deleted when game works
  console.log(playerFunction)     // process check to be deleted when game works
  console.log(player.currentRoom.name)   // process check to be deleted when game works


  if (commands.exit.includes(playerAction)) {
    process.exit()
  }

  else if (commands.read.includes(playerAction)) {
    let item = itemsLookup.playerItem
    console.log(item)
   // Item.examineItem(item)
    console.log(item.description)
  }
}



//async function examine(item){

    //if (player.inventory.includes(item)){

        //console.log(item.description)

    //} else console.log("\nYou don't have that item}

