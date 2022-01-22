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