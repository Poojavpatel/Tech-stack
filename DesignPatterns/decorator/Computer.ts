class Computer {
  boot() : void {
    console.log(`Booting computer`);
  }
  print() : void {
    console.log(`No printer attached`);
  }
  renderVideo() : void {
    console.log(`Cannot render video without graphics card`);
  }
}

class ServerComputer extends Computer {
  boot() : void {
    console.log(`Booting server`);
  }
}

class ComputerDecorator extends Computer {
  private computer: Computer;

  constructor(computer: Computer) {
    super();
    this.computer = computer;
  }

  boot() : void {
    return this.computer.boot();
  }
  print() : void {
    return this.computer.print();
  }
  renderVideo() : void {
    return this.computer.renderVideo();
  }
}

class PrinterDecorator extends ComputerDecorator {
  constructor(computer: Computer) {
    super(computer);
  }

  print() : void {
    console.log(`Printing sheet`);
  }
}

class GraphicsDecorator extends ComputerDecorator {
  constructor(computer: Computer) {
    super(computer);
  }

  renderVideo() : void {
    console.log(`Rendering Video`);
  }
}

let computerWithPrinterAndGraphics = new GraphicsDecorator(new PrinterDecorator(new ServerComputer()))

computerWithPrinterAndGraphics.print();
computerWithPrinterAndGraphics.renderVideo();