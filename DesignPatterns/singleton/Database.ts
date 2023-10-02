export class Database {
  public buttonClicks:number = 0;
  // 1. static field for storing the singleton instance
  private static instance: Database

  // 2. The singleton's constructor should always be private
  private constructor() {
  }

  // 3. static method that controls access to the singleton instance
  public static getInstance() {
    if(Database.instance === null || Database.instance === undefined){
      Database.instance = new Database();
    }
    return Database.instance
  }
}