# CRUD API

## Installing

Clone this repo to your local machine. Checkout to crud-api branch. Then run from app root:
```bash
  npm install
```

## Running

To run app in development mode use:
```bash
  npm run start:dev
```
To run app in production mode use:
```bash
  npm run start:prod
```

## Testing

To run tests use:
```bash
  npm run test
```

## Using

Supported requests:
- GET /api/users - get all users
- GET /api/users/${userId} - get user by userId
- POST /api/users - create new user and store it in database (required fields of user info: username, age, hobbies)
- PUT /api/users/${userId} - update existing user by userId (required fields of user info: username, age, hobbies)
- DELETE /api/users/${userId} - delete existing user by userId from database

Requests that need an id expect the id after /api/users/.

## Examples of expected responses to invalid requests

- METHOD /abra/cadabra - 404 'Resource that you requested does not exist'
- If method is not supported - 404 'Method you are trying to execute is not found'
- GET /api/users/2564749 - 400 'Invalid user id'
- GET /api/users/${validUserId}, but user with this id doesn't exist - 404 'User is not found'
- POST /api/users sent info without any required fields - 400 'You did not send required information'
