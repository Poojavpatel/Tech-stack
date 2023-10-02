import { Database } from "./Database";
import { StatsTracker } from "./StatsTracker";

// const statsTracker = new StatsTracker(); // Error: Cannot initialize singleton class using new
const statsTracker = StatsTracker.instance;

statsTracker.buttonClicks += 5;
console.log(statsTracker.buttonClicks) // 5

// const db = new Database() // Constructor of class Database is private and only accessible within the class declaration.
const db = Database.getInstance();
db.buttonClicks += 10;
console.log(db.buttonClicks); // 10

const dbAnotherInstance = Database.getInstance();
dbAnotherInstance.buttonClicks += 5;
console.log(dbAnotherInstance.buttonClicks); // 15