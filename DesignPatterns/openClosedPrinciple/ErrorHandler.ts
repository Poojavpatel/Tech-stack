export class ErrorHandler {
  private messageBox: any;

  constructor(messageBox){
    this.messageBox = messageBox;
  }

  public wrapError(res: any, errorBody: string, statusCode: number) {
    if(statusCode === 500) {
      this.critical(res, errorBody)
    } else {
      this.clientError(res, errorBody)
    }
  }

  private clientError(res: any, body: string): any {
    this.messageBox.show("Client error", body)
  }

  private critical(res: any, body: string): any {
    this.messageBox.show("Internal server error", body)
  }
}