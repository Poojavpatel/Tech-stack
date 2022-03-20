# Typescript 

* Typescript is a super set of javascript 
* Browsers donot understand typescript, Typescript files are **transpiled** into javascript 

## Advantages of typescript over javascript
1. Strong typing 
1. OOP support - private, interface, abstract 
1. Compile time errors
1. Intellisence support
## Running Typescript files
```bash
sudo npm install -g typescript
tsc -v
tsc index.ts    # transpiles and creates a js file
node index.js

# To transpile and run
tsc index.ts | node index.js

# To transpile using ES6 
tsc --target ES6 index.ts
```



---
### Use TypeScript to Build a Node API with Express

Setup - https://developer.okta.com/blog/2018/11/15/node-express-typescript

For Project structure refer - https://github.com/Poojavpatel/search-engine-assignment

---

### How to add Typescript definitions to Express req & res

```bash
npm i @types/express --save-dev ("@types/express": "^4.17.0")
```

```typescript
// This can be shortened..
import { Request, Response, NextFunction } from 'express';
export const myMiddleware = (req: Request, res: Response, next: NextFunction) => {
  ...
};

// to this..
import { RequestHandler } from 'express';
export const myMiddleware: RequestHandler = (req, res, next) => {
  ...
};

// or in case it handles the error object
import { ErrorRequestHandler } from 'express';
export const myMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  ...
};
```

```typescript
// or create a generic middleware function

// middleware/authCheck.ts
import { Request, Response, NextFunction } from 'express';

export const authCheckMiddleware = (req: Request, res: Response, next: NextFunction) => {
  ...
};

// server.ts
import { authCheckMiddleware } from './middleware/authCheck';
app.use('/api', authCheckMiddleware);
```