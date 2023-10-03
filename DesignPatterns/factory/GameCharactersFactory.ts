import { GameCharacter } from "./GameCharacter";

export class GameCharactersFactory {
  public static getWarrior(level: number) : GameCharacter {
    let warrior : GameCharacter;
    if(level < 5) {
      warrior = {health: 10, magic:0};
    } else {
      warrior = {health: 10, magic:10};
    }
    return warrior;
  }

  public static getFarmer(level: number) : GameCharacter {
    let farmer : GameCharacter;
    if(level < 5) {
      farmer = {health: 2, magic:0};
    } else {
      farmer = {health: 5, magic:0};
    }
    return farmer;
  }
}