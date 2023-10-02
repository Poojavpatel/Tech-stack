export class StatsTracker {
  public buttonClicks:number = 0;
  public facebookShares: number = 0;
  // 1. A static instance of the same class initialized using the constructor
  private static _instance : StatsTracker = new StatsTracker();

  constructor(){
    // 3. Error from constructor if trying to reinitialize
    if(StatsTracker._instance){
      throw new Error("Cannot initialize singleton class using new");
    }
    StatsTracker._instance = this;
  }

  // 2. public getter that returns the instance
  public static get instance(): StatsTracker{
    return StatsTracker._instance;
  }
}

