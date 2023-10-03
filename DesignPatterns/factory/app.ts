import { GameCharactersFactory } from "./GameCharactersFactory";

const warrior = GameCharactersFactory.getWarrior(10);
const farmer = GameCharactersFactory.getFarmer(2);

console.log(warrior);
console.log(farmer);