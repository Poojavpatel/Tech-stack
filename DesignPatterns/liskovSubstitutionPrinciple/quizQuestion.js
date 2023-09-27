"use strict";
/*
To run this file
tsc DesignPatterns/liskovSubstitutionPrinciple/quizQuestion.ts
node DesignPatterns/liskovSubstitutionPrinciple/quizQuestion.js
OR
ts-node DesignPatterns/liskovSubstitutionPrinciple/quizQuestion.ts
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizQuestion = void 0;
var QuizQuestion = /** @class */ (function () {
    function QuizQuestion(question, option1, option2, option3, option4, correctOption) {
        this._question = question;
        this._option1 = option1;
        this._option2 = option2;
        this._option3 = option3;
        this._option4 = option4;
        this._correctOption = correctOption;
    }
    Object.defineProperty(QuizQuestion.prototype, "question", {
        get: function () {
            return this._question;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(QuizQuestion.prototype, "option1", {
        get: function () {
            return this._option1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(QuizQuestion.prototype, "option2", {
        get: function () {
            return this._option2;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(QuizQuestion.prototype, "option3", {
        get: function () {
            return this._option3;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(QuizQuestion.prototype, "option4", {
        get: function () {
            return this._option4;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(QuizQuestion.prototype, "correctOption", {
        get: function () {
            return this._correctOption;
        },
        enumerable: false,
        configurable: true
    });
    return QuizQuestion;
}());
exports.QuizQuestion = QuizQuestion;
function printQuestion(quiz) {
    console.log(quiz.question);
    console.log("1. ".concat(quiz.option1));
    console.log("2. ".concat(quiz.option2));
    console.log("3. ".concat(quiz.option3));
    console.log("4. ".concat(quiz.option4));
}
var quiz = new QuizQuestion("What is the capital of France?", "Paris", "Berlin", "Madrid", "London", 1);
printQuestion(quiz);
/*
Violation of Liskov Substitution Principle:
*/
// We now want to create a TrueFalseQuestion class. We can use inheritance here, as it follows the "is a" rule
var TrueFalseQuestion = /** @class */ (function (_super) {
    __extends(TrueFalseQuestion, _super);
    function TrueFalseQuestion(question, correctOption) {
        return _super.call(this, question, "TRUE", "FALSE", null, null, correctOption) || this;
    }
    return TrueFalseQuestion;
}(QuizQuestion));
var trueFalseViolation = new TrueFalseQuestion("Typescript is a subset of javascript", 2);
/* Prints 4 options instead of 2 and option 3 and 4 are printed as null, This is a violation of LSP */
printQuestion(trueFalseViolation);
/*
Adhering to Liskov Substitution Principle:
*/
/* Define a TrueFalseQuestion class using composition instead of inheritance */
var TrueFalseQuestionComposition = /** @class */ (function () {
    function TrueFalseQuestionComposition(question, correctOption) {
        this.quizQuestion = new QuizQuestion(question, "TRUE", "FALSE", null, null, correctOption);
    }
    Object.defineProperty(TrueFalseQuestionComposition.prototype, "question", {
        get: function () {
            return this.quizQuestion.question;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TrueFalseQuestionComposition.prototype, "option1", {
        get: function () {
            return this.quizQuestion.option1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TrueFalseQuestionComposition.prototype, "option2", {
        get: function () {
            return this.quizQuestion.option2;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TrueFalseQuestionComposition.prototype, "correctOption", {
        get: function () {
            return this.quizQuestion.correctOption;
        },
        enumerable: false,
        configurable: true
    });
    TrueFalseQuestionComposition.prototype.printQuestion = function () {
        console.log(this.quizQuestion.question);
        console.log("1. ".concat(this.quizQuestion.option1));
        console.log("2. ".concat(this.quizQuestion.option2));
    };
    return TrueFalseQuestionComposition;
}());
// Create a TrueFalseQuestionComposition object and print it.
var trueFalseAdherence = new TrueFalseQuestionComposition("Typescript is a subset of javascript", 2);
trueFalseAdherence.printQuestion(); // Outputs 2 options as expected.
