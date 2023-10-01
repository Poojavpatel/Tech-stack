export interface ISmartDevice {
  connectWifi(ssid: string): void;
  openApp(path: string): void;
  call(contact: string): void;
  sendSms(contact: string, message: string): void;
}

export class SmartPhone implements ISmartDevice {
  connectWifi(ssid: string): void {
    console.log(`Connecting to wifi ${ssid}`);
  }
  openApp(path: string): void {
    console.log(`Opening app ${path}`);
  }
  call(contact: string): void {
    console.log(`Calling ${contact}`);
  }
  sendSms(contact: string, message: string): void {
    console.log(`Sending ${message} to ${contact}`);
  }
}

const phone = new SmartPhone();
phone.call("John");
phone.sendSms("John", "How are you");
phone.openApp("Instagram");
phone.connectWifi("home");

export class Tablet implements ISmartDevice {
  connectWifi(ssid: string): void {
    console.log(`Connecting to wifi ${ssid}`);
  }
  openApp(path: string): void {
    console.log(`Opening app ${path}`);
  }
  /* Principle violated as we are forced to implement method that is not needed */
  call(contact: string): void {
    console.log(`Tablet cannot make a call`);
    throw new Error("Method not implemented.");
  }
  /* Principle violated as we are forced to implement method that is not needed */
  sendSms(contact: string, message: string): void {
    console.log(`Tablet cannot send sms`);
    throw new Error("Method not implemented.");
  }
}

const tablet = new Tablet();

/* 
  To fix it, segregate interface into smaller interfaces 
*/
export interface ISmartDevice2 {
  connectWifi(ssid: string): void;
  openApp(path: string): void;
}

export interface IPhoneDevice {
  call(contact: string): void;
  sendSms(contact: string, message: string): void;
}

export class SmartPhone2 implements ISmartDevice2, IPhoneDevice {
  connectWifi(ssid: string): void {
    console.log(`Connecting to wifi ${ssid}`);
  }
  openApp(path: string): void {
    console.log(`Opening app ${path}`);
  }
  call(contact: string): void {
    console.log(`Calling ${contact}`);
  }
  sendSms(contact: string, message: string): void {
    console.log(`Sending ${message} to ${contact}`);
  }
}

export class Tablet2 implements ISmartDevice2 {
  connectWifi(ssid: string): void {
    console.log(`Connecting to wifi ${ssid}`);
  }
  openApp(path: string): void {
    console.log(`Opening app ${path}`);
  }
}