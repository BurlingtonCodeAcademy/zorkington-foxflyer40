const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
};
/**************Setup code************************************** */


/******************Objects*********************** */

class Room {
  constructor(name, desc, inventory) {
    this.name = name
    this.desc = desc
    this.inventory = inventory || []


// what you can do in a room goes here enter, exit etc..

    this.changeRoom = () => {
      return (this.name + '\n' + this.description)




    }

  }



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
  }






    start();

    async function start() {
      const welcomeMessage = `182 Main St.
You are standing on Main Street between Church and South Winooski.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign.`;
      let answer = await ask(welcomeMessage);

      console.log('\n"What do you want to do?"\n>_');
      //process.exit();
    }
