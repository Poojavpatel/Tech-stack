// const Animal = {
//   color: 'golden',
//   voice : 'bark',
//   walk : () => {
//     console.log('Tippity tap');
//   }
// }

// console.log('--Animal.color---', Animal.color); 
// Animal.walk(); 

// factory function 
// const createAnimal = (color, voice, walk) => {
//   return {
//     color: color,
//     voice : voice,
//     walk : () => {
//       console.log(walk);
//     }
//   }
// }

// const dog = createAnimal('orange', 'bark', 'Tap Tap');
// const cat = createAnimal('white', 'meow', 'shhhhhh');
// console.log('dog : ', dog);
// console.log('cat : ', cat);
// dog.walk();
// cat.walk();

// // creating classes and its instances using functions
// function Animal (name, color, voice) {
//   this.name = name;
//   this.color = color;
//   this.voice = voice;
//   this.walk = () => {console.log(`${this.name} is walking`)}
// }

// const horse = new Animal('horse', 'brown', 'neigh');
// const camel =  new Animal('camel', 'sandal', 'grunt');
// console.log('horse : ', horse);
// console.log('camel : ', camel);
// horse.walk();
// camel.walk();

// // using es6 classes which are just syntactic sugar
// class Bird {
//   constructor(name, color, size){
//     this.name = name;
//     this.color = color;
//     this.size = size;
//   }
//   eat() {
//     console.log(`${this.name} is eating`);
//   }
// }

// const crow = new Bird('crow', 'brown', 'small');
// const peacock = new Bird('peacock', 'brown', 'big');
// console.log('crow : ', crow);
// console.log('peacock : ', peacock);
// crow.eat();
// peacock.eat();

// // inheritance using function and classes
// function Mammal (name, color, voice, habitat) {
//   Animal.call(this, name, color, voice);
//   this.habitat = habitat;
//   this.feed = () => {
//     console.log(`${this.name} is feeding`);
//   }
// }

// const polarBear = new Mammal('polar bear', 'white', 'roar', 'ice');
// const cow =  new Mammal('cow', 'white', 'moo', 'farm');
// console.log('polarBear : ', polarBear);
// console.log('cow : ', cow);
// polarBear.walk();
// polarBear.feed();

// class FlightBird extends Bird {
//   constructor(name, color, size, wing){
//     super(name, color, size);
//     this.wing = wing;
//   }
//   fly() {
//     console.log(`${this.name} is flying`);
//   }
// }

// const sparrow = new FlightBird('sparrow', 'brown', 'small', 'sparrow wings');
// const eagle = new FlightBird('eagle', 'brown', 'big', 'eagle wings');
// console.log('sparrow : ', sparrow);
// console.log('eagle : ', eagle);
// sparrow.eat();
// eagle.eat();
// sparrow.fly();
// eagle.fly();

///////// class has two types of methods
class Token {
  constructor(token, expiry){
    this.token = token;
    this.expiry = expiry;
  }

  getExpiry(){
    return this.expiry;
  }

  static generate() {
    return Math.random();
  }
}

const token1 = new Token('123', 10);
console.log('token1 : ', token1);

const seq = Token.generate();
console.log('seq : ', seq);

/////// Public vs private properties and methods
class Dog {
  #favToy;
  constructor(species, color, favToy){
    this.species = species;
    this.color = color;
    this.#favToy = favToy;
  }

  bark(){
    console.log('Bark');
  }

  #steal(){
    console.log('Stealing');
  }

  getFavToy(){
    console.log('Fav toy is', this.#favToy);
  }
}

const jimmy = new Dog('indie', 'white', 'ball');
console.log('Jimmy : ', jimmy); // Jimmy :  Dog { species: 'indie', color: 'white' }
// console.log('Jimmy.#favToy : ', jimmy.#favToy); // Property '#favToy' is not accessible outside class 'Dog' because it has a private identifier
jimmy.bark();
// jimmy.#steal(); // Property '#steal' is not accessible outside class 'Dog' because it has a private identifier
jimmy.getFavToy();