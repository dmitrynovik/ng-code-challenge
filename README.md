## Highlights of the work done

1. Refactoring of business logic out of app component into a service class: [product-service.ts](https://github.com/dmitrynovik/ng-code-challenge/blob/master/client/src/app/services/product-service.ts).

2. A test of the above service: [product-service.spec.ts](https://github.com/dmitrynovik/ng-code-challenge/blob/master/client/src/app/services/product-service.spec.ts)

## TODO or "what you would improve"
Add a test for the server side: `get('/temperature/:id'` - ran out of time

## Questions
Not so much.

NOTE: getting information by each beer ID could be a performance issue if types become many (think of a bulk API).

## Explanations of decisions made
The idea is that all product-related business logic is in the "service" layer. 
Therefore, the app component does not have the logic and merely wraps the service.

## Available scripts

### Root
- `npm install` - Installs dependencies client and server apps
- `npm start` - Runs client and server apps

### Client
- `npm start` - Start the application (Port 4200)
- `npm test` - Runs available tests

### Server
- `npm start` - Start the application (Port 8081)
