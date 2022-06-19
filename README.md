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

To run test use:
```bash
  npm run test
```

## Using

Supported requests:
- GET api/users - get all users
- GET api/users/${userId} - get user by userId
- POST api/users - create new user and store it in database (required fields of user info: username, age, hobbies)
- PUT api/users/${userId} - update existing user by userId (required fields of user info: username, age, hobbies)
- DELETE api/users/${userId} - delete existing user by userId from database

