/* 
To run this file 
tsc DesignPatterns/liskovSubstitutionPrinciple/quizQuestion.ts
node DesignPatterns/liskovSubstitutionPrinciple/quizQuestion.js
OR
ts-node DesignPatterns/liskovSubstitutionPrinciple/quizQuestion.ts
*/

export class QuizQuestion {
  private _question: string;
  private _option1: string;
  private _option2: string;
  private _option3: string;
  private _option4: string;
  private _correctOption: number;

  constructor(question: string,option1: string,option2: string,option3: string,option4: string,correctOption: number
  ) {
    this._question = question;
    this._option1 = option1;
    this._option2 = option2;
    this._option3 = option3;
    this._option4 = option4;
    this._correctOption = correctOption;
  }

  get question(): string {
    return this._question;
  }

  get option1(): string {
    return this._option1;
  }

  get option2(): string {
    return this._option2;
  }

  get option3(): string {
    return this._option3;
  }

  get option4(): string {
    return this._option4;
  }

  get correctOption(): number {
    return this._correctOption;
  }
}

function printQuestion(quiz: QuizQuestion) {
  console.log(quiz.question);
  console.log(`1. ${quiz.option1}`);
  console.log(`2. ${quiz.option2}`);
  console.log(`3. ${quiz.option3}`);
  console.log(`4. ${quiz.option4}`);
}

const quiz = new QuizQuestion("What is the capital of France?", "Paris", "Berlin", "Madrid", "London", 1);
printQuestion(quiz);

/* 
Violation of Liskov Substitution Principle:
*/

// We now want to create a TrueFalseQuestion class. We can use inheritance here, as it follows the "is a" rule
class TrueFalseQuestion extends QuizQuestion {
  constructor(question: string, correctOption: number) {
    super(question, "TRUE", "FALSE", null, null, correctOption);
  }
}

const trueFalseViolation = new TrueFalseQuestion("Typescript is a subset of javascript",2);
/* Prints 4 options instead of 2 and option 3 and 4 are printed as null, This is a violation of LSP */
printQuestion(trueFalseViolation); 

/* 
Adhering to Liskov Substitution Principle:
*/

/* Define a TrueFalseQuestion class using composition instead of inheritance */
class TrueFalseQuestionComposition {
  private quizQuestion: QuizQuestion;

  constructor(question: string, correctOption: number) {
    this.quizQuestion = new QuizQuestion(question, "TRUE", "FALSE", null, null, correctOption );
  }

  get question(): string {
    return this.quizQuestion.question;
  }

  get option1(): string {
    return this.quizQuestion.option1;
  }

  get option2(): string {
    return this.quizQuestion.option2;
  }

  get correctOption(): number {
    return this.quizQuestion.correctOption;
  }

  printQuestion() {
    console.log(this.quizQuestion.question);
    console.log(`1. ${this.quizQuestion.option1}`);
    console.log(`2. ${this.quizQuestion.option2}`);
  }
}

// Create a TrueFalseQuestionComposition object and print it.
const trueFalseAdherence = new TrueFalseQuestionComposition("Typescript is a subset of javascript", 2);
trueFalseAdherence.printQuestion(); // Outputs 2 options as expected.
