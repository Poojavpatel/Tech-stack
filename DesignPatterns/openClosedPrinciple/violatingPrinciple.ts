export class ErrorHandler {
  private messageBox: any;
  private datadogClient: any;

  constructor(messageBox, datadogClient){
    this.messageBox = messageBox;
    this.datadogClient = datadogClient;
  }

  public wrapError(res: any, errorBody: string, statusCode: number) {
    /* Sending log to datadog api by directly modifying existing class */
    this.datadogClient.post("api/logs", errorBody);
    
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