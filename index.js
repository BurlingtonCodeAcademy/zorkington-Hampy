const readline = require("readline");
const readlineInterface = readline.createInterface(
  process.stdin,
  process.stdout
);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

class Item {
  constructor(name, content) {
    this.name = name;
    this.content = content;
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.inventory = [];
  }
}

class SycamoreLn {
  constructor() {
    this.welcomeMessage =
      "You are in South Shatfsbury standing in front of a small white house. There is a door with a had written sign.\n >_ ";
    this.sign = 'The sign says "Welcome to the Mini-House" Please come inside!';
  }

  read(sign) {
    return this.sign;
  }

  take() {
    return "You can't take sign";
  }
}

async function start() {
  let location = new SycamoreLn();
  let answer = await ask(location.welcomeMessage);
  // answer === 'read sign => ['read', 'sign']
  // for some reason this is not
  while (answer !== "exit") {
    let commands = answer.split("  ");
    let action = commands[0];
    let object = commands[1];
    console.log({ location });
    if (location[action] !== undefined) {
      console.log(location[action](object));
    } else {
      console.log(`Sorry, I don't know how to ${action}`); // for some reason this is getting returned
    }
    answer = await ask(`${location.sign}`);
  }
  process.exit();
}

start();
