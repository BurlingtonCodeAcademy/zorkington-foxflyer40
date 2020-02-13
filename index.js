const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}
let MainSt = {
  desc: '184 Main St'
}
let Foyer = {
  desc: 'Foyer'
}
let Classroom = {
  desc: 'Classroom'
}
let MrMikes = {
  desc: 'MrMikes'
}
let Muddies = {
  desc: 'Muddies'
}
let Hallway = {
  desc: "Hallway"
}
let Kitchen = {
  desc: 'Kitchen'
}

let roomIn = {
  'MainSt': { canChangeTo: ['Foyer', 'MrMikes', 'Muddies']},
  'Foyer': { canChangeTo: ['MainSt', 'Hallway',]},
  'Hallway': { canChangeTo: ['Foyer', 'Kitchen', 'Classroom']},
  'Classroom': { canChangeto: ['Hallway']},
  'Kitchen': { canChangeto: ['Hallway']},
  'Muddies': { canChangeto: ['MainSt', 'MrMikes']},
  'MrMikes': { canChangeto: ['Muddies', 'MainSt']},
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

let currentRoomIn = 'MainSt'
//let currentRoom = roomLookup[currentRoomIn]

function changeRoom(newRoom) {
  //if(userInput.includes('xyzzy')) {
  //  console.log('Okay cheater enjoy your new room')
  //  currentState = prisonCell
  //  currentRoom = roomLookup[currentState]
  //}
  
  if (roomIn[currentRoomIn].canChangeTo.includes(newRoom)) {
  
    currentRoomIn = newRoom
    currentRoom = roomLookup[currentRoomIn]

  } else {
    console.log('invalid state transition attempted')
  
  }
}


start();

async function start() {
  const welcomeMessage = `182 Main St.
You are standing on Main Street between Church and South Winooski.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign.`;
let answer = await ask(welcomeMessage);

  console.log('\n"What do you want to do?"\n>_');
  process.exit();
}
