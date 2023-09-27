/* Error handling class */
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

/* Another class for error logging to datadog */
export class ErrorLogger {
  private datadogClient: any;

  constructor(datadogClient){
    this.datadogClient = datadogClient;
  }

  public logError(errorBody: string) {
    this.datadogClient.post("api/logs", errorBody);
  }
}

/* Extending error handling class with error logging class */
export class ErrorHandlerWithLogging extends ErrorHandler {
  private logger : ErrorLogger;

  constructor(messageBox, logger: ErrorLogger) {
    super(messageBox);
    this.logger = logger
  }

  public logAndWrapError(res: any, errorBody: string, statusCode: number) {
    this.logger.logError(errorBody);
    super.wrapError(res, errorBody, statusCode);
  }
}